import OcrTool from "@/components/tools/ocr-tool";

export default function OcrPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight mb-4">
          OCR & Text Extraction
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Extract text from scanned documents and images using advanced OCR
          technology. Supports multiple languages and creates searchable PDF
          documents.
        </p>
      </div>
      <OcrTool />
    </div>
  );
}
