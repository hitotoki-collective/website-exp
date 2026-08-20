import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { pageMetadata } from "@/lib/seo";
import { siteName } from "@/lib/site";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return pageMetadata({
    locale,
    path: "/philosophy",
    title: t("pages.philosophy.title"),
    description: t("pages.philosophy.description"),
    siteName
  });
}

const sectionKeys = ["s1", "s2", "s3", "s4"] as const;
const sectionNumerals = ["一", "二", "三", "四"];

export default async function PhilosophyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("philosophy");

  return (
    <article className="section">
      <div className="wrap">
        <p className="kicker">{t("kicker")}</p>
        <h1 className="title">{t("title")}</h1>

        <div className="numbered-sections">
          {sectionKeys.map((key, i) => (
            <section key={key} className="numbered-section">
              <span className="numbered-section__no" aria-hidden="true">
                {sectionNumerals[i]}
              </span>
              <div>
                <h2>{t(`sections.${key}.title`)}</h2>
                <p>{t(`sections.${key}.body`)}</p>
              </div>
            </section>
          ))}
        </div>
      </div>
    </article>
  );
}
