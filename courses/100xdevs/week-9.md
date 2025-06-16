# ✅ Week 9: Custom Hooks + TS

---

## 🔁 React Hooks – Overview

- Hooks are functions that let you “hook into” React state and lifecycle features from function components.
- React introduced hooks in v16.8 — before that, class components were needed for managing state or lifecycle methods.
- Hooks can only be used inside function components or other custom hooks.

---

## 🔁 Lifecycle Events in React

In class components, React provides lifecycle methods like:

- `componentDidMount()` → runs once after component is mounted
- `componentWillUnmount()` → runs before component is removed
- `render()` → runs during every render

In function components, we simulate these using hooks:

| Lifecycle Method     | Equivalent Hook                       |
| -------------------- | ------------------------------------- |
| componentDidMount    | `useEffect(() => {}, [])`             |
| componentWillUnmount | `useEffect(() => return cleanup, [])` |
| componentDidUpdate   | `useEffect(() => {}, [deps])`         |

---

## 🧱 What Are Custom Hooks?

- Custom hooks are user-defined functions that encapsulate reusable logic using other React hooks.
- They help clean up logic, avoid code duplication, and improve maintainability.

### ✅ Rules for Custom Hooks

1. The function must start with `use` (e.g., `usePosts`, `useTimer`).
2. It must use at least one React hook (`useState`, `useEffect`, etc.).

---

## 📦 Types of Custom Hooks

---

### 1. 🔄 Data Fetching Hook

```tsx
import { useEffect, useState } from "react";
import axios from "axios";

export function usePosts(n: number) {
  const [todos, setTodos] = useState<{ id: number; title: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchTodos = async () => {
      try {
        const res = await axios.get(
          "https://my-json-server.typicode.com/typicode/demo/posts"
        );
        if (isMounted) setTodos(res.data);
      } catch (err) {
        console.error("Failed to fetch todos", err);
        if (isMounted)
          setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchTodos(); // initial fetch
    const intervalId = setInterval(fetchTodos, n * 1000); // fetch every `n` seconds

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, [n]);

  return { todos, isLoading, error };
}
```

💡 Can use `useSWR` or `@tanstack/react-query` for advanced data fetching.

---

### 2. ⏱️ Timer / Performance Hook

#### useStableInterval

```tsx
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
```

---

#### useDebounce

```tsx
import { useEffect, useState } from "react";

type DebouncedProps = {
  input: string;
  time: number;
};

// Min difference b/w two timers should be greater than certain value to be triggered.
export function useDebounce({ input, time }: DebouncedProps): string {
  const [debouncedValue, setDebouncedValue] = useState(input);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(input), time);
    return () => clearTimeout(timer);
  }, [input, time]);

  return debouncedValue;
}
```

🧠 Examples: `useDebounce`, `useThrottle`, `useTimeout`

---

### 3. 🌐 Browser Functionality Hooks

---

#### useIsOnline

```tsx
import { useEffect, useState } from "react";

export function useIsOnline() {
  const [isOnline, setIsOnline] = useState(window.navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // ✅ Cleanup to remove listeners on unmount
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return isOnline;
}
```

---

#### useMousePointer

```tsx
import { useEffect, useState } from "react";

export function useMousePointer() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent) => {
    setPos({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return pos;
}
```

✅ Examples:

- `useWindowSize` – Tracks window resizing
- `useOnlineStatus` – Detects online/offline state
- `useLocalStorage` – Syncs state with local storage

---

## 🧩 TypeScript Tip

When using `useState`, always provide a type when initializing with arrays or objects:

```tsx
const [todos, setTodos] = useState<{ id: number; title: string }[]>([]);
```

Or use a type alias for clarity:

```ts
type Todo = { id: number; title: string };
const [todos, setTodos] = useState<Todo[]>([]);
```

