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
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  CreditCard,
  DollarSign,
  Calendar,
  TrendingUp,
  Plus,
  Download,
  Star,
  Zap,
  Shield,
  Loader2,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import { apiClient } from "@/lib/api/apiClient";
import { toast } from "sonner";

interface BillingData {
  currentBalance: number;
  freeOperationsUsed: number;
  freeOperationsRemaining: number;
  freeOperationsReset: string;
}

interface Transaction {
  id: string;
  type: "deposit" | "operation" | "refund";
  amount: number;
  description: string;
  date: string;
  status: "completed" | "pending" | "failed";
}

const pricingPlans = [
  {
    name: "Free",
    price: 0,
    period: "month",
    description: "Perfect for occasional use",
    features: [
      "100 operations per month",
      "All PDF tools",
      "Up to 50MB file size",
      "Basic support",
    ],
    current: true,
  },
  {
    name: "Pro",
    price: 9.99,
    period: "month",
    description: "Best for regular users",
    features: [
      "1,000 operations per month",
      "All PDF tools",
      "Up to 100MB file size",
      "Priority support",
      "API access",
      "Batch processing",
    ],
    popular: true,
  },
  {
    name: "Business",
    price: 29.99,
    period: "month",
    description: "For teams and businesses",
    features: [
      "Unlimited operations",
      "All PDF tools",
      "Up to 500MB file size",
      "24/7 priority support",
      "API access",
      "Batch processing",
      "Team management",
      "Custom integrations",
    ],
  },
];

export default function BillingPage() {
  const [billingData, setBillingData] = useState<BillingData | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [depositAmount, setDepositAmount] = useState("");
  const [isProcessingDeposit, setIsProcessingDeposit] = useState(false);

  useEffect(() => {
    fetchBillingData();
  }, []);

  const fetchBillingData = async () => {
    try {
      setIsLoading(true);
      const response = await apiClient.user.getBalance();
      setBillingData({
        currentBalance: response.data.balance || 0,
        freeOperationsUsed: response.data.freeOperationsUsed || 0,
        freeOperationsRemaining: response.data.freeOperationsRemaining || 100,
        freeOperationsReset:
          response.data.freeOperationsReset || new Date().toISOString(),
      });

      // Mock transactions data
      setTransactions([
        {
          id: "1",
          type: "deposit",
          amount: 10.0,
          description: "Account top-up",
          date: "2024-12-20T10:30:00Z",
          status: "completed",
        },
        {
          id: "2",
          type: "operation",
          amount: -0.1,
          description: "PDF compression",
          date: "2024-12-19T15:22:00Z",
          status: "completed",
        },
        {
          id: "3",
          type: "operation",
          amount: -0.15,
          description: "PDF conversion to Word",
          date: "2024-12-19T14:10:00Z",
          status: "completed",
        },
      ]);
    } catch (error) {
      console.error("Error fetching billing data:", error);
      toast.error("Failed to load your billing information. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeposit = async () => {
    if (!depositAmount || parseFloat(depositAmount) < 1) {
      toast.error("Please enter an amount of at least $1.00");
      return;
    }

    setIsProcessingDeposit(true);
    try {
      const response = await apiClient.user.createDeposit(
        parseFloat(depositAmount),
        "USD"
      );

      if (response.data.paymentUrl) {
        // Redirect to payment processor
        window.open(response.data.paymentUrl, "_blank");
      }

      toast.success(
        "Payment initiated. Please complete the payment to add funds to your account."
      );

      setDepositAmount("");
    } catch (error) {
      console.error("Deposit error:", error);
      toast("Failed to initiate payment. Please try again.");
    } finally {
      setIsProcessingDeposit(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight">Billing & Usage</h1>
          <p className="text-muted-foreground">
            Manage your account balance and view usage statistics
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <div className="h-4 bg-muted animate-pulse rounded w-20"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-muted animate-pulse rounded w-16"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  const freeOperationsTotal = 100;
  const freeOperationsUsedPercentage = billingData
    ? (billingData.freeOperationsUsed / freeOperationsTotal) * 100
    : 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Billing & Usage</h1>
          <p className="text-muted-foreground">
            Manage your account balance and view usage statistics
          </p>
        </div>
      </div>

      {/* Current Status Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Account Balance
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(billingData?.currentBalance || 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Available for operations
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Free Operations
            </CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {billingData?.freeOperationsRemaining || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Remaining this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Reset</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Date(
                billingData?.freeOperationsReset || new Date()
              ).getDate()}
            </div>
            <p className="text-xs text-muted-foreground">Days until reset</p>
          </CardContent>
        </Card>
      </div>

      {/* Usage Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Usage</CardTitle>
          <CardDescription>
            Track your free operations usage this month
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Free Operations Used</span>
              <span>
                {billingData?.freeOperationsUsed || 0} / {freeOperationsTotal}
              </span>
            </div>
            <Progress value={freeOperationsUsedPercentage} className="h-2" />
          </div>

          <div className="flex items-center justify-between pt-4 border-t">
            <div className="text-sm text-muted-foreground">
              Resets on{" "}
              {formatDate(
                billingData?.freeOperationsReset || new Date().toISOString()
              )}
            </div>
            {freeOperationsUsedPercentage > 80 && (
              <Badge variant="destructive">
                <AlertTriangle className="w-3 h-3 mr-1" />
                Low remaining
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Add Funds */}
      <Card>
        <CardHeader>
          <CardTitle>Add Funds</CardTitle>
          <CardDescription>
            Top up your account balance for additional operations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-4">
            <div className="flex-1">
              <Label htmlFor="amount">Amount (USD)</Label>
              <Input
                id="amount"
                type="number"
                placeholder="10.00"
                min="1"
                step="0.01"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                disabled={isProcessingDeposit}
              />
            </div>
            <div className="flex items-end">
              <Button
                onClick={handleDeposit}
                disabled={isProcessingDeposit || !depositAmount}
              >
                {isProcessingDeposit ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Funds
                  </>
                )}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 mt-4">
            {["5.00", "10.00", "25.00"].map((amount) => (
              <Button
                key={amount}
                variant="outline"
                size="sm"
                onClick={() => setDepositAmount(amount)}
                disabled={isProcessingDeposit}
              >
                ${amount}
              </Button>
            ))}
          </div>

          <div className="text-xs text-muted-foreground mt-4">
            <p>• Funds are added instantly upon successful payment</p>
            <p>
              • Each operation costs between $0.05 - $0.20 depending on
              complexity
            </p>
            <p>• Unused balance never expires</p>
          </div>
        </CardContent>
      </Card>

      {/* Pricing Plans */}
      <Card>
        <CardHeader>
          <CardTitle>Upgrade Your Plan</CardTitle>
          <CardDescription>
            Get more operations and premium features
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            {pricingPlans.map((plan) => (
              <Card
                key={plan.name}
                className={`relative ${plan.popular ? "border-primary" : ""}`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                    Most Popular
                  </Badge>
                )}
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{plan.name}</CardTitle>
                    {plan.current && <Badge variant="outline">Current</Badge>}
                  </div>
                  <div className="flex items-baseline space-x-1">
                    <span className="text-3xl font-bold">${plan.price}</span>
                    <span className="text-muted-foreground">
                      /{plan.period}
                    </span>
                  </div>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="w-full"
                    variant={plan.current ? "outline" : "default"}
                    disabled={plan.current}
                  >
                    {plan.current ? "Current Plan" : "Upgrade"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>View your recent account activity</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </CardHeader>
        <CardContent>
          {transactions.length > 0 ? (
            <div className="space-y-4">
              {transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`rounded-full p-2 ${
                        transaction.type === "deposit"
                          ? "bg-green-100 dark:bg-green-900/20"
                          : "bg-blue-100 dark:bg-blue-900/20"
                      }`}
                    >
                      {transaction.type === "deposit" ? (
                        <Plus className="h-4 w-4 text-green-600 dark:text-green-400" />
                      ) : (
                        <Zap className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{transaction.description}</p>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(transaction.date)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div
                      className={`font-medium ${
                        transaction.amount > 0
                          ? "text-green-600"
                          : "text-muted-foreground"
                      }`}
                    >
                      {transaction.amount > 0 ? "+" : ""}
                      {formatCurrency(Math.abs(transaction.amount))}
                    </div>
                    <Badge
                      variant={
                        transaction.status === "completed"
                          ? "default"
                          : "secondary"
                      }
                      className="text-xs"
                    >
                      {transaction.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6">
              <CreditCard className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">
                No transactions yet. Add funds or start using PDF tools to see
                activity here.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
