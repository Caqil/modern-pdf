
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Key,
  Plus,
  Copy,
  Trash2,
  AlertTriangle,
  CheckCircle,
  Code,
  Book,
  ExternalLink,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { apiClient } from "@/lib/api/apiClient";

// Types
interface ApiKey {
  id: string;
  name: string;
  keyPreview?: string;
  createdAt: string;
  lastUsed?: string;
}

interface NewKeyData {
  id: string;
  name: string;
  key: string;
  createdAt: string;
}

// Code examples
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
print(response.json())`
};

export default function ApiKeyManager() {
  // State management
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [newKeyName, setNewKeyName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [isRevoking, setIsRevoking] = useState(false);
  const [newKeyData, setNewKeyData] = useState<NewKeyData | null>(null);
  const [hasCopied, setHasCopied] = useState(false);

  useEffect(() => {
    fetchApiKeys();
  }, []);

  const handleCreateKey = async () => {
    if (!newKeyName.trim()) {
      toast.error("Please enter a name for your API key.");
      return;
    }

    try {
      setIsCreating(true);
      console.log("Creating API key with name:", newKeyName.trim());
      
      const response = await apiClient.apiKeys.create(newKeyName.trim());
      console.log("API key creation response:", response.data);
      
      // Your backend returns: { success: true, key: { id, name, key, createdAt } }
      const responseData = response.data;
      
      if (!responseData.key) {
        throw new Error("Invalid response format from server");
      }
      
      // Extract the nested key data
      const keyData = responseData.key;

      if (typeof keyData !== "object" || keyData === null) {
        throw new Error("Invalid response format from server");
      }

      const newKey = {
        id: (keyData as any).id || '',
        name: (keyData as any).name || newKeyName.trim(),
        key: (keyData as any).key || '',
        createdAt: (keyData as any).createdAt || new Date().toISOString()
      };
      
      console.log("Processed key data:", newKey);
      
      // Validate that we have the essential data
      if (!newKey.key) {
        throw new Error("API key not found in response");
      }
      
      setNewKeyData(newKey);
      setNewKeyName("");
      toast.success("API key created successfully!");
      
      // Try to refresh the list separately
      try {
        await fetchApiKeys();
      } catch (refreshError) {
        console.warn("Failed to refresh API keys list:", refreshError);
      }
      
    } catch (error: any) {
      console.error("Error creating API key:", error);
      
      if (error.response?.status === 401) {
        toast.error("Session expired. Please log in again.");
      } else if (error.message === "Invalid response format from server" || error.message === "API key not found in response") {
        toast.error("Server returned unexpected data. Please contact support.");
      } else {
        toast.error("Failed to create API key. Please try again.");
      }
    } finally {
      setIsCreating(false);
    }
  };

  const fetchApiKeys = async () => {
    try {
      setIsLoading(true);
      const response = await apiClient.apiKeys.list();
      setApiKeys(response.data.keys || []);
    } catch (error: any) {
      console.error("Error fetching API keys:", error);
      
      if (error.response?.status !== 401) {
        toast.error("Failed to load API keys. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleRevokeKey = async (keyId: string) => {
    try {
      setIsRevoking(true);
      await apiClient.apiKeys.revoke(keyId);
      setApiKeys(apiKeys.filter((key) => key.id !== keyId));
      toast.success("API key revoked successfully.");
    } catch (error: any) {
      console.error("Error revoking API key:", error);
      
      if (error.response?.status === 401) {
        toast.error("Session expired. Please log in again.");
      } else {
        toast.error("Failed to revoke API key. Please try again.");
      }
    } finally {
      setIsRevoking(false);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setHasCopied(true);
      toast.success("Copied to clipboard!");

      setTimeout(() => {
        setHasCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
      toast.error("Failed to copy to clipboard");
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch (error) {
      return "Invalid date";
    }
  };

  const closeNewKeyDialog = () => {
    setNewKeyData(null);
    setHasCopied(false);
  };

  return (
    <Tabs defaultValue="manage" className="space-y-6">
      <TabsList>
        <TabsTrigger value="manage" className="flex items-center gap-2">
          <Key className="h-4 w-4" />
          Manage Keys
        </TabsTrigger>
        <TabsTrigger value="documentation" className="flex items-center gap-2">
          <Book className="h-4 w-4" />
          Documentation
        </TabsTrigger>
        <TabsTrigger value="examples" className="flex items-center gap-2">
          <Code className="h-4 w-4" />
          Code Examples
        </TabsTrigger>
      </TabsList>

      {/* Manage API Keys Tab */}
      <TabsContent value="manage">
        <Card>
          <CardHeader>
            <CardTitle>API Keys</CardTitle>
            <CardDescription>
              Create and manage API keys for programmatic access to PDF services.
            </CardDescription>
          </CardHeader>

          <CardContent>
            {/* Create New Key Section */}
            <div className="flex flex-col md:flex-row md:items-end gap-4 mb-8">
              <div className="flex-1 space-y-2">
                <Label htmlFor="key-name">New API Key Name</Label>
                <Input
                  id="key-name"
                  placeholder="e.g., Production Key"
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleCreateKey();
                    }
                  }}
                />
              </div>
              <Button
                onClick={handleCreateKey}
                disabled={isCreating || !newKeyName.trim()}
                className="md:mb-0 flex items-center"
              >
                {isCreating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                <Plus className="mr-2 h-4 w-4" />
                {isCreating ? "Creating..." : "Create API Key"}
              </Button>
            </div>

            {/* API Keys List */}
            <div className="border rounded-md overflow-hidden">
              <div className="bg-muted px-4 py-3 font-medium grid grid-cols-12 gap-4">
                <div className="col-span-4">Name</div>
                <div className="col-span-3">Created</div>
                <div className="col-span-3">Last Used</div>
                <div className="col-span-2 text-right">Actions</div>
              </div>

              {isLoading ? (
                <div className="flex justify-center items-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : apiKeys.length === 0 ? (
                <div className="px-4 py-8 text-center text-muted-foreground">
                  <Key className="h-8 w-8 mx-auto mb-2" />
                  <p>No API keys found. Create your first API key to get started.</p>
                </div>
              ) : (
                <div className="divide-y">
                  {apiKeys.map((key) => (
                    <div
                      key={key.id}
                      className="px-4 py-3 grid grid-cols-12 gap-4 items-center"
                    >
                      <div className="col-span-4">
                        <div className="font-medium text-sm">{key.name}</div>
                        <div className="font-mono text-xs text-muted-foreground">
                          {key.keyPreview || `${key.id.slice(0, 8)}...`}
                        </div>
                      </div>
                      <div className="col-span-3 text-sm">
                        {formatDate(key.createdAt)}
                      </div>
                      <div className="col-span-3 text-sm text-muted-foreground">
                        {key.lastUsed ? formatDate(key.lastUsed) : "Never"}
                      </div>
                      <div className="col-span-2 flex justify-end">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Revoke API Key</DialogTitle>
                              <DialogDescription>
                                Are you sure you want to revoke "{key.name}"? 
                                This action cannot be undone.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="py-4">
                              <div className="flex items-center gap-2 p-3 bg-destructive/10 text-destructive rounded">
                                <AlertTriangle className="h-5 w-5" />
                                <p className="font-medium">
                                  Applications using this key will lose access immediately.
                                </p>
                              </div>
                            </div>
                            <DialogFooter>
                              <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                              </DialogClose>
                              <Button
                                variant="destructive"
                                onClick={() => handleRevokeKey(key.id)}
                                disabled={isRevoking}
                              >
                                {isRevoking && (
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                )}
                                {isRevoking ? "Revoking..." : "Revoke Key"}
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Documentation Tab */}
      <TabsContent value="documentation">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Book className="h-5 w-5" />
              API Documentation
            </CardTitle>
            <CardDescription>
              Learn how to authenticate and use our PDF processing APIs.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Authentication</h3>
              <p className="text-sm text-muted-foreground">
                Include your API key in the Authorization header of every request:
              </p>
              <div className="bg-muted p-3 rounded-md font-mono text-sm">
                Authorization: Bearer YOUR_API_KEY
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Base URL</h3>
              <div className="bg-muted p-3 rounded-md font-mono text-sm">
                https://api.modernpdf.com/v1
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Rate Limits</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• 1,000 requests per hour for free tier</li>
                <li>• 10,000 requests per hour for paid tiers</li>
                <li>• Rate limit headers included in every response</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Available Endpoints</h3>
              <div className="grid gap-2 text-sm">
                <div className="flex justify-between p-2 bg-muted rounded">
                  <span>POST /pdf/compress</span>
                  <span className="text-muted-foreground">Compress PDF files</span>
                </div>
                <div className="flex justify-between p-2 bg-muted rounded">
                  <span>POST /pdf/merge</span>
                  <span className="text-muted-foreground">Merge multiple PDFs</span>
                </div>
                <div className="flex justify-between p-2 bg-muted rounded">
                  <span>POST /pdf/split</span>
                  <span className="text-muted-foreground">Split PDF into pages</span>
                </div>
                <div className="flex justify-between p-2 bg-muted rounded">
                  <span>POST /pdf/convert</span>
                  <span className="text-muted-foreground">Convert PDF to other formats</span>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Button asChild>
                <a href="/docs/api" target="_blank" className="flex items-center gap-2">
                  <ExternalLink className="h-4 w-4" />
                  View Full Documentation
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Code Examples Tab */}
      <TabsContent value="examples">
        <div className="space-y-6">
          {Object.entries(codeExamples).map(([language, code]) => (
            <Card key={language}>
              <CardHeader>
                <CardTitle className="capitalize flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  {language} Example
                </CardTitle>
                <CardDescription>
                  Example of compressing a PDF using {language}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm">
                    <code>{code}</code>
                  </pre>
                  <Button
                    variant="outline"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => {
                      copyToClipboard(code);
                    }}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>

      {/* New Key Success Dialog */}
      {newKeyData && (
        <Dialog open={!!newKeyData} onOpenChange={(open) => !open && closeNewKeyDialog()}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                API Key Created Successfully
              </DialogTitle>
              <DialogDescription>
                Copy your API key now. For security reasons, you won't be able to see it again.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <div className="space-y-3">
                <div>
                  <Label className="text-sm font-medium">API Key Name</Label>
                  <div className="text-sm text-muted-foreground">
                    {String(newKeyData.name)}
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium">API Key</Label>
                  <div className="bg-muted p-3 rounded-md flex items-center gap-2">
                    <div className="font-mono text-sm flex-1 break-all">
                      {String(newKeyData.key)}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => copyToClipboard(String(newKeyData.key))}
                      className="flex-shrink-0"
                    >
                      {hasCopied ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-3">
                Store this key securely. It's like a password and grants full access to the API.
              </p>
            </div>
            <DialogFooter>
              <Button
                className="w-full sm:w-auto"
                onClick={closeNewKeyDialog}
                variant={hasCopied ? "default" : "outline"}
              >
                {hasCopied ? "Done" : "I'll copy it later"}
              </Button>
              {!hasCopied && (
                <Button
                  className="w-full sm:w-auto"
                  onClick={() => copyToClipboard(String(newKeyData.key))}
                >
                  <Copy className="mr-2 h-4 w-4" />
                  Copy Key
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </Tabs>
  );
}