import type { Metadata } from "next";
import { locales, type Locale } from "@/i18n/routing";
import { siteUrl } from "./site";

/**
 * hreflang alternates for a localized pathname.
 * `path` is the locale-less pathname, e.g. "/" or "/performances/01-jp-kyo".
 */
export function alternatesFor(path: string): Metadata["alternates"] {
  const suffix = path === "/" ? "" : path;
  const languages: Record<string, string> = {};
  for (const locale of locales) {
    languages[locale] = `${siteUrl}/${locale}${suffix}`;
  }
  languages["x-default"] = `${siteUrl}/en${suffix}`;
  return {
    canonical: undefined,
    languages
  };
}

export function canonicalFor(locale: Locale | string, path: string): string {
  const suffix = path === "/" ? "" : path;
  return `${siteUrl}/${locale}${suffix}`;
}

type OgImage = {
  url: string;
  width?: number;
  height?: number;
  alt?: string;
};

type PageMeta = {
  locale: string;
  path: string;
  title: string;
  description: string;
  siteName: string;
  images?: OgImage[];
};

export function pageMetadata({
  locale,
  path,
  title,
  description,
  siteName,
  images
}: PageMeta): Metadata {
  const canonical = canonicalFor(locale, path);
  const alternates = alternatesFor(path);
  return {
    title,
    description,
    alternates: { ...alternates, canonical },
    openGraph: {
      type: "website",
      siteName,
      title,
      description,
      url: canonical,
      locale,
      ...(images ? { images } : {})
    },
    twitter: {
      card: "summary_large_image",
      title,
      description
    }
  };
}
