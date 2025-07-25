import type { ReactNode } from "react";

interface TronCardProps {
  children: ReactNode;
  className?: string;
  glowing?: boolean;
  variant?: "default" | "accent" | "danger";
}

export function Card({
  children,
  className = "",
  glowing = false,
  variant = "default",
}: TronCardProps) {
  const variants = {
    default: "border-cyan-400/30 bg-slate-800/50 shadow-cyan-400/20",
    accent: "border-blue-400/30 bg-slate-800/50 shadow-blue-400/20",
    danger: "border-orange-400/30 bg-slate-800/50 shadow-orange-400/20",
  };

  const glowEffect = glowing ? "animate-pulse shadow-lg" : "";

  const classes = [
    "border backdrop-blur-sm rounded-lg transition-all duration-300",
    variants[variant],
    glowEffect,
    "hover:border-opacity-60 hover:shadow-lg hover:scale-105",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <div className={classes}>{children}</div>;
}
