# 🔁 Redux Toolkit (RTK)

## 🕰️ History

### 1. Flux

- Introduced by Facebook.
- Enforces one-way data flow.
- Structured way to manage data movement in large apps.
- Too abstract and verbose for many use cases.

### 2. Redux

- A practical and scalable implementation of Flux.
- Core Concepts:

  - Single source of truth: Global state stored in a single JS object.
  - Pure reducers: Functions that compute the next state from current state and action.

- Middleware like:

  - Redux Thunk (for async functions)
  - Redux Saga (for complex async side-effects)

- Powerful DevTools support.
- 🔻 Drawbacks: Too much boilerplate and complex setup for small-to-medium apps.

### 3. Redux Toolkit (RTK)

- The official, recommended way to write Redux code.
- Created by the Redux team to simplify Redux development.
- Reduces boilerplate and encourages best practices.
- Built-in support for:

  - `configureStore()` – store setup
  - `createSlice()` – reducer + actions in one place
  - Middleware (Thunk included by default)
  - DevTools

## 🔧 Core Concepts

### 1. Store

- Centralized state container.
- Created with `configureStore()` from `@reduxjs/toolkit`.
- Benefits:

  - DevTools enabled
  - Thunk middleware preconfigured
  - Strict mode enabled in development

```ts
import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./features/todo";

export const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
});
```

### 2. Reducers (Slices)

- Created using `createSlice()`:

  - Accepts `name`, `initialState`, and `reducers`.
  - Automatically generates action creators and reducer function.

```ts
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
  },
});
```

## 🔄 Redux Flow in Component

### 3. `useDispatch()`

- Hook to dispatch actions from your components.
- Example:

```ts
const dispatch = useDispatch();
dispatch(addTodo("Learn Redux Toolkit"));
```

#### 🔸 When passing in event handlers:

- `onClick={dispatch(removeTodo(todo.id))}` ❌ wrong – dispatch runs immediately
- `onClick={() => dispatch(removeTodo(todo.id))}` ✅ correct – reference function

### 4. `useSelector()`

- Hook to select state from the Redux store.

```ts
const todos = useSelector((state: RootState) => state.todos);
```

- You get live access to your Redux state – React will re-render on changes.

## 🏗️ Project Setup Summary

1. Install:

   ```
   npm install @reduxjs/toolkit react-redux
   ```

2. Create store:

   - Use `configureStore`
   - Provide reducers

3. Create slices (via `createSlice`):

   - Define `initialState`, `reducers`, and actions
   - Export reducer & action creators

4. Wrap `<App />` with `<Provider>`:

   ```tsx
   <Provider store={store}>
     <App />
   </Provider>
   ```

5. Use in components:

   - `useDispatch()` to trigger actions
   - `useSelector()` to read state
