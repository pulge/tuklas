import React from "react";

export interface TabOption<T> {
  value: T;
  label: string;
}

interface TabsProps<T> {
  options: TabOption<T>[];
  activeValue: T;
  onChange: (value: T) => void;
  className?: string;
  variant?: "default" | "compact";
}

export function Tabs<T extends string>({
  options,
  activeValue,
  onChange,
  className = "",
  variant = "default",
}: TabsProps<T>) {
  return (
    <div className={`flex flex-wrap gap-2 pb-6${className}`}>
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`font-black uppercase tracking-widest border-2 transition-all duration-150 rounded-none ${variant === "compact" ? "px-2 py-1 text-[9px]" : "px-3 py-1.5 text-[10px]"
            } ${activeValue === option.value
              ? "bg-admin-accent border-admin-accent text-admin-contrast shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)]"
              : "bg-admin-surface border-admin-border-strong text-admin-text hover:border-admin-accent/50"
            }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
