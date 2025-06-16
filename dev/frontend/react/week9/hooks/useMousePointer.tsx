import { useEffect, useState } from "react";

export function useMousePointer() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent) => {
    // console.log(pos);
    setPos({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    window.addEventListener("mousemove", (e) => handleMouseMove(e));
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return pos;
}
