# Week 7

## 🔁 State Management

---

### 1. Context API

- Useful for small-scale state management.
- Can cause prop drilling if used excessively.
- Similar setup to Redux with `Provider` and context creation.
- Instead of a store, we create a context object.

---

### 2. Flux (Conceptual)

- Introduced by Facebook.
- Enforces unidirectional (one-way) data flow.
- A pattern, not a library.
- Too abstract and verbose for common frontend use cases.

---

### 3. Redux

- A concrete implementation of Flux.
- Suitable for large-scale apps.

#### 🔑 Core Concepts:

- Single source of truth – all state stored in one object.
- Pure reducers – functions that take `(state, action)` and return a new state.

#### 🧩 Middleware Support:

- `redux-thunk`: For async logic (e.g., API calls).
- `redux-saga`: For complex async flows using generators.

#### 🔍 Dev Experience:

- Excellent DevTools support for debugging.
- 🔻 Drawback: Verbose boilerplate, especially in small/medium apps.

---

### 4. Redux Toolkit (RTK)

- Official, recommended way to write Redux.
- Developed by the Redux team to address boilerplate pain.
- Includes:

  - `configureStore()` – combines reducers, middleware, DevTools
  - `createSlice()` – creates reducer + action creators
  - `createAsyncThunk()` – handles async operations
  - Middleware like `redux-thunk` is preconfigured

---

## 🔧 Core Concepts



### 1. Store

```ts
import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./features/todo";

export const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
});
```

Why RTK store is better:

- DevTools enabled out of the box.
- Redux Thunk middleware included.
- Strict runtime checks in development.

---

### 2. Slices & Reducers

```ts
import { createSlice, nanoid } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todo",
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      state.push({ id: nanoid(), text: action.payload });
    },
    removeTodo: (state, action) => {
      return state.filter((todo) => todo.id !== action.payload);
    },
    updateTodo: (state, action) => {
      const { id, text } = action.payload;
      const existing = state.find((todo) => todo.id === id);
      if (existing) existing.text = text;
    },
  },
});

export const { addTodo, removeTodo, updateTodo } = todoSlice.actions;
export default todoSlice.reducer;
```

✅ `createSlice()` reduces boilerplate by generating actions and reducers together.

---

### 3. `useDispatch()`

- Use this hook to trigger actions in components.

```ts
const dispatch = useDispatch();
dispatch(addTodo("Learn Redux Toolkit"));
```

⚠️ Avoid this mistake:

```tsx
onClick={dispatch(removeTodo(todo.id))} // ❌ Dispatches immediately
```

✅ Correct usage:

```tsx
onClick={() => dispatch(removeTodo(todo.id))} // ✅ Reference function
```

---

### 4. `useSelector()`

- Allows components to read values from the store.

```ts
const todos = useSelector((state: RootState) => state.todos);
```

- React will auto re-render when selected slice changes.

---

## ⚙️ Setup Summary

```bash
npm install @reduxjs/toolkit react-redux
```

### Steps:

1. Configure Store

```ts
import { configureStore } from "@reduxjs/toolkit";
```

2. Create Slice

```ts
import { createSlice } from "@reduxjs/toolkit";
```

3. Provide Store Globally

```tsx
import { Provider } from "react-redux";
<Provider store={store}>
  <App />
</Provider>;
```

4. Use in Components

- `useDispatch()` → Dispatch actions
- `useSelector()` → Access global state
