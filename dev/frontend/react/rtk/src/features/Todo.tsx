import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  todos: [{ id: nanoid(), text: "Hello world" }],
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  // reducers - property and function
  // reducers - always have state and action
  reducers: {
    addTodo: (state, action) => {
      state.todos.push({
        id: nanoid(),
        text: action.payload,
      });
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    updateTodo: (state, action) => {
      state.todos.forEach((item) => {
        if (item.id === action.payload.id) {
          item.text = action.payload.text;
        }
      });
    },
  },
});

export const { addTodo, removeTodo, updateTodo } = todoSlice.actions;
// needs to export all slices -> reducer to store.
export default todoSlice.reducer;
