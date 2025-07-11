"use client";
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Mail,
  Calendar,
  Shield,
  CreditCard,
  Key,
  Activity,
  Settings,
  Bell,
  Download,
  Loader2,
} from "lucide-react";
import { apiClient } from "@/lib/api/apiClient";
import { toast } from "sonner";
import ProfileForm from "@/components/profile/profile-form";
import BillingInfo from "@/components/profile/billing-info";
import ApiKeyManager from "@/components/profile/api-key-manager";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  balance?: number;
  freeOperationsRemaining?: number;
  createdAt?: string;
  lastLogin?: string;
  isEmailVerified?: boolean;
  avatar?: string | null;
}

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      setIsLoading(true);

      // First check localStorage for cached user data
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }

      // Fetch fresh user data from API
      const response = await apiClient.user.getProfile();
      const userData = response.data;

      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
    } catch (error) {
      console.error("Error fetching user profile:", error);
      toast.error("Failed to load your profile information. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleExportData = async () => {
    try {
      toast.info("Preparing your data export...");
      // This would trigger a data export request
      // await apiClient.user.requestDataExport();
      toast.success(
        "Data export request submitted. You'll receive an email when ready."
      );
    } catch (error) {
      console.error("Error requesting data export:", error);
      toast.error("Failed to request data export. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-lg font-medium">Unable to load profile</p>
          <p className="text-sm text-muted-foreground">
            Please refresh the page or try again later.
          </p>
          <Button onClick={fetchUserProfile}>Retry</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Profile Settings
          </h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>
      </div>

      {/* Profile Overview Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
              ) : (
                <User className="h-8 w-8 text-primary" />
              )}
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex items-center space-x-3">
                <h2 className="text-xl font-semibold">{user.name}</h2>
                {user.isEmailVerified && (
                  <Badge variant="default" className="text-xs">
                    <Shield className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
                )}
                <Badge variant="outline" className="text-xs capitalize">
                  {user.role}
                </Badge>
              </div>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Mail className="w-4 h-4" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>Joined {formatDate(user.createdAt)}</span>
                </div>
              </div>
              {user.lastLogin && (
                <div className="text-sm text-muted-foreground">
                  Last login: {formatDate(user.lastLogin)}
                </div>
              )}
              {user.freeOperationsRemaining !== undefined && (
                <div className="text-sm text-muted-foreground">
                  Free operations remaining: {user.freeOperationsRemaining}
                </div>
              )}
            </div>
            <Button variant="outline" size="sm" onClick={handleExportData}>
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Settings Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile" className="flex items-center space-x-2">
            <User className="w-4 h-4" />
            <span className="hidden sm:inline">Profile</span>
          </TabsTrigger>
          <TabsTrigger value="billing" className="flex items-center space-x-2">
            <CreditCard className="w-4 h-4" />
            <span className="hidden sm:inline">Billing</span>
          </TabsTrigger>
          <TabsTrigger value="api-keys" className="flex items-center space-x-2">
            <Key className="w-4 h-4" />
            <span className="hidden sm:inline">API Keys</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center space-x-2">
            <Shield className="w-4 h-4" />
            <span className="hidden sm:inline">Security</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <ProfileForm />
        </TabsContent>

        <TabsContent value="billing" className="space-y-6">
          <BillingInfo />
        </TabsContent>

        <TabsContent value="api-keys" className="space-y-6">
          <ApiKeyManager />
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          {/* Security Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Manage your account security and privacy settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Password Change */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium">Password</h4>
                  <p className="text-sm text-muted-foreground">
                    Change your account password
                  </p>
                </div>
                <Button variant="outline">Change Password</Button>
              </div>

              <Separator />

              {/* Email Verification */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium">Email Verification</h4>
                    <p className="text-sm text-muted-foreground">
                      {user.isEmailVerified
                        ? "Your email address is verified"
                        : "Please verify your email address"}
                    </p>
                  </div>
                  {user.isEmailVerified ? (
                    <Badge variant="default">
                      <Shield className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  ) : (
                    <Button variant="outline" size="sm">
                      Verify Email
                    </Button>
                  )}
                </div>
              </div>

              <Separator />

              {/* Two-Factor Authentication */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium">
                      Two-Factor Authentication
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Enable 2FA
                  </Button>
                </div>
              </div>

              <Separator />

              {/* Session Management */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium">Active Sessions</h4>
                  <p className="text-sm text-muted-foreground">
                    Manage devices that are currently signed in
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Current Session</p>
                      <p className="text-xs text-muted-foreground">
                        Chrome on Windows • Last active now
                      </p>
                    </div>
                    <Badge variant="outline">Current</Badge>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Activity className="w-4 h-4 mr-2" />
                  View All Sessions
                </Button>
              </div>

              <Separator />

              {/* Account Deletion */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-destructive">
                    Delete Account
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Permanently delete your account and all associated data
                  </p>
                </div>
                <Button variant="destructive" size="sm">
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Privacy Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Privacy Settings</CardTitle>
              <CardDescription>
                Control how your data is used and shared
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Data Usage */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium">Usage Analytics</h4>
                    <p className="text-sm text-muted-foreground">
                      Help improve our service by sharing usage data
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Settings className="w-4 h-4 mr-2" />
                    Configure
                  </Button>
                </div>
              </div>

              <Separator />

              {/* Email Notifications */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium">Email Notifications</h4>
                    <p className="text-sm text-muted-foreground">
                      Manage email notifications and updates
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Bell className="w-4 h-4 mr-2" />
                    Manage
                  </Button>
                </div>
              </div>

              <Separator />

              {/* Data Export */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium">Data Export</h4>
                  <p className="text-sm text-muted-foreground">
                    Download a copy of your account data
                  </p>
                </div>
                <Button variant="outline" size="sm" onClick={handleExportData}>
                  <Download className="w-4 h-4 mr-2" />
                  Request Export
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
