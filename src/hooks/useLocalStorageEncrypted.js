import { useState, useEffect } from 'react';
import { encrypt, decrypt } from '../utils/encryption';

/**
 * Custom hook for encrypted localStorage with React state synchronization
 * @param {string} key - localStorage key
 * @param {*} initialValue - Initial value if key doesn't exist
 * @param {boolean} useEncryption - Whether to use encryption (default: false)
 * @returns {[*, Function]} State value and setter function
 */
function useLocalStorageEncrypted(key, initialValue, useEncryption = false) {
  // Initialize state with value from localStorage or initial value
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        const parsed = useEncryption ? decrypt(item) : item;
        return JSON.parse(parsed);
      }
      return initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Update localStorage when state changes
  const setValue = (value) => {
    try {
      // Allow value to be a function for same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;

      // Save state
      setStoredValue(valueToStore);

      // Save to localStorage
      const stringified = JSON.stringify(valueToStore);
      const toStore = useEncryption ? encrypt(stringified) : stringified;
      window.localStorage.setItem(key, toStore);

      // Dispatch custom event for cross-tab synchronization
      window.dispatchEvent(new StorageEvent('storage', {
        key,
        newValue: toStore,
      }));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  // Listen for changes in other tabs/windows
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === key && e.newValue !== null) {
        try {
          const parsed = useEncryption ? decrypt(e.newValue) : e.newValue;
          setStoredValue(JSON.parse(parsed));
        } catch (error) {
          console.error(`Error parsing localStorage change for key "${key}":`, error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key, useEncryption]);

  return [storedValue, setValue];
}

export default useLocalStorageEncrypted;
