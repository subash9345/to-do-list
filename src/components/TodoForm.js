import React, { useState } from 'react';
import './TodoForm.css';

/**
 * TodoForm Component
 * Input form for adding new todos
 */
function TodoForm({ onAdd }) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Input validation: prevent empty todos
    if (inputValue.trim()) {
      onAdd(inputValue.trim());
      setInputValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form" role="form">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="What needs to be done?"
        className="todo-input"
        aria-label="New todo input"
        maxLength={200}
      />
      <button
        type="submit"
        className="btn-add"
        aria-label="Add todo"
        disabled={!inputValue.trim()}
      >
        Add
      </button>
    </form>
  );
}

export default TodoForm;
