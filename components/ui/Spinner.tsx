import React from "react";

type SpinnerSize = "sm" | "md" | "lg";

const sizeMap: Record<SpinnerSize, string> = {
  sm: "w-4 h-4",
  md: "w-5 h-5",
  lg: "w-8 h-8",
};

interface SpinnerProps {
  size?: SpinnerSize;
  className?: string;
}

export function Spinner({ size = "md", className = "" }: SpinnerProps) {
  return (
    <svg
      className={`animate-spin ${sizeMap[size]} ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="status"
      aria-label="Loading"
    >
      <circle
        className="opacity-20"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3.5"
      />
      <path
        className="opacity-100"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}
