import Image from "next/image";
import fs from "node:fs/promises";
import { removeFile } from "../remove-action";
import { FileIcon } from "lucide-react";

export default async function AdminPage() {
  const files = await fs.readdir("./public/uploads");
  const images = files
    .filter((file) => file.endsWith(".webp"))
    .map((file) => `/uploads/${file}`);
  const pdfs = files
    .filter((file) => file.endsWith(".pdf"))
    .map((file) => `/uploads/${file}`);

  return (
    <div className="flex flex-col font-sans items-center justify-items-center min-h-screen p-8 gap-4">
      <section className="flex flex-col gap-4 w-full">
        <p>Uploaded files</p>
        {images.length > 0 ? (
          <ul className="flex gap-4">
            {images.map((image) => (
              <li key={image} className="px-2 h-auto ">
                <Image
                  key={image}
                  src={image}
                  width={400}
                  height={400}
                  alt={image}
                  className="object-cover w-full"
                />
                <form action={removeFile}>
                  <input type="hidden" name="filename" value={image} />
                  <button
                    className="border-gray-700 rounded-md p-2 text-sm w-full hover:bg-gray-100"
                    type="submit"
                  >
                    Remove
                  </button>
                </form>
              </li>
            ))}
            {pdfs.map((pdf) => (
              <li
                key={pdf}
                className="px-2 h-auto flex flex-col items-center gap-2"
              >
                <FileIcon size={16} />
                <p>{pdf}</p>
                <form action={removeFile}>
                  <input type="hidden" name="filename" value={pdf} />
                  <button
                    className="border-gray-700 rounded-md p-2 text-sm w-full hover:bg-gray-100"
                    type="submit"
                  >
                    Remove
                  </button>
                </form>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm italic text-muted-foreground">
            No files uploaded
          </p>
        )}
      </section>
    </div>
  );
}
