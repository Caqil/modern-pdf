"use client";

import { useState } from "react";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FileWithPreview } from "@/types/api";
import { apiClient } from "@/lib/api/apiClient";
import { Loader2, Download } from "lucide-react";
import { SingleFileUpload } from "@/components/tools/shared/file-upload";
import { toast } from "sonner";

type RotationAngle = 90 | 180 | 270;

export default function RotateTool() {
  const [file, setFile] = useState<FileWithPreview | null>(null);
  const [rotation, setRotation] = useState<RotationAngle>(90);
  const [pages, setPages] = useState<string>("all");
  const [customPages, setCustomPages] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{
    filename: string;
    fileUrl: string;
    fileSize: number;
  } | null>(null);

  const resetForm = () => {
    if (file?.preview) {
      URL.revokeObjectURL(file.preview);
    }
    setFile(null);
    setRotation(90);
    setPages("all");
    setCustomPages("");
    setResult(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      toast.error("No file selected. Please upload a PDF file.");
      return;
    }

    if (pages === "custom" && !customPages) {
      toast.error(
        "Missing page numbers. Please specify page numbers for rotation."
      );
      return;
    }

    setIsSubmitting(true);

    setIsSubmitting(true);

    try {
      // Determine which pages to rotate
      let pagesToRotate = "all";
      if (pages === "custom") {
        pagesToRotate = customPages;
      } else if (pages !== "all") {
        pagesToRotate = pages;
      }

      const response = await apiClient.pdf.rotate(
        file,
        rotation,
        pagesToRotate
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

            toast.success("PDF pages rotated successfully.");
          }
        }
      } else {
        throw new Error("Rotation operation failed");
      }
    } catch (error) {
      console.error("Rotation error:", error);

      toast.error("There was an error rotating the PDF. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
        <CardTitle>Rotate PDF</CardTitle>
        <CardDescription>
          Rotate pages in your PDF document to the correct orientation.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* File Upload */}
            <SingleFileUpload
              file={file}
              setFile={setFile}
              accept=".pdf"
              maxSize={50}
              label="Click to upload or drag and drop"
              description="PDF (max 50MB)"
            />

            {/* Rotation Options */}
            <div className="space-y-4">
              <Label>Rotation Angle</Label>
              <RadioGroup
                defaultValue="90"
                value={rotation.toString()}
                onValueChange={(value) =>
                  setRotation(parseInt(value) as RotationAngle)
                }
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="90" id="r90" />
                  <Label htmlFor="r90" className="font-normal">
                    90° Clockwise
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="180" id="r180" />
                  <Label htmlFor="r180" className="font-normal">
                    180°
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="270" id="r270" />
                  <Label htmlFor="r270" className="font-normal">
                    90° Counterclockwise
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Pages Selection */}
            <div className="space-y-4">
              <Label>Pages to Rotate</Label>
              <RadioGroup
                defaultValue="all"
                value={pages}
                onValueChange={setPages}
                className="flex flex-col space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="all" id="all" />
                  <Label htmlFor="all" className="font-normal">
                    All pages
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="first" id="first" />
                  <Label htmlFor="first" className="font-normal">
                    First page only
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="last" id="last" />
                  <Label htmlFor="last" className="font-normal">
                    Last page only
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="odd" id="odd" />
                  <Label htmlFor="odd" className="font-normal">
                    Odd pages
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="even" id="even" />
                  <Label htmlFor="even" className="font-normal">
                    Even pages
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="custom" id="custom" />
                  <Label htmlFor="custom" className="font-normal">
                    Custom pages
                  </Label>
                </div>
              </RadioGroup>

              {/* Custom Pages Input */}
              {pages === "custom" && (
                <div className="pt-2">
                  <Input
                    placeholder="e.g., 1,3,5-7"
                    value={customPages}
                    onChange={(e) => setCustomPages(e.target.value)}
                    className="max-w-xs"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Specify page numbers separated by commas. Range format: 1-3
                    (pages 1 to 3).
                  </p>
                </div>
              )}
            </div>
          </div>
        </form>

        {/* Result Section */}
        {result && (
          <div className="mt-6 border rounded-md p-4">
            <h3 className="font-medium mb-2">Rotated PDF File</h3>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">{result.filename}</div>
                <div className="text-xs text-muted-foreground">
                  {formatFileSize(result.fileSize)}
                </div>
              </div>
              <Button asChild size="sm">
                <a href={result.fileUrl} download={result.filename}>
                  <Download className="h-4 w-4 mr-1" /> Download
                </a>
              </Button>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex flex-wrap gap-3">
        {!isSubmitting && result ? (
          <>
            <Button variant="outline" onClick={resetForm}>
              Process Another File
            </Button>
          </>
        ) : (
          <>
            <Button
              type="submit"
              onClick={handleSubmit}
              disabled={isSubmitting || !file}
            >
              {isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              {isSubmitting ? "Processing..." : "Rotate PDF"}
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
