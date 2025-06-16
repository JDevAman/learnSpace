import React, { useEffect, useState } from "react";

interface AddTodoProps {
  onAdd: (todo: string) => void;
  onUpdate: (id: string, text: string) => void;
  editMode: boolean;
  currentEdit?: { id: string; text: string } | null;
}

export const AddTodo: React.FC<AddTodoProps> = ({
  onAdd,
  onUpdate,
  editMode,
  currentEdit,
}) => {
  const [todo, setTodo] = useState("");

  useEffect(() => {
    if (editMode && currentEdit) {
      setTodo(currentEdit.text);
    }
  }, [editMode, currentEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editMode && currentEdit) {
      onUpdate(currentEdit.id, todo);
    } else {
      onAdd(todo);
    }
    setTodo("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", gap: 8, marginBottom: 16 }}
    >
      <input
        type="text"
        placeholder="Enter todo"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        required
        style={{
          flex: 1,
          padding: "8px",
          borderRadius: 4,
          border: "1px solid #ccc",
        }}
      />
      <button
        type="submit"
        style={{
          padding: "8px 16px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: 4,
          cursor: "pointer",
        }}
      >
        {editMode ? "Set" : "Add"}
      </button>
    </form>
  );
};
