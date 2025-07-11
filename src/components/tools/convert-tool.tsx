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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { FileWithPreview } from "@/types/api";
import { apiClient } from "@/lib/api/apiClient";
import { Loader2, FileIcon } from "lucide-react";
import { SingleFileUpload } from "@/components/tools/shared/file-upload";
import { DownloadButton } from "@/components/tools/shared/download-button";
import { toast } from "sonner";

type ConversionFormat =
  | "docx"
  | "xlsx"
  | "pptx"
  | "jpg"
  | "png"
  | "txt"
  | "html";

interface FormatOption {
  value: ConversionFormat;
  label: string;
  icon: React.ReactNode;
  description: string;
}

export default function ConvertTool() {
  const [file, setFile] = useState<FileWithPreview | null>(null);
  const [targetFormat, setTargetFormat] = useState<ConversionFormat>("docx");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{
    filename: string;
    fileUrl: string;
    fileSize: number;
  } | null>(null);


  // Format options with icons and descriptions
  const formatOptions: FormatOption[] = [
    {
      value: "docx",
      label: "Word Document",
      icon: <FileIcon className="h-4 w-4" />,
      description: "Editable document format compatible with Microsoft Word.",
    },
    {
      value: "xlsx",
      label: "Excel Spreadsheet",
      icon: <FileIcon className="h-4 w-4" />,
      description: "Convert tables in PDF to editable spreadsheets.",
    },
    {
      value: "pptx",
      label: "PowerPoint",
      icon: <FileIcon className="h-4 w-4" />,
      description: "Convert PDF pages to presentation slides.",
    },
    {
      value: "jpg",
      label: "JPG Images",
      icon: <FileIcon className="h-4 w-4" />,
      description: "Convert each page to a JPG image.",
    },
    {
      value: "png",
      label: "PNG Images",
      icon: <FileIcon className="h-4 w-4" />,
      description:
        "Convert each page to a PNG image with transparency support.",
    },
    {
      value: "txt",
      label: "Text File",
      icon: <FileIcon className="h-4 w-4" />,
      description: "Extract all text content from the PDF.",
    },
    {
      value: "html",
      label: "HTML",
      icon: <FileIcon className="h-4 w-4" />,
      description: "Convert PDF to web page format.",
    },
  ];

  const resetForm = () => {
    if (file?.preview) {
      URL.revokeObjectURL(file.preview);
    }
    setFile(null);
    setTargetFormat("docx");
    setResult(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      toast.error("No file selected");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await apiClient.pdf.convert(file, targetFormat);

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

            toast.success(`PDF successfully converted to ${targetFormat.toUpperCase()}.`);
          }
        }
      } else {
        throw new Error("Conversion operation failed");
      }
    } catch (error) {
      console.error("Conversion error:", error);

      toast.error("Conversion failed");
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
        <CardTitle>Convert PDF</CardTitle>
        <CardDescription>
          Convert your PDF documents to other file formats for easier editing
          and sharing.
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

            {/* Format Selection */}
            <div className="space-y-4">
              <Label>Target Format</Label>
              <RadioGroup
                value={targetFormat}
                onValueChange={(value) =>
                  setTargetFormat(value as ConversionFormat)
                }
                className="grid grid-cols-1 md:grid-cols-2 gap-3"
              >
                {formatOptions.map((format) => (
                  <div
                    key={format.value}
                    className="flex items-start space-x-2"
                  >
                    <RadioGroupItem
                      value={format.value}
                      id={format.value}
                      className="mt-1"
                    />
                    <Label
                      htmlFor={format.value}
                      className="font-normal cursor-pointer flex-1"
                    >
                      <div className="flex items-center">
                        {format.icon}
                        <span className="ml-2 font-medium">{format.label}</span>
                        <span className="ml-2 text-xs bg-muted px-1.5 py-0.5 rounded">
                          .{format.value}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {format.description}
                      </p>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
        </form>

        {/* Result Section */}
        {result && (
          <div className="mt-6 border rounded-md p-4">
            <h3 className="font-medium mb-2">Converted File</h3>
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
                className="text-sm"
              />
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex flex-wrap gap-3">
        {!isSubmitting && result ? (
          <>
            <Button variant="outline" onClick={resetForm}>
              Convert Another File
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
              {isSubmitting ? "Processing..." : "Convert PDF"}
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
