export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <ul className="font-mono list-inside text-sm/6 text-center sm:text-left">
          <li className="mb-2 tracking-[-.01em]">Notarius</li>
          <li className="tracking-[-.01em]">
            Send and sign documents digitally.
          </li>
        </ul>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
    </div>
  );
}
