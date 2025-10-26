"use client";

import { useState } from "react";
import { uploadFile } from "@/app/upload-action";
import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
  DropzoneErrorState,
  DropzoneSuccessState,
} from "@/common/components/ui/dropzone";

const RESET_DELAY = 2000;

export default function UploadForm() {
  const [state, setState] = useState<
    | { status: "idle" }
    | { status: "dropped"; files: File[] }
    | { status: "uploading"; files: File[] }
    | { status: "success" }
    | { status: "error"; error: Error }
  >({ status: "idle" });

  const handleDrop = (files: File[]) => {
    setState({ status: "dropped", files });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      state.status !== "dropped" ||
      !state.files ||
      state.files.length === 0
    ) {
      console.error("No files selected"); // TODO: Handle error message
      return;
    }

    setState({ status: "uploading", files: state.files });

    try {
      const formData = new FormData();

      // Add all files to FormData
      state.files.forEach((file) => {
        formData.append("files", file);
      });

      await uploadFile(formData);
      setState({ status: "success" });

      setTimeout(() => {
        setState({ status: "idle" });
      }, RESET_DELAY);
    } catch (error) {
      setState({ status: "error", error: error as Error }); // TODO: Handle error message

      setTimeout(() => {
        setState({ status: "idle" });
      }, RESET_DELAY);
    }
  };

  console.log(state.status);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Dropzone
        accept={{ "image/webp": [".webp"] }}
        maxFiles={10}
        maxSize={1024 * 1024 * 10}
        minSize={1024}
        onDrop={handleDrop}
        onError={(error) => {
          setState({
            status: "error",
            error: error,
          });
        }}
        src={
          state.status === "dropped" || state.status === "uploading"
            ? state.files
            : undefined
        }
      >
        {state.status === "success" && <DropzoneSuccessState />}
        {state.status === "error" && (
          <DropzoneErrorState message={state.error} />
        )}
        {state.status !== "success" && state.status !== "error" && (
          <>
            <DropzoneEmptyState />
            <DropzoneContent />
          </>
        )}
      </Dropzone>
      <button
        className="border border-border rounded-[var(--radius)] p-4 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted transition-colors"
        type="submit"
        disabled={state.status !== "dropped"}
      >
        {state.status === "uploading" ? "Uploading..." : "Upload"}
      </button>
    </form>
  );
}
