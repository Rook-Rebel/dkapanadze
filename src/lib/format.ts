import type { Locale } from "@/i18n";

const georgianMonths = [
  "იანვარი",
  "თებერვალი",
  "მარტი",
  "აპრილი",
  "მაისი",
  "ივნისი",
  "ივლისი",
  "აგვისტო",
  "სექტემბერი",
  "ოქტომბერი",
  "ნოემბერი",
  "დეკემბერი",
];

const englishMonths = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/**
 * Formats an ISO date (YYYY-MM-DD) without relying on runtime Intl data,
 * so Georgian output is identical on every server and browser.
 */
export function formatIsoDate(iso: string, locale: Locale) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!match) return iso;
  const [, year, month, day] = match;
  const monthIndex = Number(month) - 1;
  const dayNumber = Number(day);
  return locale === "en"
    ? `${dayNumber} ${englishMonths[monthIndex]} ${year}`
    : `${year} წლის ${dayNumber} ${georgianMonths[monthIndex]}`;
}

/** Returns a readable host name (without "www.") for displaying external links. */
export function hostFromUrl(url: string) {
  try {
    return new URL(url).host.replace(/^www\./, "");
  } catch {
    return url;
  }
}
