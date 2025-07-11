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
  Target,
  Heart,
  Users,
  Globe,
  Shield,
  Zap,
  Award,
  TrendingUp,
  FileText,
  Code,
  ArrowRight,
  Star,
  Calendar,
  MapPin,
  Mail,
  Linkedin,
  Github,
  Clock,
  CheckCircle,
  Rocket,
  Building,
} from "lucide-react";

const teamMembers = [
  {
    name: "Alex Chen",
    role: "CEO & Co-Founder",
    bio: "Former Google engineer with 10+ years in document processing and AI. Passionate about making PDF tools accessible to everyone.",
    image: "AC",
    linkedin: "#",
    github: "#",
  },
  {
    name: "Sarah Rodriguez",
    role: "CTO & Co-Founder",
    bio: "Ex-Microsoft architect specializing in scalable cloud infrastructure. Expert in security and performance optimization.",
    image: "SR",
    linkedin: "#",
    github: "#",
  },
  {
    name: "David Kim",
    role: "VP of Engineering",
    bio: "Led engineering teams at Adobe and Dropbox. Focused on building reliable, user-friendly developer tools.",
    image: "DK",
    linkedin: "#",
    github: "#",
  },
  {
    name: "Emily Watson",
    role: "Head of Product",
    bio: "Product leader with experience at Figma and Notion. Drives product strategy and user experience design.",
    image: "EW",
    linkedin: "#",
    github: "#",
  },
];

const milestones = [
  {
    year: "2022",
    title: "Company Founded",
    description:
      "Started with a vision to make PDF processing simple and accessible for everyone.",
    icon: Rocket,
  },
  {
    year: "2023",
    title: "First Million Files",
    description:
      "Processed over 1 million PDF files, serving customers in 50+ countries.",
    icon: TrendingUp,
  },
  {
    year: "2023",
    title: "API Launch",
    description:
      "Launched developer API, enabling businesses to integrate PDF tools into their workflows.",
    icon: Code,
  },
  {
    year: "2024",
    title: "Global Scale",
    description: "Reached 500K+ users across 150+ countries with 99.9% uptime.",
    icon: Globe,
  },
];

const values = [
  {
    icon: Heart,
    title: "User-Centric Design",
    description:
      "Every feature we build starts with understanding our users' needs and pain points.",
  },
  {
    icon: Shield,
    title: "Privacy & Security",
    description:
      "We never store your files permanently and use enterprise-grade security measures.",
  },
  {
    icon: Zap,
    title: "Performance First",
    description:
      "Fast, reliable processing is at the core of everything we build.",
  },
  {
    icon: Globe,
    title: "Global Accessibility",
    description:
      "Making PDF tools available to everyone, everywhere, regardless of technical expertise.",
  },
];

const stats = [
  { value: "10M+", label: "Files Processed", icon: FileText },
  { value: "500K+", label: "Active Users", icon: Users },
  { value: "150+", label: "Countries", icon: Globe },
  { value: "99.9%", label: "Uptime", icon: Award },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-24 px-4 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5"></div>

          <div className="relative max-w-6xl mx-auto">
            <Badge variant="outline" className="mb-6">
              <Building className="w-3 h-3 mr-1" />
              About ModernPDF
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Simplifying PDF Processing for Everyone
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              We're on a mission to make PDF tools fast, secure, and accessible
              to millions of users worldwide. From individuals to enterprise
              teams, we power document workflows that matter.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" asChild>
                <Link href="/tools">
                  Try Our Tools
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center group">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-3 group-hover:bg-primary/20 transition-colors">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-3xl font-bold text-primary mb-1">
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

        {/* Mission Section */}
        <section className="py-20 px-4 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge variant="outline" className="mb-4">
                  <Target className="w-3 h-3 mr-1" />
                  Our Mission
                </Badge>
                <h2 className="text-3xl font-bold mb-6">
                  Making PDF Tools That Just Work
                </h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  We started ModernPDF because we were frustrated with existing
                  PDF tools. They were either too complex, unreliable, or
                  required expensive software installations.
                </p>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Our goal is simple: provide fast, secure, and easy-to-use PDF
                  processing tools that work reliably for everyone, from
                  students to Fortune 500 companies.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>No software installation required</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>Process files in seconds, not minutes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>Enterprise-grade security and privacy</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur-3xl"></div>
                <Card className="relative border-0 bg-gradient-to-br from-background to-muted/30">
                  <CardContent className="p-8">
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center">
                          <Clock className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold">Lightning Fast</h3>
                          <p className="text-sm text-muted-foreground">
                            Process files in under 10 seconds
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center">
                          <Shield className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold">Secure by Default</h3>
                          <p className="text-sm text-muted-foreground">
                            Files deleted after processing
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center">
                          <Globe className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold">Global Scale</h3>
                          <p className="text-sm text-muted-foreground">
                            Serving users in 150+ countries
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">
                <Heart className="w-3 h-3 mr-1" />
                Our Values
              </Badge>
              <h2 className="text-3xl font-bold mb-4">What Drives Us</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                These core values guide every decision we make and every feature
                we build.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <Card
                  key={index}
                  className="group hover:shadow-lg transition-all duration-300"
                >
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <value.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-20 px-4 bg-muted/30">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">
                <Calendar className="w-3 h-3 mr-1" />
                Our Journey
              </Badge>
              <h2 className="text-3xl font-bold mb-4">Key Milestones</h2>
              <p className="text-muted-foreground">
                From startup to serving millions of users worldwide.
              </p>
            </div>

            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex gap-6 group">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <milestone.icon className="w-6 h-6 text-primary" />
                    </div>
                    {index < milestones.length - 1 && (
                      <div className="w-px h-16 bg-border mt-4"></div>
                    )}
                  </div>
                  <div className="flex-1 pb-8">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge variant="outline">{milestone.year}</Badge>
                      <h3 className="text-xl font-semibold">
                        {milestone.title}
                      </h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">
                <Users className="w-3 h-3 mr-1" />
                Meet the Team
              </Badge>
              <h2 className="text-3xl font-bold mb-4">
                The People Behind ModernPDF
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We're a team of engineers, designers, and product experts
                passionate about solving document processing challenges.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <Card
                  key={index}
                  className="group hover:shadow-lg transition-all duration-300"
                >
                  <CardHeader className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform">
                      <span className="text-xl font-bold text-primary">
                        {member.image}
                      </span>
                    </div>
                    <CardTitle className="text-lg">{member.name}</CardTitle>
                    <CardDescription className="font-medium text-primary">
                      {member.role}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      {member.bio}
                    </p>
                    <div className="flex justify-center gap-2">
                      <Button size="sm" variant="ghost" asChild>
                        <Link href={member.linkedin}>
                          <Linkedin className="w-4 h-4" />
                        </Link>
                      </Button>
                      <Button size="sm" variant="ghost" asChild>
                        <Link href={member.github}>
                          <Github className="w-4 h-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-20 px-4 bg-primary/5">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Want to Learn More?</h2>
            <p className="text-muted-foreground mb-8 text-lg">
              We'd love to hear from you. Whether you have questions, feedback,
              or just want to say hello.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button size="lg" asChild>
                <Link href="/contact">
                  <Mail className="mr-2 h-4 w-4" />
                  Get in Touch
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/tools">Try Our Tools</Link>
              </Button>
            </div>

            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                San Francisco, CA
              </div>
              <div className="flex items-center gap-1">
                <Globe className="w-4 h-4" />
                Remote-first team
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4" />
                Series A funded
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
