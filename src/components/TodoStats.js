import React from 'react';
import './TodoStats.css';

/**
 * TodoStats Component
 * Displays todo count and clear completed button
 */
function TodoStats({ totalCount, activeCount, completedCount, onClearCompleted }) {
  return (
    <div className="todo-stats">
      <div className="stats-info" role="status" aria-live="polite">
        <span className="stat-item">
          <strong>{totalCount}</strong> total
        </span>
        <span className="stat-item">
          <strong>{activeCount}</strong> active
        </span>
        <span className="stat-item">
          <strong>{completedCount}</strong> completed
        </span>
      </div>

      {completedCount > 0 && (
        <button
          onClick={onClearCompleted}
          className="btn-clear"
          aria-label={`Clear ${completedCount} completed todo${completedCount !== 1 ? 's' : ''}`}
        >
          Clear Completed
        </button>
      )}
    </div>
  );
}

export default TodoStats;
