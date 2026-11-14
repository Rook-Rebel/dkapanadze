"use client";

import { useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { getUi, type Locale } from "@/i18n";
import { localizePath, splitLocalePath } from "@/i18n/paths";

function subscribeToHash(onChange: () => void) {
  window.addEventListener("hashchange", onChange);
  return () => window.removeEventListener("hashchange", onChange);
}

const options: Array<{ value: Locale; short: string }> = [
  { value: "ka", short: "KA" },
  { value: "en", short: "EN" },
];

/**
 * KA / EN switch. Each option is a real link to the equivalent page in the
 * other language (/research ↔ /en/research), so it is crawlable and works
 * without JavaScript. The two languages use separate root layouts, so the
 * switch is a full page load by design.
 */
export function LanguageToggle({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const labels = getUi(locale);
  const { path } = splitLocalePath(pathname);
  // Keep the reader at the same section when switching (e.g. #projects).
  const hash = useSyncExternalStore(subscribeToHash, () => window.location.hash, () => "");

  return (
    <div className="lang-switch" role="group" aria-label={labels.chooseLanguage} data-active={locale}>
      <span className="lang-switch-indicator" aria-hidden="true" />
      {options.map((option) => {
        const name = option.value === "ka" ? labels.georgian : labels.english;
        const current = option.value === locale;
        return (
          <a
            key={option.value}
            href={`${localizePath(path, option.value)}${hash}`}
            hrefLang={option.value}
            lang={option.value}
            title={name}
            aria-current={current ? "true" : undefined}
          >
            <span aria-hidden="true">{option.short}</span>
            <span className="sr-only">{name}</span>
          </a>
        );
      })}
    </div>
  );
}
