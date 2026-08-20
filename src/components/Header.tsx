"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import Seal from "./Seal";
import LocaleSwitcher from "./LocaleSwitcher";

const items = [
  { href: "/philosophy", key: "philosophy" },
  { href: "/performances", key: "performances" },
  { href: "/patronage", key: "patronage" }
] as const;

export default function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();

  return (
    <header className="site-header">
      <div className="wrap site-header__inner">
        <Link href="/" className="wordmark" aria-label={t("home")}>
          <Seal className="wordmark__seal" />
          <span className="wordmark__latin">Hitotoki Collective</span>
        </Link>
        <nav className="site-nav" aria-label={t("mainLabel")}>
          {items.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              aria-current={
                pathname === item.href || pathname.startsWith(`${item.href}/`)
                  ? "page"
                  : undefined
              }
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>
        <LocaleSwitcher />
      </div>
    </header>
  );
}
