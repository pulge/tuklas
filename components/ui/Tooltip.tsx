"use client";

import React, { useState, useRef, useEffect } from "react";

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
}

export function Tooltip({ 
  content, 
  children, 
  position = "top",
  align = "center" 
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click (mobile dismiss)
  useEffect(() => {
    if (!isVisible) return;
    const handler = (e: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsVisible(false);
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [isVisible]);

  // Position classes
  const positionClasses = {
    top: "bottom-full mb-2",
    bottom: "top-full mt-2",
    left: "right-full mr-2 top-1/2 -translate-y-1/2",
    right: "left-full ml-2 top-1/2 -translate-y-1/2",
  };

  // Alignment classes for top/bottom
  const alignmentClasses = {
    start: "left-0",
    center: "left-1/2 -translate-x-1/2",
    end: "right-0",
  };

  const isVertical = position === "top" || position === "bottom";
  const finalPositionClass = isVertical 
    ? `${positionClasses[position]} ${alignmentClasses[align]}`
    : positionClasses[position];

  return (
    <div 
      ref={ref}
      className="relative inline-block max-w-full"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onClick={(e) => { e.stopPropagation(); setIsVisible(v => !v); }}
    >
      {children}
      {isVisible && (
        <div className={`absolute z-[100] whitespace-normal min-w-[140px] max-w-xs animate-in fade-in zoom-in-95 duration-150 ${finalPositionClass}`}>
          <div className="bg-admin-contrast text-admin-primary px-3 py-2 text-[10px] font-black uppercase tracking-widest border-2 border-admin-contrast shadow-[4px_4px_0px_0px_rgba(var(--admin-contrast-rgb),1)]">
            {content}
          </div>
          
          {/* Arrow - only shown for center alignment or side positions for simplicity in Brutalist style */}
          {align === "center" && isVertical && (
            <div className={`absolute left-1/2 -translate-x-1/2 -mt-1 border-x-8 border-x-transparent ${
              position === "top" 
                ? "top-full border-t-8 border-t-admin-contrast" 
                : "bottom-full border-b-8 border-b-admin-contrast mb-1"
            }`} />
          )}
        </div>
      )}
    </div>
  );
}
