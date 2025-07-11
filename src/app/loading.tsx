import { Loader2, FileText } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header Skeleton */}
      <header className="border-b">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Skeleton className="h-8 w-32" />
            <div className="hidden md:flex items-center gap-6">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-18" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Skeleton className="h-9 w-20" />
            <Skeleton className="h-9 w-24" />
          </div>
        </div>
      </header>

      {/* Main Loading Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="text-center">
          {/* Loading Animation */}
          <div className="mb-8">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <div className="relative">
                <FileText className="w-8 h-8 text-primary" />
                <Loader2 className="absolute -top-1 -right-1 w-4 h-4 text-primary animate-spin" />
              </div>
            </div>
          </div>

          {/* Loading Text */}
          <h2 className="text-xl font-semibold mb-2">Loading...</h2>
          <p className="text-muted-foreground mb-8">
            Please wait while we prepare your content
          </p>

          {/* Loading Bars */}
          <div className="max-w-sm mx-auto space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5 mx-auto" />
            <Skeleton className="h-4 w-3/4 mx-auto" />
          </div>
        </div>
      </main>

      {/* Footer Skeleton */}
      <footer className="border-t bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="h-5 w-24" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-18" />
                </div>
              </div>
            ))}
          </div>
          <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <Skeleton className="h-4 w-48" />
            <div className="flex gap-4">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-8 w-8 rounded" />
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
