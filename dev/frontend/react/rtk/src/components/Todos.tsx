import React, { useState } from "react";
import { AddTodo } from "./addTodo";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../app/store";
import {
  addTodo as addTodoAction,
  removeTodo as removeTodoAction,
  updateTodo as updateTodoAction,
} from "../features/todo";

const Todo: React.FC = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todos);

  const [editMode, setEditMode] = useState(false);
  const [currentEdit, setCurrentEdit] = useState<{
    id: string;
    text: string;
  } | null>(null);

  const handleAddTodo = (todo: string) => {
    dispatch(addTodoAction(todo));
  };

  const handleUpdateTodo = (id: string, newText: string) => {
    dispatch(updateTodoAction({ id, text: newText }));
    setEditMode(false);
    setCurrentEdit(null);
  };

  const handleRemoveTodo = (id: string) => {
    dispatch(removeTodoAction(id));
  };

  const handleEdit = (todo: { id: string; text: string }) => {
    setEditMode(true);
    setCurrentEdit(todo);
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
      <AddTodo
        onAdd={handleAddTodo}
        onUpdate={handleUpdateTodo}
        editMode={editMode}
        currentEdit={currentEdit}
      />
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
              onClick={() => handleEdit(todo)}
              style={{
                background: "transparent",
                border: "none",
                color: "blue",
                cursor: "pointer",
                fontSize: 16,
              }}
              aria-label="Edit todo"
            >
              Edit
            </button>
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
