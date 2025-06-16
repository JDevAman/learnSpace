import React from "react";
import { AddTodo } from "./addTodo";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../app/store"; // Type for state
import {
  addTodo as addTodoAction,
  removeTodo as removeTodoAction,
} from "../features/todo";

const Todo: React.FC = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todos);

  const handleAddTodo = (todo: string) => {
    dispatch(addTodoAction(todo));
  };

  const handleRemoveTodo = (id: string) => {
    dispatch(removeTodoAction(id));
  };

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "40px auto",
        padding: 24,
        background: "gray",
        borderRadius: 8,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: 20, color: "black" }}>
        Todo List
      </h2>
      <AddTodo onAdd={handleAddTodo} />
      <ul style={{ listStyle: "none", padding: 0 }}>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "8px 0",
              borderBottom: "1px solid #eee",
              color: "black",
            }}
          >
            <span>{todo.text}</span>
            <button
              onClick={() => handleRemoveTodo(todo.id)}
              style={{
                background: "transparent",
                border: "none",
                color: "#dc3545",
                cursor: "pointer",
                fontSize: 16,
              }}
              aria-label="Delete todo"
            >
              &times;
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
