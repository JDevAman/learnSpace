import React, { type ButtonHTMLAttributes, forwardRef } from "react"
import { cn } from "../../utils/utils" // adjust path as needed

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "glow" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none"

    const variantStyles =
      variant === "default"
        ? "bg-slate-800 text-white hover:bg-slate-700 border border-slate-700"
        : variant === "glow"
        ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/20 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/25"
        : variant === "outline"
        ? "border border-slate-600 text-slate-300 hover:border-slate-500 hover:text-white"
        : "text-slate-400 hover:text-white hover:bg-slate-800" // ghost

    const sizeStyles =
      size === "sm"
        ? "px-3 py-1.5 text-sm"
        : size === "lg"
        ? "px-6 py-3 text-base"
        : "px-4 py-2 text-sm" // default md

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variantStyles, sizeStyles, className)}
        {...props}
      />
    )
  }
)

Button.displayName = "Button"

export { Button }
