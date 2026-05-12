import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ error, label, className = "", id, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    const isPassword = type === "password";
    const currentType = isPassword ? (showPassword ? "text" : "password") : type;

    return (
      <div className="flex flex-col gap-2 w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="text-[10px] font-black uppercase tracking-[0.2em] text-admin-heading opacity-70"
          >
            {label}
          </label>
        )}
        <div className="relative group">
          <input
            id={inputId}
            ref={ref}
            type={currentType}
            className={`w-full bg-admin-surface border-2 border-admin-border-strong px-4 py-3 text-sm font-bold rounded-none focus:border-admin-accent focus:ring-4 focus:ring-admin-accent/10 outline-none transition-all ${
              error ? "border-admin-danger" : ""
            } ${isPassword ? "pr-12" : ""} ${className}`}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-admin-muted hover:text-admin-accent transition-colors focus:outline-none"
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOff size={18} strokeWidth={2.5} />
              ) : (
                <Eye size={18} strokeWidth={2.5} />
              )}
            </button>
          )}
        </div>
        {error && (
          <span className="text-[10px] font-black uppercase tracking-widest text-admin-danger italic">
            {error}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
