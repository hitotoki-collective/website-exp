"use client";

import { useEffect, useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { locales, localeNames } from "@/i18n/routing";

export default function LocaleSwitcher() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const detailsRef = useRef<HTMLDetailsElement>(null);

  // <details> keeps its menu open until re-clicked; dismiss it like a
  // conventional dropdown on outside click or Escape.
  useEffect(() => {
    const details = detailsRef.current;
    if (!details) return;

    const onClick = (event: MouseEvent) => {
      if (
        details.open &&
        event.target instanceof Node &&
        !details.contains(event.target)
      ) {
        details.open = false;
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && details.open) {
        details.open = false;
      }
    };

    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <details className="locale-switcher" ref={detailsRef}>
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
