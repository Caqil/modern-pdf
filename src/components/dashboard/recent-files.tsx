"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { notification } from "@/components/common/notification";
import Loading from "@/components/common/loading";
import {
  FileText,
  Download,
  MoreHorizontal,
  Clock,
  ArrowRight,
  Trash2,
  ExternalLink,
  FolderOpen,
} from "lucide-react";

interface RecentFile {
  id: string;
  filename: string;
  originalName: string;
  operation: string;
  fileSize: number;
  fileUrl: string;
  createdAt: string;
  status: "completed" | "processing" | "failed";
}

interface RecentFilesProps {
  maxItems?: number;
  showHeader?: boolean;
}

export default function RecentFiles({
  maxItems = 5,
  showHeader = true,
}: RecentFilesProps) {
  const [files, setFiles] = useState<RecentFile[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchRecentFiles();
  }, []);

  const fetchRecentFiles = async () => {
    try {
      setIsLoading(true);
      // Since there's no specific recent files endpoint, we'll simulate it
      // In a real app, you'd have an endpoint like apiClient.files.getRecent()

      // For now, we'll create mock data based on the user's usage
      const mockFiles: RecentFile[] = [
        {
          id: "1",
          filename: "compressed-document.pdf",
          originalName: "large-document.pdf",
          operation: "compress",
          fileSize: 1024 * 1024 * 2.5, // 2.5MB
          fileUrl: "/downloads/compressed-document.pdf",
          createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 min ago
          status: "completed",
        },
        {
          id: "2",
          filename: "merged-reports.pdf",
          originalName: "quarterly-reports.pdf",
          operation: "merge",
          fileSize: 1024 * 1024 * 8.2, // 8.2MB
          fileUrl: "/downloads/merged-reports.pdf",
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
          status: "completed",
        },
        {
          id: "3",
          filename: "signed-contract.pdf",
          originalName: "employment-contract.pdf",
          operation: "sign",
          fileSize: 1024 * 1024 * 1.8, // 1.8MB
          fileUrl: "/downloads/signed-contract.pdf",
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
          status: "completed",
        },
        {
          id: "4",
          filename: "presentation-pages.pdf",
          originalName: "company-presentation.pdf",
          operation: "split",
          fileSize: 1024 * 1024 * 0.8, // 0.8MB
          fileUrl: "/downloads/presentation-pages.pdf",
          createdAt: new Date(
            Date.now() - 1000 * 60 * 60 * 24 * 2
          ).toISOString(), // 2 days ago
          status: "completed",
        },
        {
          id: "5",
          filename: "watermarked-invoice.pdf",
          originalName: "invoice-2024.pdf",
          operation: "watermark",
          fileSize: 1024 * 512, // 512KB
          fileUrl: "/downloads/watermarked-invoice.pdf",
          createdAt: new Date(
            Date.now() - 1000 * 60 * 60 * 24 * 3
          ).toISOString(), // 3 days ago
          status: "completed",
        },
      ];

      setFiles(mockFiles.slice(0, maxItems));
    } catch (error) {
      console.error("Error fetching recent files:", error);
      notification.error("Failed to load recent files");
    } finally {
      setIsLoading(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInMinutes = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60)
    );

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;

    return date.toLocaleDateString();
  };

  const getOperationLabel = (operation: string) => {
    const labels: Record<string, string> = {
      compress: "Compressed",
      merge: "Merged",
      split: "Split",
      convert: "Converted",
      rotate: "Rotated",
      protect: "Protected",
      unlock: "Unlocked",
      sign: "Signed",
      watermark: "Watermarked",
      ocr: "OCR Processed",
    };
    return labels[operation] || operation;
  };

  const getOperationColor = (operation: string) => {
    const colors: Record<string, string> = {
      compress: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      merge:
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      split:
        "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
      convert:
        "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
      rotate:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
      protect: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
      unlock: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
      sign: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300",
      watermark:
        "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300",
      ocr: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300",
    };
    return (
      colors[operation] ||
      "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    );
  };

  const handleDownload = (file: RecentFile) => {
    // In a real app, this would trigger the actual download
    const link = document.createElement("a");
    link.href = file.fileUrl;
    link.download = file.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    notification.success("Download started", {
      description: `Downloading ${file.filename}`,
    });
  };

  const handleDelete = (fileId: string) => {
    setFiles(files.filter((file) => file.id !== fileId));
    notification.success("File removed from history");
  };

  if (isLoading) {
    return (
      <Card>
        {showHeader && (
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Recent Files
            </CardTitle>
          </CardHeader>
        )}
        <CardContent>
          <Loading text="Loading recent files..." />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      {showHeader && (
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Recent Files
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Your recently processed documents
            </p>
          </div>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/history" className="flex items-center gap-1">
              View All
              <ArrowRight className="h-3 w-3" />
            </Link>
          </Button>
        </CardHeader>
      )}
      <CardContent>
        {files.length === 0 ? (
          <div className="text-center py-8">
            <FolderOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-medium mb-2">No recent files</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Start by processing your first PDF document
            </p>
            <Button asChild>
              <Link href="/tools">Browse Tools</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {files.map((file) => (
              <div
                key={file.id}
                className="flex items-center gap-3 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
              >
                <div className="p-2 rounded-md bg-muted">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-sm truncate">
                      {file.filename}
                    </h4>
                    <Badge
                      variant="outline"
                      className={`text-xs ${getOperationColor(file.operation)}`}
                    >
                      {getOperationLabel(file.operation)}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span>{formatFileSize(file.fileSize)}</span>
                    <span>•</span>
                    <span>{formatTimeAgo(file.createdAt)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDownload(file)}
                    className="h-8 w-8"
                  >
                    <Download className="h-4 w-4" />
                  </Button>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleDownload(file)}>
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => window.open(file.fileUrl, "_blank")}
                      >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Open in new tab
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDelete(file.id)}
                        className="text-destructive"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Remove from history
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
