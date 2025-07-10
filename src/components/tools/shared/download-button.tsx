"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes } from "react";

interface DownloadButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  fileUrl: string;
  filename: string;
  fileSize?: number;
  showSize?: boolean;
  icon?: boolean;
  text?: string;
}

export function DownloadButton({
  fileUrl,
  filename,
  fileSize,
  showSize = false,
  icon = true,
  text = "Download",
  className,
  ...props
}: DownloadButtonProps) {
  // Format file size
  const formatFileSize = (bytes: number | undefined) => {
    if (!bytes || bytes === 0) return "";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return ` (${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]})`;
  };

  return (
    <Button asChild className={cn("", className)} {...props}>
      <a href={fileUrl} download={filename}>
        {icon && <Download className="h-4 w-4 mr-2" />}
        {text}
        {showSize && fileSize ? formatFileSize(fileSize) : ""}
      </a>
    </Button>
  );
}
