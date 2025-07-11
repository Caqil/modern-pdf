import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ModernPDF - Professional PDF Tools",
  description:
    "Convert, compress, merge, split, and edit PDF files with our professional online tools. Fast, secure, and easy to use.",
  keywords: ["PDF", "convert", "compress", "merge", "split", "edit", "tools"],
  authors: [{ name: "ModernPDF Team" }],
  creator: "ModernPDF",
  publisher: "ModernPDF",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://modernpdf.com",
    title: "ModernPDF - Professional PDF Tools",
    description:
      "Convert, compress, merge, split, and edit PDF files with our professional online tools.",
    siteName: "ModernPDF",
  },
  twitter: {
    card: "summary_large_image",
    title: "ModernPDF - Professional PDF Tools",
    description:
      "Convert, compress, merge, split, and edit PDF files with our professional online tools.",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen bg-background flex flex-col">
            {children}
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
