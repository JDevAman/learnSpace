import { useEffect, useState } from "react";

type DebouncedProps = {
  input: string;
  time: number;
};

// Min difference b/w two timers should be greater than certain value to be triggered.
export function useDebounce({ input, time }: DebouncedProps): String {
  const [debouncedValue, setDebouncedValue] = useState(input);
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(input), time);

    return () => {
      clearTimeout(timer);
    };
  }, [input, time]);

  return debouncedValue;
}
