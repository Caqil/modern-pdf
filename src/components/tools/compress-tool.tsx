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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { FileWithPreview } from "@/types/api";
import apiClient from "@/lib/api/apiClient";
import { Loader2, UploadCloud, FileText, Download } from "lucide-react";
import { toast } from "sonner";

export default function CompressTool() {
  const [file, setFile] = useState<FileWithPreview | null>(null);
  const [quality, setQuality] = useState<"high" | "medium" | "low">("medium");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState("");
  const [compressionInfo, setCompressionInfo] = useState<{
    originalSize: string;
    compressedSize: string;
    ratio: number;
  } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " bytes";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(2) + " KB";
    else return (bytes / 1048576).toFixed(2) + " MB";
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (!selectedFile.type.includes("pdf")) {
        toast.error("Invalid file type");
        return;
      }

      if (selectedFile.size > 50 * 1024 * 1024) {
        // 50MB limit
        toast.error("File too large");

        return;
      }

      const fileWithPreview = Object.assign(selectedFile, {
        preview: URL.createObjectURL(selectedFile),
      });

      setFile(fileWithPreview);
      setDownloadUrl("");
      setCompressionInfo(null);
    }
  };

  const resetForm = () => {
    setFile(null);
    setQuality("medium");
    setDownloadUrl("");
    setCompressionInfo(null);

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      toast.error("No file selected");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await apiClient.pdf.compress(file, quality);

      if (response.data.success) {
        setDownloadUrl(
          apiClient.getFile(
            response.data.fileUrl.split("?folder=")[1].split("&filename=")[0],
            response.data.filename
          )
        );

        setCompressionInfo({
          originalSize: formatFileSize(file.size),
          compressedSize: formatFileSize(response.data.fileSize),
          ratio: response.data.compressionRatio,
        });

        toast.success(response.data.message);
      } else {
        throw new Error("Compression operation failed");
      }
    } catch (error) {
      console.error("Compression error:", error);
      toast.error("Compression failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Compress PDF</CardTitle>
        <CardDescription>
          Reduce the file size of your PDF documents while maintaining quality.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* File Upload Section */}
            <div className="space-y-2">
              <Label htmlFor="pdf-upload">Upload PDF</Label>
              <div
                className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                {file ? (
                  <div className="flex items-center space-x-2">
                    <FileText size={24} />
                    <span className="font-medium truncate">{file.name}</span>
                    <span className="text-xs text-muted-foreground">
                      ({formatFileSize(file.size)})
                    </span>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setFile(null);
                        if (fileInputRef.current)
                          fileInputRef.current.value = "";
                      }}
                    >
                      Change
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center">
                    <UploadCloud size={40} className="mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      PDF (max 50MB)
                    </p>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  id="pdf-upload"
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
            </div>

            {/* Compression Quality */}
            <div className="space-y-4">
              <Label>Compression Quality</Label>
              <RadioGroup
                defaultValue="medium"
                value={quality}
                onValueChange={(value) =>
                  setQuality(value as "high" | "medium" | "low")
                }
                className="flex flex-col space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="high" id="high" />
                  <Label htmlFor="high" className="font-normal">
                    High - Minimal compression, best quality
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="medium" id="medium" />
                  <Label htmlFor="medium" className="font-normal">
                    Medium - Balanced compression and quality
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="low" id="low" />
                  <Label htmlFor="low" className="font-normal">
                    Low - Maximum compression, reduced quality
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </form>

        {/* Compression Results */}
        {compressionInfo && (
          <div className="mt-6 p-4 bg-muted rounded-lg">
            <h3 className="font-medium mb-2">Compression Results</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>Original Size:</div>
              <div className="font-medium">{compressionInfo.originalSize}</div>

              <div>Compressed Size:</div>
              <div className="font-medium">
                {compressionInfo.compressedSize}
              </div>

              <div>Compression Ratio:</div>
              <div className="font-medium">
                {(compressionInfo.ratio * 100).toFixed(0)}% reduction
              </div>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex flex-col sm:flex-row gap-3 items-center">
        {downloadUrl ? (
          <>
            <Button asChild className="w-full sm:w-auto">
              <a href={downloadUrl} download className="flex items-center">
                <Download className="mr-2 h-4 w-4" />
                Download Compressed PDF
              </a>
            </Button>
            <Button
              variant="outline"
              onClick={resetForm}
              className="w-full sm:w-auto"
            >
              Process Another File
            </Button>
          </>
        ) : (
          <>
            <Button
              type="submit"
              onClick={handleSubmit}
              disabled={isSubmitting || !file}
              className="w-full sm:w-auto"
            >
              {isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              {isSubmitting ? "Compressing..." : "Compress PDF"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={resetForm}
              disabled={isSubmitting || !file}
              className="w-full sm:w-auto"
            >
              Reset
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
}
