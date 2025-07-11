"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import {
  Home,
  ArrowLeft,
  FileQuestion,
  Search,
  HelpCircle,
} from "lucide-react";

const quickLinks = [
  {
    icon: FileQuestion,
    label: "PDF Tools",
    href: "/tools",
    description: "Browse all available PDF tools",
  },
  {
    icon: Home,
    label: "Homepage",
    href: "/",
    description: "Go back to the main page",
  },
  {
    icon: Search,
    label: "Search",
    href: "/tools",
    description: "Find the tool you're looking for",
  },
  {
    icon: HelpCircle,
    label: "Help Center",
    href: "/help",
    description: "Get help and support",
  },
];

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="max-w-2xl mx-auto text-center">
          {/* Error Icon */}
          <div className="mb-8">
            <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center">
              <FileQuestion className="w-12 h-12 text-muted-foreground" />
            </div>
          </div>

          {/* Error Message */}
          <div className="mb-8">
            <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
            <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              The page you're looking for doesn't exist or has been moved. Don't
              worry, you can easily find what you're looking for using the links
              below.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" asChild>
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Go Home
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/tools">
                <FileQuestion className="mr-2 h-4 w-4" />
                Browse Tools
              </Link>
            </Button>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quickLinks.map((link) => (
              <Card
                key={link.href}
                className="hover:shadow-md transition-shadow"
              >
                <CardContent className="p-6">
                  <Link href={link.href} className="block">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <link.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="text-left">
                        <h3 className="font-semibold mb-1">{link.label}</h3>
                        <p className="text-sm text-muted-foreground">
                          {link.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Back Link */}
          <div className="mt-8">
            <Button variant="ghost" onClick={() => window.history.back()}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
