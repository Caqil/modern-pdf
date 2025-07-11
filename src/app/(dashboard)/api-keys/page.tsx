"use client";

import ApiKeyManager from "@/components/profile/api-key-manager";

export default function ApiKeysPage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">API Keys</h1>
        <p className="text-muted-foreground">
          Manage your API keys and access our PDF processing services
          programmatically.
        </p>
      </div>

      {/* All functionality is contained in the ApiKeyManager component */}
      <ApiKeyManager />
    </div>
  );
}
