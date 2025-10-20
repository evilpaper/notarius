import fs from "node:fs/promises";
import UploadForm from "@/app/upload-form";
import { ThemeSwitch } from "@/common/components/theme-switch";
import { GeistMono } from "geist/font/mono";
import Link from "next/link";

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
      </main>
      <footer className="w-full row-start-3 flex gap-[24px] flex-wrap items-center justify-between">
        <Link href="/admin">Admin</Link>
        <ThemeSwitch />
      </footer>
    </div>
  );
}
