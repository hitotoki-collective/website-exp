import { defineRouting } from "next-intl/routing";

export const locales = ["en", "ja", "fr", "ar", "es", "zh", "ru"] as const;
export type Locale = (typeof locales)[number];

export const routing = defineRouting({
  locales,
  defaultLocale: "en",
  localePrefix: "always"
});

export const rtlLocales: readonly Locale[] = ["ar"];

export function isRtl(locale: string): boolean {
  return rtlLocales.includes(locale as Locale);
}

export const localeNames: Record<Locale, string> = {
  en: "English",
  ja: "日本語",
  fr: "Français",
  ar: "العربية",
  es: "Español",
  zh: "中文",
  ru: "Русский"
};
