"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { locales, localeNames } from "@/i18n/routing";

export default function LocaleSwitcher() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <details className="locale-switcher">
      <summary aria-label={t("languageLabel")}>
        <span aria-hidden="true">文A</span>
        <span>{localeNames[locale as keyof typeof localeNames] ?? locale}</span>
      </summary>
      <nav className="locale-switcher__menu" aria-label={t("languageLabel")}>
        {locales.map((l) => (
          <Link
            key={l}
            href={pathname}
            locale={l}
            lang={l}
            hrefLang={l}
            aria-current={l === locale ? "true" : undefined}
          >
            {localeNames[l]}
          </Link>
        ))}
      </nav>
    </details>
  );
}
