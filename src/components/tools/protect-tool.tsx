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
import { useToast } from "@/components/ui/use-toast";
import { FileWithPreview } from "@/types/api";
import { apiClient } from "@/lib/api/apiClient";
import { Loader2, Download, Eye, EyeOff } from "lucide-react";
import { SingleFileUpload } from "@/components/tools/shared/file-upload";

export default function ProtectTool() {
  const [file, setFile] = useState<FileWithPreview | null>(null);
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{
    filename: string;
    fileUrl: string;
    fileSize: number;
  } | null>(null);

  const { toast } = useToast();

  const resetForm = () => {
    if (file?.preview) {
      URL.revokeObjectURL(file.preview);
    }
    setFile(null);
    setPassword("");
    setConfirmPassword("");
    setResult(null);
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

    if (!password) {
      toast({
        variant: "destructive",
        title: "Password required",
        description: "Please enter a password to protect the PDF.",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Passwords do not match",
        description: "Please make sure both passwords match.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await apiClient.pdf.protect(file, password);

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
              description: "PDF successfully protected with password.",
            });
          }
        }
      } else {
        throw new Error("Protection operation failed");
      }
    } catch (error) {
      console.error("Protection error:", error);

      toast({
        variant: "destructive",
        title: "Protection failed",
        description: "There was an error protecting the PDF. Please try again.",
      });
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
        <CardTitle>Protect PDF</CardTitle>
        <CardDescription>
          Add password protection to your PDF document to secure sensitive
          information.
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

            {/* Password Input */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirm-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pr-10"
                  />
                </div>
              </div>
            </div>

            <div className="text-sm text-muted-foreground">
              <p className="font-medium">Password strength tips:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Use at least 8 characters</li>
                <li>Include uppercase and lowercase letters</li>
                <li>Include numbers and special characters</li>
                <li>Avoid using easily guessable information</li>
              </ul>
            </div>
          </div>
        </form>

        {/* Result Section */}
        {result && (
          <div className="mt-6 border rounded-md p-4">
            <h3 className="font-medium mb-2">Protected PDF File</h3>
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
              Protect Another File
            </Button>
          </>
        ) : (
          <>
            <Button
              type="submit"
              onClick={handleSubmit}
              disabled={
                isSubmitting ||
                !file ||
                !password ||
                password !== confirmPassword
              }
            >
              {isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              {isSubmitting ? "Processing..." : "Protect PDF"}
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
