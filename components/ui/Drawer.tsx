"use client";

import React, { useEffect, useCallback } from "react";
import { X } from "lucide-react";

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function Drawer({ open, onClose, title, children, footer }: DrawerProps) {
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

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-xl bg-admin-surface shadow-2xl border-l-4 border-admin-primary transform transition-transform duration-300 ease-in-out ${open ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="h-full flex flex-col pb-16 md:pb-0">
          {/* Header */}
          <div className="p-6 sm:p-8 border-b-2 border-admin-border-strong flex items-center justify-between bg-admin-primary text-admin-contrast">
            <div>
              <h2 className="text-xl sm:text-2xl font-black tracking-tighter uppercase">
                {title}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-admin-contrast/70 hover:text-admin-contrast hover:bg-admin-contrast/10 transition-colors"
              aria-label="Close drawer"
            >
              <X size={24} strokeWidth={3} />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 custom-scrollbar">
            {children}
          </div>

          {/* Footer */}
          {footer && (
            <div className="p-6 sm:p-8 border-t-4 border-admin-primary bg-admin-surface">
              {footer}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
