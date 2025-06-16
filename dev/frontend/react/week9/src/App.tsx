import { useEffect, useState } from "react";
import "./App.css";
import { usePosts } from "../hooks/useTodo";

function App() {
  const [count, setCount] = useState(0);
  const [show, setShow] = useState(true);
  const { todos, isLoading, error } = usePosts(3);
  useEffect(() => {
    console.log("component mounted");
    // Clean up [Cancel Subscription, Event listeners]
    // Called when [unmount / dependency changes]
    return () => {
      setTimeout(() => {
        console.log("component unmounted");
        // setShow(false);
      }, 5000);
    };
  }, []);

  return (
    <>
      {!isLoading ? (
        <div>
          <h1>Week 9</h1>
          <button
            onClick={() => {
              setCount(count + 1);
            }}
          >
            Count-{count}
          </button>
          {todos &&
            Array.isArray(todos) &&
            todos.map((todo: any, idx: number) => (
              <div key={idx}>{JSON.stringify(todo)}</div>
            ))}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}

export default App;
