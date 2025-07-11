import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import {
  FileText,
  Shield,
  CreditCard,
  Users,
  AlertTriangle,
  CheckCircle,
  Clock,
  Scale,
  Mail,
  Gavel,
  RefreshCw,
  Ban,
  Globe,
  Server,
  Key,
  Zap,
} from "lucide-react";

const serviceRules = [
  {
    icon: CheckCircle,
    title: "Permitted Uses",
    items: [
      "Process PDF files for legitimate business or personal purposes",
      "Use our API for commercial applications",
      "Upload files you own or have permission to process",
      "Integrate our services into your applications",
    ],
    color: "text-green-600",
  },
  {
    icon: Ban,
    title: "Prohibited Uses",
    items: [
      "Upload illegal, copyrighted, or inappropriate content",
      "Attempt to reverse engineer or hack our systems",
      "Use our service to spam or send unsolicited content",
      "Exceed rate limits or abuse our infrastructure",
    ],
    color: "text-red-600",
  },
];

const accountTerms = [
  {
    title: "Account Creation",
    description:
      "You must provide accurate information and keep your account secure.",
    icon: Users,
  },
  {
    title: "Payment Terms",
    description:
      "Pay-per-operation pricing with automatic billing for usage above free tier.",
    icon: CreditCard,
  },
  {
    title: "Service Availability",
    description:
      "We strive for 99.9% uptime but cannot guarantee uninterrupted service.",
    icon: Server,
  },
  {
    title: "Data Retention",
    description:
      "Files are automatically deleted within 1 hour. Account data retained as per privacy policy.",
    icon: Clock,
  },
];

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 px-4 text-center bg-gradient-to-br from-primary/5 via-background to-secondary/5">
          <div className="max-w-4xl mx-auto">
            <Badge variant="outline" className="mb-6">
              <FileText className="w-3 h-3 mr-1" />
              Terms of Service
            </Badge>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Terms of Service
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              These terms govern your use of ModernPDF services. By using our
              platform, you agree to these terms and our commitment to providing
              secure, reliable PDF processing.
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

        {/* Quick Overview */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Terms Overview</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Key points about using ModernPDF services.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {accountTerms.map((term, index) => (
                <Card
                  key={index}
                  className="group hover:shadow-lg transition-all duration-300"
                >
                  <CardHeader className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                      <term.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{term.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {term.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Main Terms Content */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="max-w-4xl mx-auto">
            {/* Acceptance of Terms */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gavel className="w-5 h-5" />
                  Acceptance of Terms
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    By accessing or using ModernPDF ("the Service"), you agree
                    to be bound by these Terms of Service ("Terms"). If you
                    disagree with any part of these terms, you may not access
                    the Service.
                  </p>

                  <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-1">
                          Agreement
                        </h4>
                        <p className="text-sm text-blue-800 dark:text-blue-200">
                          These Terms constitute a legally binding agreement
                          between you and ModernPDF Inc.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Service Description */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Service Description
                </CardTitle>
                <CardDescription>
                  What ModernPDF provides and how it works.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    ModernPDF is a cloud-based platform that provides PDF
                    processing tools including compression, conversion, merging,
                    splitting, and other document operations.
                  </p>

                  <div className="space-y-3">
                    <h4 className="font-semibold">Service Features:</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        Web-based PDF processing tools
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        RESTful API for developers
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        Pay-per-operation pricing model
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        Automatic file deletion for privacy
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        Enterprise-grade security
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* User Accounts */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  User Accounts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">
                        Account Registration
                      </h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>
                          • You must provide accurate and complete information
                        </li>
                        <li>
                          • You are responsible for maintaining account security
                        </li>
                        <li>
                          • One person or entity may maintain only one free
                          account
                        </li>
                        <li>
                          • You must be at least 13 years old to create an
                          account
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">
                        Account Responsibilities
                      </h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Keep your login credentials confidential</li>
                        <li>
                          • Notify us immediately of any unauthorized access
                        </li>
                        <li>
                          • You are liable for all activities under your account
                        </li>
                        <li>
                          • Comply with all applicable laws and regulations
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Acceptable Use */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Acceptable Use Policy
                </CardTitle>
                <CardDescription>
                  Rules for using our service responsibly.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {serviceRules.map((rule, index) => (
                    <div key={index} className="space-y-3">
                      <h4
                        className={`font-semibold flex items-center gap-2 ${rule.color}`}
                      >
                        <rule.icon className="w-5 h-5" />
                        {rule.title}
                      </h4>
                      <ul className="space-y-2">
                        {rule.items.map((item, itemIndex) => (
                          <li
                            key={itemIndex}
                            className="text-sm text-muted-foreground flex items-start gap-2"
                          >
                            <div
                              className={`w-1.5 h-1.5 ${
                                rule.color === "text-green-600"
                                  ? "bg-green-500"
                                  : "bg-red-500"
                              } rounded-full mt-2 flex-shrink-0`}
                            ></div>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <Alert className="mt-6">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    Violation of these terms may result in account suspension or
                    termination. We reserve the right to investigate and take
                    appropriate action.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            {/* Payment Terms */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Payment Terms
                </CardTitle>
                <CardDescription>
                  Billing, payments, and refunds.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h4 className="font-semibold">Pricing Model</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Pay-per-operation pricing</li>
                        <li>• 100 free operations per month</li>
                        <li>• Automatic volume discounts</li>
                        <li>• No monthly subscription fees</li>
                        <li>• Credits never expire</li>
                      </ul>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-semibold">Billing</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Automatic billing for usage</li>
                        <li>• Secure payment processing via Stripe</li>
                        <li>• Monthly billing statements</li>
                        <li>• Usage tracking and alerts</li>
                        <li>• Tax calculation where applicable</li>
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold">Refunds</h4>
                    <div className="text-sm text-muted-foreground space-y-2">
                      <p>
                        Due to the nature of our service (immediate processing
                        and consumption of resources), we generally do not
                        provide refunds for completed operations.
                      </p>
                      <p>
                        However, we may provide refunds or credits in cases of:
                      </p>
                      <ul className="space-y-1 ml-4">
                        <li>• Service outages or technical errors</li>
                        <li>• Billing errors or unauthorized charges</li>
                        <li>• Account issues caused by our systems</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Intellectual Property */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="w-5 h-5" />
                  Intellectual Property
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Your Content</h4>
                    <p className="text-sm text-muted-foreground">
                      You retain all rights to the files you upload. By using
                      our service, you grant us a limited license to process
                      your files solely for the purpose of providing the
                      requested operations.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Our Service</h4>
                    <p className="text-sm text-muted-foreground">
                      The ModernPDF platform, including all software, designs,
                      and trademarks, is owned by ModernPDF Inc. You may not
                      copy, modify, or distribute our software or content.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Third-Party Content</h4>
                    <p className="text-sm text-muted-foreground">
                      You are responsible for ensuring you have the right to
                      process any files you upload. We are not responsible for
                      copyright infringement or other intellectual property
                      violations.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Service Availability */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Server className="w-5 h-5" />
                  Service Availability & Limitations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Service Level</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• We strive for 99.9% uptime</li>
                      <li>
                        • Planned maintenance will be announced in advance
                      </li>
                      <li>• Emergency maintenance may occur without notice</li>
                      <li>
                        • Service credits may be provided for significant
                        outages
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Usage Limits</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>
                        • File size limits apply (see pricing page for details)
                      </li>
                      <li>• Rate limits prevent abuse and ensure fair usage</li>
                      <li>
                        • Bulk processing available for enterprise customers
                      </li>
                      <li>• Contact us for custom limits if needed</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Disclaimer */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Disclaimers & Liability
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Service "As Is":</strong> Our service is provided
                      "as is" without warranties of any kind. We do not
                      guarantee uninterrupted or error-free operation.
                    </AlertDescription>
                  </Alert>

                  <div className="text-sm text-muted-foreground space-y-2">
                    <p>
                      <strong>Limitation of Liability:</strong> Our liability is
                      limited to the amount you paid for the service in the 12
                      months preceding the claim. We are not liable for
                      indirect, incidental, or consequential damages.
                    </p>
                    <p>
                      <strong>Data Loss:</strong> While we take precautions to
                      protect your data, we recommend maintaining backups of
                      important files. We are not responsible for data loss.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Termination */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <RefreshCw className="w-5 h-5" />
                  Termination
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">By You</h4>
                    <p className="text-sm text-muted-foreground">
                      You may terminate your account at any time through your
                      account settings. Unused credits will remain available
                      until account deletion.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">By Us</h4>
                    <p className="text-sm text-muted-foreground">
                      We may suspend or terminate accounts for violations of
                      these terms, illegal activity, or abuse of our service. We
                      will provide notice when possible.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">
                      Effect of Termination
                    </h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Your access to the service will be discontinued</li>
                      <li>
                        • Account data will be deleted according to our privacy
                        policy
                      </li>
                      <li>
                        • Unused credits may be refunded at our discretion
                      </li>
                      <li>• These terms will continue to apply to past use</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Changes to Terms */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <RefreshCw className="w-5 h-5" />
                  Changes to Terms
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    We may update these terms from time to time. When we make
                    changes:
                  </p>

                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      We will notify you via email for significant changes
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      Updated terms will be posted on our website
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      Continued use constitutes acceptance of new terms
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      You may terminate your account if you disagree with
                      changes
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Governing Law */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Scale className="w-5 h-5" />
                  Governing Law & Disputes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Governing Law</h4>
                    <p className="text-sm text-muted-foreground">
                      These terms are governed by the laws of the State of
                      California, United States, without regard to conflict of
                      law principles.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Dispute Resolution</h4>
                    <p className="text-sm text-muted-foreground">
                      Most disputes can be resolved through direct
                      communication. For formal disputes, we prefer binding
                      arbitration through the American Arbitration Association.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Jurisdiction</h4>
                    <p className="text-sm text-muted-foreground">
                      Any legal proceedings must be filed in the courts of San
                      Francisco County, California.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Contact Information
                </CardTitle>
                <CardDescription>
                  Questions about these terms or our service?
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    If you have questions about these Terms of Service, please
                    contact us:
                  </p>

                  <div className="space-y-2 text-sm">
                    <p>
                      <strong>Email:</strong> legal@modernpdf.com
                    </p>
                    <p>
                      <strong>Support:</strong> support@modernpdf.com
                    </p>
                    <p>
                      <strong>Address:</strong> ModernPDF Inc., 123 Legal
                      Street, San Francisco, CA 94102
                    </p>
                    <p>
                      <strong>Phone:</strong> +1 (555) 123-4567
                    </p>
                  </div>

                  <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                    <p className="text-sm text-green-800 dark:text-green-200">
                      <strong>Support Hours:</strong> Monday-Friday, 9 AM - 6 PM
                      PST. We typically respond within 24 hours.
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
