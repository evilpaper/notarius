"use client";

import { useRef } from "react";
import { uploadFile } from "@/app/upload-action";

export default function UploadForm() {
  const fileInput = useRef<HTMLInputElement>(null);

  return (
    <form action={uploadFile} className="flex flex-col gap-4">
      <label>
        <p className="text-center">Upload a file</p>
        <input
          className="border border-gray-700 rounded-md p-4"
          type="file"
          name="file"
          ref={fileInput}
        />
      </label>
      <button className="border border-gray-700 rounded-md p-4" type="submit">
        Upload
      </button>
    </form>
  );
}
