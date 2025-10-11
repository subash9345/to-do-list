import React, { useState, useMemo, useCallback, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { isToday, isThisWeek, isPast } from 'date-fns';
import { MdAdd } from 'react-icons/md';
import { ThemeProvider } from './contexts/ThemeContext';
import { TodoProvider, useTodos } from './contexts/TodoContext';
import { HistoryProvider } from './contexts/HistoryContext';
import { GlobalStyles } from './styles/GlobalStyles';
import Header from './components/layout/Header';
import TodoFilters from './components/todos/TodoFilters';
import TodoList from './components/todos/TodoList';
import TodoForm from './components/todos/TodoForm';
import Statistics from './components/features/Statistics';
import KeyboardShortcuts from './components/features/KeyboardShortcuts';
import Settings from './components/features/Settings';
import ErrorBoundary from './components/common/ErrorBoundary';
import { FILTER_TYPES, SORT_TYPES } from './types/todo';
import useKeyboardShortcut from './hooks/useKeyboardShortcut';

const AppContainer = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
`;

const MainContent = styled.main`
  max-width: 1400px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl};

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.md};
  }
`;

const FAB = styled(motion.button)`
  position: fixed;
  bottom: ${({ theme }) => theme.spacing.xl};
  right: ${({ theme }) => theme.spacing.xl};
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  box-shadow: 0 4px 12px ${({ theme }) => theme.colors.shadowMedium};
  cursor: pointer;
  z-index: 100;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover};
  }

  @media (max-width: 768px) {
    bottom: ${({ theme }) => theme.spacing.lg};
    right: ${({ theme }) => theme.spacing.lg};
  }
`;

/**
 * Main App Content Component
 */
const AppContent = () => {
  const { todos, addTodo, updateTodo, deleteTodo, toggleTodo, reorderTodos, exportTodos, importTodos } = useTodos();

  // UI State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);

  // Filter & Sort State
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState(FILTER_TYPES.ALL);
  const [sortType, setSortType] = useState(SORT_TYPES.DATE_CREATED);

  const fileInputRef = useRef(null);

  // Filter todos based on search and filter type
  const filteredTodos = useMemo(() => {
    let filtered = [...todos];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        todo =>
          todo.text.toLowerCase().includes(query) ||
          todo.description.toLowerCase().includes(query) ||
          todo.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Apply status filter
    switch (filterType) {
      case FILTER_TYPES.ACTIVE:
        filtered = filtered.filter(todo => !todo.completed);
        break;
      case FILTER_TYPES.COMPLETED:
        filtered = filtered.filter(todo => todo.completed);
        break;
      case FILTER_TYPES.TODAY:
        filtered = filtered.filter(todo => todo.dueDate && isToday(new Date(todo.dueDate)));
        break;
      case FILTER_TYPES.WEEK:
        filtered = filtered.filter(todo => todo.dueDate && isThisWeek(new Date(todo.dueDate)));
        break;
      case FILTER_TYPES.OVERDUE:
        filtered = filtered.filter(
          todo => !todo.completed && todo.dueDate && isPast(new Date(todo.dueDate))
        );
        break;
      default:
        break;
    }

    // Apply sorting
    switch (sortType) {
      case SORT_TYPES.DATE_CREATED:
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case SORT_TYPES.DATE_UPDATED:
        filtered.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
        break;
      case SORT_TYPES.DUE_DATE:
        filtered.sort((a, b) => {
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate) - new Date(b.dueDate);
        });
        break;
      case SORT_TYPES.PRIORITY:
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        filtered.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
        break;
      case SORT_TYPES.ALPHABETICAL:
        filtered.sort((a, b) => a.text.localeCompare(b.text));
        break;
      default:
        break;
    }

    return filtered;
  }, [todos, searchQuery, filterType, sortType]);

  // Handlers
  const handleCreateTodo = useCallback(() => {
    setEditingTodo(null);
    setIsFormOpen(true);
  }, []);

  const handleEditTodo = useCallback((todo) => {
    setEditingTodo(todo);
    setIsFormOpen(true);
  }, []);

  const handleFormSubmit = useCallback(
    (data) => {
      if (editingTodo) {
        updateTodo(editingTodo.id, data);
      } else {
        addTodo(data);
      }
    },
    [editingTodo, addTodo, updateTodo]
  );

  const handleExport = useCallback(() => {
    const dataStr = exportTodos();
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `todos-export-${new Date().toISOString()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }, [exportTodos]);

  const handleImport = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback(
    (e) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const imported = JSON.parse(event.target.result);
          if (Array.isArray(imported)) {
            importTodos(imported);
          }
        } catch (error) {
          console.error('Failed to import todos:', error);
          alert('Failed to import todos. Please check the file format.');
        }
      };
      reader.readAsText(file);
      e.target.value = '';
    },
    [importTodos]
  );

  // Keyboard shortcuts
  useKeyboardShortcut(['ctrl', 'n'], handleCreateTodo);
  useKeyboardShortcut(['ctrl', '/'], () => setIsShortcutsOpen(true));

  return (
    <>
      <Header
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenShortcuts={() => setIsShortcutsOpen(true)}
        onExport={handleExport}
        onImport={handleImport}
      />

      <MainContent>
        <Statistics todos={todos} />

        <TodoFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          filterType={filterType}
          onFilterChange={setFilterType}
          sortType={sortType}
          onSortChange={setSortType}
        />

        <TodoList
          todos={filteredTodos}
          onToggle={toggleTodo}
          onEdit={handleEditTodo}
          onDelete={deleteTodo}
          onReorder={reorderTodos}
        />
      </MainContent>

      <FAB
        onClick={handleCreateTodo}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Create new todo"
      >
        <MdAdd size={32} />
      </FAB>

      <TodoForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingTodo(null);
        }}
        onSubmit={handleFormSubmit}
        initialData={editingTodo}
      />

      <KeyboardShortcuts isOpen={isShortcutsOpen} onClose={() => setIsShortcutsOpen(false)} />

      <Settings isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />

      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </>
  );
};

/**
 * Root App Component
 * Wraps everything with providers and error boundary
 */
function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <GlobalStyles />
        <HistoryProvider>
          <TodoProvider>
            <AppContainer>
              <AppContent />
            </AppContainer>
          </TodoProvider>
        </HistoryProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
