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
  Sparkles,
  Play,
  ChevronRight,
  TrendingUp,
  Clock,
  Award,
  Target,
  Rocket,
} from "lucide-react";

const tools = [
  {
    icon: Download,
    title: "Compress PDF",
    description: "Reduce file size while maintaining quality",
    href: "/tools/compress",
    color: "text-blue-600",
    bgGradient: "from-blue-500/10 to-cyan-500/10",
    hoverGradient: "group-hover:from-blue-500/20 group-hover:to-cyan-500/20",
  },
  {
    icon: FileImage,
    title: "Convert PDF",
    description: "Convert to Word, Excel, PowerPoint, and more",
    href: "/tools/convert",
    color: "text-green-600",
    bgGradient: "from-green-500/10 to-emerald-500/10",
    hoverGradient:
      "group-hover:from-green-500/20 group-hover:to-emerald-500/20",
  },
  {
    icon: Merge,
    title: "Merge PDFs",
    description: "Combine multiple PDF files into one",
    href: "/tools/merge",
    color: "text-purple-600",
    bgGradient: "from-purple-500/10 to-violet-500/10",
    hoverGradient:
      "group-hover:from-purple-500/20 group-hover:to-violet-500/20",
  },
  {
    icon: Scissors,
    title: "Split PDF",
    description: "Extract pages or split into multiple files",
    href: "/tools/split",
    color: "text-orange-600",
    bgGradient: "from-orange-500/10 to-red-500/10",
    hoverGradient: "group-hover:from-orange-500/20 group-hover:to-red-500/20",
  },
  {
    icon: Lock,
    title: "Protect PDF",
    description: "Add password protection to your documents",
    href: "/tools/protect",
    color: "text-red-600",
    bgGradient: "from-red-500/10 to-pink-500/10",
    hoverGradient: "group-hover:from-red-500/20 group-hover:to-pink-500/20",
  },
  {
    icon: RotateCw,
    title: "Rotate PDF",
    description: "Rotate pages to the correct orientation",
    href: "/tools/rotate",
    color: "text-indigo-600",
    bgGradient: "from-indigo-500/10 to-blue-500/10",
    hoverGradient: "group-hover:from-indigo-500/20 group-hover:to-blue-500/20",
  },
  {
    icon: Search,
    title: "OCR",
    description: "Extract text from scanned documents",
    href: "/tools/ocr",
    color: "text-yellow-600",
    bgGradient: "from-yellow-500/10 to-orange-500/10",
    hoverGradient:
      "group-hover:from-yellow-500/20 group-hover:to-orange-500/20",
  },
  {
    icon: PenTool,
    title: "Sign PDF",
    description: "Add digital signatures to documents",
    href: "/tools/sign",
    color: "text-pink-600",
    bgGradient: "from-pink-500/10 to-rose-500/10",
    hoverGradient: "group-hover:from-pink-500/20 group-hover:to-rose-500/20",
  },
  {
    icon: Droplets,
    title: "Watermark",
    description: "Add text or image watermarks",
    href: "/tools/watermark",
    color: "text-cyan-600",
    bgGradient: "from-cyan-500/10 to-teal-500/10",
    hoverGradient: "group-hover:from-cyan-500/20 group-hover:to-teal-500/20",
  },
];

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Process your PDFs in seconds with our AI-powered optimization engine",
    color: "text-yellow-600",
    bgColor: "bg-yellow-500/10",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description:
      "Bank-grade encryption with automatic file deletion after processing",
    color: "text-green-600",
    bgColor: "bg-green-500/10",
  },
  {
    icon: Globe,
    title: "Universal Access",
    description:
      "Works seamlessly across all devices and platforms without downloads",
    color: "text-blue-600",
    bgColor: "bg-blue-500/10",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description:
      "Advanced API access, bulk processing, and team management tools",
    color: "text-purple-600",
    bgColor: "bg-purple-500/10",
  },
];

const stats = [
  {
    label: "Files Processed",
    value: "10M+",
    icon: FileText,
    description: "Documents processed this year",
  },
  {
    label: "Active Users",
    value: "500K+",
    icon: Users,
    description: "Professionals trust our platform",
  },
  {
    label: "Global Reach",
    value: "150+",
    icon: Globe,
    description: "Countries served worldwide",
  },
  {
    label: "Uptime",
    value: "99.9%",
    icon: TrendingUp,
    description: "Industry-leading reliability",
  },
];

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Product Manager",
    company: "TechCorp",
    content:
      "ModernPDF has streamlined our document workflow. The API integration was seamless and the processing speed is incredible.",
    rating: 5,
    avatar: "SC",
  },
  {
    name: "David Rodriguez",
    role: "Legal Consultant",
    company: "LawFirm Inc",
    content:
      "Security and reliability are paramount in our field. ModernPDF delivers on both fronts with exceptional service.",
    rating: 5,
    avatar: "DR",
  },
  {
    name: "Emily Watson",
    role: "Marketing Director",
    company: "Creative Agency",
    content:
      "The batch processing capabilities have saved us countless hours. It's now an essential part of our toolkit.",
    rating: 5,
    avatar: "EW",
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Header />

      <main className="flex-1">
        {/* Enhanced Hero Section */}
        <section className="relative py-24 px-4 text-center overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
            <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute top-40 right-20 w-40 h-40 bg-gradient-to-r from-secondary/20 to-accent/20 rounded-full blur-3xl animate-pulse delay-700"></div>
            <div className="absolute bottom-20 left-1/3 w-36 h-36 bg-gradient-to-r from-accent/20 to-primary/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>

          <div className="relative max-w-7xl mx-auto">
            {/* Enhanced Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 mb-8 backdrop-blur-sm hover:scale-105 transition-transform duration-300">
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              <Star className="w-3 h-3 text-yellow-500 fill-current" />
              <span className="text-sm font-medium bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Trusted by 500,000+ professionals worldwide
              </span>
              <Badge variant="secondary" className="text-xs font-semibold">
                ⚡ New
              </Badge>
            </div>

            {/* Enhanced Hero Title */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
              <span className="block bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
                Professional
              </span>
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                PDF Tools
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed">
              Transform your document workflow with our{" "}
              <span className="font-semibold text-primary">AI-powered</span> PDF
              processing suite. Convert, compress, merge, and edit with{" "}
              <span className="font-semibold text-secondary">
                enterprise-grade security
              </span>
              .
            </p>

            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Button
                size="lg"
                className="group relative overflow-hidden bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground px-8 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <Link href="/tools" className="flex items-center">
                  <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="group px-8 py-6 text-lg font-semibold rounded-xl border-2 hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 transition-all duration-300 transform hover:scale-105"
              >
                <Link href="/register" className="flex items-center">
                  <Rocket className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  Create Account
                </Link>
              </Button>
            </div>

            {/* Enhanced Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {stats.map((stat, index) => (
                <div key={stat.label} className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative bg-background/80 backdrop-blur-sm border border-border/50 rounded-2xl p-6 group-hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
                    <div className="flex items-center justify-center mb-3">
                      <div className="p-2 rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10">
                        <stat.icon className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-primary mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm font-medium text-foreground mb-1">
                      {stat.label}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {stat.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Tools Grid */}
        <section className="py-24 px-4 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-muted/30 to-background"></div>

          <div className="relative max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4">
                <Target className="w-3 h-3 mr-1" />
                Complete Toolkit
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Everything You Need for PDF Processing
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Our comprehensive toolkit covers all your PDF needs, from basic
                conversions to advanced editing and enterprise security
                features.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tools.map((tool, index) => (
                <Card
                  key={tool.title}
                  className={`group relative overflow-hidden border-0 bg-gradient-to-br ${tool.bgGradient} ${tool.hoverGradient} hover:shadow-2xl transition-all duration-500 transform hover:scale-105`}
                >
                  <div className="absolute inset-[1px] bg-background/95 rounded-lg"></div>

                  <div className="relative">
                    <CardHeader className="pb-4">
                      <div className="flex items-center gap-4">
                        <div
                          className={`p-3 rounded-xl bg-background group-hover:scale-110 transition-transform duration-300`}
                        >
                          <tool.icon className={`h-6 w-6 ${tool.color}`} />
                        </div>
                        <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">
                          {tool.title}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="mb-6 text-base leading-relaxed">
                        {tool.description}
                      </CardDescription>
                      <Button
                        variant="ghost"
                        size="sm"
                        asChild
                        className="group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 w-full justify-between font-medium"
                      >
                        <Link href={tool.href}>
                          Try Now
                          <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Features Section */}
        <section className="py-24 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5"></div>

          <div className="relative max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4">
                <Award className="w-3 h-3 mr-1" />
                Why Choose Us
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Why Choose ModernPDF?
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Built with modern technology and security best practices to
                provide you with the best PDF processing experience.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div key={feature.title} className="group text-center">
                  <div className="relative mx-auto w-20 h-20 mb-6">
                    <div
                      className={`absolute inset-0 ${feature.bgColor} rounded-2xl group-hover:scale-110 transition-transform duration-300`}
                    ></div>
                    <div className="relative z-10 w-full h-full flex items-center justify-center">
                      <feature.icon className={`h-8 w-8 ${feature.color}`} />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-24 px-4 bg-gradient-to-b from-muted/30 to-background">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4">
                <Users className="w-3 h-3 mr-1" />
                Customer Stories
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Trusted by Professionals
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                See what industry leaders are saying about ModernPDF
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card
                  key={index}
                  className="group relative overflow-hidden border-0 bg-gradient-to-br from-background to-muted/30 hover:shadow-2xl transition-all duration-500"
                >
                  <CardContent className="p-8">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 text-yellow-500 fill-current"
                        />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-6 leading-relaxed italic">
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full flex items-center justify-center">
                        <span className="font-bold text-primary text-sm">
                          {testimonial.avatar}
                        </span>
                      </div>
                      <div>
                        <div className="font-semibold">{testimonial.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {testimonial.role}
                        </div>
                        <div className="text-xs text-primary font-medium">
                          {testimonial.company}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced CTA Section */}
        <section className="py-24 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10"></div>

          <div className="relative max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30 mb-8 backdrop-blur-sm">
              <Clock className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">
                Start in seconds, no downloads required
              </span>
            </div>

            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Ready to Start Processing PDFs?
            </h2>
            <p className="text-xl text-muted-foreground mb-12 leading-relaxed max-w-3xl mx-auto">
              Join hundreds of thousands of professionals who trust ModernPDF
              for their critical document processing needs.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              <Button
                size="lg"
                className="group relative overflow-hidden bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground px-8 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <Link href="/tools" className="flex items-center">
                  <Zap className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  Try Tools Now
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="group px-8 py-6 text-lg font-semibold rounded-xl border-2 hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 transition-all duration-300 transform hover:scale-105"
              >
                <Link href="/api-keys" className="flex items-center">
                  <FileText className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  Get API Access
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              {[
                {
                  icon: CheckCircle,
                  text: "No registration required",
                  color: "text-green-500",
                },
                {
                  icon: Shield,
                  text: "Files auto-deleted",
                  color: "text-blue-500",
                },
                { icon: Zap, text: "Free to use", color: "text-yellow-500" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center gap-3 p-4 rounded-xl bg-background/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-colors duration-300"
                >
                  <item.icon className={`w-5 h-5 ${item.color}`} />
                  <span className="text-sm font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
