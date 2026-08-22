"use client";

import type { ImageLoaderProps } from "next/image";

/**
 * Static-export image loader: no optimization service exists, so serve the
 * asset exactly as imported (Next has already applied the base path).
 * Images are pre-sized for the web in assets/events/web/.
 */
export default function imageLoader({ src }: ImageLoaderProps): string {
  return src;
}
