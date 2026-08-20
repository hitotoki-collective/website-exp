/**
 * Canonical site origin. Override with NEXT_PUBLIC_SITE_URL in production
 * (no trailing slash) once the domain is registered.
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.hitotoki.art";

export const siteName = "Hitotoki Collective";
