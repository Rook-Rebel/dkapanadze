"use client";

import { useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import { getUi, languageCookie, type Locale } from "@/i18n";

const options: Array<{ value: Locale; short: string }> = [
  { value: "ka", short: "KA" },
  { value: "en", short: "EN" },
];

/** Persists the language choice for one year; read on the server via cookies(). */
function persistLanguage(locale: Locale) {
  document.cookie = `${languageCookie}=${locale}; path=/; max-age=31536000; samesite=lax`;
}

export function LanguageToggle({ locale }: { locale: Locale }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const labels = getUi(locale);

  // Keep <html lang> in sync once the server has re-rendered in the new language,
  // so fonts never switch before the text does.
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  function changeLanguage(nextLocale: Locale) {
    if (nextLocale === locale || pending) return;
    persistLanguage(nextLocale);
    startTransition(() => router.refresh());
  }

  return (
    <div
      className="lang-switch"
      role="group"
      aria-label={labels.chooseLanguage}
      data-active={locale}
      data-pending={pending ? "true" : undefined}
      aria-busy={pending || undefined}
    >
      <span className="lang-switch-indicator" aria-hidden="true" />
      {options.map((option) => {
        const name = option.value === "ka" ? labels.georgian : labels.english;
        return (
          <button
            key={option.value}
            type="button"
            lang={option.value}
            aria-pressed={locale === option.value}
            title={name}
            onClick={() => changeLanguage(option.value)}
          >
            <span aria-hidden="true">{option.short}</span>
            <span className="sr-only">{name}</span>
          </button>
        );
      })}
    </div>
  );
}
