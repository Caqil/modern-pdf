"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import {
  AlertTriangle,
  RefreshCw,
  Home,
  ArrowLeft,
  Bug,
  Mail,
} from "lucide-react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error);
  }, [error]);

  const getErrorMessage = (error: Error) => {
    // Common error types
    if (error.message.includes("fetch")) {
      return "Network connection failed. Please check your internet connection and try again.";
    }
    if (error.message.includes("timeout")) {
      return "The request timed out. Please try again in a moment.";
    }
    if (error.message.includes("unauthorized") || error.message.includes("401")) {
      return "You need to log in to access this content.";
    }
    if (error.message.includes("forbidden") || error.message.includes("403")) {
      return "You don't have permission to access this content.";
    }
    if (error.message.includes("not found") || error.message.includes("404")) {
      return "The requested content could not be found.";
    }
    
    // Generic error message
    return "An unexpected error occurred. Our team has been notified and is working to fix this issue.";
  };

  const getErrorTitle = (error: Error) => {
    if (error.message.includes("fetch") || error.message.includes("network")) {
      return "Connection Error";
    }
    if (error.message.includes("unauthorized") || error.message.includes("forbidden")) {
      return "Access Denied";
    }
    if (error.message.includes("not found")) {
      return "Content Not Found";
    }
    
    return "Something Went Wrong";
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="max-w-2xl mx-auto">
          <Card className="border-destructive/50">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mb-4">
                <AlertTriangle className="w-8 h-8 text-destructive" />
              </div>
              <CardTitle className="text-2xl text-destructive">
                {getErrorTitle(error)}
              </CardTitle>
              <CardDescription className="text-lg">
                {getErrorMessage(error)}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Error Details (Development Only) */}
              {process.env.NODE_ENV === "development" && (
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Bug className="w-4 h-4" />
                    Error Details (Development)
                  </h4>
                  <code className="text-sm text-muted-foreground break-all">
                    {error.message}
                  </code>
                  {error.digest && (
                    <p className="text-xs text-muted-foreground mt-2">
                      Error ID: {error.digest}
                    </p>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button onClick={reset} className="flex-1">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Try Again
                </Button>
                <Button variant="outline" asChild className="flex-1">
                  <Link href="/">
                    <Home className="mr-2 h-4 w-4" />
                    Go Home
                  </Link>
                </Button>
              </div>

              {/* Additional Help */}
              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">
                  If this problem persists, please contact our support team.
                </p>
                <div className="flex justify-center gap-4">
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/help">
                      Get Help
                    </Link>
                  </Button>
                  <Button variant="ghost" size="sm" asChild>
                    <a href="mailto:support@modernpdf.com">
                      <Mail className="mr-2 h-3 w-3" />
                      Contact Support
                    </a>
                  </Button>
                </div>
              </div>

              {/* Back Button */}
              <div className="text-center">
                <Button variant="ghost" onClick={() => window.history.back()}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Go Back
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}