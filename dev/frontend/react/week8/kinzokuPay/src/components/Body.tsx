import type { ReactNode } from "react"

interface BodyProps {
  children: ReactNode
  size?: "sm" | "md" | "lg" | "xl"
  variant?: "default" | "muted" | "accent"
  className?: string
}

export function Body({ 
  children, 
  size = "md", 
  variant = "default", 
  className = "" 
}: BodyProps) {
  const variants = {
    default: "text-slate-300",
    muted: "text-slate-400",
    accent: "text-cyan-300"
  }

  const sizes = {
    sm: "text-sm leading-relaxed",
    md: "text-base leading-relaxed",
    lg: "text-lg leading-relaxed", 
    xl: "text-xl leading-relaxed"
  }
  
  const classes = [
    variants[variant],
    sizes[size],
    className
  ].filter(Boolean).join(" ")

  return <p className={classes}>{children}</p>
}