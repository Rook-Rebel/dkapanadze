import "server-only";

import { cookies } from "next/headers";
import { defaultLocale, isLocale, languageCookie, type Locale } from ".";

export async function getLocale(): Promise<Locale> {
  const value = (await cookies()).get(languageCookie)?.value;
  return isLocale(value) ? value : defaultLocale;
}
