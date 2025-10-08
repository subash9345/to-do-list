import React, { useState } from 'react';
import './TodoItem.css';

/**
 * TodoItem Component
 * Displays individual todo item with toggle, edit, and delete functionality
 */
function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleEdit = () => {
    if (editText.trim() && editText !== todo.text) {
      onEdit(todo.id, editText.trim());
      setIsEditing(false);
    } else if (!editText.trim()) {
      setEditText(todo.text);
      setIsEditing(false);
    } else {
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleEdit();
    } else if (e.key === 'Escape') {
      setEditText(todo.text);
      setIsEditing(false);
    }
  };

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-item-content">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          aria-label={`Mark "${todo.text}" as ${todo.completed ? 'incomplete' : 'complete'}`}
          className="todo-checkbox"
        />

        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleEdit}
            onKeyDown={handleKeyDown}
            className="todo-edit-input"
            autoFocus
            aria-label="Edit todo text"
          />
        ) : (
          <span
            className="todo-text"
            onDoubleClick={() => !todo.completed && setIsEditing(true)}
            title="Double-click to edit"
          >
            {todo.text}
          </span>
        )}
      </div>

      <div className="todo-actions">
        {!isEditing && !todo.completed && (
          <button
            onClick={() => setIsEditing(true)}
            className="btn-edit"
            aria-label={`Edit "${todo.text}"`}
          >
            ✏️
          </button>
        )}
        <button
          onClick={() => onDelete(todo.id)}
          className="btn-delete"
          aria-label={`Delete "${todo.text}"`}
        >
          🗑️
        </button>
      </div>
    </li>
  );
}

export default TodoItem;
