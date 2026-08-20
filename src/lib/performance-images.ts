import type { StaticImageData } from "next/image";
import img01a from "../../assets/events/01-JP-KYO/01-JP-KYO-0000.jpeg";
import img01b from "../../assets/events/01-JP-KYO/01-JP-KYO-0001.jpeg";
import img02a from "../../assets/events/02-JP-KYO/02-JP-KYO-0000.jpeg";

export type TracePhoto = {
  image: StaticImageData;
  /** Frame number within the trace's photographic record, e.g. "0000" */
  frame: string;
  /** Message key under `photoAlts.<slug>` holding the localized alt text */
  altKey: string;
};

export const photosBySlug: Record<string, TracePhoto[]> = {
  "01-jp-kyo": [
    { image: img01a, frame: "0000", altKey: "p0" },
    { image: img01b, frame: "0001", altKey: "p1" }
  ],
  "02-jp-kyo": [{ image: img02a, frame: "0000", altKey: "p0" }]
};

export function getPhotos(slug: string): TracePhoto[] {
  return photosBySlug[slug] ?? [];
}
