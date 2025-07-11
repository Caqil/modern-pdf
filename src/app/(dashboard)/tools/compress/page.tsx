import CompressTool from "@/components/tools/compress-tool";

export default function CompressPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Compress PDF</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Reduce the file size of your PDF documents while maintaining quality.
          Choose from different compression levels to balance file size and
          quality according to your needs.
        </p>
      </div>
      <CompressTool />
    </div>
  );
}
