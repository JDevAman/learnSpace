import type { ButtonHTMLAttributes, ReactNode } from "react";

interface TronButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  glowing?: boolean;
}

export function Button({
  children,
  className = "",
  variant = "primary",
  size = "md",
  glowing = false,
  disabled,
  ...props
}: TronButtonProps) {
  const variants = {
    primary:
      "bg-cyan-500/10 border-cyan-400 text-cyan-400 hover:bg-cyan-500/20 hover:shadow-cyan-400/20",
    secondary:
      "bg-blue-500/10 border-blue-400 text-blue-400 hover:bg-blue-500/20 hover:shadow-blue-400/20",
    danger:
      "bg-orange-500/10 border-orange-400 text-orange-400 hover:bg-orange-500/20 hover:shadow-orange-400/20",
    ghost:
      "border-gray-600 text-gray-300 hover:border-cyan-400 hover:text-cyan-400 hover:shadow-cyan-400/20",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const glowEffect = glowing ? "animate-pulse" : "";

  const classes = [
    "border rounded-lg font-medium transition-all duration-300 uppercase tracking-wider",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    "hover:shadow-lg hover:scale-105",
    variants[variant],
    sizes[size],
    glowEffect,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={classes} disabled={disabled} {...props}>
      {children}
    </button>
  );
}
