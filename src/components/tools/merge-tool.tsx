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
import { FileWithPreview } from "@/types/api";
import { apiClient } from "@/lib/api/apiClient";
import {
  Loader2,
  UploadCloud,
  FileText,
  Download,
  Trash2,
  MoveUp,
  MoveDown,
  Plus,
} from "lucide-react";
import { toast } from "sonner";

export default function MergeTool() {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{
    filename: string;
    fileUrl: string;
    fileSize: number;
  } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);

      // Validate file types
      const invalidFiles = selectedFiles.filter(
        (file) => !file.type.includes("pdf")
      );
      if (invalidFiles.length > 0) {
        toast.error("Invalid file type");
        return;
      }

      // Validate file sizes
      const oversizedFiles = selectedFiles.filter(
        (file) => file.size > 50 * 1024 * 1024
      ); // 50MB limit
      if (oversizedFiles.length > 0) {
        toast.error("File too large");
        return;
      }

      // Create preview URLs for selected files
      const filesWithPreview = selectedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );

      // Add the new files to the existing files array
      setFiles((prev) => [...prev, ...filesWithPreview]);
      setResult(null);
    }

    // Reset file input
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeFile = (index: number) => {
    setFiles((prev) => {
      const updatedFiles = [...prev];
      // Revoke the object URL to avoid memory leaks
      URL.revokeObjectURL(updatedFiles[index].preview);
      updatedFiles.splice(index, 1);
      return updatedFiles;
    });
    setResult(null);
  };

  const moveFile = (index: number, direction: "up" | "down") => {
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === files.length - 1)
    ) {
      return;
    }

    const newIndex = direction === "up" ? index - 1 : index + 1;

    setFiles((prev) => {
      const updatedFiles = [...prev];
      const temp = updatedFiles[index];
      updatedFiles[index] = updatedFiles[newIndex];
      updatedFiles[newIndex] = temp;
      return updatedFiles;
    });

    setResult(null);
  };

  const resetForm = () => {
    // Clean up object URLs to avoid memory leaks
    files.forEach((file) => {
      URL.revokeObjectURL(file.preview);
    });

    setFiles([]);
    setResult(null);

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (files.length < 2) {
      toast.error("Not enough files. Please upload at least 2 PDF files to merge.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await apiClient.pdf.merge(files);

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

            toast.success(`${files.length} PDF files merged successfully.`);
          }
        }
      } else {
        throw new Error("Merge operation failed");
      }
    } catch (error) {
      console.error("Merge error:", error);

      toast.error("Merge failed. There was an error merging the PDF files. Please try again.");
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
        <CardTitle>Merge PDF Files</CardTitle>
        <CardDescription>
          Combine multiple PDF files into a single document. Rearrange files to
          determine the order.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* File Upload Button */}
            <div className="space-y-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center w-full justify-center"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add PDF Files
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={handleFileChange}
                multiple
              />
              <p className="text-xs text-muted-foreground text-center">
                You can upload multiple files at once. Maximum 50MB per file.
              </p>
            </div>

            {/* Files List */}
            {files.length > 0 && (
              <div className="border rounded-md overflow-hidden">
                <div className="bg-muted px-4 py-2 font-medium">
                  Files to Merge ({files.length})
                </div>
                <div className="divide-y">
                  {files.map((file, index) => (
                    <div key={index} className="px-4 py-3 flex items-center">
                      <div className="flex-grow flex items-center">
                        <span className="bg-primary text-primary-foreground w-6 h-6 flex items-center justify-center rounded-full text-xs mr-3">
                          {index + 1}
                        </span>
                        <FileText className="h-4 w-4 mr-2 flex-shrink-0" />
                        <div className="overflow-hidden">
                          <div
                            className="font-medium truncate"
                            title={file.name}
                          >
                            {file.name}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {formatFileSize(file.size)}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 ml-2">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => moveFile(index, "up")}
                          disabled={index === 0}
                          className="h-8 w-8"
                        >
                          <MoveUp className="h-4 w-4" />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => moveFile(index, "down")}
                          disabled={index === files.length - 1}
                          className="h-8 w-8"
                        >
                          <MoveDown className="h-4 w-4" />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFile(index)}
                          className="h-8 w-8 text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Drop Area */}
            {files.length === 0 && (
              <div
                className="border-2 border-dashed rounded-md p-10 flex flex-col items-center justify-center cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="flex flex-col items-center justify-center">
                  <UploadCloud size={40} className="mb-2" />
                  <p className="text-sm font-medium">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    PDF files (max 50MB each)
                  </p>
                </div>
              </div>
            )}
          </div>
        </form>

        {/* Result Section */}
        {result && (
          <div className="mt-6 border rounded-md p-4">
            <h3 className="font-medium mb-2">Merged PDF File</h3>
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
          <Button variant="outline" onClick={resetForm}>
            Process More Files
          </Button>
        ) : (
          <>
            <Button
              type="submit"
              onClick={handleSubmit}
              disabled={isSubmitting || files.length < 2}
            >
              {isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              {isSubmitting ? "Processing..." : "Merge PDFs"}
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
