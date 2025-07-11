import RotateTool from "@/components/tools/rotate-tool";

export default function RotatePage() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Rotate PDF</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Rotate pages in your PDF document to the correct orientation. Choose
          specific pages or rotate all pages by 90°, 180°, or 270° clockwise.
        </p>
      </div>
      <RotateTool />
    </div>
  );
}
