import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Performance } from "@/lib/performances";
import { getCover } from "@/lib/performance-images";
import Seal from "./Seal";

export default async function TraceCard({ trace }: { trace: Performance }) {
  const tPerf = await getTranslations("performances");
  const tOne = await getTranslations("performance");
  const cover = getCover(trace.slug);
  const tAlts = cover
    ? await getTranslations(`photoAlts.${trace.slug}`)
    : null;

  return (
    <article className="trace-card">
      {cover && tAlts && (
        <div className="trace-card__photo">
          <Image
            src={cover.image}
            alt={tAlts(cover.altKey)}
            sizes="(min-width: 48rem) 50vw, 100vw"
            placeholder="blur"
          />
        </div>
      )}
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
      <Link
        href={`/performances/${trace.slug}`}
        className="trace-card__link"
        aria-label={`${tPerf("viewTrace")} — ${trace.code}`}
      >
        {tPerf("viewTrace")}
      </Link>
    </article>
  );
}
