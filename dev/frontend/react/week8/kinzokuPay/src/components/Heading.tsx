import type { ReactNode } from "react"

interface HeadingProps {
  children: ReactNode
  level?: 1 | 2 | 3 | 4 | 5 | 6
  variant?: "primary" | "secondary" | "accent"
  className?: string
  glowing?: boolean
}

export function Heading({ 
  children, 
  level = 1, 
  variant = "primary", 
  className = "", 
  glowing = false 
}: HeadingProps) {
  const variants = {
    primary: "text-cyan-400",
    secondary: "text-blue-400", 
    accent: "text-emerald-400"
  }

  const sizes = {
    1: "text-4xl md:text-5xl lg:text-6xl",
    2: "text-3xl md:text-4xl lg:text-5xl",
    3: "text-2xl md:text-3xl lg:text-4xl",
    4: "text-xl md:text-2xl lg:text-3xl",
    5: "text-lg md:text-xl lg:text-2xl",
    6: "text-base md:text-lg lg:text-xl"
  }

  const glowEffect = glowing ? "animate-pulse drop-shadow-lg" : ""
  
  const classes = [
    "font-bold tracking-wide uppercase",
    variants[variant],
    sizes[level],
    glowEffect,
    className
  ].filter(Boolean).join(" ")

  const Tag = `h${level}` as keyof JSX.IntrinsicElements

  return <Tag className={classes}>{children}</Tag>
}