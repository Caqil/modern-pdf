"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Download,
  Upload,
  Zap,
  Users,
  TrendingUp,
  Activity,
  Calendar,
  Clock,
  Star,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { apiClient } from "@/lib/api/apiClient";
import { toast } from "sonner";

interface DashboardStats {
  totalOperations: number;
  successfulOperations: number;
  failedOperations: number;
  totalFilesProcessed: number;
  freeOperationsRemaining: number;
  currentBalance: number;
}

interface RecentFile {
  id: string;
  name: string;
  operation: string;
  status: "completed" | "failed" | "processing";
  createdAt: string;
  size: number;
}

const quickActions = [
  {
    title: "Compress PDF",
    description: "Reduce file size while maintaining quality",
    icon: Zap,
    href: "/tools/compress",
    color: "bg-blue-500",
  },
  {
    title: "Merge PDFs",
    description: "Combine multiple PDFs into one",
    icon: FileText,
    href: "/tools/merge",
    color: "bg-green-500",
  },
  {
    title: "Split PDF",
    description: "Divide PDF into separate files",
    icon: Upload,
    href: "/tools/split",
    color: "bg-purple-500",
  },
  {
    title: "Convert PDF",
    description: "Convert to Word, Excel, or other formats",
    icon: Download,
    href: "/tools/convert",
    color: "bg-orange-500",
  },
];

const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / 1048576).toFixed(1) + " MB";
};

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentFiles, setRecentFiles] = useState<RecentFile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);

      // Fetch user stats and recent activity
      const [balanceResponse, usageResponse] = await Promise.all([
        apiClient.user.getBalance(),
        apiClient.usage.getStats(),
      ]);

      setStats({
        totalOperations: usageResponse.data.totalOperations || 0,
        successfulOperations: usageResponse.data.successfulOperations || 0,
        failedOperations: usageResponse.data.failedOperations || 0,
        totalFilesProcessed: usageResponse.data.totalFilesProcessed || 0,
        freeOperationsRemaining:
          balanceResponse.data.freeOperationsRemaining || 0,
        currentBalance: balanceResponse.data.balance || 0,
      });

      // Mock recent files data (replace with actual API call when available)
      setRecentFiles([
        {
          id: "1",
          name: "annual-report-2024.pdf",
          operation: "compress",
          status: "completed",
          createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          size: 2048000,
        },
        {
          id: "2",
          name: "presentation-slides.pdf",
          operation: "convert",
          status: "completed",
          createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
          size: 5120000,
        },
        {
          id: "3",
          name: "contract-documents.pdf",
          operation: "merge",
          status: "completed",
          createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
          size: 1024000,
        },
      ]);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast.error("Failed to load dashboard data. Please refresh the page.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="h-4 bg-muted animate-pulse rounded w-20"></div>
                <div className="h-4 w-4 bg-muted animate-pulse rounded"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-muted animate-pulse rounded w-16 mb-2"></div>
                <div className="h-3 bg-muted animate-pulse rounded w-24"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  const successRate = stats
    ? Math.round(
        (stats.successfulOperations / Math.max(stats.totalOperations, 1)) * 100
      )
    : 0;

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's an overview of your PDF processing activity.
          </p>
        </div>
        <Button asChild>
          <Link href="/tools">
            <FileText className="mr-2 h-4 w-4" />
            All Tools
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Operations
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats?.totalOperations || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{successRate}%</div>
            <p className="text-xs text-muted-foreground">
              {stats?.successfulOperations || 0} of{" "}
              {stats?.totalOperations || 0} operations
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Files Processed
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats?.totalFilesProcessed || 0}
            </div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Free Operations
            </CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats?.freeOperationsRemaining || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Remaining this month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Jump right into your most used PDF tools
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            {quickActions.map((action) => (
              <Link key={action.href} href={action.href}>
                <div className="flex items-center space-x-4 rounded-lg border p-4 hover:bg-accent transition-colors cursor-pointer">
                  <div className={`rounded-lg p-2 ${action.color}`}>
                    <action.icon className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{action.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {action.description}
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Your latest PDF processing operations
            </CardDescription>
          </CardHeader>
          <CardContent>
            {recentFiles.length > 0 ? (
              <div className="space-y-4">
                {recentFiles.map((file) => (
                  <div key={file.id} className="flex items-center space-x-4">
                    <div className="rounded-lg bg-muted p-2">
                      <FileText className="h-4 w-4" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium truncate">
                        {file.name}
                      </p>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-xs">
                          {file.operation}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {formatFileSize(file.size)}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge
                        variant={
                          file.status === "completed"
                            ? "default"
                            : "destructive"
                        }
                        className="text-xs"
                      >
                        {file.status}
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatDate(file.createdAt)}
                      </p>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/history">View All Activity</Link>
                </Button>
              </div>
            ) : (
              <div className="text-center py-6">
                <FileText className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  No recent activity. Start by processing your first PDF!
                </p>
                <Button className="mt-4" asChild>
                  <Link href="/tools">Get Started</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Usage Progress */}
      {stats && (
        <Card>
          <CardHeader>
            <CardTitle>Monthly Usage</CardTitle>
            <CardDescription>
              Track your free operations and account balance
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Free Operations Used</span>
                <span>{100 - (stats.freeOperationsRemaining || 0)}/100</span>
              </div>
              <Progress
                value={100 - (stats.freeOperationsRemaining || 0)}
                className="h-2"
              />
            </div>

            <div className="flex justify-between items-center pt-4 border-t">
              <div>
                <p className="text-sm font-medium">Current Balance</p>
                <p className="text-xs text-muted-foreground">
                  For additional operations
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold">
                  ${(stats.currentBalance || 0).toFixed(2)}
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/billing">Add Funds</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
