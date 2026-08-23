import type { StaticImageData } from "next/image";
// Web-sized (1600px) copies; the full-resolution originals remain in
// assets/performances/<CODE>/ as the archive masters.
import img01a from "../../assets/performances/web/01-JP-KYO-0000.jpeg";
import img01b from "../../assets/performances/web/01-JP-KYO-0001.jpeg";
import img02a from "../../assets/performances/web/02-JP-KYO-0000.jpeg";

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

/**
 * Which photo fronts the trace's archive card. 01's portrait canvas crops
 * badly to the card's 3:2 ratio, so its landscape garden shot is used.
 */
const coverIndexBySlug: Record<string, number> = {
  "01-jp-kyo": 1
};

export function getCover(slug: string): TracePhoto | undefined {
  const photos = getPhotos(slug);
  return photos[coverIndexBySlug[slug] ?? 0];
}
