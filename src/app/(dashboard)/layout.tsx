"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Loader2 } from "lucide-react";
import { apiClient } from "@/lib/api/apiClient";
import { toast, Toaster } from "sonner";
import AppSidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";
const clearAuthData = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("apiKey");
  localStorage.removeItem("user"); // This was missing!
};
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    validateAuthentication();
  }, []);

  const clearAuthData = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("apiKey");
    localStorage.removeItem("user");
  };

  const validateAuthentication = async () => {
    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        clearAuthData();
        router.push("/login");
        return;
      }

      try {
        const response = await apiClient.auth.validateToken();

        // Check if response indicates valid token
        if (response.data?.valid === true) {
          setIsAuthenticated(true);
        } else {
          throw new Error("Token validation failed");
        }
      } catch (error: any) {
        console.error("Token validation failed:", error);

        // Clear all auth data
        clearAuthData();

        // Show toast only if it's not a 401 (handled by interceptor)
        if (error.response?.status !== 401) {
          toast("Please log in again to continue.");
        }

        router.push("/login");
        return;
      }
    } catch (error) {
      console.error("Authentication check failed:", error);
      clearAuthData();
      router.push("/login");
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading screen while checking authentication
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Don't render dashboard if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <SidebarInset className="flex flex-1 flex-col">
          <Header />
          <main className="flex-1 p-6">{children}</main>
        </SidebarInset>
      </div>
      <Toaster />
    </SidebarProvider>
  );
}
