import SplitTool from "@/components/tools/split-tool";

export default function SplitPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Split PDF</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Extract pages from your PDF or split it into multiple documents.
          Choose specific page ranges, extract individual pages, or split by
          intervals.
        </p>
      </div>
      <SplitTool />
    </div>
  );
}
