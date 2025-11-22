"use server";

import fs from "node:fs/promises";
import { revalidatePath } from "next/cache";

export async function uploadFile(formData: FormData) {
	const files = formData.getAll("files") as File[];

	if (!files || files.length === 0) {
		throw new Error("No files provided");
	}

	// Upload all files
	await Promise.all(
		files.map(async (file) => {
			const arrayBuffer = await file.arrayBuffer();
			const buffer = new Uint8Array(arrayBuffer);
			await fs.writeFile(`./public/uploads/${file.name}`, buffer);
		}),
	);

	revalidatePath("/");
}
