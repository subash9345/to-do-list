import { useEffect } from 'react';

/**
 * Custom hook for keyboard shortcuts
 * @param {string[]} keys - Array of keys (e.g., ['ctrl', 'k'])
 * @param {Function} callback - Function to call when shortcut is pressed
 * @param {Object} options - Additional options
 */
function useKeyboardShortcut(keys, callback, options = {}) {
  const { enabled = true, preventDefault = true } = options;

  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event) => {
      // Normalize keys to lowercase
      const pressedKeys = [];

      if (event.ctrlKey || event.metaKey) pressedKeys.push('ctrl');
      if (event.shiftKey) pressedKeys.push('shift');
      if (event.altKey) pressedKeys.push('alt');

      const key = event.key.toLowerCase();
      if (!['control', 'shift', 'alt', 'meta'].includes(key)) {
        pressedKeys.push(key);
      }

      // Check if pressed keys match target keys
      const normalizedTargetKeys = keys.map(k => k.toLowerCase());
      const matches = normalizedTargetKeys.every(k => pressedKeys.includes(k)) &&
                      normalizedTargetKeys.length === pressedKeys.length;

      if (matches) {
        if (preventDefault) {
          event.preventDefault();
        }
        callback(event);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [keys, callback, enabled, preventDefault]);
}

export default useKeyboardShortcut;
