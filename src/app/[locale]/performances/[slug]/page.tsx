import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { locales } from "@/i18n/routing";
import { getPerformance, performances } from "@/lib/performances";
import { canonicalFor, pageMetadata } from "@/lib/seo";
import { siteName } from "@/lib/site";
import Seal from "@/components/Seal";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    performances.map((p) => ({ locale, slug: p.slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const trace = getPerformance(slug);
  if (!trace) notFound();
  const t = await getTranslations({ locale, namespace: "meta" });
  return pageMetadata({
    locale,
    path: `/performances/${trace.slug}`,
    title: t("pages.performance.title", { code: trace.code }),
    description: t("pages.performance.description", { code: trace.code }),
    siteName
  });
}

export default async function PerformancePage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const trace = getPerformance(slug);
  if (!trace) notFound();

  const t = await getTranslations("performance");
  const tList = await getTranslations("performances");

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
    genre: ["Painting", "Music", "Film", "Photography", "Movement"]
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

      <div className="wrap section">
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
