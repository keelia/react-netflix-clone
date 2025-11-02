import { useCallback, useRef } from 'react';

const DEBOUNCE_MS = 500;
const useDebounce = <T extends any[]>(
  fn: (...a: T) => void,
  delay: number = DEBOUNCE_MS
) => {
  const timeoutRef = useRef<number | null>(null);
  const debouncedFunc = useCallback(
    (...args: T) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        fn(...args);
      }, delay);
    },
    [delay, fn]
  );

  return debouncedFunc;
};

export default useDebounce;
