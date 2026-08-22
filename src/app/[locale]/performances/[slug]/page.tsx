import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { locales } from "@/i18n/routing";
import { getPerformance, performances } from "@/lib/performances";
import { getPhotos } from "@/lib/performance-images";
import { canonicalFor, pageMetadata } from "@/lib/seo";
import { siteName, siteUrl } from "@/lib/site";
import Seal from "@/components/Seal";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    performances.map((p) => ({ locale, slug: p.slug }))
  );
}

/**
 * Static-import srcs already carry the base path, so absolute URLs must be
 * built from the origin alone — resolving them against siteUrl would double
 * the base path.
 */
function absoluteAssetUrl(src: string): string {
  return new URL(src, new URL(siteUrl).origin).toString();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const trace = getPerformance(slug);
  if (!trace) notFound();
  const t = await getTranslations({ locale, namespace: "meta" });
  const photos = getPhotos(trace.slug);
  const tAlts =
    photos.length > 0
      ? await getTranslations({ locale, namespace: `photoAlts.${trace.slug}` })
      : null;
  return pageMetadata({
    locale,
    path: `/performances/${trace.slug}`,
    title: t("pages.performance.title", { code: trace.code }),
    description: t("pages.performance.description", { code: trace.code }),
    siteName,
    images: photos.map((p) => ({
      url: absoluteAssetUrl(p.image.src),
      width: p.image.width,
      height: p.image.height,
      alt: tAlts ? tAlts(p.altKey) : undefined
    }))
  });
}

export default async function PerformancePage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const trace = getPerformance(slug);
  if (!trace) notFound();

  const t = await getTranslations("performance");
  const tList = await getTranslations("performances");
  const photos = getPhotos(trace.slug);
  const tAlts =
    photos.length > 0 ? await getTranslations(`photoAlts.${trace.slug}`) : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: `${siteName} — ${trace.code}`,
    identifier: trace.code,
    url: canonicalFor(locale, `/performances/${trace.slug}`),
    creator: {
      "@type": "PerformingGroup",
      name: siteName
    },
    locationCreated: {
      "@type": "Place",
      name: "Kyoto, Japan",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Kyoto",
        addressCountry: "JP"
      }
    },
    genre: ["Painting", "Music", "Film", "Photography", "Movement"],
    image: photos.map((p) => absoluteAssetUrl(p.image.src))
  };

  const sections = [
    { key: "setting", numeral: "一" },
    { key: "elements", numeral: "二" },
    { key: "offering", numeral: "三" }
  ] as const;

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <header className="trace-hero">
        <div className="wrap">
          <p className="kicker">{t(`ordinal${trace.ordinal}`)}</p>
          <h1 className="trace-hero__code">
            {trace.code.replaceAll("-", " · ")}
          </h1>
          <dl className="trace-hero__meta">
            <div>
              <dt>{tList("archiveLabel")}</dt>
              <dd>{trace.code}</dd>
            </div>
            <div>
              <dt>{tList("locationLabel")}</dt>
              <dd>{tList("kyoto")}</dd>
            </div>
          </dl>
        </div>
      </header>

      {photos.length > 0 && tAlts && (
        <section className="wrap section" aria-labelledby="photos-title">
          <h2 id="photos-title" className="gallery-title">
            {t("photosTitle")}
          </h2>
          <div
            className={`photo-grid ${photos.length === 1 ? "photo-grid--single" : ""}`}
          >
            {photos.map((photo) => (
              <figure key={photo.frame} className="photo-figure">
                <Image
                  src={photo.image}
                  alt={tAlts(photo.altKey)}
                  sizes="(min-width: 72rem) 34rem, (min-width: 56rem) 45vw, 90vw"
                  placeholder="blur"
                />
                <figcaption>
                  {trace.code} · {photo.frame}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      <div className="wrap section" style={{ paddingBlockStart: photos.length > 0 ? 0 : undefined }}>
        <div className="numbered-sections" style={{ marginBlockStart: 0 }}>
          {sections.map(({ key, numeral }) => (
            <section key={key} className="numbered-section">
              <span className="numbered-section__no" aria-hidden="true">
                {numeral}
              </span>
              <div>
                <h2>{t(`${key}Title`)}</h2>
                <p>{t(key === "elements" ? "elementsLine" : `${key}Body`)}</p>
              </div>
            </section>
          ))}
        </div>

        <div style={{ marginBlockStart: "3.5rem", display: "grid", gap: "2rem" }}>
          <p className="archive-note">{t("archiveNote")}</p>
          <p>
            <Link href="/performances" className="trace-card__link">
              {t("back")}
            </Link>
          </p>
        </div>
      </div>

      <div
        className="wrap"
        aria-hidden="true"
        style={{
          display: "flex",
          justifyContent: "flex-end",
          paddingBlockEnd: "2.5rem"
        }}
      >
        <Seal className="wordmark__seal" />
      </div>
    </article>
  );
}
