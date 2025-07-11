"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CircleSmallIcon,
  Merge,
  Split,
  FileImage,
  RotateCw,
  Shield,
  Unlock,
  PenTool,
  Droplets,
  ScanText,
  Zap,
  ArrowRight,
} from "lucide-react";

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  category: "popular" | "security" | "editing" | "conversion";
  isNew?: boolean;
  isPro?: boolean;
}

const quickActions: QuickAction[] = [
  {
    id: "compress",
    title: "Compress PDF",
    description: "Reduce file size while maintaining quality",
    icon: CircleSmallIcon,
    href: "/tools/compress",
    category: "popular",
  },
  {
    id: "merge",
    title: "Merge PDFs",
    description: "Combine multiple PDF files into one",
    icon: Merge,
    href: "/tools/merge",
    category: "popular",
  },
  {
    id: "split",
    title: "Split PDF",
    description: "Extract pages or split into multiple files",
    icon: Split,
    href: "/tools/split",
    category: "editing",
  },
  {
    id: "convert",
    title: "Convert PDF",
    description: "Convert to Word, Excel, images, and more",
    icon: FileImage,
    href: "/tools/convert",
    category: "conversion",
  },
  {
    id: "rotate",
    title: "Rotate Pages",
    description: "Fix page orientation in your documents",
    icon: RotateCw,
    href: "/tools/rotate",
    category: "editing",
  },
  {
    id: "protect",
    title: "Protect PDF",
    description: "Add password protection to secure files",
    icon: Shield,
    href: "/tools/protect",
    category: "security",
  },
  {
    id: "unlock",
    title: "Unlock PDF",
    description: "Remove password protection from files",
    icon: Unlock,
    href: "/tools/unlock",
    category: "security",
  },
  {
    id: "sign",
    title: "Sign PDF",
    description: "Add digital signatures to documents",
    icon: PenTool,
    href: "/tools/sign",
    category: "editing",
    isPro: true,
  },
  {
    id: "watermark",
    title: "Add Watermark",
    description: "Brand your documents with text or images",
    icon: Droplets,
    href: "/tools/watermark",
    category: "editing",
  },
  {
    id: "ocr",
    title: "OCR Text",
    description: "Extract text from scanned documents",
    icon: ScanText,
    href: "/tools/ocr",
    category: "conversion",
    isNew: true,
  },
];

const categoryColors = {
  popular:
    "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800",
  security:
    "bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800",
  editing:
    "bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800",
  conversion:
    "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950 dark:text-purple-300 dark:border-purple-800",
};

const categoryLabels = {
  popular: "Popular",
  security: "Security",
  editing: "Editing",
  conversion: "Conversion",
};

interface QuickActionsProps {
  showAll?: boolean;
  maxItems?: number;
}

export default function QuickActions({
  showAll = false,
  maxItems = 6,
}: QuickActionsProps) {
  const displayActions = showAll
    ? quickActions
    : quickActions.slice(0, maxItems);
  const popularActions = quickActions.filter(
    (action) => action.category === "popular"
  );

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Quick Actions
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            {showAll
              ? "All available PDF tools and utilities"
              : "Most used tools to get you started quickly"}
          </p>
        </div>
        {!showAll && (
          <Button variant="ghost" size="sm" asChild>
            <Link href="/tools" className="flex items-center gap-1">
              View All
              <ArrowRight className="h-3 w-3" />
            </Link>
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {!showAll && popularActions.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="secondary" className="text-xs">
                Most Popular
              </Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {popularActions.map((action) => (
                <QuickActionCard key={action.id} action={action} featured />
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {displayActions
            .filter((action) => showAll || action.category !== "popular")
            .map((action) => (
              <QuickActionCard key={action.id} action={action} />
            ))}
        </div>

        {!showAll && (
          <div className="mt-6 text-center">
            <Button variant="outline" asChild>
              <Link href="/tools">
                View All Tools ({quickActions.length} available)
              </Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

interface QuickActionCardProps {
  action: QuickAction;
  featured?: boolean;
}

function QuickActionCard({ action, featured = false }: QuickActionCardProps) {
  const IconComponent = action.icon;

  return (
    <Link href={action.href} className="group">
      <div
        className={`
          relative p-4 rounded-lg border transition-all duration-200
          hover:shadow-md hover:border-primary/20 hover:-translate-y-1
          ${
            featured
              ? "bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20"
              : "bg-card hover:bg-accent/50"
          }
        `}
      >
        <div className="flex items-start gap-3">
          <div
            className={`
              p-2 rounded-md transition-colors
              ${
                featured
                  ? "bg-primary/10 text-primary"
                  : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
              }
            `}
          >
            <IconComponent className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-medium text-sm group-hover:text-primary transition-colors">
                {action.title}
              </h3>
              {action.isNew && (
                <Badge variant="secondary" className="text-xs px-1.5 py-0.5">
                  New
                </Badge>
              )}
              {action.isPro && (
                <Badge variant="default" className="text-xs px-1.5 py-0.5">
                  Pro
                </Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {action.description}
            </p>
            <div className="mt-2">
              <Badge
                variant="outline"
                className={`text-xs ${categoryColors[action.category]}`}
              >
                {categoryLabels[action.category]}
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
