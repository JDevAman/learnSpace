import { useState } from "react";

export function useSidebarWidth() {
  const [collapsed, setCollapsed] = useState(false);

  return {
    collapsed,
    setCollapsed,
    sidebarWidth: collapsed ? "4rem" : "16rem",
  };
}
