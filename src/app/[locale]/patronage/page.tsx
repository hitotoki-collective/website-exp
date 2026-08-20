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
    path: "/patronage",
    title: t("pages.patronage.title"),
    description: t("pages.patronage.description"),
    siteName
  });
}

const sectionKeys = ["sponsors", "guardians", "correspondence"] as const;
const sectionNumerals = ["一", "二", "三"];

export default async function PatronagePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("patronage");

  return (
    <article className="section">
      <div className="wrap">
        <p className="kicker">{t("kicker")}</p>
        <h1 className="title">{t("title")}</h1>
        <p className="lede" style={{ marginBlockStart: "1rem" }}>
          {t("lede")}
        </p>

        <div className="numbered-sections">
          {sectionKeys.map((key, i) => (
            <section key={key} className="numbered-section">
              <span className="numbered-section__no" aria-hidden="true">
                {sectionNumerals[i]}
              </span>
              <div>
                <h2>{t(`${key}Title`)}</h2>
                <p>{t(`${key}Body`)}</p>
              </div>
            </section>
          ))}
        </div>
      </div>
    </article>
  );
}
