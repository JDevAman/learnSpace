import { useEffect, useRef } from "react";

// Use your original version only if fn is stable (e.g. useCallback).
export function useStableInterval(fn: () => void, n: number) {
  const savedFn = useRef(fn);

  useEffect(() => {
    savedFn.current = fn; // always keep latest fn
  }, [fn]);

  useEffect(() => {
    const id = setInterval(() => savedFn.current(), n * 1000);
    return () => clearInterval(id);
  }, [n]);
}
