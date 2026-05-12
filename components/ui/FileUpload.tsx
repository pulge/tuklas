"use client";

import React, { useState } from "react";
import { FileUp } from "lucide-react";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  onError?: (message: string) => void;
  accept?: string;
  maxSizeMB?: number;
  label?: string;
  helperText?: string;
  className?: string;
  icon?: React.ReactNode;
}

export function FileUpload({
  onFileSelect,
  onError,
  accept = ".pdf",
  maxSizeMB = 5,
  label = "Click or drag file",
  helperText = "MAX 5MB",
  className = "",
  icon = <FileUp size={32} />,
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);

  const validate = (file: File): boolean => {
    const maxBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxBytes) {
      onError?.(`File too large. Maximum size is ${maxSizeMB}MB.`);
      return false;
    }
    // Validate MIME type — accept prop is e.g. ".pdf", so check actual MIME
    if (accept === ".pdf" && file.type !== "application/pdf") {
      onError?.("Invalid file type. Only PDF files are accepted.");
      return false;
    }
    return true;
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && validate(file)) onFileSelect(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && validate(file)) onFileSelect(file);
    // Reset input so the same file can be re-selected after an error
    e.target.value = "";
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`relative border-4 border-dashed p-12 flex flex-col items-center justify-center gap-4 transition-all duration-150 ${
        isDragging
          ? "border-admin-accent bg-admin-accent/5"
          : "border-admin-border-strong bg-admin-surface hover:bg-admin-surface-hover hover:border-admin-accent/50"
      } ${className}`}
    >
      <div className="w-16 h-16 bg-admin-primary text-admin-contrast flex items-center justify-center">
        {icon}
      </div>
      <div className="text-center">
        <p className="font-bold text-admin-heading uppercase tracking-widest text-xs mb-1">
          {label}
        </p>
        <p className="text-[10px] text-admin-text opacity-50 font-bold uppercase">
          {helperText} · {maxSizeMB}MB MAX
        </p>
      </div>
      <input
        type="file"
        accept={accept}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        onChange={handleFileChange}
      />
    </div>
  );
}
