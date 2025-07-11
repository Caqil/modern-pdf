"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  FileText,
  User,
  Settings,
  CreditCard,
  Key,
  LogOut,
  Coins,
  DollarSign,
  BookOpen,
  HelpCircle,
  ToolCaseIcon,
} from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  balance?: number;
  freeOperationsRemaining?: number;
}

interface MobileNavProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: User | null;
  onLogout: () => void;
}

const navigationItems = [
  { label: "Tools", href: "/tools", icon: ToolCaseIcon },
  { label: "Pricing", href: "/pricing", icon: DollarSign },
  { label: "Documentation", href: "/docs", icon: BookOpen },
  { label: "Help", href: "/help", icon: HelpCircle },
];

const userMenuItems = [
  { label: "Dashboard", href: "/dashboard", icon: User },
  { label: "Profile Settings", href: "/profile", icon: Settings },
  { label: "API Keys", href: "/api-keys", icon: Key },
  { label: "Billing", href: "/billing", icon: CreditCard },
];

export default function MobileNav({
  open,
  onOpenChange,
  user,
  onLogout,
}: MobileNavProps) {
  const pathname = usePathname();

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

  const handleLinkClick = () => {
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle>
            <Link
              href="/"
              className="flex items-center space-x-2"
              onClick={handleLinkClick}
            >
              <FileText className="h-6 w-6" />
              <span className="text-xl font-bold">ModernPDF</span>
            </Link>
          </SheetTitle>
          <SheetDescription className="sr-only">
            Navigation menu for ModernPDF
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col h-full">
          {/* User Section */}
          {user && (
            <div className="py-6">
              <div className="flex items-center space-x-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="" alt={user.name} />
                  <AvatarFallback>{getUserInitials(user.name)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{user.name}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {user.email}
                  </p>
                </div>
              </div>

              {/* Balance and Operations */}
              <div className="mt-3 space-y-2">
                {user.balance !== undefined && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Balance:
                    </span>
                    <Badge variant="secondary" className="text-xs">
                      <Coins className="h-3 w-3 mr-1" />
                      {formatBalance(user.balance)}
                    </Badge>
                  </div>
                )}
                {user.freeOperationsRemaining !== undefined && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Free operations:
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {user.freeOperationsRemaining} left
                    </Badge>
                  </div>
                )}
              </div>

              <Separator className="mt-4" />
            </div>
          )}

          {/* Navigation Items */}
          <nav className="flex-1">
            <div className="space-y-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={handleLinkClick}
                  className={`flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground ${
                    pathname === item.href
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>

            {/* User Menu Items */}
            {user && (
              <>
                <Separator className="my-4" />
                <div className="space-y-1">
                  {userMenuItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={handleLinkClick}
                      className={`flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground ${
                        pathname === item.href
                          ? "bg-accent text-accent-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </nav>

          {/* Bottom Section */}
          <div className="pt-4 border-t">
            {user ? (
              <Button
                variant="ghost"
                onClick={() => {
                  onLogout();
                  handleLinkClick();
                }}
                className="w-full justify-start"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </Button>
            ) : (
              <div className="space-y-2">
                <Button asChild variant="outline" className="w-full">
                  <Link href="/login" onClick={handleLinkClick}>
                    Sign in
                  </Link>
                </Button>
                <Button asChild className="w-full">
                  <Link href="/register" onClick={handleLinkClick}>
                    Get started
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
