import ProtectTool from "@/components/tools/protect-tool";

export default function ProtectPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Protect PDF</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Add password protection to your PDF documents to secure sensitive
          information. Set strong passwords to prevent unauthorized access and
          modifications.
        </p>
      </div>
      <ProtectTool />
    </div>
  );
}
