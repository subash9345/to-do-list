import React from 'react';
import TodoItem from './TodoItem';
import './TodoList.css';

/**
 * TodoList Component
 * Container for rendering list of todo items
 */
function TodoList({ todos, onToggle, onDelete, onEdit }) {
  if (todos.length === 0) {
    return (
      <div className="todo-list-empty" role="status">
        <p>No todos yet. Add one to get started! 🎯</p>
      </div>
    );
  }

  return (
    <ul className="todo-list" role="list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}

export default TodoList;
