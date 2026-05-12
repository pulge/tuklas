import React from "react";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: string;
  label?: string;
  options: { label: string; value: string }[];
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ error, label, options, className = "", id, ...props }, ref) => {
    const selectId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-2 w-full">
        {label && (
          <label
            htmlFor={selectId}
            className="text-[10px] font-black uppercase tracking-[0.2em] text-admin-heading opacity-70"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <select
            id={selectId}
            ref={ref}
            className={`w-full bg-admin-surface border-2 border-admin-border-strong px-4 h-12 text-sm font-bold rounded-none focus:border-admin-accent focus:ring-4 focus:ring-admin-accent/10 outline-none transition-all cursor-pointer appearance-none ${
              error ? "border-admin-danger" : ""
            } ${className}`}
            {...props}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">
            <svg
              width="10"
              height="6"
              viewBox="0 0 10 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 1L5 5L9 1"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="square"
              />
            </svg>
          </div>
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

Select.displayName = "Select";
