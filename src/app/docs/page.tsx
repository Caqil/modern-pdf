"use client";

import { useState } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import {
  Code,
  Book,
  Zap,
  Key,
  Globe,
  ArrowRight,
  Copy,
  ExternalLink,
  CheckCircle,
  AlertTriangle,
  Play,
  Download,
  Upload,
  FileText,
  Settings,
  BarChart3,
  Clock,
  Shield,
  Terminal,
  Layers,
  Box,
  Cpu,
} from "lucide-react";

const quickStartSteps = [
  {
    title: "Get Your API Key",
    description: "Sign up and generate your API key from the dashboard",
    code: "// Get your API key from: https://modernpdf.com/dashboard/api-keys",
    icon: Key,
  },
  {
    title: "Make Your First Request",
    description: "Compress a PDF file using our API",
    code: `curl -X POST https://api.modernpdf.com/v1/compress \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -F "file=@document.pdf" \\
  -F "quality=medium"`,
    icon: Play,
  },
  {
    title: "Get the Result",
    description: "Download the processed file or get the result URL",
    code: `{
  "success": true,
  "file_url": "https://api.modernpdf.com/files/abc123.pdf",
  "original_size": 2048576,
  "compressed_size": 1024288,
  "compression_ratio": 50
}`,
    icon: Download,
  },
];

const endpoints = [
  {
    method: "POST",
    path: "/v1/compress",
    description: "Compress PDF files",
    params: ["file", "quality"],
    pricing: "$0.05 per operation",
  },
  {
    method: "POST",
    path: "/v1/convert",
    description: "Convert PDF to other formats",
    params: ["file", "format"],
    pricing: "$0.08 per operation",
  },
  {
    method: "POST",
    path: "/v1/merge",
    description: "Merge multiple PDF files",
    params: ["files[]"],
    pricing: "$0.03 per operation",
  },
  {
    method: "POST",
    path: "/v1/split",
    description: "Split PDF into multiple files",
    params: ["file", "pages"],
    pricing: "$0.04 per operation",
  },
  {
    method: "POST",
    path: "/v1/ocr",
    description: "Extract text from PDFs using OCR",
    params: ["file", "language"],
    pricing: "$0.12 per operation",
  },
  {
    method: "GET",
    path: "/v1/account/usage",
    description: "Get account usage statistics",
    params: [],
    pricing: "Free",
  },
];

const sdkExamples = [
  {
    language: "JavaScript",
    code: `import ModernPDF from 'modernpdf-js';

const client = new ModernPDF('YOUR_API_KEY');

// Compress a PDF
const result = await client.compress({
  file: './document.pdf',
  quality: 'medium'
});

console.log('Compressed file URL:', result.file_url);`,
    install: "npm install modernpdf-js",
  },
  {
    language: "Python",
    code: `import modernpdf

client = modernpdf.Client('YOUR_API_KEY')

# Compress a PDF
with open('document.pdf', 'rb') as file:
    result = client.compress(
        file=file,
        quality='medium'
    )

print(f"Compressed file URL: {result['file_url']}")`,
    install: "pip install modernpdf",
  },
  {
    language: "PHP",
    code: `<?php
require_once 'vendor/autoload.php';

$client = new ModernPDF\\Client('YOUR_API_KEY');

// Compress a PDF
$result = $client->compress([
    'file' => new CURLFile('document.pdf'),
    'quality' => 'medium'
]);

echo "Compressed file URL: " . $result['file_url'];`,
    install: "composer require modernpdf/php-sdk",
  },
];

const rateLimits = [
  { tier: "Free", requests: "10/minute", burst: "20", resetTime: "1 minute" },
  { tier: "Paid", requests: "60/minute", burst: "120", resetTime: "1 minute" },
  {
    tier: "Enterprise",
    requests: "Custom",
    burst: "Custom",
    resetTime: "Custom",
  },
];

const statusCodes = [
  {
    code: "200",
    meaning: "Success",
    description: "Request completed successfully",
  },
  {
    code: "400",
    meaning: "Bad Request",
    description: "Invalid request parameters",
  },
  {
    code: "401",
    meaning: "Unauthorized",
    description: "Invalid or missing API key",
  },
  {
    code: "402",
    meaning: "Payment Required",
    description: "Insufficient credits",
  },
  {
    code: "413",
    meaning: "File Too Large",
    description: "File exceeds size limit",
  },
  { code: "429", meaning: "Rate Limited", description: "Too many requests" },
  {
    code: "500",
    meaning: "Server Error",
    description: "Internal server error",
  },
];

export default function DocsPage() {
  const [copiedCode, setCopiedCode] = useState<string>("");

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(""), 2000);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 px-4 text-center bg-gradient-to-br from-primary/5 via-background to-secondary/5">
          <div className="max-w-4xl mx-auto">
            <Badge variant="outline" className="mb-6">
              <Code className="w-3 h-3 mr-1" />
              API Documentation
            </Badge>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Developer API Reference
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Integrate PDF processing into your applications with our simple,
              powerful REST API. Process millions of documents with
              enterprise-grade reliability.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button size="lg" asChild>
                <Link href="/register">
                  Get API Key
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#quickstart">View Examples</a>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto text-sm text-muted-foreground">
              <div className="flex items-center justify-center gap-1">
                <Zap className="w-4 h-4 text-green-600" />
                RESTful API
              </div>
              <div className="flex items-center justify-center gap-1">
                <Shield className="w-4 h-4 text-green-600" />
                99.9% uptime SLA
              </div>
              <div className="flex items-center justify-center gap-1">
                <Globe className="w-4 h-4 text-green-600" />
                Global CDN
              </div>
            </div>
          </div>
        </section>

        {/* API Overview */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">API Overview</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our API is designed for simplicity and scalability, perfect for
                everything from single requests to high-volume processing.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Layers,
                  title: "RESTful Design",
                  description: "Standard HTTP methods and JSON responses",
                },
                {
                  icon: Key,
                  title: "Simple Auth",
                  description: "API key authentication with Bearer tokens",
                },
                {
                  icon: Cpu,
                  title: "Fast Processing",
                  description: "Average response time under 10 seconds",
                },
                {
                  icon: Box,
                  title: "SDKs Available",
                  description: "Official libraries for popular languages",
                },
              ].map((feature, index) => (
                <Card
                  key={index}
                  className="group hover:shadow-lg transition-all duration-300"
                >
                  <CardHeader className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Start */}
        <section id="quickstart" className="py-16 px-4 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Quick Start</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Get up and running with the ModernPDF API in under 5 minutes.
              </p>
            </div>

            <div className="space-y-8">
              {quickStartSteps.map((step, index) => (
                <Card key={index} className="group">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <step.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">
                          Step {index + 1}: {step.title}
                        </CardTitle>
                        <CardDescription>{step.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="relative">
                      <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm">
                        <code>{step.code}</code>
                      </pre>
                      <Button
                        size="sm"
                        variant="outline"
                        className="absolute top-2 right-2 bg-slate-800 border-slate-600 text-slate-200 hover:bg-slate-700"
                        onClick={() =>
                          copyToClipboard(step.code, `step-${index}`)
                        }
                      >
                        {copiedCode === `step-${index}` ? (
                          <CheckCircle className="w-3 h-3" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* API Reference */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">API Reference</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Complete reference for all available endpoints and parameters.
              </p>
            </div>

            <Tabs defaultValue="endpoints" className="space-y-8">
              <TabsList className="grid w-full grid-cols-4 max-w-2xl mx-auto">
                <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
                <TabsTrigger value="auth">Authentication</TabsTrigger>
                <TabsTrigger value="errors">Error Codes</TabsTrigger>
                <TabsTrigger value="limits">Rate Limits</TabsTrigger>
              </TabsList>

              <TabsContent value="endpoints">
                <div className="space-y-4">
                  <Alert>
                    <Terminal className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Base URL:</strong> https://api.modernpdf.com
                    </AlertDescription>
                  </Alert>

                  {endpoints.map((endpoint, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Badge
                              variant={
                                endpoint.method === "GET"
                                  ? "secondary"
                                  : "default"
                              }
                            >
                              {endpoint.method}
                            </Badge>
                            <code className="text-lg font-mono">
                              {endpoint.path}
                            </code>
                          </div>
                          <Badge variant="outline">{endpoint.pricing}</Badge>
                        </div>
                        <CardDescription>
                          {endpoint.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div>
                            <h4 className="font-semibold mb-2">Parameters:</h4>
                            {endpoint.params.length > 0 ? (
                              <div className="flex flex-wrap gap-2">
                                {endpoint.params.map((param, paramIndex) => (
                                  <Badge key={paramIndex} variant="outline">
                                    {param}
                                  </Badge>
                                ))}
                              </div>
                            ) : (
                              <p className="text-sm text-muted-foreground">
                                No parameters required
                              </p>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="auth">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Key className="w-5 h-5" />
                      API Authentication
                    </CardTitle>
                    <CardDescription>
                      Secure your API requests with API key authentication.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-2">
                        Getting Your API Key
                      </h4>
                      <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                        <li>Create an account at modernpdf.com</li>
                        <li>Navigate to your dashboard</li>
                        <li>Go to API Keys section</li>
                        <li>Generate a new API key</li>
                      </ol>
                    </div>

                    <Separator />

                    <div>
                      <h4 className="font-semibold mb-2">Using Your API Key</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Include your API key in the Authorization header of
                        every request:
                      </p>
                      <div className="relative">
                        <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm">
                          <code>Authorization: Bearer YOUR_API_KEY</code>
                        </pre>
                        <Button
                          size="sm"
                          variant="outline"
                          className="absolute top-2 right-2 bg-slate-800 border-slate-600 text-slate-200 hover:bg-slate-700"
                          onClick={() =>
                            copyToClipboard(
                              "Authorization: Bearer YOUR_API_KEY",
                              "auth-header"
                            )
                          }
                        >
                          {copiedCode === "auth-header" ? (
                            <CheckCircle className="w-3 h-3" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </Button>
                      </div>
                    </div>

                    <Alert>
                      <Shield className="h-4 w-4" />
                      <AlertDescription>
                        <strong>Security:</strong> Never expose your API key in
                        client-side code. Always make requests from your server
                        or use environment variables.
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="errors">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5" />
                      HTTP Status Codes
                    </CardTitle>
                    <CardDescription>
                      Understanding API response codes and error handling.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {statusCodes.map((status, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 rounded-lg border"
                        >
                          <div className="flex items-center gap-3">
                            <Badge
                              variant={
                                status.code.startsWith("2")
                                  ? "secondary"
                                  : status.code.startsWith("4")
                                  ? "destructive"
                                  : "default"
                              }
                            >
                              {status.code}
                            </Badge>
                            <div>
                              <h4 className="font-semibold">
                                {status.meaning}
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                {status.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <Separator className="my-6" />

                    <div>
                      <h4 className="font-semibold mb-3">
                        Error Response Format
                      </h4>
                      <div className="relative">
                        <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm">
                          <code>{`{
  "success": false,
  "error": {
    "code": "INVALID_FILE_FORMAT",
    "message": "The uploaded file must be a PDF",
    "details": "Only PDF files are supported for this operation"
  }
}`}</code>
                        </pre>
                        <Button
                          size="sm"
                          variant="outline"
                          className="absolute top-2 right-2 bg-slate-800 border-slate-600 text-slate-200 hover:bg-slate-700"
                          onClick={() =>
                            copyToClipboard(
                              `{
  "success": false,
  "error": {
    "code": "INVALID_FILE_FORMAT",
    "message": "The uploaded file must be a PDF",
    "details": "Only PDF files are supported for this operation"
  }
}`,
                              "error-format"
                            )
                          }
                        >
                          {copiedCode === "error-format" ? (
                            <CheckCircle className="w-3 h-3" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="limits">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      Rate Limits
                    </CardTitle>
                    <CardDescription>
                      API request limits and best practices for high-volume
                      usage.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="grid gap-4">
                        {rateLimits.map((limit, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-4 rounded-lg border"
                          >
                            <div>
                              <h4 className="font-semibold">
                                {limit.tier} Tier
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                {limit.requests} requests per minute
                              </p>
                            </div>
                            <div className="text-right text-sm">
                              <div>Burst: {limit.burst}</div>
                              <div className="text-muted-foreground">
                                Reset: {limit.resetTime}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <Separator />

                      <div>
                        <h4 className="font-semibold mb-3">
                          Rate Limit Headers
                        </h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          Every API response includes rate limit information in
                          the headers:
                        </p>
                        <div className="relative">
                          <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm">
                            <code>{`X-RateLimit-Limit: 60
X-RateLimit-Remaining: 55
X-RateLimit-Reset: 1640995200`}</code>
                          </pre>
                        </div>
                      </div>

                      <Alert>
                        <BarChart3 className="h-4 w-4" />
                        <AlertDescription>
                          <strong>Best Practice:</strong> Monitor rate limit
                          headers and implement exponential backoff when
                          approaching limits to avoid 429 errors.
                        </AlertDescription>
                      </Alert>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* SDKs and Examples */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">SDKs & Code Examples</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Official SDKs and code examples in popular programming
                languages.
              </p>
            </div>

            <Tabs defaultValue="JavaScript" className="space-y-8">
              <TabsList className="grid w-full grid-cols-3 max-w-xl mx-auto">
                <TabsTrigger value="JavaScript">JavaScript</TabsTrigger>
                <TabsTrigger value="Python">Python</TabsTrigger>
                <TabsTrigger value="PHP">PHP</TabsTrigger>
              </TabsList>

              {sdkExamples.map((example) => (
                <TabsContent key={example.language} value={example.language}>
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                          <Code className="w-5 h-5" />
                          {example.language} SDK
                        </CardTitle>
                        <Badge variant="outline">{example.install}</Badge>
                      </div>
                      <CardDescription>
                        Official {example.language} library for the ModernPDF
                        API.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2">Installation</h4>
                          <div className="relative">
                            <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm">
                              <code>{example.install}</code>
                            </pre>
                            <Button
                              size="sm"
                              variant="outline"
                              className="absolute top-2 right-2 bg-slate-800 border-slate-600 text-slate-200 hover:bg-slate-700"
                              onClick={() =>
                                copyToClipboard(
                                  example.install,
                                  `install-${example.language}`
                                )
                              }
                            >
                              {copiedCode === `install-${example.language}` ? (
                                <CheckCircle className="w-3 h-3" />
                              ) : (
                                <Copy className="w-3 h-3" />
                              )}
                            </Button>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2">Usage Example</h4>
                          <div className="relative">
                            <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm">
                              <code>{example.code}</code>
                            </pre>
                            <Button
                              size="sm"
                              variant="outline"
                              className="absolute top-2 right-2 bg-slate-800 border-slate-600 text-slate-200 hover:bg-slate-700"
                              onClick={() =>
                                copyToClipboard(
                                  example.code,
                                  `code-${example.language}`
                                )
                              }
                            >
                              {copiedCode === `code-${example.language}` ? (
                                <CheckCircle className="w-3 h-3" />
                              ) : (
                                <Copy className="w-3 h-3" />
                              )}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        {/* Advanced Features */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Advanced Features</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Powerful features for enterprise applications and high-volume
                processing.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Upload,
                  title: "Webhooks",
                  description: "Get notified when operations complete",
                  features: [
                    "Real-time notifications",
                    "Secure payload verification",
                    "Retry logic built-in",
                  ],
                },
                {
                  icon: BarChart3,
                  title: "Usage Analytics",
                  description: "Monitor your API usage and costs",
                  features: [
                    "Real-time metrics",
                    "Cost breakdowns",
                    "Usage alerts",
                  ],
                },
                {
                  icon: Settings,
                  title: "Batch Processing",
                  description: "Process multiple files efficiently",
                  features: [
                    "Queue management",
                    "Progress tracking",
                    "Bulk operations",
                  ],
                },
              ].map((feature, index) => (
                <Card
                  key={index}
                  className="group hover:shadow-lg transition-all duration-300"
                >
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      {feature.features.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-center gap-2">
                          <CheckCircle className="w-3 h-3 text-green-600" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Support & Resources */}
        <section className="py-16 px-4 bg-primary/5">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Need Help Getting Started?
            </h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Our developer support team is here to help you integrate
              successfully.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="group hover:shadow-lg transition-all duration-300">
                <CardHeader className="text-center">
                  <Book className="w-8 h-8 text-primary mx-auto mb-2" />
                  <CardTitle>API Guide</CardTitle>
                  <CardDescription>
                    Step-by-step integration guide
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/help/api-guide">
                      Read Guide
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-lg transition-all duration-300">
                <CardHeader className="text-center">
                  <FileText className="w-8 h-8 text-primary mx-auto mb-2" />
                  <CardTitle>Postman Collection</CardTitle>
                  <CardDescription>
                    Test APIs with our collection
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full" asChild>
                    <a href="#" target="_blank">
                      Download
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-lg transition-all duration-300">
                <CardHeader className="text-center">
                  <Settings className="w-8 h-8 text-primary mx-auto mb-2" />
                  <CardTitle>Developer Support</CardTitle>
                  <CardDescription>Get help from our team</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/contact">
                      Contact Us
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="mt-12 p-6 bg-background rounded-lg border">
              <h3 className="text-lg font-semibold mb-2">
                Ready to start building?
              </h3>
              <p className="text-muted-foreground mb-4">
                Get your API key and start processing PDFs in minutes.
              </p>
              <Button size="lg" asChild>
                <Link href="/register">
                  Get Started Free
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
