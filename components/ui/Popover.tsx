"use client";

import React, { useEffect, useRef } from "react";

type PopoverDirection =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "right-top"
  | "right-bottom"
  | "left-top"
  | "left-bottom";

interface PopoverProps {
  isOpen: boolean;
  onClose: () => void;
  direction?: PopoverDirection;
  className?: string;
  children: React.ReactNode;
  triggerRef?: React.RefObject<HTMLElement | null>;
}

export function Popover({
  isOpen,
  onClose,
  direction = "bottom-right",
  className = "",
  children,
  triggerRef,
}: PopoverProps) {
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        if (triggerRef?.current && triggerRef.current.contains(event.target as Node)) {
          return;
        }
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose, triggerRef]);

  if (!isOpen) return null;

  const directionClasses = {
    "top-left": "bottom-full left-0 mb-0",
    "top-right": "bottom-full right-0 mb-2",
    "bottom-left": "top-full left-0 mt-2",
    "bottom-right": "top-full right-0 mt-2",
    "right-top": "left-full top-0 ml-2",
    "right-bottom": "left-full bottom-0 ml-2",
    "left-top": "right-full top-0 mr-2",
    "left-bottom": "right-full bottom-0 mr-2",
  };

  return (
    <div className="relative">
      <div
        ref={popoverRef}
        className={`absolute z-50 bg-admin-surface border-2 border-admin-border-strong shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] py-2 animate-in fade-in zoom-in-95 duration-200 ${directionClasses[direction]} ${className}`}
      >
        {children}
      </div>
    </div>
  );
}
