"use server";

import fs from "node:fs/promises";
import { revalidatePath } from "next/cache";

export async function removeFile(formData: FormData) {
  const filename = formData.get("filename") as string;

  if (!filename) {
    throw new Error("No filename provided");
  }

  // Remove the /uploads/ prefix to get the actual filename
  const actualFilename = filename.replace("/uploads/", "");

  await fs.unlink(`./public/uploads/${actualFilename}`);

  revalidatePath("/");
}
