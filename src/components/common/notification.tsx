
"use client";

import { toast } from "sonner";
import { CheckCircle, AlertTriangle, Info, X } from "lucide-react";

export type NotificationType = "success" | "error" | "warning" | "info";

interface NotificationOptions {
  title?: string;
  description?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export const notification = {
  success: (message: string, options?: NotificationOptions) => {
    toast.success(options?.title || "Success", {
      description: options?.description || message,
      duration: options?.duration,
      icon: <CheckCircle className="h-4 w-4" />,
      action: options?.action
        ? {
            label: options.action.label,
            onClick: options.action.onClick,
          }
        : undefined,
    });
  },

  error: (message: string, options?: NotificationOptions) => {
    toast.error(options?.title || "Error", {
      description: options?.description || message,
      duration: options?.duration,
      icon: <X className="h-4 w-4" />,
      action: options?.action
        ? {
            label: options.action.label,
            onClick: options.action.onClick,
          }
        : undefined,
    });
  },

  warning: (message: string, options?: NotificationOptions) => {
    toast.warning(options?.title || "Warning", {
      description: options?.description || message,
      duration: options?.duration,
      icon: <AlertTriangle className="h-4 w-4" />,
      action: options?.action
        ? {
            label: options.action.label,
            onClick: options.action.onClick,
          }
        : undefined,
    });
  },

  info: (message: string, options?: NotificationOptions) => {
    toast.info(options?.title || "Info", {
      description: options?.description || message,
      duration: options?.duration,
      icon: <Info className="h-4 w-4" />,
      action: options?.action
        ? {
            label: options.action.label,
            onClick: options.action.onClick,
          }
        : undefined,
    });
  },

  promise<T>(
    promise: Promise<T>,
    {
      loading,
      success,
      error,
    }: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((error: any) => string);
    }
  ) {
    return toast.promise(promise, {
      loading,
      success,
      error,
    });
  },

  custom: (message: string, options?: NotificationOptions & { icon?: React.ReactNode }) => {
    toast(options?.title || message, {
      description: options?.description,
      duration: options?.duration,
      icon: options?.icon,
      action: options?.action
        ? {
            label: options.action.label,
            onClick: options.action.onClick,
          }
        : undefined,
    });
  },
};

// Utility functions for common use cases
export const showOperationResult = (
  operation: string,
  success: boolean,
  details?: string
) => {
  if (success) {
    notification.success(`${operation} completed successfully`, {
      description: details,
    });
  } else {
    notification.error(`${operation} failed`, {
      description: details || "Please try again.",
    });
  }
};

export const showFileProcessingResult = (
  filename: string,
  operation: string,
  success: boolean
) => {
  if (success) {
    notification.success("File processed", {
      description: `${filename} has been ${operation} successfully.`,
    });
  } else {
    notification.error("Processing failed", {
      description: `Failed to ${operation} ${filename}. Please try again.`,
    });
  }
};

export const showNetworkError = () => {
  notification.error("Network error", {
    description: "Please check your connection and try again.",
    action: {
      label: "Retry",
      onClick: () => window.location.reload(),
    },
  });
};

export const showQuotaExceeded = () => {
  notification.warning("Quota exceeded", {
    description: "You've reached your usage limit. Upgrade your plan to continue.",
    action: {
      label: "Upgrade",
      onClick: () => (window.location.href = "/billing"),
    },
  });
};

export default notification;