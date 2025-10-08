import React, { useState, useMemo, useCallback } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import TodoFilter from './components/TodoFilter';
import TodoStats from './components/TodoStats';
import useLocalStorage from './hooks/useLocalStorage';
import './App.css';

/**
 * Main App Component
 * Manages todo state and coordinates all child components
 */
function App() {
  // State management with localStorage persistence
  const [todos, setTodos] = useLocalStorage('todos', []);
  const [filter, setFilter] = useState('all');

  /**
   * Add new todo
   * @param {string} text - Todo text content
   */
  const addTodo = useCallback((text) => {
    const newTodo = {
      id: Date.now(), // Using Date.now() as unique ID
      text,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  }, [setTodos]);

  /**
   * Toggle todo completion status
   * @param {number} id - Todo ID
   */
  const toggleTodo = useCallback((id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, [setTodos]);

  /**
   * Delete todo
   * @param {number} id - Todo ID
   */
  const deleteTodo = useCallback((id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  }, [setTodos]);

  /**
   * Edit todo text
   * @param {number} id - Todo ID
   * @param {string} newText - Updated text
   */
  const editTodo = useCallback((id, newText) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  }, [setTodos]);

  /**
   * Clear all completed todos
   */
  const clearCompleted = useCallback(() => {
    setTodos((prevTodos) => prevTodos.filter((todo) => !todo.completed));
  }, [setTodos]);

  /**
   * Filter todos based on current filter
   * Memoized to prevent unnecessary recalculations
   */
  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter((todo) => !todo.completed);
      case 'completed':
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  /**
   * Calculate statistics
   * Memoized for performance optimization
   */
  const stats = useMemo(() => {
    const totalCount = todos.length;
    const completedCount = todos.filter((todo) => todo.completed).length;
    const activeCount = totalCount - completedCount;

    return { totalCount, completedCount, activeCount };
  }, [todos]);

  return (
    <div className="app">
      <div className="container">
        <header className="app-header">
          <h1 className="app-title">📝 Todo List</h1>
          <p className="app-subtitle">Stay organized, get things done</p>
        </header>

        <main className="app-main">
          <TodoForm onAdd={addTodo} />

          <TodoFilter currentFilter={filter} onFilterChange={setFilter} />

          <TodoList
            todos={filteredTodos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onEdit={editTodo}
          />

          {todos.length > 0 && (
            <TodoStats
              totalCount={stats.totalCount}
              activeCount={stats.activeCount}
              completedCount={stats.completedCount}
              onClearCompleted={clearCompleted}
            />
          )}
        </main>

        <footer className="app-footer">
          <p>Double-click to edit a todo</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
