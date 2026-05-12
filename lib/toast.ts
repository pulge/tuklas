import React from "react";
import { toast as sonnerToast, ExternalToast } from "sonner";
import { Info, CheckCircle2, AlertCircle } from "lucide-react";

/**
 * Tuklas Brutalist Toast Utility
 * Wraps sonner with project-specific styling and defaults.
 */
export const toast = {
  success: (message: string | React.ReactNode, options?: ExternalToast) => {
    return sonnerToast.success(message, {
      ...options,
      icon: React.createElement(CheckCircle2, { size: 18, className: "text-admin-success" }),
      className: "brutalist-toast-success",
    });
  },
  error: (message: string | React.ReactNode, options?: ExternalToast) => {
    return sonnerToast.error(message, {
      ...options,
      icon: React.createElement(AlertCircle, { size: 18, className: "text-admin-danger" }),
      className: "brutalist-toast-error",
    });
  },
  loading: (message: string | React.ReactNode, options?: ExternalToast) => {
    return sonnerToast.loading(message, {
      ...options,
    });
  },
  info: (message: string | React.ReactNode, options?: ExternalToast) => {
    return sonnerToast(message, {
      ...options,
      icon: React.createElement(Info, { size: 18, className: "text-admin-accent" }),
      className: "brutalist-toast-info",
    });
  },
  dismiss: (toastId?: string | number) => {
    return sonnerToast.dismiss(toastId);
  },
};
