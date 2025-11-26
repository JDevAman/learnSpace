# 📌 Redux Toolkit

## 🚀 Why Redux Toolkit?
- Official, recommended way to use Redux  
- Reduces boilerplate  
- Built-in best practices and tools  

---

## ⚡ Core APIs
### `configureStore`
- Simplifies store creation  
- Auto-setup for DevTools + Thunk middleware  

### `createSlice`
- Combines **state + reducers + actions** in one place  
- Uses **Immer** (mutating syntax → immutable updates)  

### `createAsyncThunk`
- Handles async logic (API calls)  
- Generates `pending`, `fulfilled`, `rejected` action types  

### `createEntityAdapter`
- Manages normalized collections  
- CRUD helpers (`addOne`, `removeOne`, `updateOne`, etc.)  

---

## 📝 Example
```ts
import { configureStore, createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (s) => { s.value += 1 },
    decrement: (s) => { s.value -= 1 },
    addBy: (s, a) => { s.value += a.payload },
  }
});

export const { increment, decrement, addBy } = counterSlice.actions;

export const store = configureStore({
  reducer: { counter: counterSlice.reducer }
});
````

---

## 🎯 Usage in React

```tsx
import { useSelector, useDispatch } from 'react-redux';
import { increment } from './store';

function Counter() {
  const value = useSelector((s: any) => s.counter.value);
  const dispatch = useDispatch();
  return <button onClick={() => dispatch(increment())}>{value}</button>;
}
```

---

## ⚡ RTK Query (Data Fetching)

* Built-in tool in Redux Toolkit for **API requests + caching**
* Reduces boilerplate for fetching/loading/error states

### Example

```ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getUsers: builder.query({ query: () => 'users' }),
  }),
});

export const { useGetUsersQuery } = api;
```

### Usage in Component

```tsx
function Users() {
  const { data, error, isLoading } = useGetUsersQuery();
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  return <ul>{data.map(u => <li key={u.id}>{u.name}</li>)}</ul>;
}
```

---

## ✅ When to Use

* Global state (auth, theme, payments)
* Async workflows (loading/error states)
* Normalized data (users, transactions, messages)
* API requests with caching & auto re-fetch

---

## 🔗 Resources

* [Redux Toolkit Docs](https://redux-toolkit.js.org/)
* [RTK Query Docs](https://redux-toolkit.js.org/rtk-query/overview)

```
