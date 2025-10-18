import Image from "next/image";
import fs from "node:fs/promises";

import UploadForm from "@/app/upload-form";
import { ThemeSwitch } from "@/common/components/theme-switch";

export default async function Home() {
  const files = await fs.readdir("./public/uploads");
  const images = files
    .filter((file) => file.endsWith(".webp"))
    .map((file) => `/uploads/${file}`);

  return (
    <div className="flex flex-col font-sans items-center justify-items-center min-h-screen p-8 pb-20 gap-4 sm:p-20">
      <main className="flex flex-col gap-[32px] items-center justify-center w-full">
        <p className="font-mono text-sm/6 tracking-[-.01em]">Notarius</p>
        <p className="font-mono text-sm/6 tracking-[-.01em] ">
          Send and sign documents digitally.
        </p>
        <UploadForm />
        <section className="flex flex-col gap-4 w-full">
          <p className="font-mono text-sm/6">Uploaded files</p>
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
