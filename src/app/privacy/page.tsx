import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import {
  Shield,
  Eye,
  Lock,
  Trash2,
  Globe,
  Users,
  FileText,
  Clock,
  Mail,
  AlertTriangle,
  CheckCircle,
  Database,
  Server,
  Key,
} from "lucide-react";

const privacyHighlights = [
  {
    icon: Trash2,
    title: "Automatic File Deletion",
    description:
      "All uploaded files are automatically deleted within 1 hour of processing",
    color: "text-green-600",
  },
  {
    icon: Lock,
    title: "End-to-End Encryption",
    description:
      "Files are encrypted in transit and at rest using AES-256 encryption",
    color: "text-blue-600",
  },
  {
    icon: Eye,
    title: "No File Content Access",
    description:
      "We never access, read, or analyze the content of your uploaded files",
    color: "text-purple-600",
  },
  {
    icon: Globe,
    title: "GDPR & CCPA Compliant",
    description: "Full compliance with international privacy regulations",
    color: "text-orange-600",
  },
];

const dataTypes = [
  {
    category: "Account Information",
    description: "Email address, name, and account preferences",
    retention: "Until account deletion",
    purpose: "Account management and service provision",
  },
  {
    category: "Usage Analytics",
    description:
      "Operation counts, file sizes (not content), and performance metrics",
    retention: "24 months",
    purpose: "Service improvement and billing",
  },
  {
    category: "Payment Information",
    description:
      "Billing address and payment method details (processed by Stripe)",
    retention: "As required by law",
    purpose: "Payment processing and fraud prevention",
  },
  {
    category: "Technical Data",
    description: "IP address, browser type, device information, and API usage",
    retention: "12 months",
    purpose: "Security, performance monitoring, and support",
  },
];

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 px-4 text-center bg-gradient-to-br from-primary/5 via-background to-secondary/5">
          <div className="max-w-4xl mx-auto">
            <Badge variant="outline" className="mb-6">
              <Shield className="w-3 h-3 mr-1" />
              Privacy Policy
            </Badge>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Your Privacy Matters
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              We're committed to protecting your privacy and being transparent
              about how we handle your data. This policy explains what we
              collect, how we use it, and your rights.
            </p>

            <div className="text-sm text-muted-foreground">
              <p>
                <strong>Last updated:</strong> January 15, 2025
              </p>
              <p>
                <strong>Effective date:</strong> January 15, 2025
              </p>
            </div>
          </div>
        </section>

        {/* Privacy Highlights */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Privacy at a Glance</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Key privacy protections we have in place to keep your data safe.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {privacyHighlights.map((item, index) => (
                <Card
                  key={index}
                  className="group hover:shadow-lg transition-all duration-300"
                >
                  <CardHeader className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                      <item.icon className={`h-6 w-6 ${item.color}`} />
                    </div>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="max-w-4xl mx-auto">
            {/* Information We Collect */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  Information We Collect
                </CardTitle>
                <CardDescription>
                  We collect minimal data necessary to provide our services
                  effectively.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4">
                  {dataTypes.map((type, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-lg border bg-background"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold">{type.category}</h4>
                        <Badge variant="outline" className="text-xs">
                          {type.retention}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {type.description}
                      </p>
                      <p className="text-xs text-primary font-medium">
                        Purpose: {type.purpose}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* How We Use Information */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Server className="w-5 h-5" />
                  How We Use Your Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium">Service Provision</h4>
                      <p className="text-sm text-muted-foreground">
                        Process your PDF files and provide the requested
                        operations (compress, convert, merge, etc.)
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium">Account Management</h4>
                      <p className="text-sm text-muted-foreground">
                        Manage your account, track usage, and provide customer
                        support
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium">Service Improvement</h4>
                      <p className="text-sm text-muted-foreground">
                        Analyze usage patterns to improve performance and add
                        new features
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium">
                        Security & Fraud Prevention
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Protect against abuse, fraud, and security threats
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium">Legal Compliance</h4>
                      <p className="text-sm text-muted-foreground">
                        Comply with applicable laws and regulations
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* File Handling */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  File Handling & Security
                </CardTitle>
                <CardDescription>
                  How we protect and handle your uploaded files.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h4 className="font-semibold flex items-center gap-2">
                        <Lock className="w-4 h-4 text-green-600" />
                        Encryption
                      </h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Files encrypted in transit (TLS 1.3)</li>
                        <li>• Files encrypted at rest (AES-256)</li>
                        <li>• Secure processing environment</li>
                      </ul>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-semibold flex items-center gap-2">
                        <Clock className="w-4 h-4 text-blue-600" />
                        Retention
                      </h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Files deleted within 1 hour</li>
                        <li>• No permanent storage</li>
                        <li>• Immediate deletion on request</li>
                      </ul>
                    </div>
                  </div>

                  <Separator />

                  <div className="bg-orange-50 dark:bg-orange-950/20 p-4 rounded-lg border border-orange-200 dark:border-orange-800">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-orange-900 dark:text-orange-100">
                          Important Note
                        </h4>
                        <p className="text-sm text-orange-800 dark:text-orange-200">
                          We never access, read, or analyze the content of your
                          files. Our systems only process files according to
                          your requested operations.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Data Sharing */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Data Sharing & Third Parties
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    We do not sell, rent, or trade your personal information. We
                    only share data in the following limited circumstances:
                  </p>

                  <div className="space-y-4">
                    <div className="p-4 rounded-lg border">
                      <h4 className="font-semibold mb-2">Service Providers</h4>
                      <p className="text-sm text-muted-foreground">
                        We work with trusted third-party services for payment
                        processing (Stripe), infrastructure (AWS), and
                        analytics. These providers are bound by strict data
                        protection agreements.
                      </p>
                    </div>

                    <div className="p-4 rounded-lg border">
                      <h4 className="font-semibold mb-2">Legal Requirements</h4>
                      <p className="text-sm text-muted-foreground">
                        We may disclose information if required by law, court
                        order, or to protect our rights and safety.
                      </p>
                    </div>

                    <div className="p-4 rounded-lg border">
                      <h4 className="font-semibold mb-2">Business Transfers</h4>
                      <p className="text-sm text-muted-foreground">
                        In the event of a merger, acquisition, or sale, your
                        information may be transferred as part of that
                        transaction.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Your Rights */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="w-5 h-5" />
                  Your Privacy Rights
                </CardTitle>
                <CardDescription>
                  You have several rights regarding your personal data.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold">Access & Portability</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Request a copy of your data</li>
                      <li>• Export your account information</li>
                      <li>• Download usage history</li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold">Control & Deletion</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Correct inaccurate information</li>
                      <li>• Delete your account and data</li>
                      <li>• Opt-out of communications</li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold">
                      GDPR Rights (EU Residents)
                    </h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Right to rectification</li>
                      <li>• Right to erasure ("right to be forgotten")</li>
                      <li>• Right to restrict processing</li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold">
                      CCPA Rights (California Residents)
                    </h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Know what data we collect</li>
                      <li>• Delete personal information</li>
                      <li>• Opt-out of sale (we don't sell data)</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Cookies */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Cookies & Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    We use cookies and similar technologies to enhance your
                    experience:
                  </p>

                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-medium">Essential Cookies</h4>
                        <p className="text-sm text-muted-foreground">
                          Required for basic site functionality and security
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-medium">Analytics Cookies</h4>
                        <p className="text-sm text-muted-foreground">
                          Help us understand how you use our service (can be
                          disabled)
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-medium">Preference Cookies</h4>
                        <p className="text-sm text-muted-foreground">
                          Remember your settings and preferences
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Contact Us
                </CardTitle>
                <CardDescription>
                  Questions about this privacy policy or your data?
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    If you have any questions about this privacy policy or how
                    we handle your data, please contact us:
                  </p>

                  <div className="space-y-2 text-sm">
                    <p>
                      <strong>Email:</strong> privacy@modernpdf.com
                    </p>
                    <p>
                      <strong>Data Protection Officer:</strong>{" "}
                      dpo@modernpdf.com
                    </p>
                    <p>
                      <strong>Address:</strong> 123 Privacy Street, San
                      Francisco, CA 94102
                    </p>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      <strong>Response Time:</strong> We aim to respond to all
                      privacy-related inquiries within 72 hours.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
