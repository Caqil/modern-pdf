"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Download,
  Upload,
  Zap,
  Merge,
  Split,
  Shield,
  Unlock,
  RotateCw,
  Droplets,
  Eye,
  PenTool,
  Search,
  Star,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface Tool {
  id: string;
  title: string;
  description: string;
  icon: any;
  href: string;
  category: "popular" | "conversion" | "editing" | "security";
  popular?: boolean;
  new?: boolean;
}

const tools: Tool[] = [
  {
    id: "compress",
    title: "Compress PDF",
    description: "Reduce file size while maintaining quality",
    icon: Zap,
    href: "/tools/compress",
    category: "popular",
    popular: true,
  },
  {
    id: "merge",
    title: "Merge PDFs",
    description: "Combine multiple PDF files into one",
    icon: Merge,
    href: "/tools/merge",
    category: "popular",
    popular: true,
  },
  {
    id: "split",
    title: "Split PDF",
    description: "Extract pages or split into multiple files",
    icon: Split,
    href: "/tools/split",
    category: "editing",
    popular: true,
  },
  {
    id: "convert",
    title: "Convert PDF",
    description: "Convert to Word, Excel, PowerPoint, and more",
    icon: Download,
    href: "/tools/convert",
    category: "conversion",
    popular: true,
  },
  {
    id: "ocr",
    title: "OCR & Extract Text",
    description: "Extract text from scanned documents",
    icon: Eye,
    href: "/tools/ocr",
    category: "conversion",
  },
  {
    id: "protect",
    title: "Protect PDF",
    description: "Add password protection to your PDFs",
    icon: Shield,
    href: "/tools/protect",
    category: "security",
  },
  {
    id: "unlock",
    title: "Unlock PDF",
    description: "Remove password protection from PDFs",
    icon: Unlock,
    href: "/tools/unlock",
    category: "security",
  },
  {
    id: "rotate",
    title: "Rotate PDF",
    description: "Rotate pages to the correct orientation",
    icon: RotateCw,
    href: "/tools/rotate",
    category: "editing",
  },
  {
    id: "watermark",
    title: "Add Watermark",
    description: "Add text or image watermarks to PDFs",
    icon: Droplets,
    href: "/tools/watermark",
    category: "editing",
    new: true,
  },
  {
    id: "sign",
    title: "Sign PDF",
    description: "Add your signature to PDF documents",
    icon: PenTool,
    href: "/tools/sign",
    category: "editing",
    new: true,
  },
];

const categories = {
  popular: { name: "Most Popular", icon: TrendingUp },
  conversion: { name: "Conversion", icon: Download },
  editing: { name: "Editing", icon: FileText },
  security: { name: "Security", icon: Shield },
};

export default function ToolsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredTools = tools.filter((tool) => {
    const matchesSearch =
      tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const popularTools = tools.filter((tool) => tool.popular);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">PDF Tools</h1>
          <p className="text-muted-foreground">
            Professional PDF processing tools for all your document needs
          </p>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tools..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedCategory === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory("all")}
          >
            All Tools
          </Button>
          {Object.entries(categories).map(([key, category]) => (
            <Button
              key={key}
              variant={selectedCategory === key ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(key)}
            >
              <category.icon className="mr-2 h-4 w-4" />
              {category.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Popular Tools (only show when no search/filter) */}
      {searchQuery === "" && selectedCategory === "all" && (
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Star className="h-5 w-5 text-yellow-500" />
            <h2 className="text-xl font-semibold">Most Popular</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {popularTools.map((tool) => (
              <Link key={tool.id} href={tool.href}>
                <Card className="h-full hover:shadow-md transition-shadow cursor-pointer group">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div
                        className={`rounded-lg p-2 bg-primary/10 group-hover:bg-primary/20 transition-colors`}
                      >
                        <tool.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex space-x-1">
                        {tool.popular && (
                          <Badge variant="secondary" className="text-xs">
                            Popular
                          </Badge>
                        )}
                        {tool.new && (
                          <Badge variant="default" className="text-xs">
                            New
                          </Badge>
                        )}
                      </div>
                    </div>
                    <CardTitle className="text-lg">{tool.title}</CardTitle>
                    <CardDescription className="text-sm">
                      {tool.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* All Tools */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            {selectedCategory === "all"
              ? "All Tools"
              : categories[selectedCategory as keyof typeof categories]?.name ||
                "Tools"}
          </h2>
          <span className="text-sm text-muted-foreground">
            {filteredTools.length} tool{filteredTools.length !== 1 ? "s" : ""}
          </span>
        </div>

        {filteredTools.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredTools.map((tool) => (
              <Link key={tool.id} href={tool.href}>
                <Card className="h-full hover:shadow-md transition-shadow cursor-pointer group">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div
                        className={`rounded-lg p-3 bg-primary/10 group-hover:bg-primary/20 transition-colors`}
                      >
                        <tool.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex flex-col space-y-1">
                        {tool.popular && (
                          <Badge variant="secondary" className="text-xs">
                            <Star className="w-3 h-3 mr-1" />
                            Popular
                          </Badge>
                        )}
                        {tool.new && (
                          <Badge variant="default" className="text-xs">
                            New
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {tool.title}
                      </CardTitle>
                      <CardDescription>{tool.description}</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">
                        {categories[tool.category].name}
                      </Badge>
                      <span className="text-xs text-muted-foreground group-hover:text-primary transition-colors">
                        Try now →
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <FileText className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No tools found</h3>
              <p className="text-muted-foreground text-center max-w-md">
                No tools match your search criteria. Try adjusting your search
                terms or browse all tools.
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Help Section */}
      <Card className="bg-muted/50">
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <div className="rounded-lg bg-primary/10 p-2">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Need help choosing a tool?</h3>
              <p className="text-sm text-muted-foreground">
                Our PDF tools are designed to handle any document processing
                task. Each tool supports files up to 50MB and processes them
                securely in the cloud.
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                <Badge variant="outline" className="text-xs">
                  50MB max file size
                </Badge>
                <Badge variant="outline" className="text-xs">
                  Secure processing
                </Badge>
                <Badge variant="outline" className="text-xs">
                  High quality output
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
