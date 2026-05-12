import React, { forwardRef } from "react";
import { Spinner } from "./Spinner";

type ButtonVariant = "default" | "ghost" | "danger" | "outline";
type ButtonSize = "sm" | "md" | "lg" | "xl";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  children: React.ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  default:
    "bg-admin-accent text-admin-contrast hover:bg-admin-accent/90 border-transparent shadow-none",
  ghost:
    "bg-transparent text-admin-text hover:bg-admin-surface-hover hover:text-admin-heading border-transparent shadow-none",
  danger:
    "bg-admin-danger text-admin-contrast hover:bg-admin-danger/90 border-transparent shadow-none",
  outline:
    "bg-transparent hover:bg-admin-surface-hover shadow-none",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-[10px] font-black uppercase tracking-widest",
  md: "px-6 py-3 text-xs font-black uppercase tracking-widest",
  lg: "px-8 py-4 text-sm font-black uppercase tracking-widest",
  xl: "px-10 py-5 text-base font-black uppercase tracking-widest",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "default", size = "md", className = "", isLoading = false, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`inline-flex items-center justify-center gap-2 transition-all duration-150 border rounded-none disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
        disabled={props.disabled || isLoading}
        {...props}
      >
        {isLoading ? <Spinner size="sm" /> : children}
      </button>
    );
  }
);
Button.displayName = "Button";
