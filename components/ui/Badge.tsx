import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: "success" | "danger" | "accent" | "muted" | "outline";
}

const variantStyles = {
  success: "text-admin-success bg-admin-success/10",
  danger:  "text-admin-danger bg-admin-danger/10",
  accent:  "text-admin-accent bg-admin-accent/10",
  muted:   "text-admin-text bg-admin-surface-hover",
  outline: "text-admin-muted border border-admin-surface-hover bg-transparent"
};

export function Badge({
  children,
  className = "",
  variant = "muted"
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-none text-[11px] font-black uppercase tracking-[0.18em] ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
