import { type InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", label, error, ...props }, ref) => {
    const errorClasses = error
      ? "border-orange-400 focus:border-orange-400 focus:ring-orange-400/20"
      : "border-gray-600 focus:border-cyan-400 focus:ring-cyan-400/20";

    const classes = [
      "w-full px-4 py-3 bg-slate-800/50 border rounded-lg",
      "text-white placeholder-gray-400",
      "focus:outline-none focus:ring-2 focus:ring-offset-0",
      "transition-all duration-300",
      errorClasses,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-sm font-medium text-cyan-400 uppercase tracking-wider">
            {label}
          </label>
        )}
        <input className={classes} ref={ref} {...props} />
        {error && (
          <p className="text-sm text-orange-400 flex items-center gap-1">
            <span>⚠</span>
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
