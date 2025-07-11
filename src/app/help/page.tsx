"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import {
  Search,
  HelpCircle,
  BookOpen,
  Zap,
  CreditCard,
  Shield,
  FileText,
  Download,
  Upload,
  Settings,
  Users,
  Code,
  MessageSquare,
  Mail,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  Clock,
  Star,
  Lightbulb,
  Video,
  ExternalLink,
} from "lucide-react";

const helpCategories = [
  {
    icon: Zap,
    title: "Getting Started",
    description: "New to ModernPDF? Start here",
    articleCount: 12,
    color: "text-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-950/20",
    topics: [
      "Account setup",
      "First PDF processing",
      "Understanding pricing",
      "Basic features",
    ],
  },
  {
    icon: FileText,
    title: "PDF Tools",
    description: "How to use our PDF processing tools",
    articleCount: 24,
    color: "text-green-600",
    bgColor: "bg-green-50 dark:bg-green-950/20",
    topics: [
      "Compress PDFs",
      "Convert formats",
      "Merge & split",
      "OCR processing",
    ],
  },
  {
    icon: CreditCard,
    title: "Billing & Pricing",
    description: "Payment, billing, and pricing questions",
    articleCount: 8,
    color: "text-purple-600",
    bgColor: "bg-purple-50 dark:bg-purple-950/20",
    topics: [
      "Pay-per-operation",
      "Volume discounts",
      "Payment methods",
      "Billing issues",
    ],
  },
  {
    icon: Shield,
    title: "Security & Privacy",
    description: "Data protection and security features",
    articleCount: 6,
    color: "text-orange-600",
    bgColor: "bg-orange-50 dark:bg-orange-950/20",
    topics: [
      "File encryption",
      "Data retention",
      "Privacy policy",
      "GDPR compliance",
    ],
  },
  {
    icon: Code,
    title: "API & Integration",
    description: "Developer resources and API documentation",
    articleCount: 18,
    color: "text-indigo-600",
    bgColor: "bg-indigo-50 dark:bg-indigo-950/20",
    topics: ["API basics", "Authentication", "Rate limits", "Error handling"],
  },
  {
    icon: Settings,
    title: "Account Management",
    description: "Managing your account and settings",
    articleCount: 10,
    color: "text-pink-600",
    bgColor: "bg-pink-50 dark:bg-pink-950/20",
    topics: [
      "Profile settings",
      "API keys",
      "Usage tracking",
      "Account deletion",
    ],
  },
];

const popularArticles = [
  {
    title: "How to compress a PDF file",
    category: "PDF Tools",
    views: "15.2K views",
    readTime: "2 min read",
    difficulty: "Beginner",
    href: "/help/compress-pdf",
  },
  {
    title: "Understanding pay-per-operation pricing",
    category: "Billing",
    views: "12.8K views",
    readTime: "3 min read",
    difficulty: "Beginner",
    href: "/help/pricing-guide",
  },
  {
    title: "Getting started with the API",
    category: "API",
    views: "9.5K views",
    readTime: "5 min read",
    difficulty: "Intermediate",
    href: "/help/api-quickstart",
  },
  {
    title: "File security and data retention",
    category: "Security",
    views: "7.3K views",
    readTime: "4 min read",
    difficulty: "Beginner",
    href: "/help/security-overview",
  },
  {
    title: "Bulk processing with API",
    category: "API",
    views: "6.1K views",
    readTime: "8 min read",
    difficulty: "Advanced",
    href: "/help/bulk-processing",
  },
  {
    title: "Managing API keys and authentication",
    category: "Account",
    views: "5.7K views",
    readTime: "3 min read",
    difficulty: "Intermediate",
    href: "/help/api-keys",
  },
];

const faqSections = [
  {
    category: "General",
    faqs: [
      {
        question: "What file formats do you support?",
        answer:
          "We support PDF as the primary format for input and output. For conversions, we support Word (DOCX), Excel (XLSX), PowerPoint (PPTX), and image formats (JPG, PNG). OCR works with scanned PDFs and image files.",
      },
      {
        question: "What's the maximum file size I can upload?",
        answer:
          "Free accounts can upload files up to 10MB. Paid accounts can upload files up to 100MB. Enterprise customers can request higher limits based on their needs.",
      },
      {
        question: "How long are my files stored?",
        answer:
          "All uploaded files are automatically deleted within 1 hour of processing for security and privacy. We never permanently store your documents.",
      },
      {
        question: "Do you offer refunds?",
        answer:
          "Due to the immediate nature of our service, we generally don't offer refunds for completed operations. However, we may provide credits for service outages or technical errors.",
      },
    ],
  },
  {
    category: "Technical",
    faqs: [
      {
        question: "Why is my PDF conversion taking longer than expected?",
        answer:
          "Processing time depends on file size, complexity, and current server load. Most files process within 10-30 seconds. Large files or complex documents may take up to 2 minutes.",
      },
      {
        question: "Can I process password-protected PDFs?",
        answer:
          "Yes, but you'll need to provide the password during upload. For security, we recommend removing passwords before processing when possible.",
      },
      {
        question: "What happens if processing fails?",
        answer:
          "If processing fails due to a technical error on our end, you won't be charged for that operation. We'll also provide details about why the processing failed when possible.",
      },
      {
        question: "Do you support batch processing?",
        answer:
          "Yes! You can upload multiple files at once through our web interface, or use our API for programmatic batch processing with higher throughput.",
      },
    ],
  },
  {
    category: "API",
    faqs: [
      {
        question: "What are the API rate limits?",
        answer:
          "Free accounts: 10 requests/minute. Paid accounts: 60 requests/minute. Enterprise accounts have custom limits. Rate limits are per API key.",
      },
      {
        question: "How do I authenticate with the API?",
        answer:
          "Use your API key in the Authorization header: 'Authorization: Bearer YOUR_API_KEY'. You can generate API keys in your account dashboard.",
      },
      {
        question: "Can I use the API for commercial purposes?",
        answer:
          "Yes! Our API is designed for commercial use. You only pay for the operations you use, with automatic volume discounts for higher usage.",
      },
      {
        question: "Do you provide SDKs or code examples?",
        answer:
          "Yes, we provide SDKs for popular languages (Python, Node.js, PHP, Java) and comprehensive code examples in our API documentation.",
      },
    ],
  },
];

const quickGuides = [
  {
    title: "Compress Your First PDF",
    description: "Learn how to reduce PDF file size while maintaining quality",
    steps: [
      "Upload your PDF file",
      "Choose compression level",
      "Download compressed file",
    ],
    duration: "30 seconds",
    icon: Download,
  },
  {
    title: "Convert PDF to Word",
    description: "Transform PDFs into editable Word documents",
    steps: ["Upload PDF file", "Select Word format", "Download converted file"],
    duration: "1 minute",
    icon: FileText,
  },
  {
    title: "Set Up API Access",
    description: "Get started with programmatic PDF processing",
    steps: ["Create account", "Generate API key", "Make first API call"],
    duration: "5 minutes",
    icon: Code,
  },
];

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("browse");

  const filteredCategories = helpCategories.filter(
    (category) =>
      category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.topics.some((topic) =>
        topic.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  const filteredArticles = popularArticles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 px-4 text-center bg-gradient-to-br from-primary/5 via-background to-secondary/5">
          <div className="max-w-4xl mx-auto">
            <Badge variant="outline" className="mb-6">
              <HelpCircle className="w-3 h-3 mr-1" />
              Help Center
            </Badge>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              How Can We Help?
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Find answers to common questions, step-by-step guides, and
              detailed documentation to get the most out of ModernPDF.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search for help articles, guides, or topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-3 text-lg border-2 focus:border-primary"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto text-sm text-muted-foreground">
              <div className="flex items-center justify-center gap-1">
                <CheckCircle className="w-4 h-4 text-green-600" />
                500+ help articles
              </div>
              <div className="flex items-center justify-center gap-1">
                <Video className="w-4 h-4 text-green-600" />
                Video tutorials
              </div>
              <div className="flex items-center justify-center gap-1">
                <Clock className="w-4 h-4 text-green-600" />
                Always up-to-date
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4 max-w-2xl mx-auto mb-12">
                <TabsTrigger value="browse">Browse Topics</TabsTrigger>
                <TabsTrigger value="popular">Popular</TabsTrigger>
                <TabsTrigger value="guides">Quick Guides</TabsTrigger>
                <TabsTrigger value="faq">FAQ</TabsTrigger>
              </TabsList>

              <TabsContent value="browse">
                <div className="space-y-8">
                  <div className="text-center">
                    <h2 className="text-3xl font-bold mb-4">Browse by Topic</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                      Find help articles organized by category.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCategories.map((category, index) => (
                      <Card
                        key={index}
                        className="group hover:shadow-lg transition-all duration-300 cursor-pointer"
                      >
                        <CardHeader>
                          <div
                            className={`w-12 h-12 ${category.bgColor} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                          >
                            <category.icon
                              className={`h-6 w-6 ${category.color}`}
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">
                              {category.title}
                            </CardTitle>
                            <Badge variant="outline" className="text-xs">
                              {category.articleCount} articles
                            </Badge>
                          </div>
                          <CardDescription>
                            {category.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            {category.topics.map((topic, topicIndex) => (
                              <div
                                key={topicIndex}
                                className="flex items-center gap-2 text-sm text-muted-foreground"
                              >
                                <div className="w-1 h-1 bg-current rounded-full"></div>
                                {topic}
                              </div>
                            ))}
                          </div>
                          <Button
                            variant="ghost"
                            className="w-full mt-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                          >
                            View Articles
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="popular">
                <div className="space-y-8">
                  <div className="text-center">
                    <h2 className="text-3xl font-bold mb-4">
                      Most Popular Articles
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                      The most viewed and helpful articles from our community.
                    </p>
                  </div>

                  <div className="grid gap-4 max-w-4xl mx-auto">
                    {filteredArticles.map((article, index) => (
                      <Card
                        key={index}
                        className="group hover:shadow-lg transition-all duration-300"
                      >
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                                  {article.title}
                                </h3>
                                <Badge
                                  variant={
                                    article.difficulty === "Beginner"
                                      ? "secondary"
                                      : article.difficulty === "Intermediate"
                                      ? "default"
                                      : "destructive"
                                  }
                                  className="text-xs"
                                >
                                  {article.difficulty}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <span>{article.category}</span>
                                <span>•</span>
                                <span>{article.readTime}</span>
                                <span>•</span>
                                <span className="flex items-center gap-1">
                                  <Star className="w-3 h-3" />
                                  {article.views}
                                </span>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm" asChild>
                              <Link href={article.href}>
                                <ExternalLink className="w-4 h-4" />
                              </Link>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="guides">
                <div className="space-y-8">
                  <div className="text-center">
                    <h2 className="text-3xl font-bold mb-4">
                      Quick Start Guides
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                      Step-by-step guides to get you started quickly.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {quickGuides.map((guide, index) => (
                      <Card
                        key={index}
                        className="group hover:shadow-lg transition-all duration-300"
                      >
                        <CardHeader>
                          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                            <guide.icon className="h-6 w-6 text-primary" />
                          </div>
                          <CardTitle className="text-lg">
                            {guide.title}
                          </CardTitle>
                          <CardDescription>{guide.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3 mb-4">
                            {guide.steps.map((step, stepIndex) => (
                              <div
                                key={stepIndex}
                                className="flex items-center gap-3"
                              >
                                <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-xs font-semibold text-primary">
                                  {stepIndex + 1}
                                </div>
                                <span className="text-sm">{step}</span>
                              </div>
                            ))}
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Clock className="w-3 h-3" />
                              {guide.duration}
                            </div>
                            <Button size="sm" variant="outline">
                              Start Guide
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="faq">
                <div className="space-y-8">
                  <div className="text-center">
                    <h2 className="text-3xl font-bold mb-4">
                      Frequently Asked Questions
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                      Quick answers to the most common questions.
                    </p>
                  </div>

                  <div className="max-w-4xl mx-auto">
                    {faqSections.map((section, sectionIndex) => (
                      <div key={sectionIndex} className="mb-8">
                        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          {section.category}
                        </h3>
                        <Accordion
                          type="single"
                          collapsible
                          className="space-y-2"
                        >
                          {section.faqs.map((faq, faqIndex) => (
                            <AccordionItem
                              key={faqIndex}
                              value={`${sectionIndex}-${faqIndex}`}
                              className="border rounded-lg px-4"
                            >
                              <AccordionTrigger className="text-left hover:no-underline">
                                {faq.question}
                              </AccordionTrigger>
                              <AccordionContent className="text-muted-foreground leading-relaxed">
                                {faq.answer}
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Contact Support */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 mb-8">
              <Lightbulb className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Still need help?</span>
            </div>

            <h2 className="text-3xl font-bold mb-4">
              Can't Find What You're Looking For?
            </h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Our support team is here to help you succeed with ModernPDF.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <Card className="group hover:shadow-lg transition-all duration-300">
                <CardHeader className="text-center">
                  <MessageSquare className="w-8 h-8 text-primary mx-auto mb-2" />
                  <CardTitle>Contact Support</CardTitle>
                  <CardDescription>
                    Get personalized help from our team
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" asChild>
                    <Link href="/contact">
                      Send Message
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-lg transition-all duration-300">
                <CardHeader className="text-center">
                  <Code className="w-8 h-8 text-primary mx-auto mb-2" />
                  <CardTitle>API Documentation</CardTitle>
                  <CardDescription>
                    Detailed technical documentation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/docs">
                      View Docs
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
