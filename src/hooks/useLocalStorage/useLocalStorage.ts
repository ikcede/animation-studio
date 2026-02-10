import { useState, useCallback } from 'react';

const STORAGE_PREFIX = 'animation-studio:';

/**
 * Checks if localStorage is available (client-side only)
 */
const isLocalStorageAvailable = (): boolean => {
  if (typeof window === 'undefined') {
    return false;
  }
  return (
    window.localStorage !== undefined &&
    window.localStorage.setItem !== undefined
  );
};

/**
 * Gets the prefixed key for localStorage
 */
const getPrefixedKey = (key: string): string => {
  return `${STORAGE_PREFIX}${key}`;
};

/**
 * SSR-safe React hook for accessing localStorage
 *
 * @param key - The localStorage key (will be prefixed automatically)
 * @param initialValue - The initial value if the key doesn't exist
 * @returns A tuple containing the current value and a setter function
 *
 * @example
 * ```tsx
 * const [value, setValue] = useLocalStorage('myKey', 'defaultValue');
 * ```
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (!isLocalStorageAvailable()) {
      return initialValue;
    }

    const prefixedKey = getPrefixedKey(key);
    const item = localStorage.getItem(prefixedKey);
    return item ? (JSON.parse(item) as T) : initialValue;
  });

  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        // Allow value to be a function so we have the same API as useState
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;

        // Save state
        setStoredValue(valueToStore);

        // Save to localStorage
        if (isLocalStorageAvailable()) {
          const prefixedKey = getPrefixedKey(key);
          localStorage.setItem(prefixedKey, JSON.stringify(valueToStore));
        }
      } catch (error) {
        console.warn(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, storedValue]
  );

  return [storedValue, setValue];
}

/**
 * Export the storage prefix constant for external use if needed
 */
export const STORAGE_PREFIX_CONSTANT = STORAGE_PREFIX;
