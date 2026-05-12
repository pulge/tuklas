import React from "react";
import { ArrowDownAZ, ArrowDownZA } from "lucide-react";

interface SortButtonProps {
  direction: "asc" | "desc";
  onToggle: () => void;
  className?: string;
  label?: string;
}

export function SortButton({ direction, onToggle, className = "", label = "Sort" }: SortButtonProps) {
  return (
    <button
      onClick={onToggle}
      className={`inline-flex items-center justify-center gap-2 px-3 h-9 border-2 border-admin-border-strong bg-admin-surface text-[10px] font-black uppercase tracking-widest hover:bg-admin-surface-hover active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-admin-accent/40 ${className}`}
      title={direction === "desc" ? "Newest First" : "Oldest First"}
    >
      {direction === "desc" ? (
        <ArrowDownZA size={16} className="text-admin-heading" />
      ) : (
        <ArrowDownAZ size={16} className="text-admin-heading" />
      )}
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}
