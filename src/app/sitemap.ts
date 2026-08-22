import type { MetadataRoute } from "next";
import { locales } from "@/i18n/routing";
import { performances } from "@/lib/performances";
import { siteUrl } from "@/lib/site";

export const dynamic = "force-static";

const paths = [
  "/",
  "/philosophy",
  "/performances",
  "/patronage",
  ...performances.map((p) => `/performances/${p.slug}`)
];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((path) => {
    const suffix = path === "/" ? "" : path;
    const languages: Record<string, string> = {};
    for (const locale of locales) {
      languages[locale] = `${siteUrl}/${locale}${suffix}`;
    }
    return {
      url: `${siteUrl}/en${suffix}`,
      changeFrequency: "monthly",
      priority: path === "/" ? 1 : 0.7,
      alternates: { languages }
    };
  });
}
