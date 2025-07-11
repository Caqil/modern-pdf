"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import {
  Cookie,
  Shield,
  Settings,
  BarChart3,
  Users,
  Globe,
  CheckCircle,
  AlertTriangle,
  Info,
  Eye,
  Lock,
  Trash2,
  Clock,
  Target,
  Zap,
  Save,
  RefreshCw,
} from "lucide-react";

const cookieTypes = [
  {
    icon: Shield,
    title: "Essential Cookies",
    description: "Required for basic website functionality",
    color: "text-green-600",
    bgColor: "bg-green-50 dark:bg-green-950/20",
    canDisable: false,
    purpose: "Authentication, security, and core site features",
    retention: "Session or up to 1 year",
    examples: [
      "User authentication tokens",
      "Security preferences",
      "Shopping cart contents",
      "Form data persistence",
    ],
  },
  {
    icon: BarChart3,
    title: "Analytics Cookies",
    description: "Help us understand how you use our website",
    color: "text-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-950/20",
    canDisable: true,
    purpose: "Website performance analysis and improvement",
    retention: "Up to 2 years",
    examples: [
      "Page views and user journeys",
      "Feature usage statistics",
      "Performance metrics",
      "Error tracking",
    ],
  },
  {
    icon: Target,
    title: "Marketing Cookies",
    description: "Used to deliver relevant advertising",
    color: "text-purple-600",
    bgColor: "bg-purple-50 dark:bg-purple-950/20",
    canDisable: true,
    purpose: "Personalized marketing and advertising",
    retention: "Up to 1 year",
    examples: [
      "Ad targeting preferences",
      "Campaign tracking",
      "Social media integration",
      "Marketing attribution",
    ],
  },
  {
    icon: Settings,
    title: "Preference Cookies",
    description: "Remember your settings and choices",
    color: "text-orange-600",
    bgColor: "bg-orange-50 dark:bg-orange-950/20",
    canDisable: true,
    purpose: "Personalization and user experience",
    retention: "Up to 1 year",
    examples: [
      "Language preferences",
      "Theme settings",
      "Layout customizations",
      "Notification preferences",
    ],
  },
];

const specificCookies = [
  {
    name: "_modernpdf_session",
    type: "Essential",
    purpose: "User authentication and session management",
    duration: "Session",
    thirdParty: false,
  },
  {
    name: "_modernpdf_csrf",
    type: "Essential",
    purpose: "Cross-site request forgery protection",
    duration: "Session",
    thirdParty: false,
  },
  {
    name: "_modernpdf_prefs",
    type: "Preference",
    purpose: "User interface preferences and settings",
    duration: "1 year",
    thirdParty: false,
  },
  {
    name: "_ga",
    type: "Analytics",
    purpose: "Google Analytics - distinguish users",
    duration: "2 years",
    thirdParty: true,
  },
  {
    name: "_ga_*",
    type: "Analytics",
    purpose: "Google Analytics 4 - session tracking",
    duration: "2 years",
    thirdParty: true,
  },
  {
    name: "_fbp",
    type: "Marketing",
    purpose: "Facebook Pixel - track conversions",
    duration: "3 months",
    thirdParty: true,
  },
  {
    name: "intercom-*",
    type: "Preference",
    purpose: "Customer support chat preferences",
    duration: "9 months",
    thirdParty: true,
  },
];

const thirdPartyServices = [
  {
    name: "Google Analytics",
    purpose: "Website analytics and performance monitoring",
    cookies: ["_ga", "_ga_*", "_gid"],
    privacyPolicy: "https://policies.google.com/privacy",
    optOut: "https://tools.google.com/dlpage/gaoptout",
  },
  {
    name: "Facebook Pixel",
    purpose: "Marketing analytics and advertising optimization",
    cookies: ["_fbp", "_fbc"],
    privacyPolicy: "https://www.facebook.com/privacy/policy",
    optOut: "https://www.facebook.com/settings?tab=ads",
  },
  {
    name: "Intercom",
    purpose: "Customer support and live chat functionality",
    cookies: ["intercom-*"],
    privacyPolicy: "https://www.intercom.com/legal/privacy",
    optOut: "Contact us to disable chat",
  },
  {
    name: "Stripe",
    purpose: "Payment processing and fraud prevention",
    cookies: ["__stripe_*"],
    privacyPolicy: "https://stripe.com/privacy",
    optOut: "Required for payments",
  },
];

export default function CookiesPage() {
  const [cookiePreferences, setCookiePreferences] = useState({
    essential: true,
    analytics: true,
    marketing: false,
    preferences: true,
  });

  const [preferencesChanged, setPreferencesChanged] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">(
    "idle"
  );

  const handlePreferenceChange = (type: string, enabled: boolean) => {
    if (type === "essential") return; // Essential cookies cannot be disabled

    setCookiePreferences((prev) => ({ ...prev, [type]: enabled }));
    setPreferencesChanged(true);
    setSaveStatus("idle");
  };

  const savePreferences = async () => {
    setSaveStatus("saving");

    // Simulate API call to save preferences
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setSaveStatus("saved");
    setPreferencesChanged(false);

    // Reset status after 3 seconds
    setTimeout(() => setSaveStatus("idle"), 3000);
  };

  const acceptAllCookies = () => {
    setCookiePreferences({
      essential: true,
      analytics: true,
      marketing: true,
      preferences: true,
    });
    setPreferencesChanged(true);
  };

  const rejectOptionalCookies = () => {
    setCookiePreferences({
      essential: true,
      analytics: false,
      marketing: false,
      preferences: false,
    });
    setPreferencesChanged(true);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 px-4 text-center bg-gradient-to-br from-primary/5 via-background to-secondary/5">
          <div className="max-w-4xl mx-auto">
            <Badge variant="outline" className="mb-6">
              <Cookie className="w-3 h-3 mr-1" />
              Cookie Policy
            </Badge>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Cookie Policy & Preferences
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              We use cookies to enhance your experience, analyze website
              performance, and deliver personalized content. You have full
              control over which cookies we can use.
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

        {/* Cookie Preferences */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Manage Your Cookie Preferences
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Choose which types of cookies you're comfortable with. You can
                change these settings at any time.
              </p>
            </div>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Cookie Settings
                </CardTitle>
                <CardDescription>
                  Control which cookies we can store on your device.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {cookieTypes.map((type, index) => (
                  <div key={index} className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div
                          className={`w-12 h-12 ${type.bgColor} rounded-lg flex items-center justify-center mt-1`}
                        >
                          <type.icon className={`h-6 w-6 ${type.color}`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold">
                              {type.title}
                            </h3>
                            {!type.canDisable && (
                              <Badge variant="outline" className="text-xs">
                                Required
                              </Badge>
                            )}
                          </div>
                          <p className="text-muted-foreground mb-3">
                            {type.description}
                          </p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="font-medium">Purpose:</span>
                              <p className="text-muted-foreground">
                                {type.purpose}
                              </p>
                            </div>
                            <div>
                              <span className="font-medium">Retention:</span>
                              <p className="text-muted-foreground">
                                {type.retention}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="ml-4">
                        <Switch
                          checked={
                            cookiePreferences[
                              type.title
                                .toLowerCase()
                                .split(" ")[0] as keyof typeof cookiePreferences
                            ]
                          }
                          onCheckedChange={(checked) =>
                            handlePreferenceChange(
                              type.title.toLowerCase().split(" ")[0],
                              checked
                            )
                          }
                          disabled={!type.canDisable}
                        />
                      </div>
                    </div>

                    <div className="ml-16 space-y-2">
                      <h4 className="font-medium text-sm">Examples:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {type.examples.map((example, exampleIndex) => (
                          <li
                            key={exampleIndex}
                            className="flex items-center gap-2"
                          >
                            <div className="w-1 h-1 bg-current rounded-full"></div>
                            {example}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {index < cookieTypes.length - 1 && <Separator />}
                  </div>
                ))}

                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <Button
                    onClick={savePreferences}
                    disabled={!preferencesChanged || saveStatus === "saving"}
                    className="flex-1"
                  >
                    {saveStatus === "saving" ? (
                      <>
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2"></div>
                        Saving...
                      </>
                    ) : saveStatus === "saved" ? (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Saved!
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Save Preferences
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={acceptAllCookies}
                    className="flex-1"
                  >
                    Accept All
                  </Button>
                  <Button
                    variant="outline"
                    onClick={rejectOptionalCookies}
                    className="flex-1"
                  >
                    Reject Optional
                  </Button>
                </div>

                {preferencesChanged && (
                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                      You have unsaved changes to your cookie preferences. Click
                      "Save Preferences" to apply them.
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Detailed Information */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Understanding Cookies</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Learn more about how we use cookies and your rights regarding
                them.
              </p>
            </div>

            <Tabs defaultValue="overview" className="space-y-8">
              <TabsList className="grid w-full grid-cols-4 max-w-2xl mx-auto">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="details">Cookie Details</TabsTrigger>
                <TabsTrigger value="thirdparty">Third Parties</TabsTrigger>
                <TabsTrigger value="rights">Your Rights</TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <div className="space-y-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Cookie className="w-5 h-5" />
                        What Are Cookies?
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-muted-foreground">
                        Cookies are small text files stored on your device when
                        you visit our website. They help us provide you with a
                        better experience by remembering your preferences and
                        analyzing how you use our site.
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <h4 className="font-semibold flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            How We Use Cookies
                          </h4>
                          <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>• Keep you logged in during your session</li>
                            <li>• Remember your preferences and settings</li>
                            <li>• Analyze website performance and usage</li>
                            <li>• Provide personalized content and ads</li>
                            <li>
                              • Improve our services based on your feedback
                            </li>
                          </ul>
                        </div>

                        <div className="space-y-3">
                          <h4 className="font-semibold flex items-center gap-2">
                            <Shield className="w-4 h-4 text-blue-600" />
                            Your Privacy Rights
                          </h4>
                          <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>• Choose which cookies to accept</li>
                            <li>• Change your preferences at any time</li>
                            <li>• Delete cookies from your browser</li>
                            <li>• Opt out of analytics and marketing</li>
                            <li>• Request information about stored data</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                      {
                        icon: Clock,
                        title: "Session Cookies",
                        description:
                          "Temporary cookies deleted when you close your browser",
                      },
                      {
                        icon: Save,
                        title: "Persistent Cookies",
                        description:
                          "Stored for a specific period to remember your preferences",
                      },
                      {
                        icon: Lock,
                        title: "Secure Cookies",
                        description:
                          "Only transmitted over encrypted HTTPS connections",
                      },
                      {
                        icon: Globe,
                        title: "SameSite Cookies",
                        description:
                          "Protected against cross-site request forgery attacks",
                      },
                    ].map((item, index) => (
                      <Card key={index} className="text-center">
                        <CardContent className="pt-6">
                          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                            <item.icon className="h-6 w-6 text-primary" />
                          </div>
                          <h3 className="font-semibold mb-2">{item.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {item.description}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="details">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Eye className="w-5 h-5" />
                      Specific Cookies We Use
                    </CardTitle>
                    <CardDescription>
                      Complete list of cookies used on our website and their
                      purposes.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {specificCookies.map((cookie, index) => (
                        <div
                          key={index}
                          className="p-4 rounded-lg border bg-background"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h4 className="font-semibold font-mono text-sm">
                                {cookie.name}
                              </h4>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge
                                  variant={
                                    cookie.type === "Essential"
                                      ? "default"
                                      : "outline"
                                  }
                                  className="text-xs"
                                >
                                  {cookie.type}
                                </Badge>
                                {cookie.thirdParty && (
                                  <Badge variant="outline" className="text-xs">
                                    Third-party
                                  </Badge>
                                )}
                              </div>
                            </div>
                            <div className="text-right text-sm">
                              <div className="font-medium">
                                {cookie.duration}
                              </div>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {cookie.purpose}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="thirdparty">
                <div className="space-y-6">
                  <Alert>
                    <Users className="h-4 w-4" />
                    <AlertDescription>
                      We work with trusted third-party services to provide
                      enhanced functionality. Each service has its own privacy
                      policy and cookie practices.
                    </AlertDescription>
                  </Alert>

                  {thirdPartyServices.map((service, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">
                            {service.name}
                          </CardTitle>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" asChild>
                              <a
                                href={service.privacyPolicy}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Privacy Policy
                              </a>
                            </Button>
                            <Button size="sm" variant="outline" asChild>
                              <a
                                href={service.optOut}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Opt Out
                              </a>
                            </Button>
                          </div>
                        </div>
                        <CardDescription>{service.purpose}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div>
                          <h4 className="font-medium mb-2">Cookies used:</h4>
                          <div className="flex flex-wrap gap-2">
                            {service.cookies.map((cookie, cookieIndex) => (
                              <Badge
                                key={cookieIndex}
                                variant="outline"
                                className="font-mono text-xs"
                              >
                                {cookie}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="rights">
                <div className="space-y-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Shield className="w-5 h-5" />
                        Your Cookie Rights
                      </CardTitle>
                      <CardDescription>
                        You have several rights regarding how we use cookies on
                        our website.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <h4 className="font-medium">Accept or Reject</h4>
                              <p className="text-sm text-muted-foreground">
                                Choose which types of cookies you want to allow
                                on your device.
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <RefreshCw className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <h4 className="font-medium">
                                Change Preferences
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                Update your cookie settings at any time through
                                this page.
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <Trash2 className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <h4 className="font-medium">Delete Cookies</h4>
                              <p className="text-sm text-muted-foreground">
                                Clear cookies through your browser settings or
                                our cookie banner.
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <Eye className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <h4 className="font-medium">
                                Access Information
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                Request details about what cookie data we have
                                stored.
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <Settings className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <h4 className="font-medium">Browser Controls</h4>
                              <p className="text-sm text-muted-foreground">
                                Use your browser's built-in cookie management
                                tools.
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <Globe className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <h4 className="font-medium">
                                Third-party Opt-outs
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                Manage cookies from our partners through their
                                platforms.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Browser Cookie Settings</CardTitle>
                      <CardDescription>
                        Learn how to manage cookies in popular web browsers.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                          {
                            name: "Chrome",
                            url: "https://support.google.com/chrome/answer/95647",
                          },
                          {
                            name: "Firefox",
                            url: "https://support.mozilla.org/kb/enhanced-tracking-protection-firefox-desktop",
                          },
                          {
                            name: "Safari",
                            url: "https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac",
                          },
                          {
                            name: "Edge",
                            url: "https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09",
                          },
                        ].map((browser, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            className="h-auto p-4"
                            asChild
                          >
                            <a
                              href={browser.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex flex-col items-center gap-2"
                            >
                              <Globe className="w-6 h-6" />
                              <span>{browser.name}</span>
                            </a>
                          </Button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 px-4 bg-primary/5">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Questions About Cookies?
            </h2>
            <p className="text-muted-foreground mb-8 text-lg">
              If you have any questions about our use of cookies or need help
              managing your preferences, we're here to help.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <Card>
                <CardContent className="p-6 text-center">
                  <Settings className="w-8 h-8 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Cookie Settings</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Update your preferences anytime
                  </p>
                  <Button
                    variant="outline"
                    onClick={() =>
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                  >
                    Manage Cookies
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <Users className="w-8 h-8 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Contact Support</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Get help with privacy questions
                  </p>
                  <Button variant="outline" asChild>
                    <a href="mailto:privacy@modernpdf.com">Email Us</a>
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8 text-sm text-muted-foreground">
              <p>
                <strong>Contact:</strong> privacy@modernpdf.com |
                <strong> Address:</strong> 123 Privacy Street, San Francisco, CA
                94102
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
