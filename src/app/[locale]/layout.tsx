import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  Amiri,
  Cormorant_Garamond,
  EB_Garamond,
  Noto_Serif_Devanagari,
  Noto_Serif_KR,
  Noto_Serif_SC,
  Shippori_Mincho
} from "next/font/google";
import { isRtl, locales, routing, type Locale } from "@/i18n/routing";
import { alternatesFor, canonicalFor } from "@/lib/seo";
import { siteName, siteUrl } from "@/lib/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "../globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap"
});

const garamond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap"
});

const cormorantCyrillic = Cormorant_Garamond({
  subsets: ["cyrillic", "latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  preload: false
});

const garamondCyrillic = EB_Garamond({
  subsets: ["cyrillic", "latin"],
  weight: ["400", "500"],
  display: "swap",
  preload: false
});

const shippori = Shippori_Mincho({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  preload: false
});

const notoSerifSc = Noto_Serif_SC({
  weight: ["400", "500", "700"],
  display: "swap",
  preload: false
});

const notoSerifKr = Noto_Serif_KR({
  weight: ["400", "500", "700"],
  display: "swap",
  preload: false
});

const notoSerifDevanagari = Noto_Serif_Devanagari({
  subsets: ["devanagari", "latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  preload: false
});

const amiri = Amiri({
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  display: "swap",
  preload: false
});

type FontPair = {
  display: typeof cormorant;
  body: typeof cormorant;
};

const fontsByLocale: Record<Locale, FontPair> = {
  en: { display: cormorant, body: garamond },
  fr: { display: cormorant, body: garamond },
  es: { display: cormorant, body: garamond },
  pt: { display: cormorant, body: garamond },
  de: { display: cormorant, body: garamond },
  it: { display: cormorant, body: garamond },
  ja: { display: shippori, body: shippori },
  zh: { display: notoSerifSc, body: notoSerifSc },
  ar: { display: amiri, body: amiri },
  ru: { display: cormorantCyrillic, body: garamondCyrillic },
  hi: { display: notoSerifDevanagari, body: notoSerifDevanagari },
  ko: { display: notoSerifKr, body: notoSerifKr }
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params
}: Omit<Props, "children">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: t("pages.home.title"),
      template: `%s · ${siteName}`
    },
    description: t("description"),
    alternates: {
      ...alternatesFor("/"),
      canonical: canonicalFor(locale, "/")
    },
    openGraph: {
      type: "website",
      siteName,
      locale
    },
    robots: {
      index: true,
      follow: true
    }
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const tNav = await getTranslations("nav");
  const tMeta = await getTranslations("meta");
  const fonts = fontsByLocale[locale as Locale];
  const dir = isRtl(locale) ? "rtl" : "ltr";

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "PerformingGroup",
    name: siteName,
    url: `${siteUrl}/${locale}`,
    description: tMeta("description"),
    genre: ["Painting", "Music", "Film", "Photography", "Movement"],
    location: {
      "@type": "Place",
      name: "Kyoto, Japan"
    }
  };

  return (
    <html
      lang={locale}
      dir={dir}
      className={fonts.body.className}
      style={
        {
          "--font-locale-display": fonts.display.style.fontFamily,
          "--font-locale-body": fonts.body.style.fontFamily
        } as React.CSSProperties
      }
    >
      <body>
        <a href="#main" className="skip-link">
          {tNav("skipToContent")}
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd)
          }}
        />
        <NextIntlClientProvider>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
