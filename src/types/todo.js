/**
 * Todo type definitions
 * Enhanced data structure for premium todo application
 */

/**
 * @typedef {Object} Subtask
 * @property {string} id - Unique identifier
 * @property {string} text - Subtask text
 * @property {boolean} completed - Completion status
 */

/**
 * @typedef {Object} Attachment
 * @property {string} id - Unique identifier
 * @property {string} name - File name
 * @property {string} type - File type/extension
 * @property {number} size - File size in bytes
 */

/**
 * @typedef {Object} Comment
 * @property {string} id - Unique identifier
 * @property {string} text - Comment text
 * @property {string} createdAt - ISO timestamp
 */

/**
 * @typedef {'low' | 'medium' | 'high'} Priority
 */

/**
 * @typedef {Object} Todo
 * @property {string} id - Unique identifier (UUID)
 * @property {string} text - Todo title
 * @property {string} description - Detailed description (supports markdown)
 * @property {boolean} completed - Completion status
 * @property {string} createdAt - Creation timestamp (ISO)
 * @property {string} updatedAt - Last update timestamp (ISO)
 * @property {string|null} dueDate - Due date timestamp (ISO) or null
 * @property {Priority} priority - Priority level
 * @property {string} category - Category name
 * @property {string[]} tags - Array of tag strings
 * @property {Subtask[]} subtasks - Array of subtasks
 * @property {Attachment[]} attachments - Array of attachments (simulated)
 * @property {Comment[]} comments - Array of comments
 * @property {number} order - Order position for drag-and-drop
 */

/**
 * Priority level constants
 */
export const PRIORITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
};

/**
 * Default categories
 */
export const DEFAULT_CATEGORIES = [
  { name: 'Personal', color: '#3b82f6' },
  { name: 'Work', color: '#8b5cf6' },
  { name: 'Shopping', color: '#10b981' },
  { name: 'Health', color: '#f59e0b' },
  { name: 'Learning', color: '#06b6d4' },
  { name: 'Projects', color: '#ec4899' },
];

/**
 * Filter types
 */
export const FILTER_TYPES = {
  ALL: 'all',
  ACTIVE: 'active',
  COMPLETED: 'completed',
  TODAY: 'today',
  WEEK: 'week',
  OVERDUE: 'overdue',
};

/**
 * Sort types
 */
export const SORT_TYPES = {
  DATE_CREATED: 'dateCreated',
  DATE_UPDATED: 'dateUpdated',
  DUE_DATE: 'dueDate',
  PRIORITY: 'priority',
  ALPHABETICAL: 'alphabetical',
};
