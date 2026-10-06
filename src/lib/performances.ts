export type Performance = {
  /** Archive code, equal to its directory name in the archive, e.g. PRF-01 */
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
    code: "PRF-01",
    slug: "prf-01",
    ordinal: 1,
    country: "JP",
    cityCode: "KYO"
  },
  {
    code: "PRF-02",
    slug: "prf-02",
    ordinal: 2,
    country: "JP",
    cityCode: "KYO"
  }
];

export function getPerformance(slug: string): Performance | undefined {
  return performances.find((p) => p.slug === slug);
}
