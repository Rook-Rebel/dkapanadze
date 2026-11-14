"use client";

import { useSyncExternalStore } from "react";
import { MoonStar, SunMedium } from "lucide-react";
import { useTheme } from "next-themes";
import { getUi, type Locale } from "@/i18n";

const subscribe = () => () => {};

export function ThemeToggle({ locale }: { locale: Locale }) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);
  const label = getUi(locale).changeTheme;

  function toggleTheme() {
    const root = document.documentElement;
    const next = root.classList.contains("dark") ? "light" : "dark";

    const apply = () => {
      // Apply the class synchronously so a view transition captures the new state,
      // and suspend per-element transitions so colours do not lag behind.
      root.classList.add("theme-switching");
      root.classList.remove("light", "dark");
      root.classList.add(next);
      root.style.colorScheme = next;
      setTheme(next);
      window.requestAnimationFrame(() =>
        window.requestAnimationFrame(() => root.classList.remove("theme-switching")),
      );
    };

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduceMotion && typeof document.startViewTransition === "function") {
      document.startViewTransition(apply);
    } else {
      apply();
    }
  }

  return (
    <button
      type="button"
      className="theme-switch"
      onClick={toggleTheme}
      aria-label={label}
      aria-pressed={mounted ? resolvedTheme === "dark" : undefined}
      title={label}
    >
      {/* Both icons are rendered; CSS shows the right one before hydration. */}
      <MoonStar className="theme-icon theme-icon-moon" aria-hidden="true" />
      <SunMedium className="theme-icon theme-icon-sun" aria-hidden="true" />
    </button>
  );
}
