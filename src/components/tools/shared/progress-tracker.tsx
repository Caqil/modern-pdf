"use client";

import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { notification } from "@/components/common/notification";
import {
  Loader2,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock,
  Play,
  Pause,
  RotateCcw,
  X,
  Download,
  Eye,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type ProgressStatus =
  | "idle"
  | "pending"
  | "processing"
  | "completed"
  | "failed"
  | "cancelled"
  | "paused";

interface ProgressStep {
  id: string;
  label: string;
  description?: string;
  status: ProgressStatus;
  progress?: number;
  error?: string;
  startTime?: Date;
  endTime?: Date;
  estimatedDuration?: number; // in seconds
}

interface ProgressFile {
  filename: string;
  fileUrl?: string;
  fileSize?: number;
  status: ProgressStatus;
  error?: string;
}

interface ProgressTrackerProps {
  // Overall operation status
  status: ProgressStatus;
  progress: number; // 0-100

  // Operation details
  title?: string;
  description?: string;
  operationType?: string;

  // File/batch information
  total?: number;
  completed?: number;
  files?: ProgressFile[];

  // Time tracking
  startTime?: Date;
  estimatedTimeRemaining?: number; // in seconds

  // Steps breakdown
  steps?: ProgressStep[];
  currentStep?: string;

  // Configuration
  showPercentage?: boolean;
  showTimeRemaining?: boolean;
  showSteps?: boolean;
  showFiles?: boolean;
  allowCancel?: boolean;
  allowPause?: boolean;
  allowRetry?: boolean;

  // Callbacks
  onCancel?: () => void;
  onPause?: () => void;
  onResume?: () => void;
  onRetry?: () => void;
  onComplete?: () => void;
  onViewResult?: () => void;

  // Styling
  className?: string;
  variant?: "default" | "card" | "inline";
  size?: "sm" | "default" | "lg";
}

export function ProgressTracker({
  status,
  progress,
  title = "Processing",
  description,
  operationType = "operation",
  total,
  completed,
  files = [],
  startTime,
  estimatedTimeRemaining,
  steps = [],
  currentStep,
  showPercentage = true,
  showTimeRemaining = true,
  showSteps = false,
  showFiles = false,
  allowCancel = true,
  allowPause = false,
  allowRetry = true,
  onCancel,
  onPause,
  onResume,
  onRetry,
  onComplete,
  onViewResult,
  className,
  variant = "default",
  size = "default",
}: ProgressTrackerProps) {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isPaused, setIsPaused] = useState(status === "paused");

  useEffect(() => {
    if (status === "completed" && onComplete) {
      onComplete();
    }
  }, [status, onComplete]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (startTime && (status === "processing" || status === "pending")) {
      interval = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime.getTime()) / 1000));
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [startTime, status]);

  const getStatusIcon = () => {
    const iconClass =
      size === "sm" ? "h-4 w-4" : size === "lg" ? "h-6 w-6" : "h-5 w-5";

    switch (status) {
      case "pending":
        return <Clock className={cn(iconClass, "text-yellow-500")} />;
      case "processing":
        return (
          <Loader2 className={cn(iconClass, "text-blue-500 animate-spin")} />
        );
      case "completed":
        return <CheckCircle className={cn(iconClass, "text-green-500")} />;
      case "failed":
        return <XCircle className={cn(iconClass, "text-red-500")} />;
      case "cancelled":
        return <X className={cn(iconClass, "text-gray-500")} />;
      case "paused":
        return <Pause className={cn(iconClass, "text-orange-500")} />;
      default:
        return <Clock className={cn(iconClass, "text-gray-500")} />;
    }
  };

  const getStatusBadge = () => {
    const variants = {
      idle: "secondary",
      pending: "outline",
      processing: "default",
      completed: "default",
      failed: "destructive",
      cancelled: "secondary",
      paused: "outline",
    } as const;

    const colors = {
      idle: "bg-gray-100 text-gray-800",
      pending: "bg-yellow-100 text-yellow-800",
      processing: "bg-blue-100 text-blue-800",
      completed: "bg-green-100 text-green-800",
      failed: "bg-red-100 text-red-800",
      cancelled: "bg-gray-100 text-gray-800",
      paused: "bg-orange-100 text-orange-800",
    };

    return (
      <Badge variant={variants[status]} className={colors[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m ${remainingSeconds}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${remainingSeconds}s`;
    } else {
      return `${remainingSeconds}s`;
    }
  };

  const getProgressColor = () => {
    switch (status) {
      case "completed":
        return "bg-green-500";
      case "failed":
        return "bg-red-500";
      case "paused":
        return "bg-orange-500";
      default:
        return "bg-blue-500";
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
      notification.info(`${operationType} cancelled`);
    }
  };

  const handlePauseResume = () => {
    if (isPaused) {
      if (onResume) {
        onResume();
        setIsPaused(false);
        notification.info(`${operationType} resumed`);
      }
    } else {
      if (onPause) {
        onPause();
        setIsPaused(true);
        notification.info(`${operationType} paused`);
      }
    }
  };

  const handleRetry = () => {
    if (onRetry) {
      onRetry();
      notification.info(`Retrying ${operationType}...`);
    }
  };

  const renderContent = () => (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {getStatusIcon()}
          <div>
            <div className="flex items-center gap-2">
              <h3
                className={cn(
                  "font-medium",
                  size === "sm"
                    ? "text-sm"
                    : size === "lg"
                    ? "text-lg"
                    : "text-base"
                )}
              >
                {title}
              </h3>
              {getStatusBadge()}
            </div>
            {description && (
              <p
                className={cn(
                  "text-muted-foreground",
                  size === "sm" ? "text-xs" : "text-sm"
                )}
              >
                {description}
              </p>
            )}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          {status === "failed" && allowRetry && (
            <Button
              variant="outline"
              size={size === "sm" ? "sm" : "default"}
              onClick={handleRetry}
            >
              <RotateCcw className="h-4 w-4 mr-1" />
              Retry
            </Button>
          )}

          {status === "completed" && onViewResult && (
            <Button
              variant="outline"
              size={size === "sm" ? "sm" : "default"}
              onClick={onViewResult}
            >
              <Eye className="h-4 w-4 mr-1" />
              View
            </Button>
          )}

          {allowPause && (status === "processing" || status === "paused") && (
            <Button
              variant="outline"
              size={size === "sm" ? "sm" : "default"}
              onClick={handlePauseResume}
            >
              {isPaused ? (
                <>
                  <Play className="h-4 w-4 mr-1" />
                  Resume
                </>
              ) : (
                <>
                  <Pause className="h-4 w-4 mr-1" />
                  Pause
                </>
              )}
            </Button>
          )}

          {allowCancel &&
            (status === "processing" ||
              status === "pending" ||
              status === "paused") && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outline"
                    size={size === "sm" ? "sm" : "default"}
                    className="text-destructive hover:text-destructive"
                  >
                    <X className="h-4 w-4 mr-1" />
                    Cancel
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Cancel {operationType}?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to cancel this {operationType}? This
                      action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Keep processing</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleCancel}
                      className="bg-destructive text-destructive-foreground"
                    >
                      Yes, cancel
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
        </div>
      </div>

      {/* Progress bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          {total && completed !== undefined ? (
            <span className="text-muted-foreground">
              {completed} of {total} {total === 1 ? "file" : "files"}
            </span>
          ) : (
            <span className="text-muted-foreground">Progress</span>
          )}

          <div className="flex items-center gap-4 text-muted-foreground">
            {showTimeRemaining &&
              estimatedTimeRemaining &&
              status === "processing" && (
                <span className="text-xs">
                  ~{formatTime(estimatedTimeRemaining)} remaining
                </span>
              )}

            {showPercentage && (
              <span className="font-medium">{Math.round(progress)}%</span>
            )}
          </div>
        </div>

        <Progress
          value={progress}
          className={cn(
            "transition-all duration-300",
            size === "sm" ? "h-2" : size === "lg" ? "h-3" : "h-2.5"
          )}
        />

        {startTime && (
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Elapsed: {formatTime(elapsedTime)}</span>
            {currentStep && <span>Current: {currentStep}</span>}
          </div>
        )}
      </div>

      {/* Steps */}
      {showSteps && steps.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Steps</h4>
          <div className="space-y-1">
            {steps.map((step) => (
              <div key={step.id} className="flex items-center gap-2 text-sm">
                <div className="w-4 h-4 flex-shrink-0">
                  {step.status === "completed" ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : step.status === "processing" ? (
                    <Loader2 className="h-4 w-4 text-blue-500 animate-spin" />
                  ) : step.status === "failed" ? (
                    <XCircle className="h-4 w-4 text-red-500" />
                  ) : (
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
                <span
                  className={cn(
                    step.status === "completed"
                      ? "text-green-700"
                      : step.status === "processing"
                      ? "text-blue-700"
                      : step.status === "failed"
                      ? "text-red-700"
                      : "text-muted-foreground"
                  )}
                >
                  {step.label}
                </span>
                {step.progress !== undefined &&
                  step.status === "processing" && (
                    <span className="text-xs text-muted-foreground">
                      ({step.progress}%)
                    </span>
                  )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Files */}
      {showFiles && files.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Files</h4>
          <div className="space-y-1 max-h-32 overflow-y-auto">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between text-sm p-2 rounded border"
              >
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <div className="w-4 h-4 flex-shrink-0">
                    {file.status === "completed" ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : file.status === "processing" ? (
                      <Loader2 className="h-4 w-4 text-blue-500 animate-spin" />
                    ) : file.status === "failed" ? (
                      <XCircle className="h-4 w-4 text-red-500" />
                    ) : (
                      <Clock className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                  <span className="truncate" title={file.filename}>
                    {file.filename}
                  </span>
                </div>

                {file.status === "completed" && file.fileUrl && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 px-2"
                    onClick={() => window.open(file.fileUrl, "_blank")}
                  >
                    <Download className="h-3 w-3" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  if (variant === "card") {
    return (
      <Card className={className}>
        <CardContent className="pt-6">{renderContent()}</CardContent>
      </Card>
    );
  }

  if (variant === "inline") {
    return (
      <div className={cn("p-4 border rounded-lg bg-card", className)}>
        {renderContent()}
      </div>
    );
  }

  return <div className={cn("space-y-4", className)}>{renderContent()}</div>;
}
