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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
// import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { FileWithPreview } from "@/types/api";
import apiClient from "@/lib/api/apiClient";
import {
  Loader2,
  UploadCloud,
  FileText,
  Image as ImageIcon,
} from "lucide-react";

export default function WatermarkTool() {
  const [file, setFile] = useState<FileWithPreview | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [watermarkType, setWatermarkType] = useState<"text" | "image">("text");
  const [watermarkText, setWatermarkText] = useState("");
  const [watermarkImage, setWatermarkImage] = useState<File | null>(null);
  const [position, setPosition] = useState<
    "center" | "top-left" | "top-right" | "bottom-left" | "bottom-right"
  >("center");
  const [opacity, setOpacity] = useState(50);
  const [rotation, setRotation] = useState(45);
  const [scale, setScale] = useState(100);
  const [textColor, setTextColor] = useState("#000000");
  const [pages, setPages] = useState<
    "all" | "first" | "last" | "odd" | "even" | "custom"
  >("all");
  const [customPages, setCustomPages] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const watermarkImageRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (!selectedFile.type.includes("pdf")) {
        toast({
          variant: "destructive",
          title: "Invalid file type",
          description: "Please upload a PDF file.",
        });
        return;
      }

      if (selectedFile.size > 50 * 1024 * 1024) {
        // 50MB limit
        toast({
          variant: "destructive",
          title: "File too large",
          description: "Maximum file size is 50MB.",
        });
        return;
      }

      const fileWithPreview = Object.assign(selectedFile, {
        preview: URL.createObjectURL(selectedFile),
      });

      setFile(fileWithPreview);
      setDownloadUrl("");
    }
  };

  const handleWatermarkImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (!selectedFile.type.includes("image")) {
        toast({
          variant: "destructive",
          title: "Invalid file type",
          description: "Please upload an image file for the watermark.",
        });
        return;
      }

      setWatermarkImage(selectedFile);
    }
  };

  const resetForm = () => {
    setFile(null);
    setWatermarkText("");
    setWatermarkImage(null);
    setPosition("center");
    setOpacity(50);
    setRotation(45);
    setScale(100);
    setTextColor("#000000");
    setPages("all");
    setCustomPages("");
    setDownloadUrl("");

    if (fileInputRef.current) fileInputRef.current.value = "";
    if (watermarkImageRef.current) watermarkImageRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      toast({
        variant: "destructive",
        title: "No file selected",
        description: "Please upload a PDF file.",
      });
      return;
    }

    if (watermarkType === "text" && !watermarkText) {
      toast({
        variant: "destructive",
        title: "Missing text",
        description: "Please enter text for the watermark.",
      });
      return;
    }

    if (watermarkType === "image" && !watermarkImage) {
      toast({
        variant: "destructive",
        title: "No watermark image",
        description: "Please upload an image for the watermark.",
      });
      return;
    }

    if (pages === "custom" && !customPages) {
      toast({
        variant: "destructive",
        title: "Missing page range",
        description: "Please specify page ranges (e.g., 1-3,5,7-9)",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const watermarkOptions = {
        watermarkType,
        position,
        opacity,
        rotation,
        scale,
        pages,
        ...(watermarkType === "text" && { content: watermarkText, textColor }),
        ...(watermarkType === "image" && watermarkImage
          ? { watermarkImage }
          : {}),
        ...(pages === "custom" && { customPages }),
      };

      const response = await apiClient.pdf.watermark(file, watermarkOptions);

      if (response.data.success) {
        setDownloadUrl(
          apiClient.getFile(
            response.data.fileUrl.split("?folder=")[1].split("&filename=")[0],
            response.data.filename
          )
        );

        toast({
          title: "Success!",
          description: response.data.message,
        });
      } else {
        throw new Error("Watermark operation failed");
      }
    } catch (error) {
      console.error("Watermark error:", error);
      toast({
        variant: "destructive",
        title: "Operation failed",
        description:
          "There was an error adding the watermark. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Watermark PDF</CardTitle>
        <CardDescription>
          Add text or image watermarks to your PDF documents.
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

            {/* Watermark Type Tabs */}
            <Tabs
              defaultValue="text"
              onValueChange={(value) =>
                setWatermarkType(value as "text" | "image")
              }
            >
              <TabsList className="grid grid-cols-2 w-[200px]">
                <TabsTrigger value="text">Text</TabsTrigger>
                <TabsTrigger value="image">Image</TabsTrigger>
              </TabsList>

              <TabsContent value="text" className="space-y-4 mt-2">
                <div className="space-y-2">
                  <Label htmlFor="watermark-text">Watermark Text</Label>
                  <Input
                    id="watermark-text"
                    placeholder="Enter watermark text..."
                    value={watermarkText}
                    onChange={(e) => setWatermarkText(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="text-color">Text Color</Label>
                  <Input
                    id="text-color"
                    type="color"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="w-20 h-10 p-1"
                  />
                </div>
              </TabsContent>

              <TabsContent value="image" className="space-y-4 mt-2">
                <div className="space-y-2">
                  <Label htmlFor="watermark-image">Watermark Image</Label>
                  <div
                    className="border-2 border-dashed rounded-md p-4 flex flex-col items-center justify-center cursor-pointer"
                    onClick={() => watermarkImageRef.current?.click()}
                  >
                    {watermarkImage ? (
                      <div className="flex items-center space-x-2">
                        <ImageIcon size={24} />
                        <span className="font-medium truncate">
                          {watermarkImage.name}
                        </span>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            setWatermarkImage(null);
                            if (watermarkImageRef.current)
                              watermarkImageRef.current.value = "";
                          }}
                        >
                          Change
                        </Button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center">
                        <ImageIcon size={30} className="mb-2" />
                        <p className="text-sm text-muted-foreground">
                          Click to upload an image
                        </p>
                      </div>
                    )}
                    <input
                      ref={watermarkImageRef}
                      id="watermark-image"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleWatermarkImageChange}
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            {/* Watermark Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Position */}
              <div className="space-y-2">
                <Label htmlFor="position">Position</Label>
                <Select
                  value={position}
                  onValueChange={(value) =>
                    setPosition(
                      value as
                        | "center"
                        | "top-left"
                        | "top-right"
                        | "bottom-left"
                        | "bottom-right"
                    )
                  }
                >
                  <SelectTrigger id="position">
                    <SelectValue placeholder="Select position" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="center">Center</SelectItem>
                    <SelectItem value="top-left">Top Left</SelectItem>
                    <SelectItem value="top-right">Top Right</SelectItem>
                    <SelectItem value="bottom-left">Bottom Left</SelectItem>
                    <SelectItem value="bottom-right">Bottom Right</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Pages */}
              <div className="space-y-2">
                <Label htmlFor="pages">Apply To</Label>
                <Select
                  value={pages}
                  onValueChange={(value) =>
                    setPages(
                      value as
                        | "all"
                        | "first"
                        | "last"
                        | "odd"
                        | "even"
                        | "custom"
                    )
                  }
                >
                  <SelectTrigger id="pages">
                    <SelectValue placeholder="Select pages" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Pages</SelectItem>
                    <SelectItem value="first">First Page Only</SelectItem>
                    <SelectItem value="last">Last Page Only</SelectItem>
                    <SelectItem value="odd">Odd Pages</SelectItem>
                    <SelectItem value="even">Even Pages</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>

                {pages === "custom" && (
                  <div className="mt-2">
                    <Input
                      placeholder="e.g., 1-3,5,7-9"
                      value={customPages}
                      onChange={(e) => setCustomPages(e.target.value)}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Sliders */}
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="opacity">Opacity</Label>
                  <span className="text-sm text-muted-foreground">
                    {opacity}%
                  </span>
                </div>
                <Slider
                  id="opacity"
                  min={10}
                  max={100}
                  step={1}
                  value={[opacity]}
                  onValueChange={(values) => setOpacity(values[0])}
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="rotation">Rotation</Label>
                  <span className="text-sm text-muted-foreground">
                    {rotation}°
                  </span>
                </div>
                <Slider
                  id="rotation"
                  min={0}
                  max={360}
                  step={5}
                  value={[rotation]}
                  onValueChange={(values) => setRotation(values[0])}
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="scale">Scale</Label>
                  <span className="text-sm text-muted-foreground">
                    {scale}%
                  </span>
                </div>
                <Slider
                  id="scale"
                  min={10}
                  max={200}
                  step={5}
                  value={[scale]}
                  onValueChange={(values) => setScale(values[0])}
                />
              </div>
            </div>
          </div>
        </form>
      </CardContent>

      <CardFooter className="flex flex-col sm:flex-row gap-3 items-center">
        {downloadUrl ? (
          <>
            <Button asChild className="w-full sm:w-auto">
              <a href={downloadUrl} download>
                Download Watermarked PDF
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
              disabled={isSubmitting}
              className="w-full sm:w-auto"
            >
              {isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              {isSubmitting ? "Processing..." : "Add Watermark"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={resetForm}
              disabled={isSubmitting}
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
