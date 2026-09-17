import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/**
 * The site is fully static and deploys to GitHub Pages via `output: "export"`.
 * NEXT_PUBLIC_BASE_PATH ("/website-exp" on Pages) prefixes routes and assets when
 * the site is served from a sub-path; leave it unset for a root domain.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || undefined;

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
  basePath,
  images: {
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts"
  }
};

export default withNextIntl(nextConfig);
