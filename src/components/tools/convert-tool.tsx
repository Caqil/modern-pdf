"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { FileWithPreview } from "@/types/api";
import { apiClient } from "@/lib/api/apiClient";
import {
  Loader2,
  FileIcon,
  FileText,
  Image,
  FileSpreadsheet,
  Presentation,
  Code,
  Zap,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import { SingleFileUpload } from "@/components/tools/shared/file-upload";
import { DownloadButton } from "@/components/tools/shared/download-button";
import { toast } from "sonner";

type ConversionDirection = "to-pdf" | "from-pdf";
type ConversionFormat =
  | "pdf"
  | "docx"
  | "xlsx"
  | "pptx"
  | "jpg"
  | "png"
  | "txt"
  | "html"
  | "doc"
  | "rtf"
  | "csv"
  | "gif"
  | "bmp"
  | "tiff";

interface FormatOption {
  value: ConversionFormat;
  label: string;
  icon: React.ReactNode;
  description: string;
  category:
    | "document"
    | "spreadsheet"
    | "presentation"
    | "image"
    | "text"
    | "web";
  popular?: boolean;
}

interface ConversionResult {
  filename: string;
  fileUrl: string;
  fileSize: number;
  format: string;
  conversionTime?: number;
}

export default function EnhancedConvertTool() {
  const [direction, setDirection] = useState<ConversionDirection>("to-pdf");
  const [file, setFile] = useState<FileWithPreview | null>(null);
  const [targetFormat, setTargetFormat] = useState<ConversionFormat>("pdf");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<ConversionResult | null>(null);
  const [conversionProgress, setConversionProgress] = useState(0);

  // Comprehensive format options
  const allFormats: FormatOption[] = [
    // PDF
    {
      value: "pdf",
      label: "PDF Document",
      icon: <FileText className="h-4 w-4" />,
      description:
        "Portable Document Format - preserves formatting across devices",
      category: "document",
      popular: true,
    },
    // Documents
    {
      value: "docx",
      label: "Word Document",
      icon: <FileText className="h-4 w-4" />,
      description: "Microsoft Word format - fully editable document",
      category: "document",
      popular: true,
    },
    {
      value: "doc",
      label: "Word 97-2003",
      icon: <FileText className="h-4 w-4" />,
      description: "Legacy Microsoft Word format",
      category: "document",
    },
    {
      value: "rtf",
      label: "Rich Text Format",
      icon: <FileText className="h-4 w-4" />,
      description: "Cross-platform rich text document",
      category: "document",
    },
    {
      value: "txt",
      label: "Plain Text",
      icon: <FileIcon className="h-4 w-4" />,
      description: "Extract or convert to plain text format",
      category: "text",
      popular: true,
    },
    // Spreadsheets
    {
      value: "xlsx",
      label: "Excel Spreadsheet",
      icon: <FileSpreadsheet className="h-4 w-4" />,
      description: "Microsoft Excel format with formulas and formatting",
      category: "spreadsheet",
      popular: true,
    },
    {
      value: "csv",
      label: "CSV File",
      icon: <FileSpreadsheet className="h-4 w-4" />,
      description: "Comma-separated values - universal data format",
      category: "spreadsheet",
    },
    // Presentations
    {
      value: "pptx",
      label: "PowerPoint",
      icon: <Presentation className="h-4 w-4" />,
      description: "Microsoft PowerPoint presentation format",
      category: "presentation",
      popular: true,
    },
    // Images
    {
      value: "jpg",
      label: "JPEG Image",
      icon: <Image className="h-4 w-4" />,
      description: "High-quality compressed image format",
      category: "image",
      popular: true,
    },
    {
      value: "png",
      label: "PNG Image",
      icon: <Image className="h-4 w-4" />,
      description: "Lossless image format with transparency support",
      category: "image",
      popular: true,
    },
    {
      value: "gif",
      label: "GIF Image",
      icon: <Image className="h-4 w-4" />,
      description: "Web-optimized image format",
      category: "image",
    },
    {
      value: "bmp",
      label: "Bitmap Image",
      icon: <Image className="h-4 w-4" />,
      description: "Uncompressed bitmap image",
      category: "image",
    },
    {
      value: "tiff",
      label: "TIFF Image",
      icon: <Image className="h-4 w-4" />,
      description: "High-quality image format for printing",
      category: "image",
    },
    // Web
    {
      value: "html",
      label: "HTML Document",
      icon: <Code className="h-4 w-4" />,
      description: "Web page format with styling",
      category: "web",
    },
  ];

  // Get available formats based on direction
  const getAvailableFormats = () => {
    if (direction === "to-pdf") {
      return allFormats.filter((f) => f.value === "pdf");
    } else {
      return allFormats.filter((f) => f.value !== "pdf");
    }
  };

  // Get accepted file types based on direction
  const getAcceptedTypes = () => {
    if (direction === "to-pdf") {
      return ".doc,.docx,.txt,.rtf,.xlsx,.csv,.pptx,.jpg,.jpeg,.png,.gif,.bmp,.tiff,.html";
    } else {
      return ".pdf";
    }
  };

  // Get file size limit based on direction
  const getMaxFileSize = () => {
    return direction === "to-pdf" ? 100 : 50; // MB
  };

  // Filter formats by category
  const getFormatsByCategory = (category: string) => {
    return getAvailableFormats().filter((f) => f.category === category);
  };

  // Get popular formats
  const getPopularFormats = () => {
    return getAvailableFormats().filter((f) => f.popular);
  };

  // Reset form when direction changes
  useEffect(() => {
    resetForm();
    if (direction === "to-pdf") {
      setTargetFormat("pdf");
    } else {
      setTargetFormat("docx");
    }
  }, [direction]);

  const resetForm = () => {
    if (file?.preview) {
      URL.revokeObjectURL(file.preview);
    }
    setFile(null);
    setResult(null);
    setConversionProgress(0);
  };

  // Mock API function for TO PDF conversion
  const mockToPdfConversion = async (file: FileWithPreview): Promise<any> => {
    // Simulate API delay
    await new Promise((resolve) =>
      setTimeout(resolve, 2000 + Math.random() * 3000)
    );

    // Simulate realistic file size (PDFs are often larger)
    const originalSize = file.size;
    const pdfSize = Math.round(originalSize * (0.8 + Math.random() * 0.6)); // 80-140% of original

    // Generate mock response similar to real API
    const originalName = file.name.split(".").slice(0, -1).join(".");
    const mockFilename = `${originalName}_converted.pdf`;
    const mockFolder = `mock-folder-${Date.now()}`;

    return {
      data: {
        success: true,
        filename: mockFilename,
        fileUrl: `mock://converted-files?folder=${mockFolder}&filename=${mockFilename}`,
        fileSize: pdfSize,
      },
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      toast.error("Please select a file to convert");
      return;
    }

    setIsSubmitting(true);
    setConversionProgress(0);

    // Realistic progress updates
    const progressInterval = setInterval(() => {
      setConversionProgress((prev) => {
        if (prev >= 95) return prev;
        return prev + Math.random() * 15;
      });
    }, 400);

    try {
      const startTime = Date.now();
      let response;

      if (direction === "to-pdf") {
        // Use mock for TO PDF conversion
        response = await mockToPdfConversion(file);
      } else {
        // Real API for FROM PDF conversion
        response = await apiClient.pdf.convert(file, targetFormat);
      }

      const endTime = Date.now();
      const conversionTime = Math.round((endTime - startTime) / 1000);

      clearInterval(progressInterval);
      setConversionProgress(100);

      if (response.data.success) {
        let finalResult;

        if (direction === "to-pdf") {
          // Handle mock response
          finalResult = {
            filename: response.data.filename,
            fileUrl: "#", // Mock URL - replace with actual download when implementing
            fileSize: response.data.fileSize,
            format: "PDF",
            conversionTime,
          };
        } else {
          // Handle real API response
          const fileUrl = response.data.fileUrl;
          const parts = fileUrl.split("?folder=");

          if (parts.length === 2) {
            const folderAndFile = parts[1].split("&filename=");
            if (folderAndFile.length === 2) {
              const folder = folderAndFile[0];
              const filename = folderAndFile[1];

              finalResult = {
                filename: response.data.filename || filename,
                fileUrl: apiClient.getFile(folder, filename),
                fileSize: response.data.fileSize,
                format: targetFormat.toUpperCase(),
                conversionTime,
              };
            }
          }
        }

        if (finalResult) {
          setResult(finalResult);
          toast.success(
            `File successfully converted to ${finalResult.format} in ${conversionTime}s`
          );
        }
      } else {
        throw new Error("Conversion operation failed");
      }
    } catch (error) {
      console.error("Conversion error:", error);
      clearInterval(progressInterval);
      setConversionProgress(0);

      // Enhanced error messages
      const errorMessage =
        error instanceof Error ? error.message : "Conversion failed";
      if (
        errorMessage.includes("size") ||
        file.size > getMaxFileSize() * 1024 * 1024
      ) {
        toast.error(
          `File is too large. Maximum size is ${getMaxFileSize()}MB.`
        );
      } else if (
        errorMessage.includes("format") ||
        errorMessage.includes("type")
      ) {
        toast.error(
          "Unsupported file format. Please check the accepted file types."
        );
      } else if (
        errorMessage.includes("network") ||
        errorMessage.includes("timeout")
      ) {
        toast.error(
          "Network error. Please check your connection and try again."
        );
      } else {
        toast.error("Conversion failed. Please try again or contact support.");
      }
    } finally {
      setIsSubmitting(false);
      clearInterval(progressInterval);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const renderFormatOptions = (formats: FormatOption[]) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {formats.map((format) => (
        <div
          key={format.value}
          className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-accent/50 transition-colors"
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
            <div className="flex items-center gap-2">
              {format.icon}
              <span className="font-medium">{format.label}</span>
              <Badge variant="outline" className="text-xs">
                .{format.value}
              </Badge>
              {format.popular && (
                <Badge variant="secondary" className="text-xs">
                  <Zap className="h-3 w-3 mr-1" />
                  Popular
                </Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {format.description}
            </p>
          </Label>
        </div>
      ))}
    </div>
  );

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Direction Selection */}
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Universal File Converter</CardTitle>
          <CardDescription>
            Convert files to PDF or convert PDF files to other formats with high
            quality and fast processing
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs
            value={direction}
            onValueChange={(value) =>
              setDirection(value as ConversionDirection)
            }
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="to-pdf" className="flex items-center gap-2">
                <ArrowRight className="h-4 w-4" />
                Convert TO PDF
              </TabsTrigger>
              <TabsTrigger value="from-pdf" className="flex items-center gap-2">
                <ArrowRight className="h-4 w-4 rotate-180" />
                Convert FROM PDF
              </TabsTrigger>
            </TabsList>

            <TabsContent value="to-pdf" className="space-y-4 mt-6">
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <FileText className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                <h3 className="font-semibold text-blue-900 dark:text-blue-100">
                  Convert TO PDF
                </h3>
                <p className="text-sm text-blue-700 dark:text-blue-200">
                  Transform documents, images, and presentations into PDF format
                </p>
                <Badge variant="secondary" className="mt-2 text-xs">
                  🚧 Mock Mode - Full UI Testing Available
                </Badge>
              </div>
            </TabsContent>

            <TabsContent value="from-pdf" className="space-y-4 mt-6">
              <div className="text-center p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                <FileSpreadsheet className="h-8 w-8 mx-auto mb-2 text-green-600" />
                <h3 className="font-semibold text-green-900 dark:text-green-100">
                  Convert FROM PDF
                </h3>
                <p className="text-sm text-green-700 dark:text-green-200">
                  Extract and convert PDF content to editable formats
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Main Conversion Interface */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {direction === "to-pdf" ? (
              <>
                <FileIcon className="h-5 w-5" />
                Convert to PDF
              </>
            ) : (
              <>
                <FileText className="h-5 w-5" />
                Convert from PDF
              </>
            )}
          </CardTitle>
          <CardDescription>
            {direction === "to-pdf"
              ? "Upload any document, image, or presentation to convert it to PDF"
              : "Upload a PDF file to convert it to an editable format"}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* File Upload */}
            <SingleFileUpload
              file={file}
              setFile={setFile}
              accept={getAcceptedTypes()}
              maxSize={getMaxFileSize()}
              label="Click to upload or drag and drop"
              description={`${
                direction === "to-pdf"
                  ? "Documents, Images, Presentations"
                  : "PDF files only"
              } (max ${getMaxFileSize()}MB)`}
            />

            {/* Format Selection */}
            {direction === "from-pdf" && (
              <div className="space-y-4">
                <Label className="text-base font-medium">
                  Choose Target Format
                </Label>

                <RadioGroup
                  value={targetFormat}
                  onValueChange={(value) =>
                    setTargetFormat(value as ConversionFormat)
                  }
                >
                  <Tabs defaultValue="popular" className="w-full">
                    <TabsList className="mb-4">
                      <TabsTrigger value="popular">Popular</TabsTrigger>
                      <TabsTrigger value="document">Documents</TabsTrigger>
                      <TabsTrigger value="spreadsheet">
                        Spreadsheets
                      </TabsTrigger>
                      <TabsTrigger value="image">Images</TabsTrigger>
                      <TabsTrigger value="other">Other</TabsTrigger>
                    </TabsList>

                    <TabsContent value="popular">
                      {renderFormatOptions(getPopularFormats())}
                    </TabsContent>

                    <TabsContent value="document">
                      {renderFormatOptions(getFormatsByCategory("document"))}
                    </TabsContent>

                    <TabsContent value="spreadsheet">
                      {renderFormatOptions([
                        ...getFormatsByCategory("spreadsheet"),
                        ...getFormatsByCategory("text"),
                      ])}
                    </TabsContent>

                    <TabsContent value="image">
                      {renderFormatOptions(getFormatsByCategory("image"))}
                    </TabsContent>

                    <TabsContent value="other">
                      {renderFormatOptions([
                        ...getFormatsByCategory("presentation"),
                        ...getFormatsByCategory("web"),
                      ])}
                    </TabsContent>
                  </Tabs>
                </RadioGroup>
              </div>
            )}

            {/* Conversion Progress */}
            {isSubmitting && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Converting...</span>
                  <span>{Math.round(conversionProgress)}%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div
                    className="bg-primary rounded-full h-2 transition-all duration-300"
                    style={{ width: `${conversionProgress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <Button
                type="submit"
                disabled={isSubmitting || !file}
                className="flex-1 min-w-[200px]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Converting...
                  </>
                ) : (
                  <>
                    <Zap className="mr-2 h-4 w-4" />
                    Convert{" "}
                    {direction === "to-pdf"
                      ? "to PDF"
                      : `to ${targetFormat.toUpperCase()}`}
                  </>
                )}
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={resetForm}
                disabled={isSubmitting}
              >
                Reset
              </Button>
            </div>
          </form>

          {/* Conversion Result */}
          {result && (
            <div className="mt-6 p-4 border rounded-lg bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-medium text-green-900 dark:text-green-100 mb-2">
                    Conversion Successful!
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{result.filename}</div>
                        <div className="text-xs text-muted-foreground">
                          {formatFileSize(result.fileSize)} • {result.format}{" "}
                          format
                          {result.conversionTime &&
                            ` • Converted in ${result.conversionTime}s`}
                        </div>
                      </div>
                      {result.fileUrl === "#" ? (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            toast.info(
                              "Mock download - implement real download endpoint"
                            )
                          }
                          className="shrink-0"
                        >
                          📄 Download (Mock)
                        </Button>
                      ) : (
                        <DownloadButton
                          fileUrl={result.fileUrl}
                          filename={result.filename}
                          className="shrink-0"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Quick Tips */}
          <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-800">
            <div className="flex gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-amber-900 dark:text-amber-100 mb-1">
                  Tips for Best Results
                </h4>
                <ul className="text-sm text-amber-700 dark:text-amber-200 space-y-1">
                  <li>
                    • Ensure your file is not corrupted and properly formatted
                  </li>
                  <li>
                    • For better text extraction, use high-quality source files
                  </li>
                  <li>• Large files may take longer to process</li>
                  <li>
                    • Complex layouts may require manual adjustment after
                    conversion
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
