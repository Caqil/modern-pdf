"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ThemeSwitcher from "@/components/common/theme-switcher";
import { apiClient } from "@/lib/api/apiClient";
import { Toaster } from "sonner";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem("authToken");

      if (token) {
        // Try to validate the token
        try {
          await apiClient.auth.validateToken();
          // Token is valid, redirect to dashboard
          router.push("/dashboard");
          return;
        } catch (error) {
          // Token is invalid, clear it and continue to auth page
          localStorage.removeItem("authToken");
          localStorage.removeItem("apiKey");
        }
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      // Clear any invalid tokens
      localStorage.removeItem("authToken");
      localStorage.removeItem("apiKey");
    } finally {
      setIsChecking(false);
    }
  };

  // Don't render until we've checked auth status
  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="absolute top-4 right-4">
        <ThemeSwitcher />
      </div>
      {children}
      <Toaster />
    </div>
  );
}
