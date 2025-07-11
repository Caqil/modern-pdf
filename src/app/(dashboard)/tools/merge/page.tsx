import MergeTool from "@/components/tools/merge-tool";

export default function MergePage() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight mb-4">
          Merge PDF Files
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Combine multiple PDF files into a single document. Upload your files,
          arrange them in the desired order, and create a unified PDF document.
        </p>
      </div>
      <MergeTool />
    </div>
  );
}
