"use client";

import { useState } from "react";
import { uploadFile } from "@/app/upload-action";
import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
  DropzoneSuccessState,
} from "@/common/components/ui/dropzone";

export default function UploadForm() {
  const [files, setFiles] = useState<File[] | undefined>();
  const [uploadStatus, setUploadStatus] = useState<
    "idle" | "uploading" | "success" | "error"
  >("idle");

  const handleDrop = (files: File[]) => {
    console.log(files);
    setFiles(files);

    // Reset status when new files are dropped
    if (uploadStatus === "success" || uploadStatus === "error") {
      setUploadStatus("idle");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!files || files.length === 0) {
      console.error("No files selected");
      return;
    }

    setUploadStatus("uploading");

    try {
      const formData = new FormData();

      // Add all files to FormData
      files.forEach((file) => {
        formData.append("files", file);
      });

      await uploadFile(formData);

      // Show success state
      setUploadStatus("success");
      setFiles(undefined);

      // Reset to idle after 3 seconds
      setTimeout(() => {
        setUploadStatus("idle");
      }, 3000);
    } catch (error) {
      console.error("Upload failed:", error);
      setUploadStatus("error");

      // Reset to idle after 3 seconds
      setTimeout(() => {
        setUploadStatus("idle");
      }, 3000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Dropzone
        accept={{ "image/webp": [".webp"] }}
        maxFiles={10}
        maxSize={1024 * 1024 * 10}
        minSize={1024}
        onDrop={handleDrop}
        onError={console.error}
        src={files}
      >
        {uploadStatus === "success" ? (
          <DropzoneSuccessState />
        ) : (
          <>
            <DropzoneEmptyState />
            <DropzoneContent />
          </>
        )}
      </Dropzone>
      <button
        className="border border-border rounded-[var(--radius)] p-4 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted transition-colors"
        type="submit"
        disabled={!files || files.length === 0 || uploadStatus === "uploading"}
      >
        {uploadStatus === "uploading" ? "Uploading..." : "Upload"}
      </button>
    </form>
  );
}
