export type Performance = {
  /** Archive code, e.g. 01-JP-KYO */
  code: string;
  /** URL slug */
  slug: string;
  /** Ordinal within the archive, 1-based */
  ordinal: number;
  /** ISO 3166 country code */
  country: "JP";
  /** City code used in the archive */
  cityCode: "KYO";
};

export const performances: Performance[] = [
  {
    code: "01-JP-KYO",
    slug: "01-jp-kyo",
    ordinal: 1,
    country: "JP",
    cityCode: "KYO"
  },
  {
    code: "02-JP-KYO",
    slug: "02-jp-kyo",
    ordinal: 2,
    country: "JP",
    cityCode: "KYO"
  }
];

export function getPerformance(slug: string): Performance | undefined {
  return performances.find((p) => p.slug === slug);
}
