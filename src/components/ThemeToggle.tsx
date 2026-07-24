"use client";

import { useEffect, useState } from "react";
import { MoonStar, SunMedium } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setMounted(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const dark = mounted && resolvedTheme === "dark";
  const label = dark ? "ღია რეჟიმზე გადასვლა" : "მუქ რეჟიმზე გადასვლა";

  return (
    <button
      type="button"
      className="icon-button theme-toggle"
      onClick={() => setTheme(dark ? "light" : "dark")}
      aria-label={mounted ? label : "თემის რეჟიმის შეცვლა"}
      title={mounted ? label : "თემის რეჟიმის შეცვლა"}
      disabled={!mounted}
    >
      <span className="theme-toggle-icon" aria-hidden="true">
        {mounted ? (
          dark ? (
            <SunMedium key="sun" />
          ) : (
            <MoonStar key="moon" />
          )
        ) : null}
      </span>
    </button>
  );
}
