import { useEffect, useState } from "react";
import "./App.css";
import { usePosts } from "../hooks/useTodo";
import { useMousePointer } from "../hooks/useMousePointer";
import { useIsOnline } from "../hooks/useIsOnline";
import { useDebounce } from "../hooks/useDebounce";

function App() {
  const [count, setCount] = useState(0);
  const [input, setInput] = useState("");
  const [show, setShow] = useState(true);
  const { todos, isLoading, error } = usePosts(3);

  const pos = useMousePointer();
  const status = useIsOnline();
  const debouncedValue = useDebounce({ input, time: 500 });

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
          <input
            type="text"
            placeholder="Type here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <div>Live Input: {input}</div>
          <div>Debounced Input (0.5s delay): {debouncedValue}</div>

          <div>
            Your mouse position is {pos.x} - x & {pos.y} - y
          </div>
          <div>Your Status is {status ? "Online" : "Offline"}</div>
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
