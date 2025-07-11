"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  HeadphonesIcon,
  Users,
  Building,
  Zap,
  CheckCircle,
  AlertCircle,
  Globe,
  Calendar,
  Star,
  ArrowRight,
} from "lucide-react";

const contactMethods = [
  {
    icon: Mail,
    title: "Email Support",
    description: "Get help via email",
    contact: "support@modernpdf.com",
    responseTime: "< 24 hours",
    availability: "24/7",
    color: "text-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-950/20",
  },
  {
    icon: MessageSquare,
    title: "Live Chat",
    description: "Chat with our team",
    contact: "Available in dashboard",
    responseTime: "< 2 minutes",
    availability: "Mon-Fri, 9 AM - 6 PM PST",
    color: "text-green-600",
    bgColor: "bg-green-50 dark:bg-green-950/20",
  },
  {
    icon: Phone,
    title: "Phone Support",
    description: "Enterprise customers",
    contact: "+1 (555) 123-4567",
    responseTime: "Immediate",
    availability: "Mon-Fri, 9 AM - 5 PM PST",
    color: "text-purple-600",
    bgColor: "bg-purple-50 dark:bg-purple-950/20",
  },
];

const departments = [
  { value: "general", label: "General Inquiry" },
  { value: "technical", label: "Technical Support" },
  { value: "billing", label: "Billing & Payments" },
  { value: "enterprise", label: "Enterprise Sales" },
  { value: "partnership", label: "Partnerships" },
  { value: "media", label: "Media & Press" },
];

const officeLocations = [
  {
    city: "San Francisco",
    address: "123 Tech Street, Suite 400\nSan Francisco, CA 94102",
    type: "Headquarters",
    timezone: "PST (UTC-8)",
  },
  {
    city: "New York",
    address: "456 Business Ave, Floor 12\nNew York, NY 10001",
    type: "Sales Office",
    timezone: "EST (UTC-5)",
  },
  {
    city: "London",
    address: "789 Innovation Lane\nLondon, UK EC1A 1BB",
    type: "European Office",
    timezone: "GMT (UTC+0)",
  },
];

const faqs = [
  {
    question: "How quickly do you respond to support requests?",
    answer:
      "We aim to respond to all support requests within 24 hours. Priority support customers receive responses within 2-4 hours during business hours.",
  },
  {
    question: "Do you offer phone support?",
    answer:
      "Phone support is available for Enterprise customers. All other customers can reach us via email or live chat for the fastest response.",
  },
  {
    question: "Can I schedule a demo for my team?",
    answer:
      "Yes! We offer personalized demos for teams and enterprise customers. Use the contact form or email enterprise@modernpdf.com to schedule.",
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    department: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setSubmitStatus("success");
      setFormData({
        name: "",
        email: "",
        company: "",
        department: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 px-4 text-center bg-gradient-to-br from-primary/5 via-background to-secondary/5">
          <div className="max-w-4xl mx-auto">
            <Badge variant="outline" className="mb-6">
              <HeadphonesIcon className="w-3 h-3 mr-1" />
              Contact Us
            </Badge>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Get in Touch
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Have questions about our PDF tools? Need help with your account?
              Want to discuss enterprise solutions? We're here to help.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto text-sm text-muted-foreground">
              <div className="flex items-center justify-center gap-1">
                <Clock className="w-4 h-4 text-green-600" />
                Response within 24 hours
              </div>
              <div className="flex items-center justify-center gap-1">
                <Star className="w-4 h-4 text-green-600" />
                5-star support rating
              </div>
              <div className="flex items-center justify-center gap-1">
                <Globe className="w-4 h-4 text-green-600" />
                Global support team
              </div>
            </div>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Choose Your Preferred Method
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Multiple ways to reach our support team for the fastest
                assistance.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {contactMethods.map((method, index) => (
                <Card
                  key={index}
                  className="group hover:shadow-lg transition-all duration-300"
                >
                  <CardHeader className="text-center">
                    <div
                      className={`w-16 h-16 ${method.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <method.icon className={`h-8 w-8 ${method.color}`} />
                    </div>
                    <CardTitle className="text-xl">{method.title}</CardTitle>
                    <CardDescription>{method.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center space-y-3">
                    <div className="space-y-2">
                      <p className="font-semibold text-foreground">
                        {method.contact}
                      </p>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <div className="flex items-center justify-center gap-1">
                          <Clock className="w-3 h-3" />
                          Response: {method.responseTime}
                        </div>
                        <div className="flex items-center justify-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {method.availability}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Send Us a Message</h2>
              <p className="text-muted-foreground">
                Fill out the form below and we'll get back to you as soon as
                possible.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Contact Form */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Send className="w-5 h-5" />
                      Contact Form
                    </CardTitle>
                    <CardDescription>
                      We'll respond within 24 hours during business days.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {submitStatus === "success" && (
                      <Alert className="mb-6 border-green-200 bg-green-50 dark:bg-green-950/20">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <AlertDescription className="text-green-800 dark:text-green-200">
                          Thank you for your message! We'll get back to you
                          within 24 hours.
                        </AlertDescription>
                      </Alert>
                    )}

                    {submitStatus === "error" && (
                      <Alert className="mb-6 border-red-200 bg-red-50 dark:bg-red-950/20">
                        <AlertCircle className="h-4 w-4 text-red-600" />
                        <AlertDescription className="text-red-800 dark:text-red-200">
                          Sorry, there was an error sending your message. Please
                          try again or email us directly.
                        </AlertDescription>
                      </Alert>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Name *</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) =>
                              handleInputChange("name", e.target.value)
                            }
                            placeholder="Your full name"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) =>
                              handleInputChange("email", e.target.value)
                            }
                            placeholder="your@email.com"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="company">Company</Label>
                          <Input
                            id="company"
                            value={formData.company}
                            onChange={(e) =>
                              handleInputChange("company", e.target.value)
                            }
                            placeholder="Your company name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="department">Department</Label>
                          <Select
                            value={formData.department}
                            onValueChange={(value) =>
                              handleInputChange("department", value)
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select department" />
                            </SelectTrigger>
                            <SelectContent>
                              {departments.map((dept) => (
                                <SelectItem key={dept.value} value={dept.value}>
                                  {dept.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject *</Label>
                        <Input
                          id="subject"
                          value={formData.subject}
                          onChange={(e) =>
                            handleInputChange("subject", e.target.value)
                          }
                          placeholder="Brief description of your inquiry"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Message *</Label>
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={(e) =>
                            handleInputChange("message", e.target.value)
                          }
                          placeholder="Please provide details about your inquiry..."
                          rows={6}
                          required
                        />
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2"></div>
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4 mr-2" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Info */}
              <div className="space-y-6">
                {/* FAQ */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Quick Answers</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {faqs.map((faq, index) => (
                      <div key={index} className="space-y-2">
                        <h4 className="font-medium text-sm">{faq.question}</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {faq.answer}
                        </p>
                        {index < faqs.length - 1 && <hr className="my-3" />}
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Enterprise */}
                <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Building className="w-5 h-5" />
                      Enterprise Solutions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Need custom integrations, volume pricing, or dedicated
                      support?
                    </p>
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 text-green-600" />
                        <span>Custom API limits</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 text-green-600" />
                        <span>Volume discounts up to 70%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 text-green-600" />
                        <span>Dedicated account manager</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 text-green-600" />
                        <span>SLA guarantees</span>
                      </div>
                    </div>
                    <Button size="sm" className="w-full" asChild>
                      <a href="mailto:enterprise@modernpdf.com">
                        Contact Enterprise Team
                        <ArrowRight className="w-3 h-3 ml-1" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Office Locations */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Locations</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We have offices around the world to support our global customer
                base.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {officeLocations.map((location, index) => (
                <Card
                  key={index}
                  className="group hover:shadow-lg transition-all duration-300"
                >
                  <CardHeader className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{location.city}</CardTitle>
                    <Badge variant="outline">{location.type}</Badge>
                  </CardHeader>
                  <CardContent className="text-center space-y-3">
                    <div className="text-sm text-muted-foreground whitespace-pre-line">
                      {location.address}
                    </div>
                    <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {location.timezone}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-primary/5">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Check out our help center or documentation for instant answers.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="outline" asChild>
                <a href="/help">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Visit Help Center
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="/docs">
                  <Zap className="mr-2 h-4 w-4" />
                  API Documentation
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
