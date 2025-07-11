import ConvertTool from "@/components/tools/convert-tool";

export default function ConvertPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Convert PDF</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Convert your PDF documents to various formats including Word, Excel,
          PowerPoint, images, and more. Perfect for editing and sharing
          documents in different formats.
        </p>
      </div>
      <ConvertTool />
    </div>
  );
}
