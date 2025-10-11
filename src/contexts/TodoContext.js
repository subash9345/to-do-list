import React, { createContext, useContext, useReducer, useCallback, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import useLocalStorageEncrypted from '../hooks/useLocalStorageEncrypted';
import { PRIORITY } from '../types/todo';

const TodoContext = createContext();

/**
 * Custom hook to access todo context
 */
export const useTodos = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodos must be used within TodoProvider');
  }
  return context;
};

// Action types
const ACTIONS = {
  SET_TODOS: 'SET_TODOS',
  ADD_TODO: 'ADD_TODO',
  UPDATE_TODO: 'UPDATE_TODO',
  DELETE_TODO: 'DELETE_TODO',
  TOGGLE_TODO: 'TOGGLE_TODO',
  REORDER_TODOS: 'REORDER_TODOS',
  CLEAR_COMPLETED: 'CLEAR_COMPLETED',
  BULK_DELETE: 'BULK_DELETE',
  BULK_COMPLETE: 'BULK_COMPLETE',
};

// Reducer function
const todoReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_TODOS:
      return action.payload;

    case ACTIONS.ADD_TODO:
      return [...state, action.payload];

    case ACTIONS.UPDATE_TODO:
      return state.map(todo =>
        todo.id === action.payload.id ? { ...todo, ...action.payload.updates, updatedAt: new Date().toISOString() } : todo
      );

    case ACTIONS.DELETE_TODO:
      return state.filter(todo => todo.id !== action.payload);

    case ACTIONS.TOGGLE_TODO:
      return state.map(todo =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed, updatedAt: new Date().toISOString() }
          : todo
      );

    case ACTIONS.REORDER_TODOS:
      return action.payload;

    case ACTIONS.CLEAR_COMPLETED:
      return state.filter(todo => !todo.completed);

    case ACTIONS.BULK_DELETE:
      return state.filter(todo => !action.payload.includes(todo.id));

    case ACTIONS.BULK_COMPLETE:
      return state.map(todo =>
        action.payload.includes(todo.id)
          ? { ...todo, completed: true, updatedAt: new Date().toISOString() }
          : todo
      );

    default:
      return state;
  }
};

/**
 * Create a new todo with default values
 */
const createTodo = (data) => ({
  id: uuidv4(),
  text: data.text || '',
  description: data.description || '',
  completed: false,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  dueDate: data.dueDate || null,
  priority: data.priority || PRIORITY.MEDIUM,
  category: data.category || 'Personal',
  tags: data.tags || [],
  subtasks: data.subtasks || [],
  attachments: data.attachments || [],
  comments: data.comments || [],
  order: data.order || Date.now(),
});

/**
 * Todo Provider Component
 */
export const TodoProvider = ({ children }) => {
  const [storedTodos, setStoredTodos] = useLocalStorageEncrypted('premium-todos', [], false);
  const [todos, dispatch] = useReducer(todoReducer, storedTodos);

  // Sync with localStorage
  useEffect(() => {
    setStoredTodos(todos);
  }, [todos, setStoredTodos]);

  // Add todo
  const addTodo = useCallback((data) => {
    const newTodo = createTodo(data);
    dispatch({ type: ACTIONS.ADD_TODO, payload: newTodo });
    return newTodo;
  }, []);

  // Update todo
  const updateTodo = useCallback((id, updates) => {
    dispatch({ type: ACTIONS.UPDATE_TODO, payload: { id, updates } });
  }, []);

  // Delete todo
  const deleteTodo = useCallback((id) => {
    dispatch({ type: ACTIONS.DELETE_TODO, payload: id });
  }, []);

  // Toggle todo completion
  const toggleTodo = useCallback((id) => {
    dispatch({ type: ACTIONS.TOGGLE_TODO, payload: id });
  }, []);

  // Reorder todos (for drag and drop)
  const reorderTodos = useCallback((newOrder) => {
    dispatch({ type: ACTIONS.REORDER_TODOS, payload: newOrder });
  }, []);

  // Clear completed todos
  const clearCompleted = useCallback(() => {
    dispatch({ type: ACTIONS.CLEAR_COMPLETED });
  }, []);

  // Bulk delete
  const bulkDelete = useCallback((ids) => {
    dispatch({ type: ACTIONS.BULK_DELETE, payload: ids });
  }, []);

  // Bulk complete
  const bulkComplete = useCallback((ids) => {
    dispatch({ type: ACTIONS.BULK_COMPLETE, payload: ids });
  }, []);

  // Import todos
  const importTodos = useCallback((importedTodos) => {
    dispatch({ type: ACTIONS.SET_TODOS, payload: importedTodos });
  }, []);

  // Export todos
  const exportTodos = useCallback(() => {
    return JSON.stringify(todos, null, 2);
  }, [todos]);

  const value = {
    todos,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    reorderTodos,
    clearCompleted,
    bulkDelete,
    bulkComplete,
    importTodos,
    exportTodos,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export default TodoContext;
