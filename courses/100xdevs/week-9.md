Your Week 9 notes on Custom Hooks are structured well, but a few things can be improved for clarity, accuracy, and consistency, especially for beginner or intermediate understanding. Here's a reviewed and corrected version:

---

# ✅ Week 9: Custom Hooks in React

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

### ✅ Rules for Custom Hooks:

1. The function must start with `use` (e.g., `usePosts`, `useTimer`).
2. It must use at least one React hook (`useState`, `useEffect`, etc.).

---

## 📦 Types of Custom Hooks

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

- Can use "useSWR" or "tanstack-reactquery"

---

### 2. ⏱️ Timer / Performance Hook (e.g., useTimer, useDebounce)

Example: `useDebounce`, `useThrottle`, `useTimeout`

---

### 3. 🌐 Browser Functionality Hooks

- useOnline Hook:
- window.navigator.onLine returns true or false
``` tsx
```

Examples:

- `useWindowSize` – Tracks window resizing
- `useOnlineStatus` – Detects online/offline state
- `useLocalStorage` – Syncs state with local storage

---

## 🧩 TypeScript Tip

When using `useState`, always provide a type when initializing with arrays or objects:

```tsx
const [todos, setTodos] = useState<{ id: number; title: string }[]>([]);
```

You can also define types separately:

```ts
type Todo = { id: number; title: string };
const [todos, setTodos] = useState<Todo[]>([]);
```
