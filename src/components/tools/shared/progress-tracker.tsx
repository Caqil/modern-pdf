"use client";

import { Progress } from "@/components/ui/progress";
import { Loader2 } from "lucide-react";

interface ProgressTrackerProps {
  status: "pending" | "processing" | "completed" | "failed";
  progress: number;
  total?: number;
  completed?: number;
  showPercentage?: boolean;
}

export function ProgressTracker({
  status,
  progress,
  total,
  completed,
  showPercentage = true,
}: ProgressTrackerProps) {
  const percentage = Math.round(progress * 100);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {status === "pending" || status === "processing" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : null}
          <span className="font-medium capitalize">{status}</span>
        </div>
        {showPercentage && (
          <span className="text-sm text-muted-foreground">{percentage}%</span>
        )}
      </div>
      <Progress value={percentage} />
      {total && completed !== undefined && (
        <div className="text-xs text-muted-foreground text-right">
          Processed {completed} of {total} files
        </div>
      )}
    </div>
  );
}
