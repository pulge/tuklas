import React from "react";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
  label?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ error, label, className = "", id, ...props }, ref) => {
    const textareaId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-2 w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="text-[10px] font-black uppercase tracking-[0.2em] text-admin-heading opacity-70"
          >
            {label}
          </label>
        )}
        <textarea
          id={textareaId}
          ref={ref}
          className={`w-full bg-admin-surface border-2 border-admin-border-strong px-4 py-3 text-sm font-bold rounded-none focus:border-admin-accent focus:ring-4 focus:ring-admin-accent/10 outline-none transition-all resize-y placeholder:opacity-30 custom-scrollbar ${
            error ? "border-admin-danger" : ""
          } ${className}`}
          {...props}
        />
        {error && (
          <span className="text-[10px] font-black uppercase tracking-widest text-admin-danger italic">
            {error}
          </span>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
