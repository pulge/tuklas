"use client";

import React from "react";

export const passwordRules = [
  { label: "8+ characters", test: (v: string) => v.length >= 8 },
  { label: "Uppercase", test: (v: string) => /[A-Z]/.test(v) },
  { label: "Number", test: (v: string) => /[0-9]/.test(v) },
];

interface PasswordStrengthProps {
  value: string;
}

export function PasswordStrength({ value }: PasswordStrengthProps) {
  if (!value) return null;

  const passedCount = passwordRules.filter((r) => r.test(value)).length;
  const totalRules = passwordRules.length;
  const percentage = (passedCount / totalRules) * 100;

  const barColor = 
    passedCount === 0 ? "bg-admin-border-strong" :
    passedCount === 1 ? "bg-admin-danger" : 
    passedCount === 2 ? "bg-yellow-500" : 
    "bg-admin-success";

  const strengthLabel = 
    passedCount === 1 ? "Weak" : 
    passedCount === 2 ? "Fair" : 
    passedCount === 3 ? "Strong" : "";

  const strengthColor = 
    passedCount === 1 ? "text-admin-danger" : 
    passedCount === 2 ? "text-yellow-500" : 
    "text-admin-success";

  return (
    <div className="flex flex-col gap-1.5 px-1 animate-in fade-in slide-in-from-top-1 duration-300">
      <div className="flex items-center gap-3">
        {/* Smooth Progress Bar Container */}
        <div className="flex-1 h-1.5 bg-admin-border-strong relative overflow-hidden">
          <div 
            className={`absolute left-0 top-0 h-full transition-all duration-500 ease-out ${barColor}`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        <span className={`text-[9px] font-black uppercase tracking-widest min-w-[40px] text-right ${strengthColor}`}>
          {strengthLabel}
        </span>
      </div>
      <div className="flex items-center gap-4">
        {passwordRules.map((r) => (
          <span
            key={r.label}
            className={`text-[9px] font-black uppercase tracking-widest transition-colors duration-300 ${
              r.test(value) ? "text-admin-success" : "text-admin-muted"
            }`}
          >
            {r.label}
          </span>
        ))}
      </div>
    </div>
  );
}
