import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { performances } from "@/lib/performances";
import { pageMetadata } from "@/lib/seo";
import { siteName } from "@/lib/site";
import TraceCard from "@/components/TraceCard";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return pageMetadata({
    locale,
    path: "/performances",
    title: t("pages.performances.title"),
    description: t("pages.performances.description"),
    siteName
  });
}

export default async function PerformancesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("performances");

  return (
    <section className="section">
      <div className="wrap">
        <p className="kicker">{t("kicker")}</p>
        <h1 className="title">{t("title")}</h1>
        <p className="lede" style={{ marginBlockStart: "1rem" }}>
          {t("lede")}
        </p>
        <div className="traces-grid">
          {performances.map((trace) => (
            <TraceCard key={trace.code} trace={trace} />
          ))}
        </div>
      </div>
    </section>
  );
}
