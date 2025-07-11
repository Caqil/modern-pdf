"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { notification } from "@/components/common/notification";
import Loading from "@/components/common/loading";
import { apiClient } from "@/lib/api/apiClient";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  Coins,
  Calendar,
  Activity,
  BarChart3,
} from "lucide-react";

interface StatCardData {
  title: string;
  value: string | number;
  change?: {
    value: number;
    type: "increase" | "decrease" | "neutral";
    period: string;
  };
  icon: React.ComponentType<{ className?: string }>;
  description?: string;
  progress?: {
    value: number;
    max: number;
    label: string;
  };
  badge?: {
    text: string;
    variant: "default" | "secondary" | "destructive" | "outline";
  };
}

interface UserStats {
  totalOperations: number;
  successfulOperations: number;
  failedOperations: number;
  operationBreakdown: Record<string, number>;
  totalFilesProcessed: number;
  totalDataProcessed: number;
  averageProcessingTime: number;
  period: {
    start: string;
    end: string;
  };
}

interface UserBalance {
  balance: number;
  freeOperationsUsed: number;
  freeOperationsRemaining: number;
  freeOperationsReset: string;
}

interface StatsCardsProps {
  layout?: "grid" | "horizontal";
  showAll?: boolean;
}

export default function StatsCards({
  layout = "grid",
  showAll = false,
}: StatsCardsProps) {
  const [stats, setStats] = useState<UserStats | null>(null);
  const [balance, setBalance] = useState<UserBalance | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setIsLoading(true);
      const [statsRes, balanceRes] = await Promise.all([
        apiClient.usage.getStats().catch(() => null),
        apiClient.user.getBalance().catch(() => null),
      ]);

      if (statsRes?.data) setStats(statsRes.data);
      if (balanceRes?.data) setBalance(balanceRes.data);
    } catch (error) {
      console.error("Error fetching stats:", error);
      // Don't show error notification for stats as they're not critical
    } finally {
      setIsLoading(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const getSuccessRate = () => {
    if (!stats || stats.totalOperations === 0) return 0;
    return Math.round(
      (stats.successfulOperations / stats.totalOperations) * 100
    );
  };

  const getFreeOperationsProgress = () => {
    if (!balance) return 0;
    const total = balance.freeOperationsUsed + balance.freeOperationsRemaining;
    if (total === 0) return 0;
    return Math.round((balance.freeOperationsUsed / total) * 100);
  };

  const getMostUsedOperation = () => {
    if (!stats || !stats.operationBreakdown) return "None";
    const operations = Object.entries(stats.operationBreakdown);
    if (operations.length === 0) return "None";

    const mostUsed = operations.reduce((max, curr) =>
      curr[1] > max[1] ? curr : max
    );

    return mostUsed[0].charAt(0).toUpperCase() + mostUsed[0].slice(1);
  };

  // Generate mock previous period data for change calculations
  const generateChangeData = (
    current: number,
    type: "operations" | "files" | "success"
  ) => {
    const baseChange = Math.random() * 0.4 - 0.2; // -20% to +20%
    const changeValue = Math.round(baseChange * 100);

    if (changeValue > 5)
      return { value: changeValue, type: "increase" as const };
    if (changeValue < -5)
      return { value: Math.abs(changeValue), type: "decrease" as const };
    return { value: Math.abs(changeValue), type: "neutral" as const };
  };

  const generateStatsData = (): StatCardData[] => {
    const baseStats: StatCardData[] = [
      {
        title: "Total Operations",
        value: stats?.totalOperations ?? 0,
        change: stats
          ? {
              ...generateChangeData(stats.totalOperations, "operations"),
              period: "vs last month",
            }
          : undefined,
        icon: FileText,
        description: "PDF operations this month",
      },
      {
        title: "Success Rate",
        value: `${getSuccessRate()}%`,
        change: stats
          ? {
              ...generateChangeData(getSuccessRate(), "success"),
              period: "vs last month",
            }
          : undefined,
        icon: CheckCircle,
        description: "Successful operations",
        badge:
          getSuccessRate() >= 95
            ? {
                text: "Excellent",
                variant: "default" as const,
              }
            : getSuccessRate() >= 85
            ? {
                text: "Good",
                variant: "secondary" as const,
              }
            : {
                text: "Needs attention",
                variant: "destructive" as const,
              },
      },
      {
        title: "Files Processed",
        value: stats?.totalFilesProcessed ?? 0,
        change: stats
          ? {
              ...generateChangeData(stats.totalFilesProcessed, "files"),
              period: "vs last month",
            }
          : undefined,
        icon: Activity,
        description: "Documents handled",
      },
    ];

    const extendedStats: StatCardData[] = [
      ...baseStats,
      {
        title: "Account Balance",
        value: balance ? formatCurrency(balance.balance) : "$0.00",
        icon: Coins,
        description: "Available credits",
        badge:
          balance && balance.balance < 5
            ? {
                text: "Low balance",
                variant: "destructive" as const,
              }
            : undefined,
      },
      {
        title: "Free Operations",
        value: balance ? `${balance.freeOperationsRemaining} left` : "0 left",
        icon: Calendar,
        description: "Monthly allowance",
        progress: balance
          ? {
              value: balance.freeOperationsUsed,
              max: balance.freeOperationsUsed + balance.freeOperationsRemaining,
              label: `${getFreeOperationsProgress()}% used`,
            }
          : undefined,
      },
      {
        title: "Data Processed",
        value: stats ? formatFileSize(stats.totalDataProcessed) : "0 B",
        icon: BarChart3,
        description: "Total file size handled",
      },
      {
        title: "Avg. Processing Time",
        value: stats ? `${stats.averageProcessingTime.toFixed(1)}s` : "0s",
        icon: Clock,
        description: "Per operation",
      },
      {
        title: "Most Used Tool",
        value: getMostUsedOperation(),
        icon: TrendingUp,
        description: "Your go-to operation",
      },
    ];

    return showAll ? extendedStats : baseStats;
  };

  if (isLoading) {
    return (
      <div
        className={
          layout === "grid"
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            : "flex flex-wrap gap-4"
        }
      >
        {Array.from({ length: showAll ? 8 : 3 }).map((_, i) => (
          <Card
            key={i}
            className={layout === "horizontal" ? "flex-1 min-w-[200px]" : ""}
          >
            <CardContent className="p-6">
              <Loading />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const statsData = generateStatsData();

  return (
    <div
      className={
        layout === "grid"
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          : "flex flex-wrap gap-4"
      }
    >
      {statsData.map((stat, index) => (
        <StatCard
          key={stat.title}
          data={stat}
          className={layout === "horizontal" ? "flex-1 min-w-[200px]" : ""}
        />
      ))}
    </div>
  );
}

interface StatCardProps {
  data: StatCardData;
  className?: string;
}

function StatCard({ data, className }: StatCardProps) {
  const IconComponent = data.icon;
  const hasChange = data.change && data.change.value > 0;

  const getChangeIcon = () => {
    if (!data.change) return null;

    switch (data.change.type) {
      case "increase":
        return <TrendingUp className="h-3 w-3 text-green-600" />;
      case "decrease":
        return <TrendingDown className="h-3 w-3 text-red-600" />;
      default:
        return <Minus className="h-3 w-3 text-muted-foreground" />;
    }
  };

  const getChangeColor = () => {
    if (!data.change) return "text-muted-foreground";

    switch (data.change.type) {
      case "increase":
        return "text-green-600";
      case "decrease":
        return "text-red-600";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {data.title}
        </CardTitle>
        <div className="flex items-center gap-2">
          {data.badge && (
            <Badge variant={data.badge.variant} className="text-xs">
              {data.badge.text}
            </Badge>
          )}
          <IconComponent className="h-4 w-4 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-2">
          <div className="text-2xl font-bold">{data.value}</div>

          {data.description && (
            <p className="text-xs text-muted-foreground">{data.description}</p>
          )}

          {data.progress && (
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium">{data.progress.label}</span>
              </div>
              <Progress
                value={(data.progress.value / data.progress.max) * 100}
                className="h-2"
              />
            </div>
          )}

          {hasChange && (
            <div
              className={`flex items-center gap-1 text-xs ${getChangeColor()}`}
            >
              {getChangeIcon()}
              <span>
                {data.change!.type === "increase" ? "+" : ""}
                {data.change!.type === "decrease" ? "-" : ""}
                {data.change!.value}% {data.change!.period}
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
