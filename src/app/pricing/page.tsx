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
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import {
  Check,
  ArrowRight,
  Calculator,
  Zap,
  Shield,
  Users,
  Star,
  Download,
  FileImage,
  Merge,
  Scissors,
  Lock,
  Search,
  CreditCard,
  Wallet,
  TrendingDown,
  Globe,
  Clock,
  HeadphonesIcon,
  Code,
  BarChart3,
} from "lucide-react";

const operationPricing = [
  { name: "Compress PDF", basePrice: 0.05, icon: Download },
  { name: "Convert PDF", basePrice: 0.08, icon: FileImage },
  { name: "Merge PDFs", basePrice: 0.03, icon: Merge },
  { name: "Split PDF", basePrice: 0.04, icon: Scissors },
  { name: "Protect PDF", basePrice: 0.06, icon: Lock },
  { name: "OCR Processing", basePrice: 0.12, icon: Search },
];

const tierBenefits = [
  {
    tier: "Free Tier",
    operations: "100 free operations/month",
    features: [
      "All basic PDF tools",
      "Files up to 10MB",
      "Standard processing speed",
      "Email support",
    ],
    badge: "Perfect for individuals",
    color: "text-green-600",
    bgColor: "bg-green-50 dark:bg-green-950/20",
  },
  {
    tier: "Pay-as-you-go",
    operations: "Starting at $0.03/operation",
    features: [
      "All PDF tools & features",
      "Files up to 100MB",
      "Priority processing",
      "24/7 support",
      "Bulk discounts",
      "No monthly commitment",
    ],
    badge: "Most flexible",
    color: "text-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-950/20",
  },
  {
    tier: "Enterprise",
    operations: "Custom volume pricing",
    features: [
      "Everything in Pay-as-you-go",
      "Dedicated API access",
      "Custom integrations",
      "SLA guarantees",
      "Priority support",
      "Volume discounts up to 70%",
    ],
    badge: "Best for teams",
    color: "text-purple-600",
    bgColor: "bg-purple-50 dark:bg-purple-950/20",
  },
];

const apiFeatures = [
  { name: "REST API Access", included: true },
  { name: "Webhook Support", included: true },
  { name: "Rate Limiting", included: true },
  { name: "API Documentation", included: true },
  { name: "SDK Libraries", included: true },
  { name: "White-label Options", enterprise: true },
];

const faqData = [
  {
    question: "How does pay-per-operation pricing work?",
    answer:
      "You only pay for the operations you use. Each PDF processing task (compress, convert, merge, etc.) counts as one operation. No monthly subscriptions or hidden fees.",
  },
  {
    question: "What are the volume discounts?",
    answer:
      "Discounts apply automatically: 10% off for 1,000+ operations, 25% off for 10,000+ operations, and up to 70% off for enterprise volumes.",
  },
  {
    question: "Is there a free tier?",
    answer:
      "Yes! Every account includes 100 free operations per month. Perfect for trying our services or light usage.",
  },
  {
    question: "How do I add credits to my account?",
    answer:
      "You can add credits anytime through your dashboard. We accept all major credit cards and PayPal. Credits never expire.",
  },
];

export default function PricingPage() {
  const [operationCount, setOperationCount] = useState([1000]);

  const calculateDiscount = (count: number) => {
    if (count >= 50000) return 0.7; // 70% discount
    if (count >= 10000) return 0.25; // 25% discount
    if (count >= 1000) return 0.1; // 10% discount
    return 0;
  };

  const calculateTotal = (basePrice: number, count: number) => {
    const discount = calculateDiscount(count);
    const discountedPrice = basePrice * (1 - discount);
    return (discountedPrice * count).toFixed(2);
  };

  const getDiscountText = (count: number) => {
    const discount = calculateDiscount(count);
    if (discount === 0) return "";
    return `${Math.round(discount * 100)}% volume discount applied`;
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-24 px-4 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5"></div>

          <div className="relative max-w-6xl mx-auto">
            <Badge variant="outline" className="mb-6">
              <Calculator className="w-3 h-3 mr-1" />
              Simple & Transparent Pricing
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Pay Only for What You Use
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              No subscriptions, no hidden fees. Start with 100 free operations
              monthly, then pay per operation with automatic volume discounts.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" asChild>
                <Link href="/register">
                  Start Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/tools">Try Tools Now</Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto text-sm">
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <Check className="w-4 h-4 text-green-600" />
                100 free operations monthly
              </div>
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <Check className="w-4 h-4 text-green-600" />
                No monthly commitments
              </div>
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <Check className="w-4 h-4 text-green-600" />
                Volume discounts up to 70%
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Calculator */}
        <section className="py-20 px-4 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Pricing Calculator</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Estimate your costs based on monthly usage. Discounts apply
                automatically.
              </p>
            </div>

            <Card className="max-w-4xl mx-auto">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="w-5 h-5" />
                  Calculate Your Monthly Cost
                </CardTitle>
                <CardDescription>
                  Adjust the slider to see pricing for your expected monthly
                  volume
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium">
                      Operations per month
                    </label>
                    <Badge variant="outline" className="text-lg px-3 py-1">
                      {operationCount[0].toLocaleString()}
                    </Badge>
                  </div>
                  <Slider
                    value={operationCount}
                    onValueChange={setOperationCount}
                    max={100000}
                    min={100}
                    step={100}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>100</span>
                    <span>50K</span>
                    <span>100K+</span>
                  </div>
                  {getDiscountText(operationCount[0]) && (
                    <div className="text-center">
                      <Badge variant="secondary" className="text-green-600">
                        <TrendingDown className="w-3 h-3 mr-1" />
                        {getDiscountText(operationCount[0])}
                      </Badge>
                    </div>
                  )}
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {operationPricing.map((operation) => (
                    <div
                      key={operation.name}
                      className="flex items-center justify-between p-4 rounded-lg border bg-background"
                    >
                      <div className="flex items-center gap-3">
                        <operation.icon className="w-5 h-5 text-primary" />
                        <span className="font-medium">{operation.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-primary">
                          $
                          {calculateTotal(
                            operation.basePrice,
                            operationCount[0]
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          $
                          {(
                            operation.basePrice *
                            (1 - calculateDiscount(operationCount[0]))
                          ).toFixed(3)}
                          /op
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Pricing Tiers */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Choose Your Plan</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Start free and scale as you grow. No contracts, cancel anytime.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {tierBenefits.map((tier, index) => (
                <Card
                  key={tier.tier}
                  className={`relative ${
                    index === 1 ? "ring-2 ring-primary" : ""
                  }`}
                >
                  {index === 1 && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-primary text-primary-foreground">
                        <Star className="w-3 h-3 mr-1" />
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  <CardHeader>
                    <div
                      className={`inline-flex w-fit px-3 py-1 rounded-full ${tier.bgColor} mb-4`}
                    >
                      <span className={`text-sm font-medium ${tier.color}`}>
                        {tier.badge}
                      </span>
                    </div>
                    <CardTitle className="text-xl">{tier.tier}</CardTitle>
                    <CardDescription className="text-lg font-semibold text-foreground">
                      {tier.operations}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {tier.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      className="w-full"
                      variant={index === 1 ? "default" : "outline"}
                      asChild
                    >
                      <Link href={index === 2 ? "/contact" : "/register"}>
                        {index === 2 ? "Contact Sales" : "Get Started"}
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* API Features */}
        <section className="py-20 px-4 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">
                <Code className="w-3 h-3 mr-1" />
                Developer Tools
              </Badge>
              <h2 className="text-3xl font-bold mb-4">Powerful API Included</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Integrate PDF processing into your applications with our
                comprehensive API.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="w-5 h-5" />
                    API Features
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {apiFeatures.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-600" />
                        <span>{feature.name}</span>
                        {feature.enterprise && (
                          <Badge variant="outline" className="text-xs">
                            Enterprise
                          </Badge>
                        )}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Usage Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-600" />
                      <span>Real-time usage tracking</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-600" />
                      <span>Detailed operation logs</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-600" />
                      <span>Cost breakdown reports</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-600" />
                      <span>Usage alerts & limits</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-muted-foreground">
                Everything you need to know about our pricing model.
              </p>
            </div>

            <div className="grid gap-6">
              {faqData.map((faq, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-primary/5">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Start with 100 free operations. No credit card required.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button size="lg" asChild>
                <Link href="/register">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Start Free Account
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">
                  <HeadphonesIcon className="mr-2 h-4 w-4" />
                  Contact Sales
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto text-sm text-muted-foreground">
              <div className="flex items-center justify-center gap-1">
                <Clock className="w-4 h-4 text-green-600" />
                Setup in under 60 seconds
              </div>
              <div className="flex items-center justify-center gap-1">
                <Shield className="w-4 h-4 text-green-600" />
                Enterprise-grade security
              </div>
              <div className="flex items-center justify-center gap-1">
                <Wallet className="w-4 h-4 text-green-600" />
                Credits never expire
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
