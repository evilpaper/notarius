import Image from "next/image";
import fs from "node:fs/promises";

import UploadForm from "@/app/upload-form";
import { ThemeSwitch } from "@/common/components/theme-switch";
import { removeFile } from "./remove-action";

export default async function Home() {
  const files = await fs.readdir("./public/uploads");
  const images = files
    .filter((file) => file.endsWith(".webp"))
    .map((file) => `/uploads/${file}`);

  return (
    <div className="flex flex-col font-sans items-center justify-items-center min-h-screen p-8 pb-20 gap-4 sm:p-20">
      <main className="flex flex-col gap-[32px] items-center justify-center w-full">
        <p>Notarius</p>
        <p>Send and sign documents digitally.</p>
        <UploadForm />
        <section className="flex flex-col gap-4 w-full">
          <p>Uploaded files</p>
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
                    className="border-gray-700 rounded-md p-2"
                    type="submit"
                  >
                    Remove
                  </button>
                </form>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <footer className="w-full row-start-3 flex gap-[24px] flex-wrap items-center justify-end">
        <ThemeSwitch />
      </footer>
    </div>
  );
}
