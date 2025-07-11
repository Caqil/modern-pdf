import UnlockTool from "@/components/tools/unlock-tool";

export default function UnlockPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Unlock PDF</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Remove password protection from PDF documents when you have the
          correct password. This allows you to edit, print, or further process
          protected documents.
        </p>
      </div>
      <UnlockTool />
    </div>
  );
}
