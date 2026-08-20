import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Enso from "@/components/Enso";

export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <section className="section">
      <div className="wrap" style={{ textAlign: "center" }}>
        <Enso className="hero__enso" />
        <h1 className="title" style={{ marginBlockStart: "2rem" }}>
          {t("title")}
        </h1>
        <p className="lede" style={{ marginInline: "auto", marginBlockStart: "1rem" }}>
          {t("body")}
        </p>
        <p style={{ marginBlockStart: "2.5rem" }}>
          <Link href="/" className="btn">
            {t("back")}
          </Link>
        </p>
      </div>
    </section>
  );
}
