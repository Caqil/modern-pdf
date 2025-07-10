"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { FileWithPreview } from "@/types/api";
import { apiClient } from "@/lib/api/apiClient";
import { Loader2, Trash2, PenTool } from "lucide-react";
import { SingleFileUpload } from "@/components/tools/shared/file-upload";
import { DownloadButton } from "@/components/tools/shared/download-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SignaturePosition {
  x: number;
  y: number;
  page: number;
}

export default function SignTool() {
  const [pdfFile, setPdfFile] = useState<FileWithPreview | null>(null);
  const [signatureFile, setSignatureFile] = useState<FileWithPreview | null>(
    null
  );
  const [signatureMethod, setSignatureMethod] = useState<"upload" | "draw">(
    "upload"
  );
  const [signaturePosition, setSignaturePosition] = useState<SignaturePosition>(
    {
      x: 100,
      y: 100,
      page: 1,
    }
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{
    filename: string;
    fileUrl: string;
    fileSize: number;
  } | null>(null);

  // Canvas for drawing signature
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);

  const { toast } = useToast();

  const resetForm = () => {
    if (pdfFile?.preview) {
      URL.revokeObjectURL(pdfFile.preview);
    }
    if (signatureFile?.preview) {
      URL.revokeObjectURL(signatureFile.preview);
    }
    setPdfFile(null);
    setSignatureFile(null);
    setSignaturePosition({
      x: 100,
      y: 100,
      page: 1,
    });
    setResult(null);
    clearCanvas();
    setHasSignature(false);
  };

  // Canvas drawing functions
  const initCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas background to white
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Set drawing style
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "black";
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const continueDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
    setHasSignature(true);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
  };

  // Convert canvas to File object
  const canvasToFile = async (): Promise<File | null> => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    try {
      return new Promise<File>((resolve, reject) => {
        canvas.toBlob((blob) => {
          if (!blob) {
            toast({
              variant: "destructive",
              title: "Error",
              description: "Could not convert signature to image.",
            });
            reject(new Error("Failed to create blob from canvas"));
            return;
          }

          const file = new File([blob], "signature.png", { type: "image/png" });
          resolve(file);
        }, "image/png");
      });
    } catch (error) {
      console.error("Error converting canvas to file:", error);
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!pdfFile) {
      toast({
        variant: "destructive",
        title: "No PDF file selected",
        description: "Please upload a PDF file.",
      });
      return;
    }

    let signature: File | null = null;

    if (signatureMethod === "upload") {
      if (!signatureFile) {
        toast({
          variant: "destructive",
          title: "No signature image selected",
          description: "Please upload a signature image.",
        });
        return;
      }
      signature = signatureFile;
    } else {
      if (!hasSignature) {
        toast({
          variant: "destructive",
          title: "No signature drawn",
          description: "Please draw your signature.",
        });
        return;
      }
      signature = await canvasToFile();
      if (!signature) return;
    }

    setIsSubmitting(true);

    try {
      const response = await apiClient.pdf.sign(
        pdfFile,
        signature,
        signaturePosition.x,
        signaturePosition.y,
        signaturePosition.page
      );

      if (response.data.success) {
        const fileUrl = response.data.fileUrl;
        // Extract folder and filename from URL
        const parts = fileUrl.split("?folder=");
        if (parts.length === 2) {
          const folderAndFile = parts[1].split("&filename=");
          if (folderAndFile.length === 2) {
            const folder = folderAndFile[0];
            const filename = folderAndFile[1];

            setResult({
              filename: response.data.filename || filename,
              fileUrl: apiClient.getFile(folder, filename),
              fileSize: response.data.fileSize,
            });

            toast({
              title: "Success!",
              description: "PDF successfully signed.",
            });
          }
        }
      } else {
        throw new Error("Signature operation failed");
      }
    } catch (error) {
      console.error("Signature error:", error);

      toast({
        variant: "destructive",
        title: "Signing failed",
        description: "There was an error signing the PDF. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Initialize the canvas when the component loads or signature method changes
  if (signatureMethod === "draw" && canvasRef.current) {
    initCanvas();
  }

  // Format file size
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Sign PDF</CardTitle>
        <CardDescription>
          Add your signature to PDF documents by uploading an image or drawing
          it directly.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* PDF File Upload */}
            <div className="space-y-2">
              <Label>PDF Document</Label>
              <SingleFileUpload
                file={pdfFile}
                setFile={setPdfFile}
                accept=".pdf"
                maxSize={50}
                label="Click to upload or drag and drop"
                description="PDF (max 50MB)"
              />
            </div>

            {/* Signature Tabs */}
            <div className="space-y-2">
              <Label>Signature</Label>
              <Tabs
                defaultValue="upload"
                value={signatureMethod}
                onValueChange={(value) =>
                  setSignatureMethod(value as "upload" | "draw")
                }
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="upload">Upload Image</TabsTrigger>
                  <TabsTrigger value="draw">Draw Signature</TabsTrigger>
                </TabsList>

                <TabsContent value="upload" className="space-y-4">
                  <SingleFileUpload
                    file={signatureFile}
                    setFile={setSignatureFile}
                    accept=".jpg,.jpeg,.png"
                    maxSize={5}
                    label="Click to upload or drag and drop"
                    description="Signature image (PNG, JPG, max 5MB)"
                  />
                </TabsContent>

                <TabsContent value="draw" className="space-y-4">
                  <div className="border rounded-md p-2 bg-white">
                    <canvas
                      ref={canvasRef}
                      width={500}
                      height={200}
                      className="w-full border border-dashed cursor-crosshair touch-none"
                      onMouseDown={startDrawing}
                      onMouseMove={continueDrawing}
                      onMouseUp={stopDrawing}
                      onMouseLeave={stopDrawing}
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={clearCanvas}
                    >
                      <Trash2 className="h-4 w-4 mr-2" /> Clear
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Signature Position */}
            <div className="space-y-2">
              <Label>Signature Position</Label>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="x-position" className="text-xs">
                    X Position (px)
                  </Label>
                  <Input
                    id="x-position"
                    type="number"
                    value={signaturePosition.x}
                    onChange={(e) =>
                      setSignaturePosition({
                        ...signaturePosition,
                        x: parseInt(e.target.value) || 0,
                      })
                    }
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="y-position" className="text-xs">
                    Y Position (px)
                  </Label>
                  <Input
                    id="y-position"
                    type="number"
                    value={signaturePosition.y}
                    onChange={(e) =>
                      setSignaturePosition({
                        ...signaturePosition,
                        y: parseInt(e.target.value) || 0,
                      })
                    }
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="page-number" className="text-xs">
                    Page Number
                  </Label>
                  <Input
                    id="page-number"
                    type="number"
                    min={1}
                    value={signaturePosition.page}
                    onChange={(e) =>
                      setSignaturePosition({
                        ...signaturePosition,
                        page: parseInt(e.target.value) || 1,
                      })
                    }
                    className="mt-1"
                  />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Specify the position coordinates and page number where the
                signature should appear.
              </p>
            </div>
          </div>
        </form>

        {/* Result Section */}
        {result && (
          <div className="mt-6 border rounded-md p-4">
            <h3 className="font-medium mb-2">Signed PDF Document</h3>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">{result.filename}</div>
                <div className="text-xs text-muted-foreground">
                  {formatFileSize(result.fileSize)}
                </div>
              </div>
              <DownloadButton
                fileUrl={result.fileUrl}
                filename={result.filename}
              />
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex flex-wrap gap-3">
        {!isSubmitting && result ? (
          <>
            <Button variant="outline" onClick={resetForm}>
              Sign Another Document
            </Button>
          </>
        ) : (
          <>
            <Button
              type="submit"
              onClick={handleSubmit}
              disabled={
                isSubmitting ||
                !pdfFile ||
                (signatureMethod === "upload" && !signatureFile) ||
                (signatureMethod === "draw" && !hasSignature)
              }
            >
              {isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <PenTool className="mr-2 h-4 w-4" />
              )}
              {isSubmitting ? "Processing..." : "Sign PDF"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={resetForm}
              disabled={isSubmitting}
            >
              Reset
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
}
