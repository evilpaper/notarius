"use client";

import { useState } from "react";
import { uploadFile } from "@/app/upload-action";
import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from "@/common/components/ui/dropzone";

export default function UploadForm() {
  const [files, setFiles] = useState<File[] | undefined>();
  const [isUploading, setIsUploading] = useState(false);

  const handleDrop = (files: File[]) => {
    console.log(files);
    setFiles(files);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!files || files.length === 0) {
      console.error("No files selected");
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();

      // Add all files to FormData
      files.forEach((file) => {
        formData.append("files", file);
      });

      await uploadFile(formData);

      // Clear files after successful upload
      setFiles(undefined);
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Dropzone
        accept={{ "image/*": [] }}
        maxFiles={10}
        maxSize={1024 * 1024 * 10}
        minSize={1024}
        onDrop={handleDrop}
        onError={console.error}
        src={files}
      >
        <DropzoneEmptyState />
        <DropzoneContent />
      </Dropzone>

      <button
        className="border border-border rounded-[var(--radius)] p-4 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted transition-colors"
        type="submit"
        disabled={!files || files.length === 0 || isUploading}
      >
        {isUploading ? "Uploading..." : "Upload"}
      </button>
    </form>
  );
}
