"use client";

import React, { useEffect, useCallback } from "react";
import { X } from "lucide-react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  maxWidth?: "md" | "lg";
}

export function Modal({
  open,
  onClose,
  children,
  maxWidth = "md",
}: ModalProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (open) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, handleKeyDown]);

  if (!open) return null;

  const widthClass = maxWidth === "lg" ? "max-w-lg" : "max-w-md";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div
        className="absolute inset-0 transition-opacity duration-150"
        onClick={onClose}
      />

      <div
        className={`relative bg-admin-surface p-8 shadow-2xl ring-1 ring-black/10 rounded-none ${widthClass} w-full mx-4 transition-all duration-150`}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-admin-muted hover:bg-admin-surface-hover hover:text-admin-heading rounded-none p-1.5 transition-colors duration-150"
          aria-label="Close"
        >
          <X size={18} />
        </button>
        {children}
      </div>
    </div>
  );
}
