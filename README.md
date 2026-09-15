# Hitotoki Art Collective Website

An experimental website of the Hitotoki Collective, an art project born in Switzerland, bred in Japan and coming of age everywhere.

## Documentation

### Conceptual

The project concept is documented [here](./docs/concept/index.md).

### Technical

The technical requirements are documented [here](./docs/technical/index.md).

## Implementation

A statically generated [Next.js](https://nextjs.org) (React + TypeScript) site.

- **i18n** — six locales (`en`, `ja`, `fr`, `ar`, `es`, `zh`) via [next-intl](https://next-intl.dev), with locale-prefixed routes (`/en/...`), right-to-left layout for Arabic, and per-locale typefaces (Cormorant Garamond / EB Garamond, Shippori Mincho, Noto Serif SC, Amiri).
- **SEO** — per-page localized metadata, canonical URLs, `hreflang` alternates (+ `x-default`), Open Graph tags, `sitemap.xml` and `robots.txt` route handlers, and Schema.org JSON-LD (`PerformingGroup`, `CreativeWork` per trace).
- **AI optimisation** — [`public/llms.txt`](./public/llms.txt) summarises the project and site map for language-model crawlers; semantic HTML and structured data throughout.
- **Accessibility** — landmarks, skip link, visible focus styles, `prefers-reduced-motion` support, decorative art hidden from assistive technology, light and dark themes via `prefers-color-scheme`.
- **Design** — sumi ink on washi paper: a hand-drawn ensō, a vermilion hankō seal bearing 一時, kanji-numbered sections, and generous ma (negative space). No CSS framework; hand-written custom properties in [`src/app/globals.css`](./src/app/globals.css).

### Structure

```
src/
  app/[locale]/           pages (home, philosophy, performances, patronage, 404)
  app/sitemap.ts          sitemap with per-locale alternates
  app/robots.ts           robots.txt
  components/             Header, Footer, LocaleSwitcher, Enso, Seal, TraceCard
  i18n/                   locale routing and next-intl config
  lib/performances.ts     the archive of traces (add new performances here)
  messages/<locale>.json  all copy, one catalog per locale
```

### Develop

```bash
npm install
npm run dev
```

### Build

```bash
npm run build
npm start
```

### Configuration

Set `NEXT_PUBLIC_SITE_URL` (no trailing slash) to the production origin once the
domain is registered; it defaults to `https://www.hitotoki.art` in
[`src/lib/site.ts`](./src/lib/site.ts) and is used for canonical URLs, hreflang
alternates, the sitemap and robots.txt.

### Adding a trace

1. Add the performance to [`src/lib/performances.ts`](./src/lib/performances.ts).
2. The archive pages, sitemap and structured data pick it up automatically.

Note: the performance video masters (multi-GB) are kept outside this repository
(see `../hitotoki/performances/`); the site references traces by archive code only.
