# auzaniman.github.io

Portfolio of Auzan, full-stack engineer & tech lead (Yogyakarta). Bilingual (ID/EN), static, deployed to GitHub Pages.

## Stack

- Next.js 15 (App Router, static export) + TypeScript
- Tailwind CSS v4 with theme tokens in `src/app/globals.css` (dark "control room" + light "paper")
- Motion (modal, card layout), GSAP + ScrollTrigger (scroll reveals, marquee), Lenis (smooth scroll)
- Embla Carousel (swipeable screen gallery), Radix Dialog (accessible modal), next-themes

## Content

Project data and screenshots are generated, then committed:

```bash
npm run content   # reads ../portfolio-assets (catalog.json, screens/*) -> src/content/projects.json + public/work/*.webp
npm run og        # renders public/og.png
```

All screenshots come from apps running locally with fictional sample data.

## Develop

```bash
npm ci
npm run dev       # http://localhost:3000/id/
npm run build     # static site in out/
```

Pushing to `main` runs `.github/workflows/deploy.yml` (lint, typecheck, build, deploy to Pages).
Pages source must be set to "GitHub Actions" in the repository settings.

## Structure

- `src/app/[locale]/` — home and `work/[slug]` pages, metadata, JSON-LD
- `src/components/` — sections, gallery, project modal
- `src/content/site.ts` — copy (ID/EN) and profile data
- `scripts/` — content and OG image builders
