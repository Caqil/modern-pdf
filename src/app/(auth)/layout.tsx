"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ThemeSwitcher from "@/components/common/theme-switcher";
import { apiClient } from "@/lib/api/apiClient";
import { Toaster } from "sonner";
import { User } from "@/types/api";
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
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const clearAuthData = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("apiKey");
    localStorage.removeItem("user");
  };

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem("authToken");

      // If no token, skip validation and go straight to auth page
      if (!token) {
        setIsChecking(false);
        return;
      }

      // Only validate if we have a token
      try {
        const response = await apiClient.auth.validateToken();

        // Only redirect if token is actually valid
        if (response.data?.valid === true) {
          router.push("/dashboard");
          return;
        } else {
          // Token exists but is invalid
          clearAuthData();
        }
      } catch (error: any) {
        // Token validation failed, clear it
        console.error("Token validation failed:", error);
        clearAuthData();
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      clearAuthData();
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
