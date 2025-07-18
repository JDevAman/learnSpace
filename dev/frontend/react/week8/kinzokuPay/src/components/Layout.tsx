import type { ReactNode } from "react";

interface TronLayoutProps {
  children: ReactNode;
}

export function Layout({ children }: TronLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-900 relative overflow-hidden">
      {/* Grid pattern using CSS Grid */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(34, 197, 94, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 197, 94, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px",
        }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-slate-900/80" />

      {/* Content */}
      <div className="relative z-10">{children}</div>

      {/* Ambient glow effects */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-400/5 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>
    </div>
  );
}
