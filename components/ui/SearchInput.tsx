import React from "react";
import { Search, X } from "lucide-react";

interface SearchInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value: string;
  onChange: (value: string) => void;
  containerClassName?: string;
}

export function SearchInput({ value, onChange, className = "", containerClassName = "", placeholder = "Search...", ...props }: SearchInputProps) {
  return (
    <div className={`relative group ${containerClassName}`}>
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-admin-muted pointer-events-none">
        <Search size={16} strokeWidth={3} />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full bg-admin-surface border-2 border-admin-border-strong pl-10 pr-10 py-2.5 text-sm font-bold rounded-none focus:border-admin-accent focus:ring-4 focus:ring-admin-accent/10 outline-none transition-all placeholder:text-admin-muted/50 ${className}`}
        {...props}
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-admin-muted hover:text-admin-heading transition-colors focus:outline-none"
          title="Clear search"
        >
          <X size={16} strokeWidth={3} />
        </button>
      )}
    </div>
  );
}
