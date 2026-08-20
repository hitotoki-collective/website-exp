import { getTranslations } from "next-intl/server";

export default async function Footer() {
  const t = await getTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="wrap site-footer__inner">
        <p className="site-footer__tagline">{t("tagline")}</p>
        <p className="site-footer__origin">{t("origin")}</p>
        <p className="site-footer__rights">{t("rights", { year })}</p>
      </div>
    </footer>
  );
}
