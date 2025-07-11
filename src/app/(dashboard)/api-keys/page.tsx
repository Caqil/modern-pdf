"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Key,
  Plus,
  Copy,
  Eye,
  EyeOff,
  Trash2,
  AlertTriangle,
  CheckCircle,
  Code,
  Book,
  ExternalLink,
  Activity,
  Calendar,
  Loader2,
} from "lucide-react";
import ApiKeyManager from "@/components/profile/api-key-manager";

const codeExamples = {
  curl: `curl -X POST https://api.modernpdf.com/v1/pdf/compress \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: multipart/form-data" \\
  -F "file=@document.pdf" \\
  -F "quality=medium"`,

  javascript: `const FormData = require('form-data');
const fs = require('fs');
const axios = require('axios');

const form = new FormData();
form.append('file', fs.createReadStream('document.pdf'));
form.append('quality', 'medium');

const response = await axios.post(
  'https://api.modernpdf.com/v1/pdf/compress',
  form,
  {
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY',
      ...form.getHeaders()
    }
  }
);`,

  python: `import requests

url = "https://api.modernpdf.com/v1/pdf/compress"
headers = {
    "Authorization": "Bearer YOUR_API_KEY"
}
files = {
    "file": open("document.pdf", "rb")
}
data = {
    "quality": "medium"
}

response = requests.post(url, headers=headers, files=files, data=data)
result = response.json()`,
};

const apiEndpoints = [
  {
    method: "POST",
    endpoint: "/v1/pdf/compress",
    description: "Compress PDF files",
    parameters: ["file", "quality"],
  },
  {
    method: "POST",
    endpoint: "/v1/pdf/convert",
    description: "Convert PDF to other formats",
    parameters: ["file", "targetFormat"],
  },
  {
    method: "POST",
    endpoint: "/v1/pdf/merge",
    description: "Merge multiple PDF files",
    parameters: ["files[]"],
  },
  {
    method: "POST",
    endpoint: "/v1/pdf/split",
    description: "Split PDF into multiple files",
    parameters: ["file", "splitMethod", "pageRanges"],
  },
  {
    method: "POST",
    endpoint: "/v1/pdf/protect",
    description: "Add password protection",
    parameters: ["file", "password"],
  },
  {
    method: "POST",
    endpoint: "/v1/pdf/unlock",
    description: "Remove password protection",
    parameters: ["file", "password"],
  },
];

export default function ApiKeysPage() {
  const [activeTab, setActiveTab] = useState("keys");
  const [selectedLanguage, setSelectedLanguage] = useState("curl");
  const [copiedCode, setCopiedCode] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">API Keys</h1>
          <p className="text-muted-foreground">
            Manage your API keys and integrate PDF processing into your
            applications
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="keys">API Keys</TabsTrigger>
          <TabsTrigger value="documentation">Documentation</TabsTrigger>
          <TabsTrigger value="examples">Code Examples</TabsTrigger>
        </TabsList>

        <TabsContent value="keys" className="space-y-6">
          {/* API Overview */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  API Version
                </CardTitle>
                <Code className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">v1</div>
                <p className="text-xs text-muted-foreground">
                  Current stable version
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Rate Limit
                </CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1000</div>
                <p className="text-xs text-muted-foreground">
                  Requests per hour
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Uptime</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">99.9%</div>
                <p className="text-xs text-muted-foreground">Last 30 days</p>
              </CardContent>
            </Card>
          </div>

          {/* API Keys Manager */}
          <ApiKeyManager />

          {/* Getting Started */}
          <Card>
            <CardHeader>
              <CardTitle>Getting Started</CardTitle>
              <CardDescription>
                Quick steps to start using the ModernPDF API
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <h4 className="font-medium">1. Create an API Key</h4>
                  <p className="text-sm text-muted-foreground">
                    Generate your first API key to authenticate requests
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">2. Make Your First Request</h4>
                  <p className="text-sm text-muted-foreground">
                    Use any HTTP client to start processing PDFs
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">3. Handle Responses</h4>
                  <p className="text-sm text-muted-foreground">
                    Process JSON responses and download processed files
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">4. Monitor Usage</h4>
                  <p className="text-sm text-muted-foreground">
                    Track your API usage and manage your account balance
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documentation" className="space-y-6">
          {/* API Base URL */}
          <Card>
            <CardHeader>
              <CardTitle>API Base URL</CardTitle>
              <CardDescription>
                All API requests should be made to this base URL
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <code className="text-sm font-mono">
                  https://api.modernpdf.com/v1
                </code>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    copyToClipboard("https://api.modernpdf.com/v1")
                  }
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Authentication */}
          <Card>
            <CardHeader>
              <CardTitle>Authentication</CardTitle>
              <CardDescription>
                All API requests require authentication using your API key
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Bearer Token</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Include your API key in the Authorization header:
                </p>
                <div className="bg-muted p-3 rounded-lg">
                  <code className="text-sm font-mono">
                    Authorization: Bearer YOUR_API_KEY
                  </code>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Security</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>
                    • Keep your API keys secure and never expose them in
                    client-side code
                  </li>
                  <li>• Use HTTPS for all API requests</li>
                  <li>• Rotate your API keys regularly</li>
                  <li>• Monitor your API usage for unusual activity</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Available Endpoints */}
          <Card>
            <CardHeader>
              <CardTitle>Available Endpoints</CardTitle>
              <CardDescription>
                Complete list of PDF processing endpoints
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {apiEndpoints.map((endpoint, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="font-mono text-xs">
                          {endpoint.method}
                        </Badge>
                        <code className="text-sm font-mono">
                          {endpoint.endpoint}
                        </code>
                      </div>
                      <Button variant="ghost" size="sm" asChild>
                        <a href="#" className="text-xs">
                          View Details <ExternalLink className="ml-1 h-3 w-3" />
                        </a>
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {endpoint.description}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {endpoint.parameters.map((param) => (
                        <Badge
                          key={param}
                          variant="secondary"
                          className="text-xs"
                        >
                          {param}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Rate Limits */}
          <Card>
            <CardHeader>
              <CardTitle>Rate Limits</CardTitle>
              <CardDescription>
                API usage limits and best practices
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="font-medium mb-2">Request Limits</h4>
                  <ul className="text-sm space-y-1">
                    <li>
                      • <strong>Free Plan:</strong> 100 requests/hour
                    </li>
                    <li>
                      • <strong>Pro Plan:</strong> 1,000 requests/hour
                    </li>
                    <li>
                      • <strong>Business Plan:</strong> 10,000 requests/hour
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">File Size Limits</h4>
                  <ul className="text-sm space-y-1">
                    <li>
                      • <strong>Free Plan:</strong> 50MB per file
                    </li>
                    <li>
                      • <strong>Pro Plan:</strong> 100MB per file
                    </li>
                    <li>
                      • <strong>Business Plan:</strong> 500MB per file
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                <div className="flex items-start space-x-2">
                  <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-amber-800 dark:text-amber-200">
                      Rate Limit Headers
                    </h4>
                    <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                      Check response headers for rate limit information:
                      X-RateLimit-Limit, X-RateLimit-Remaining, and
                      X-RateLimit-Reset.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="examples" className="space-y-6">
          {/* Language Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Code Examples</CardTitle>
              <CardDescription>
                Ready-to-use code snippets in popular programming languages
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-2 mb-4">
                {Object.keys(codeExamples).map((lang) => (
                  <Button
                    key={lang}
                    variant={selectedLanguage === lang ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedLanguage(lang)}
                  >
                    {lang.charAt(0).toUpperCase() + lang.slice(1)}
                  </Button>
                ))}
              </div>

              <div className="relative">
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                  <code>
                    {
                      codeExamples[
                        selectedLanguage as keyof typeof codeExamples
                      ]
                    }
                  </code>
                </pre>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={() =>
                    copyToClipboard(
                      codeExamples[
                        selectedLanguage as keyof typeof codeExamples
                      ]
                    )
                  }
                >
                  {copiedCode ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Response Format */}
          <Card>
            <CardHeader>
              <CardTitle>Response Format</CardTitle>
              <CardDescription>Standard API response structure</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Success Response</h4>
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                    <code>{`{
  "success": true,
  "message": "PDF compressed successfully",
  "fileUrl": "https://api.modernpdf.com/v1/file?folder=abc123&filename=compressed.pdf",
  "filename": "compressed.pdf",
  "originalName": "document.pdf",
  "fileSize": 1048576,
  "billing": {
    "operationCost": 0.10,
    "currentBalance": 9.90,
    "freeOperationsRemaining": 95,
    "usedFreeOperation": true
  }
}`}</code>
                  </pre>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Error Response</h4>
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                    <code>{`{
  "success": false,
  "error": "Invalid file format",
  "details": "Only PDF files are supported",
  "code": "INVALID_FILE_FORMAT"
}`}</code>
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* SDKs and Libraries */}
          <Card>
            <CardHeader>
              <CardTitle>SDKs & Libraries</CardTitle>
              <CardDescription>
                Official and community-maintained libraries
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Node.js SDK</h4>
                    <Badge variant="default">Official</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Full-featured SDK for Node.js applications
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <a href="#" className="w-full">
                      <Book className="mr-2 h-4 w-4" />
                      View Documentation
                    </a>
                  </Button>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Python SDK</h4>
                    <Badge variant="default">Official</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Python library with async support
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <a href="#" className="w-full">
                      <Book className="mr-2 h-4 w-4" />
                      View Documentation
                    </a>
                  </Button>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">PHP SDK</h4>
                    <Badge variant="secondary">Community</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Community-maintained PHP library
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <a href="#" className="w-full">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View on GitHub
                    </a>
                  </Button>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Go SDK</h4>
                    <Badge variant="secondary">Community</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Lightweight Go client library
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <a href="#" className="w-full">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View on GitHub
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
