import React, { createContext, useContext, useState, useCallback } from 'react';

const HistoryContext = createContext();

/**
 * Custom hook to access history context
 */
export const useHistory = () => {
  const context = useContext(HistoryContext);
  if (!context) {
    throw new Error('useHistory must be used within HistoryProvider');
  }
  return context;
};

const MAX_HISTORY_SIZE = 50;

/**
 * History Provider Component
 * Manages undo/redo functionality
 */
export const HistoryProvider = ({ children }) => {
  const [history, setHistory] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);

  // Add action to history
  const addToHistory = useCallback((action) => {
    setHistory(prev => {
      // Remove any future history if we're not at the end
      const newHistory = prev.slice(0, currentIndex + 1);

      // Add new action
      newHistory.push({
        ...action,
        timestamp: Date.now(),
      });

      // Limit history size
      if (newHistory.length > MAX_HISTORY_SIZE) {
        newHistory.shift();
        setCurrentIndex(prev => Math.max(0, prev));
      } else {
        setCurrentIndex(newHistory.length - 1);
      }

      return newHistory;
    });
  }, [currentIndex]);

  // Undo action
  const undo = useCallback(() => {
    if (currentIndex > 0) {
      const action = history[currentIndex];
      setCurrentIndex(prev => prev - 1);
      return action;
    }
    return null;
  }, [currentIndex, history]);

  // Redo action
  const redo = useCallback(() => {
    if (currentIndex < history.length - 1) {
      const action = history[currentIndex + 1];
      setCurrentIndex(prev => prev + 1);
      return action;
    }
    return null;
  }, [currentIndex, history]);

  // Clear history
  const clearHistory = useCallback(() => {
    setHistory([]);
    setCurrentIndex(-1);
  }, []);

  const canUndo = currentIndex > 0;
  const canRedo = currentIndex < history.length - 1;

  const value = {
    history,
    currentIndex,
    addToHistory,
    undo,
    redo,
    clearHistory,
    canUndo,
    canRedo,
  };

  return <HistoryContext.Provider value={value}>{children}</HistoryContext.Provider>;
};

export default HistoryContext;
