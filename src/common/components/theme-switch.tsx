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
    <>
      <button onClick={() => setTheme("dark")}>Dark</button>
      <button onClick={() => setTheme("light")}>Light</button>
      <button onClick={() => setTheme("orange")}>Orange</button>
    </>
  );
}
