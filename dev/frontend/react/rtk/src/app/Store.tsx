import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../features/todo";

export const store = configureStore({
  reducer: todoReducer,
});

export type RootState = ReturnType<typeof store.getState>;
