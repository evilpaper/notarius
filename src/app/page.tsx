import Image from "next/image";
import fs from "node:fs/promises";

import UploadForm from "@/app/upload-form";
import { ThemeSwitch } from "@/common/components/theme-switch";
import { removeFile } from "./remove-action";
import { GeistMono } from "geist/font/mono";

export default async function Home() {
  const files = await fs.readdir("./public/uploads");
  const images = files
    .filter((file) => file.endsWith(".webp"))
    .map((file) => `/uploads/${file}`);

  return (
    <div className="flex flex-col font-sans items-center justify-items-center min-h-screen p-8 gap-4">
      <main className="flex flex-col flex-1 gap-16 items-center justify-center w-full">
        <section className="flex flex-col gap-4 items-center justify-center w-full">
          <h1 className={`font-mono text-4xl font-bold ${GeistMono.className}`}>
            Notarius
          </h1>
          <p className="text-lg">Send and sign documents digitally</p>
        </section>
        <UploadForm />
        <section className="flex flex-col gap-4 w-full">
          {images.length > 0 && (
            <>
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
                        className="border-gray-700 rounded-md p-2 text-sm w-full"
                        type="submit"
                      >
                        Remove
                      </button>
                    </form>
                  </li>
                ))}
              </ul>
            </>
          )}
        </section>
      </main>
      <footer className="w-full row-start-3 flex gap-[24px] flex-wrap items-center justify-end">
        <ThemeSwitch />
      </footer>
    </div>
  );
}
