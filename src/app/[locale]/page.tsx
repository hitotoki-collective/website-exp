import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { performances } from "@/lib/performances";
import { pageMetadata } from "@/lib/seo";
import { siteName } from "@/lib/site";
import Enso from "@/components/Enso";
import TraceCard from "@/components/TraceCard";

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
      <section className="hero">
        <p className="hero__vertical" aria-hidden="true">
          一時 — ひととき
        </p>
        <div className="wrap hero__grid">
          <div>
            <p className="kicker">{t("kicker")}</p>
            <h1 className="display">{t("heroTitle")}</h1>
            <p className="lede" style={{ marginBlockStart: "1.75rem" }}>
              {t("heroLede")}
            </p>
            <div className="hero__actions">
              <Link href="/performances" className="btn btn--primary">
                {t("ctaTraces")}
              </Link>
              <Link href="/philosophy" className="btn">
                {t("ctaPhilosophy")}
              </Link>
            </div>
          </div>
          <Enso animated className="hero__enso" />
        </div>
      </section>

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
