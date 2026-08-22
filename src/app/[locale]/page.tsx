import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { performances } from "@/lib/performances";
import { pageMetadata } from "@/lib/seo";
import { siteName } from "@/lib/site";
import TraceCard from "@/components/TraceCard";
import VideoHero from "@/components/VideoHero";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return pageMetadata({
    locale,
    path: "/",
    title: t("pages.home.title"),
    description: t("pages.home.description"),
    siteName
  });
}

const elementKeys = [
  "painting",
  "music",
  "film",
  "photography",
  "movement"
] as const;

const elementNumerals = ["一", "二", "三", "四", "五"];

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");

  return (
    <>
      <VideoHero />

      <section className="section" aria-labelledby="elements-title">
        <div className="wrap">
          <h2 id="elements-title" className="title" style={{ marginBlockEnd: "2.5rem" }}>
            {t("elementsTitle")}
          </h2>
        </div>
        <div className="wrap">
          <ul className="elements" style={{ listStyle: "none" }}>
            {elementKeys.map((key, i) => (
              <li key={key} className="element">
                <span className="element__index" aria-hidden="true">
                  {elementNumerals[i]}
                </span>
                <h3>{t(`elements.${key}.name`)}</h3>
                <p>{t(`elements.${key}.line`)}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="traces-title">
        <div className="wrap">
          <h2 id="traces-title" className="title">
            {t("tracesTitle")}
          </h2>
          <p className="lede" style={{ marginBlockStart: "1rem" }}>
            {t("tracesLede")}
          </p>
          <div className="traces-grid">
            {performances.map((trace) => (
              <TraceCard key={trace.code} trace={trace} />
            ))}
          </div>
          <p style={{ marginBlockStart: "2.5rem" }}>
            <Link href="/performances" className="trace-card__link">
              {t("viewAll")}
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
