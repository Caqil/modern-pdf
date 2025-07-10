"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { FileWithPreview } from "@/types/api";
import { UploadCloud, FileText } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface FileUploadProps {
  file: FileWithPreview | null;
  setFile: (file: FileWithPreview | null) => void;
  accept?: string;
  maxSize?: number; // in MB
  label?: string;
  description?: string;
}

export function SingleFileUpload({
  file,
  setFile,
  accept = ".pdf",
  maxSize = 50, // Default 50MB
  label = "Upload File",
  description = "PDF (max 50MB)",
}: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];

      // Validate file type
      const fileType = accept.replace(".", "");
      if (!selectedFile.type.includes(fileType)) {
        toast({
          variant: "destructive",
          title: "Invalid file type",
          description: `Please upload a ${fileType.toUpperCase()} file.`,
        });
        return;
      }

      // Validate file size
      if (selectedFile.size > maxSize * 1024 * 1024) {
        toast({
          variant: "destructive",
          title: "File too large",
          description: `Maximum file size is ${maxSize}MB.`,
        });
        return;
      }

      const fileWithPreview = Object.assign(selectedFile, {
        preview: URL.createObjectURL(selectedFile),
      });

      setFile(fileWithPreview);
    }
  };

  return (
    <div className="space-y-2">
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
                if (file.preview) {
                  URL.revokeObjectURL(file.preview);
                }
                setFile(null);
                if (fileInputRef.current) fileInputRef.current.value = "";
              }}
            >
              Change
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <UploadCloud size={40} className="mb-2" />
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="text-xs text-muted-foreground mt-1">{description}</p>
          </div>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
}

interface MultiFileUploadProps {
  files: FileWithPreview[];
  setFiles: React.Dispatch<React.SetStateAction<FileWithPreview[]>>;
  accept?: string;
  maxSize?: number; // in MB
  maxFiles?: number;
  label?: string;
  description?: string;
}

export function MultiFileUpload({
  files,
  setFiles,
  accept = ".pdf",
  maxSize = 50, // Default 50MB
  maxFiles = 20,
  label = "Upload Files",
  description = "PDF files (max 50MB each)",
}: MultiFileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      // Check if adding these files would exceed the max files limit
      if (files.length + e.target.files.length > maxFiles) {
        toast({
          variant: "destructive",
          title: "Too many files",
          description: `You can upload a maximum of ${maxFiles} files.`,
        });
        return;
      }

      const selectedFiles = Array.from(e.target.files);

      // Validate file types
      const fileType = accept.replace(".", "");
      const invalidFiles = selectedFiles.filter(
        (file) => !file.type.includes(fileType)
      );
      if (invalidFiles.length > 0) {
        toast({
          variant: "destructive",
          title: "Invalid file type",
          description: `Please upload only ${fileType.toUpperCase()} files.`,
        });
        return;
      }

      // Validate file sizes
      const oversizedFiles = selectedFiles.filter(
        (file) => file.size > maxSize * 1024 * 1024
      );
      if (oversizedFiles.length > 0) {
        toast({
          variant: "destructive",
          title: "File too large",
          description: `Maximum file size is ${maxSize}MB per file.`,
        });
        return;
      }

      // Create preview URLs for selected files
      const filesWithPreview = selectedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );

      // Add the new files to the existing files array
      setFiles((prev: FileWithPreview[]) => [...prev, ...filesWithPreview]);
    }

    // Reset file input
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="space-y-2">
      <div
        className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center cursor-pointer"
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="flex flex-col items-center justify-center">
          <UploadCloud size={40} className="mb-2" />
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
          {files.length > 0 && (
            <p className="text-sm font-medium mt-2">
              {files.length} file{files.length !== 1 ? "s" : ""} selected
            </p>
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          className="hidden"
          onChange={handleFileChange}
          multiple
        />
      </div>
    </div>
  );
}
