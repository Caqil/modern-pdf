import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import {
  FileText,
  Zap,
  Shield,
  Users,
  ArrowRight,
  Download,
  Merge,
  Scissors,
  Lock,
  RotateCw,
  FileImage,
  Search,
  PenTool,
  Droplets,
  CheckCircle,
  Star,
  Globe,
} from "lucide-react";

const tools = [
  {
    icon: Download,
    title: "Compress PDF",
    description: "Reduce file size while maintaining quality",
    href: "/tools/compress",
    color: "text-blue-600",
  },
  {
    icon: FileImage,
    title: "Convert PDF",
    description: "Convert to Word, Excel, PowerPoint, and more",
    href: "/tools/convert",
    color: "text-green-600",
  },
  {
    icon: Merge,
    title: "Merge PDFs",
    description: "Combine multiple PDF files into one",
    href: "/tools/merge",
    color: "text-purple-600",
  },
  {
    icon: Scissors,
    title: "Split PDF",
    description: "Extract pages or split into multiple files",
    href: "/tools/split",
    color: "text-orange-600",
  },
  {
    icon: Lock,
    title: "Protect PDF",
    description: "Add password protection to your documents",
    href: "/tools/protect",
    color: "text-red-600",
  },
  {
    icon: RotateCw,
    title: "Rotate PDF",
    description: "Rotate pages to the correct orientation",
    href: "/tools/rotate",
    color: "text-indigo-600",
  },
  {
    icon: Search,
    title: "OCR",
    description: "Extract text from scanned documents",
    href: "/tools/ocr",
    color: "text-yellow-600",
  },
  {
    icon: PenTool,
    title: "Sign PDF",
    description: "Add digital signatures to documents",
    href: "/tools/sign",
    color: "text-pink-600",
  },
  {
    icon: Droplets,
    title: "Watermark",
    description: "Add text or image watermarks",
    href: "/tools/watermark",
    color: "text-cyan-600",
  },
];

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Process your PDFs in seconds with our optimized engine",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your files are processed securely and deleted after use",
  },
  {
    icon: Globe,
    title: "Works Everywhere",
    description: "Access from any device with a web browser",
  },
  {
    icon: Users,
    title: "Team Friendly",
    description: "API access and bulk processing for businesses",
  },
];

const stats = [
  { label: "Files Processed", value: "10M+" },
  { label: "Happy Users", value: "500K+" },
  { label: "Countries", value: "150+" },
  { label: "Uptime", value: "99.9%" },
];

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 px-4 text-center bg-gradient-to-br from-primary/5 via-background to-secondary/5">
          <div className="max-w-6xl mx-auto">
            <Badge variant="outline" className="mb-6">
              <Star className="w-3 h-3 mr-1" />
              Trusted by 500,000+ users worldwide
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Professional PDF Tools
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Convert, compress, merge, split, and edit PDF files with our
              comprehensive suite of professional tools. Fast, secure, and easy
              to use.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" asChild>
                <Link href="/tools">
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/register">Create Account</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tools Grid */}
        <section className="py-20 px-4 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Everything You Need for PDF Processing
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our comprehensive toolkit covers all your PDF needs, from basic
                conversions to advanced editing and security features.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tools.map((tool) => (
                <Card
                  key={tool.title}
                  className="group hover:shadow-md transition-all duration-200 border-border/50"
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-lg bg-background ${tool.color}`}
                      >
                        <tool.icon className="h-5 w-5" />
                      </div>
                      <CardTitle className="text-lg">{tool.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-4">
                      {tool.description}
                    </CardDescription>
                    <Button
                      variant="ghost"
                      size="sm"
                      asChild
                      className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                    >
                      <Link href={tool.href}>
                        Try Now
                        <ArrowRight className="ml-2 h-3 w-3" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Choose ModernPDF?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Built with modern technology and security best practices to
                provide you with the best PDF processing experience.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature) => (
                <div key={feature.title} className="text-center">
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-primary/5">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Start Processing PDFs?
            </h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Join thousands of users who trust ModernPDF for their document
              processing needs.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/tools">
                  Try Tools Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/api-keys">Get API Access</Link>
              </Button>
            </div>

            <div className="mt-8 flex items-center justify-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <CheckCircle className="w-4 h-4 text-green-600" />
                No registration required
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="w-4 h-4 text-green-600" />
                Files auto-deleted
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="w-4 h-4 text-green-600" />
                Free to use
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
