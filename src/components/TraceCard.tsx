import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Performance } from "@/lib/performances";
import Seal from "./Seal";

export default async function TraceCard({ trace }: { trace: Performance }) {
  const tPerf = await getTranslations("performances");
  const tOne = await getTranslations("performance");

  return (
    <article className="trace-card">
      <Seal className="trace-card__seal" />
      <p className="trace-card__code" aria-label={`${tPerf("archiveLabel")}: ${trace.code}`}>
        {trace.code.replaceAll("-", " · ")}
      </p>
      <dl className="trace-card__meta">
        <dt>{tPerf("archiveLabel")}</dt>
        <dd>{tOne(`ordinal${trace.ordinal}`)}</dd>
        <dt>{tPerf("locationLabel")}</dt>
        <dd>{tPerf("kyoto")}</dd>
      </dl>
      <Link href={`/performances/${trace.slug}`} className="trace-card__link">
        {tPerf("viewTrace")}
      </Link>
    </article>
  );
}
