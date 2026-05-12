"use client";

import React from "react";
import { Modal } from "./Modal";
import { Button } from "./Button";
import { AlertTriangle } from "lucide-react";

interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "danger" | "warning";
  isLoading?: boolean;
}

export function ConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "danger",
  isLoading = false,
}: ConfirmationDialogProps) {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center text-center">
        <div className={`w-16 h-16 ${variant === 'danger' ? 'bg-admin-error/10 text-admin-error' : 'bg-admin-accent/10 text-admin-accent'} flex items-center justify-center mb-6`}>
          <AlertTriangle size={32} />
        </div>

        <h2 className="text-2xl font-black uppercase tracking-tight text-admin-heading mb-3">
          {title}
        </h2>

        <div className="text-sm font-bold text-admin-muted mb-8 max-w-[280px] leading-relaxed">
          {description}
        </div>

        <div className="grid grid-cols-2 gap-4 w-full">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
            className="w-full uppercase font-black tracking-widest text-[10px] border-2"
          >
            {cancelLabel}
          </Button>
          <Button
            variant={variant === 'danger' ? "danger" : "default"}
            onClick={onConfirm}
            isLoading={isLoading}
            className="w-full uppercase font-black tracking-widest text-[10px]"
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
