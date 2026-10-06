import type { StaticImageData } from "next/image";
// Web-sized (1600px) copies; the full-resolution originals remain in
// assets/performances/<CODE>/ under the archive's own filenames.
import img01a from "../../assets/performances/web/PRF-01-IMG-00.jpeg";
import img01b from "../../assets/performances/web/PRF-01-IMG-01.jpeg";
import img02a from "../../assets/performances/web/PRF-02-IMG-00.jpeg";

export type TracePhoto = {
  image: StaticImageData;
  /** Still number within the trace's photographic record, e.g. "IMG-00" */
  frame: string;
  /** Message key under `photoAlts.<slug>` holding the localized alt text */
  altKey: string;
};

export const photosBySlug: Record<string, TracePhoto[]> = {
  "prf-01": [
    { image: img01a, frame: "IMG-00", altKey: "p0" },
    { image: img01b, frame: "IMG-01", altKey: "p1" }
  ],
  "prf-02": [{ image: img02a, frame: "IMG-00", altKey: "p0" }]
};

export function getPhotos(slug: string): TracePhoto[] {
  return photosBySlug[slug] ?? [];
}

/**
 * Which photo fronts the trace's archive card. 01's portrait canvas crops
 * badly to the card's 3:2 ratio, so its landscape garden shot is used.
 */
const coverIndexBySlug: Record<string, number> = {
  "prf-01": 1
};

export function getCover(slug: string): TracePhoto | undefined {
  const photos = getPhotos(slug);
  return photos[coverIndexBySlug[slug] ?? 0];
}
