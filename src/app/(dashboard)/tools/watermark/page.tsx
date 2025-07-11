import WatermarkTool from "@/components/tools/watermark-tool";

export default function WatermarkPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight mb-4">
          Add Watermark
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Add text or image watermarks to your PDF documents for branding,
          copyright protection, or document identification. Customize position,
          opacity, rotation, and more.
        </p>
      </div>
      <WatermarkTool />
    </div>
  );
}
