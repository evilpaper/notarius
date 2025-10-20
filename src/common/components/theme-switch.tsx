"use client";

import { useEffect, useState } from "react";

export function ThemeSwitch() {
  const [theme, setTheme] = useState<"light" | "dark" | "orange">("light");

  useEffect(() => {
    // Apply theme class to html element
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    if (theme === "orange") {
      document.documentElement.classList.add("orange");
    } else {
      document.documentElement.classList.remove("orange");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <section className="flex gap-8">
      <button className="text-sm" onClick={() => setTheme("dark")}>
        Dark
      </button>
      <button className="text-sm" onClick={() => setTheme("light")}>
        Light
      </button>
      <button className="text-sm" onClick={() => setTheme("orange")}>
        Orange
      </button>
    </section>
  );
}
