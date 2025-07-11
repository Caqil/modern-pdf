"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ApiKey } from "@/types/api";
import apiClient from "@/lib/api/apiClient";
import { Loader2, Key, CheckCircle, Copy, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

export default function ApiKeyManager() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [newKeyName, setNewKeyName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [newKeyData, setNewKeyData] = useState<{
    id: string;
    name: string;
    key: string;
    createdAt: string;
  } | null>(null);
  const [hasCopied, setHasCopied] = useState(false);
  // We don't need to track which key is being revoked since we pass the ID directly
  const setKeyToRevoke = useState<string | null>(null)[1];
  const [isRevoking, setIsRevoking] = useState(false);

  useEffect(() => {
    fetchApiKeys();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchApiKeys = async () => {
    try {
      setIsLoading(true);
      const response = await apiClient.apiKeys.list();
      setApiKeys(response.data.keys || []);
    } catch (error) {
      console.error("Error fetching API keys:", error);
      toast.error(
        "There was an error retrieving your API keys. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateKey = async () => {
    if (!newKeyName.trim()) {
      toast.error("Please enter a name for your API key.");
      return;
    }

    try {
      setIsCreating(true);
      const response = await apiClient.apiKeys.create(newKeyName.trim());
      setNewKeyData(response.data);
      setNewKeyName("");
      fetchApiKeys(); // Refresh the key list

      toast.success("Your new API key has been created successfully.");
    } catch (error) {
      console.error("Error creating API key:", error);
      toast.error(
        "There was an error creating your API key. Please try again."
      );
    } finally {
      setIsCreating(false);
    }
  };

  const handleRevokeKey = async (keyId: string) => {
    try {
      setIsRevoking(true);
      await apiClient.apiKeys.revoke(keyId);
      setApiKeys(apiKeys.filter((key) => key.id !== keyId));
      setKeyToRevoke(null);

      toast.success("The API key has been revoked successfully.");
    } catch (error) {
      console.error("Error revoking API key:", error);
      toast.error("There was an error revoking the API key. Please try again.");
    } finally {
      setIsRevoking(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setHasCopied(true);

    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>API Keys</CardTitle>
        <CardDescription>
          Manage your API keys for programmatic access to the PDF services.
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
            />
          </div>
          <Button
            onClick={handleCreateKey}
            disabled={isCreating || !newKeyName.trim()}
            className="md:mb-0 flex items-center"
          >
            {isCreating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isCreating ? "Creating..." : "Create API Key"}
          </Button>
        </div>

        {/* API Keys List */}
        <div className="border rounded-md overflow-hidden">
          <div className="bg-muted px-4 py-3 font-medium grid grid-cols-12 gap-4">
            <div className="col-span-4">Key</div>
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
              <p>
                No API keys found. Create your first API key to get started.
              </p>
            </div>
          ) : (
            <div className="divide-y">
              {apiKeys.map((key) => (
                <div
                  key={key.id}
                  className="px-4 py-3 grid grid-cols-12 gap-4 items-center"
                >
                  <div className="col-span-4 font-mono text-sm truncate">
                    {key.keyPreview}
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
                          onClick={() => setKeyToRevoke(key.id)}
                        >
                          Revoke
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Revoke API Key</DialogTitle>
                          <DialogDescription>
                            Are you sure you want to revoke this API key? This
                            action cannot be undone.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="py-4">
                          <div className="flex items-center gap-2 p-2 bg-muted rounded">
                            <AlertTriangle className="h-5 w-5 text-destructive" />
                            <p className="font-medium">
                              Any applications using this API key will lose
                              access immediately.
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
                            {isRevoking ? "Revoking..." : "Yes, Revoke Key"}
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

      {/* New Key Dialog */}
      {newKeyData && (
        <Dialog
          open={!!newKeyData}
          onOpenChange={(open) => !open && setNewKeyData(null)}
        >
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>API Key Created</DialogTitle>
              <DialogDescription>
                Copy your API key now. For security reasons, you wont be able to
                see it again.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <div className="bg-muted p-3 rounded-md flex items-center gap-2">
                <div className="font-mono text-sm flex-1 overflow-x-auto">
                  {newKeyData.key}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => copyToClipboard(newKeyData.key)}
                >
                  {hasCopied ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Store this key securely. Its like a password and grants full
                access to the API.
              </p>
            </div>
            <DialogFooter>
              <Button
                className="w-full sm:w-auto"
                onClick={() => setNewKeyData(null)}
              >
                {hasCopied ? "I've saved my API key" : "Close"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </Card>
  );
}
