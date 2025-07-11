import SignTool from "@/components/tools/sign-tool";

export default function SignPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Sign PDF</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Add your signature to PDF documents digitally. Upload a signature
          image or draw your signature directly, then position it anywhere on
          your document.
        </p>
      </div>
      <SignTool />
    </div>
  );
}
