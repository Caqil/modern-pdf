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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileWithPreview } from "@/types/api";
import { apiClient } from "@/lib/api/apiClient";
import { Loader2 } from "lucide-react";
import { SingleFileUpload } from "@/components/tools/shared/file-upload";
import { DownloadButton } from "@/components/tools/shared/download-button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

// Language options for OCR
interface LanguageOption {
  value: string;
  label: string;
}

export default function OcrTool() {
  const [file, setFile] = useState<FileWithPreview | null>(null);
  const [language, setLanguage] = useState<string>("eng");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<"recognize" | "extract">(
    "recognize"
  );
  const [result, setResult] = useState<{
    filename: string;
    fileUrl: string;
    fileSize: number;
    extractedText?: string;
  } | null>(null);


  // List of supported languages
  const languageOptions: LanguageOption[] = [
    { value: "eng", label: "English" },
    { value: "spa", label: "Spanish" },
    { value: "fra", label: "French" },
    { value: "deu", label: "German" },
    { value: "ita", label: "Italian" },
    { value: "por", label: "Portuguese" },
    { value: "rus", label: "Russian" },
    { value: "jpn", label: "Japanese" },
    { value: "chi_sim", label: "Chinese (Simplified)" },
    { value: "chi_tra", label: "Chinese (Traditional)" },
    { value: "kor", label: "Korean" },
    { value: "ara", label: "Arabic" },
    { value: "hin", label: "Hindi" },
    { value: "multi", label: "Multilingual" },
  ];

  const resetForm = () => {
    if (file?.preview) {
      URL.revokeObjectURL(file.preview);
    }
    setFile(null);
    setLanguage("eng");
    setResult(null);
  };

  const handleOCRSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      toast.error("No file selected. Please upload a PDF file for OCR processing.");
      return;
    }

    setIsSubmitting(true);

    try {
      let response;
      if (activeTab === "recognize") {
        response = await apiClient.ocr.processPdf(file, language);
      } else {
        response = await apiClient.ocr.extractText(file);
      }

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
              extractedText: response.data.extractedText,
            });

            toast.success(
              activeTab === "recognize"
                ? "OCR processing completed successfully."
                : "Text extraction completed successfully."
            );
          } else {
            toast.error("OCR processing failed. There was an error processing the PDF. Please try again.");
          }
        }
      } else {
        throw new Error("OCR operation failed");
      }
    } catch (error) {
      console.error("OCR error:", error);

      toast.error("OCR processing failed. There was an error processing the PDF. Please try again.");
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
        <CardTitle>OCR & Text Extraction</CardTitle>
        <CardDescription>
          Extract text from scanned documents or images within PDF files.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Tabs
          defaultValue="recognize"
          value={activeTab}
          onValueChange={(value) =>
            setActiveTab(value as "recognize" | "extract")
          }
        >
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="recognize">OCR Processing</TabsTrigger>
            <TabsTrigger value="extract">Text Extraction</TabsTrigger>
          </TabsList>
          <TabsContent value="recognize">
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                OCR (Optical Character Recognition) processes scanned documents
                and images to recognize and extract text, creating a searchable
                PDF.
              </p>

              <form onSubmit={handleOCRSubmit}>
                <div className="space-y-6">
                  {/* File Upload */}
                  <SingleFileUpload
                    file={file}
                    setFile={setFile}
                    accept=".pdf"
                    maxSize={50}
                    label="Click to upload or drag and drop"
                    description="PDF with scanned content (max 50MB)"
                  />

                  {/* Language Selection */}
                  <div className="space-y-2">
                    <Label htmlFor="language">Document Language</Label>
                    <Select value={language} onValueChange={setLanguage}>
                      <SelectTrigger className="w-full max-w-xs">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        {languageOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      Select the main language of the document for better OCR
                      results. Use &quot;Multilingual&quot; for documents with
                      multiple languages.
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </TabsContent>

          <TabsContent value="extract">
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Extract all text from a PDF document that already contains text
                content (not scanned images).
              </p>

              <form onSubmit={handleOCRSubmit}>
                <div className="space-y-6">
                  {/* File Upload */}
                  <SingleFileUpload
                    file={file}
                    setFile={setFile}
                    accept=".pdf"
                    maxSize={50}
                    label="Click to upload or drag and drop"
                    description="PDF with text content (max 50MB)"
                  />
                </div>
              </form>
            </div>
          </TabsContent>
        </Tabs>

        {/* Result Section */}
        {result && (
          <div className="mt-6 border rounded-md divide-y">
            <div className="p-4">
              <h3 className="font-medium mb-2">Processed File</h3>
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

            {result.extractedText && (
              <div className="p-4">
                <h3 className="font-medium mb-2">Extracted Text</h3>
                <Textarea
                  value={result.extractedText}
                  readOnly
                  className="min-h-[200px] font-mono text-sm"
                />
                <div className="flex justify-end mt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      navigator.clipboard.writeText(result.extractedText || "");
                      toast.success("Text copied to clipboard.");
                    }}
                  >
                    Copy Text
                  </Button>
                </div>
              </div>
            )}
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
              onClick={handleOCRSubmit}
              disabled={isSubmitting || !file}
            >
              {isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              {isSubmitting
                ? "Processing..."
                : activeTab === "recognize"
                ? "Process with OCR"
                : "Extract Text"}
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
