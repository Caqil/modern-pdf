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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FileWithPreview } from "@/types/api";
import apiClient from "@/lib/api/apiClient";
import { Loader2, UploadCloud, FileText, Download } from "lucide-react";
import { toast } from "sonner";

export default function SplitTool() {
  const [file, setFile] = useState<FileWithPreview | null>(null);
  const [splitMethod, setSplitMethod] = useState<"range" | "extract" | "every">(
    "range"
  );
  const [pageRanges, setPageRanges] = useState("");
  const [everyNPages, setEveryNPages] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [results, setResults] = useState<
    { filename: string; fileUrl: string; pageRange: string }[]
  >([]);
  // Store the operation ID for long-running operations
  const setOperationId = useState<string | null>(null)[1];
  const [pollingInterval, setPollingInterval] = useState<NodeJS.Timeout | null>(
    null
  );

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (!selectedFile.type.includes("pdf")) {
        toast.error("Invalid file type. Please upload a PDF file.");
        return;
      }

      if (selectedFile.size > 50 * 1024 * 1024) {
        // 50MB limit
        toast.error("File too large. Maximum file size is 50MB.");
        return;
      }

      const fileWithPreview = Object.assign(selectedFile, {
        preview: URL.createObjectURL(selectedFile),
      });

      setFile(fileWithPreview);
      setResults([]);
    }
  };

  const resetForm = () => {
    setFile(null);
    setSplitMethod("range");
    setPageRanges("");
    setEveryNPages(1);
    setResults([]);
    setOperationId(null);

    if (pollingInterval) {
      clearInterval(pollingInterval);
      setPollingInterval(null);
    }

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const checkSplitStatus = async (id: string) => {
    try {
      const response = await apiClient.pdf.splitStatus(id);

      if (response.data.status === "completed") {
        setResults(
          response.data.results.map(
            (result: {
              filename: string;
              fileUrl: string;
              pageRange?: string;
            }) => ({
              filename: result.filename,
              fileUrl: apiClient.getFile(
                result.fileUrl.split("?folder=")[1].split("&filename=")[0],
                result.filename
              ),
              pageRange: result.pageRange || "",
            })
          )
        );

        if (pollingInterval) {
          clearInterval(pollingInterval);
          setPollingInterval(null);
        }

        setIsSubmitting(false);
        toast.success("PDF split operation completed successfully.");
      } else if (response.data.status === "failed") {
        throw new Error("Split operation failed");
      }
    } catch (error) {
      console.error("Status check error:", error);

      if (pollingInterval) {
        clearInterval(pollingInterval);
        setPollingInterval(null);
      }

      setIsSubmitting(false);
      toast.error("There was an error checking the split status.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      toast.error("No file selected. Please upload a PDF file.");
      return;
    }

    if (splitMethod === "range" && !pageRanges) {
      toast.error("Please specify page ranges (e.g., 1-3,4,5-7)");
      return;
    }

    if (splitMethod === "every" && (!everyNPages || everyNPages < 1)) {
      toast.error("Please specify a valid number of pages (minimum 1).");
      return;
    }

    setIsSubmitting(true);
    setResults([]);

    try {
      const options: { pageRanges?: string; everyNPages?: number } = {};

      if (splitMethod === "range") {
        options.pageRanges = pageRanges;
      } else if (splitMethod === "every") {
        options.everyNPages = everyNPages;
      }

      const response = await apiClient.pdf.split(file, splitMethod, options);

      if (response.data.success) {
        // If immediate results
        if (response.data.results) {
          setResults(
            response.data.results.map(
              (result: {
                filename: string;
                fileUrl: string;
                pageRange?: string;
              }) => ({
                filename: result.filename,
                fileUrl: apiClient.getFile(
                  result.fileUrl.split("?folder=")[1].split("&filename=")[0],
                  result.filename
                ),
                pageRange: result.pageRange || "",
              })
            )
          );

          setIsSubmitting(false);

          toast.success(response.data.message);
        }
        // If operation ID for polling
        else if (response.data.id) {
          setOperationId(response.data.id);
          const interval = setInterval(
            () => checkSplitStatus(response.data.id as string),
            2000
          );
          setPollingInterval(interval);

          toast.info("Your PDF is being split. This may take a moment...");
        }
      } else {
        throw new Error("Split operation failed");
      }
    } catch (error) {
      console.error("Split error:", error);
      setIsSubmitting(false);

      toast.error("There was an error splitting the PDF. Please try again.");
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Split PDF</CardTitle>
        <CardDescription>
          Split your PDF document into multiple files based on page ranges or
          intervals.
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

            {/* Split Method */}
            <div className="space-y-4">
              <Label>Split Method</Label>
              <RadioGroup
                defaultValue="range"
                value={splitMethod}
                onValueChange={(value) =>
                  setSplitMethod(value as "range" | "extract" | "every")
                }
                className="flex flex-col space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="range" id="range" />
                  <Label htmlFor="range" className="font-normal">
                    Split by page ranges
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="every" id="every" />
                  <Label htmlFor="every" className="font-normal">
                    Split every N pages
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="extract" id="extract" />
                  <Label htmlFor="extract" className="font-normal">
                    Extract each page to separate file
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Split Options Based on Method */}
            {splitMethod === "range" && (
              <div className="space-y-2">
                <Label htmlFor="page-ranges">Page Ranges</Label>
                <Input
                  id="page-ranges"
                  placeholder="e.g., 1-3,4,5-7"
                  value={pageRanges}
                  onChange={(e) => setPageRanges(e.target.value)}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Specify page ranges separated by commas. Range format: 1-3
                  (pages 1 to 3).
                </p>
              </div>
            )}

            {splitMethod === "every" && (
              <div className="space-y-2">
                <Label htmlFor="every-n-pages">Split every</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="every-n-pages"
                    type="number"
                    min={1}
                    value={everyNPages}
                    onChange={(e) =>
                      setEveryNPages(parseInt(e.target.value) || 1)
                    }
                    className="w-24"
                  />
                  <span>pages</span>
                </div>
              </div>
            )}
          </div>
        </form>

        {/* Results Section */}
        {results.length > 0 && (
          <div className="mt-6 border rounded-md overflow-hidden">
            <div className="bg-muted px-4 py-2 font-medium">
              Split Results ({results.length} files)
            </div>
            <div className="divide-y">
              {results.map((result, index) => (
                <div
                  key={index}
                  className="px-4 py-3 flex justify-between items-center"
                >
                  <div>
                    <div className="font-medium">{result.filename}</div>
                    {result.pageRange && (
                      <div className="text-xs text-muted-foreground">
                        Pages: {result.pageRange}
                      </div>
                    )}
                  </div>
                  <Button asChild size="sm" variant="outline">
                    <a href={result.fileUrl} download>
                      <Download className="h-4 w-4 mr-1" /> Download
                    </a>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex flex-wrap gap-3">
        {!isSubmitting && results.length > 0 ? (
          <>
            {results.length > 1 && (
              <Button
                variant="outline"
                className="flex items-center"
                onClick={() => {
                  // Open all download links in sequence
                  results.forEach((result, i) => {
                    setTimeout(() => {
                      const link = document.createElement("a");
                      link.href = result.fileUrl;
                      link.download = result.filename;
                      link.click();
                    }, i * 1000);
                  });
                }}
              >
                <Download className="h-4 w-4 mr-1" /> Download All Files
              </Button>
            )}
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
              {isSubmitting ? "Processing..." : "Split PDF"}
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
