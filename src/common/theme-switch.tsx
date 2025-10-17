"use client";

import { useEffect, useState } from "react";

export function ThemeSwitch() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    // Apply theme class to html element
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <>
      <button className="font-mono text-sm/6" onClick={() => setTheme("dark")}>
        Dark
      </button>
      <button className="font-mono text-sm/6" onClick={() => setTheme("light")}>
        Light
      </button>
    </>
  );
}
