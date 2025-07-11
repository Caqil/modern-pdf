// src/components/layout/header.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import ThemeSwitcher from "@/components/common/theme-switcher";
import { apiClient } from "@/lib/api/apiClient";
import {
  FileText,
  User,
  Settings,
  CreditCard,
  Key,
  LogOut,
  Menu,
  Coins,
} from "lucide-react";
import { toast } from "sonner";
import MobileNav from "./mobile-nav";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  balance?: number;
  freeOperationsRemaining?: number;
}

const navigationItems = [
  { label: "Tools", href: "/tools" },
  { label: "Pricing", href: "/pricing" },
  { label: "Documentation", href: "/docs" },
  { label: "Help", href: "/help" },
];

export default function Header() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false); // Start as false
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    checkAuthStatus();
  }, [pathname]);

  const clearAuthData = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("apiKey");
    localStorage.removeItem("user");
  };

  const checkAuthStatus = async () => {
    try {
      // First, load user from localStorage if available
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (error) {
          console.error("Error parsing stored user:", error);
          localStorage.removeItem("user");
        }
      }

      // Only validate token on protected pages
      const protectedPaths = [
        "/dashboard",
        "/profile",
        "/tools",
        "/settings",
        "/api-keys",
      ];
      const isProtectedPage = protectedPaths.some((path) =>
        pathname.startsWith(path)
      );

      if (!isProtectedPage) {
        // On public pages, we're done - just show what we have in localStorage
        setIsLoading(false);
        return;
      }

      // On protected pages, validate with server
      const token = localStorage.getItem("authToken");
      if (!token) {
        setUser(null);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const response = await apiClient.auth.validateToken();

        if (response.data?.valid === true) {
          // Fetch fresh user data
          const userResponse = await apiClient.user.getProfile();
          const userData = userResponse.data;
          setUser(userData);
          localStorage.setItem("user", JSON.stringify(userData));
        } else {
          throw new Error("Token validation failed");
        }
      } catch (error: any) {
        console.error("Auth validation failed:", error);
        setUser(null);
        clearAuthData();
      }
    } catch (error: any) {
      console.error("Auth check failed:", error);
      setUser(null);
      clearAuthData();
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await apiClient.auth.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      clearAuthData();
      setUser(null);
      toast.success("Logged out successfully");
      router.push("/");
    }
  };

  const getUserInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const formatBalance = (balance: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(balance);
  };

  // Check if we're on auth pages
  const isAuthPage =
    pathname === "/login" ||
    pathname === "/register" ||
    pathname === "/forgot-password";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <FileText className="h-6 w-6" />
            <span className="text-xl font-bold">ModernPDF</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === item.href
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            <ThemeSwitcher />

            {/* Auth Section */}
            {isLoading ? (
              <div className="h-8 w-8 rounded-full bg-muted animate-pulse" />
            ) : user ? (
              // Logged in user dropdown
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/avatars/default.png" alt={user.name} />
                      <AvatarFallback className="text-xs">
                        {getUserInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user.name}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                      <div className="flex items-center space-x-2 pt-2">
                        {user.balance !== undefined && (
                          <Badge variant="secondary" className="text-xs">
                            <Coins className="mr-1 h-3 w-3" />
                            {formatBalance(user.balance)}
                          </Badge>
                        )}
                        {user.freeOperationsRemaining !== undefined && (
                          <Badge variant="outline" className="text-xs">
                            {user.freeOperationsRemaining} free left
                          </Badge>
                        )}
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link href="/profile">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link href="/profile/api-keys">
                      <Key className="mr-2 h-4 w-4" />
                      API Keys
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link href="/settings">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link href="/billing">
                      <CreditCard className="mr-2 h-4 w-4" />
                      Billing
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="cursor-pointer"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              // Not logged in - show login/register buttons (but not on auth pages)
              !isAuthPage && (
                <div className="hidden md:flex items-center space-x-2">
                  <Button variant="ghost" asChild>
                    <Link href="/login">Sign in</Link>
                  </Button>
                  <Button asChild>
                    <Link href="/register">Get started</Link>
                  </Button>
                </div>
              )
            )}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileNavOpen(true)}
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <MobileNav
        open={mobileNavOpen}
        onOpenChange={setMobileNavOpen}
        user={user}
        onLogout={handleLogout}
      />
    </header>
  );
}
