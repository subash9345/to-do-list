import React from 'react';
import './TodoFilter.css';

/**
 * TodoFilter Component
 * Buttons to filter todos by status (All, Active, Completed)
 */
function TodoFilter({ currentFilter, onFilterChange }) {
  const filters = [
    { value: 'all', label: 'All' },
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' },
  ];

  return (
    <div className="todo-filter" role="group" aria-label="Filter todos">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onFilterChange(filter.value)}
          className={`filter-btn ${currentFilter === filter.value ? 'active' : ''}`}
          aria-pressed={currentFilter === filter.value}
          aria-label={`Show ${filter.label.toLowerCase()} todos`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}

export default TodoFilter;
