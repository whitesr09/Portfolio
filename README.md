# N S H D — Creative Intelligence

A cinematic personal portfolio built around the intersection of **design × AI × code × science**.

## Stack

- Next.js App Router
- React + TypeScript
- Framer Motion
- Lenis smooth scrolling
- Lucide icons
- Responsive CSS visual system

## Edit from your phone

Most content can be changed without touching the visual components:

- `data/projects.ts` — projects, descriptions, tools, case-study chapters and repository links
- `data/site.ts` — name, location and social links
- `components/PortfolioClient.tsx` — homepage sections and archive content
- `app/globals.css` — full luxury visual system

## Add a new project

Duplicate one object in `data/projects.ts`, give it a unique `slug`, and change its content. A case-study route is generated automatically at:

`/work/your-slug`

## Local development

```bash
npm install
npm run dev
```

Production check:

```bash
npm run build
```

## Deploy

Import this repository into Vercel. The default Next.js settings are enough.

After getting your real Vercel/custom domain, replace `https://nshd-portfolio.vercel.app` in:

- `app/layout.tsx`
- `app/sitemap.ts`
- `app/robots.ts`

## Design notes

The site intentionally avoids generic SaaS cards and neon AI aesthetics. Its visual language uses near-black surfaces, warm ivory, restrained champagne-metal accents, editorial scale, molecular/technical motifs, and animation with reduced-motion fallbacks.

### Easter egg

Click the NSHD wordmark five times.
