import { useEffect, useState } from "react";
import axios from "axios";

export function usePosts(n: number) {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchTodos = async () => {
      try {
        const res = await axios.get(
          "https://my-json-server.typicode.com/typicode/demo/posts"
        );
        if (isMounted) setTodos(res.data);
      } catch (err) {
        console.error("Failed to fetch todos", err);
        if (isMounted)
          setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchTodos();
    const intervalId = setInterval(fetchTodos, n * 1000);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, [n]);

  return { todos, isLoading, error };
}
