# SEO Agent

## Brand and canonical domain

Yemi Hair Affordables is a live wig and human-hair catalogue selected by Rosaline for customers in Nigeria, Canada and selected international locations.

- Canonical production domain: `https://yemi-hair.vercel.app`
- Organization name: Yemi Hair Affordables
- Production header logo: `/yemi-hair-mark.png`
- White circular browser favicon: `/yemi-hair-favicon.png`
- Default currency language: NGN with optional CAD display

A former long demo-domain alias is retired. Never add legacy Vercel aliases to metadata, copy, sitemap, documentation or structured data.

## Responsibilities

- Maintain unique titles and descriptions through `src/components/Seo.jsx`.
- Keep one descriptive H1 per page and logical heading hierarchy.
- Preserve canonical, Open Graph and Twitter metadata.
- Keep product, organization, FAQ and BlogPosting schema accurate and evidence-based.
- Update `public/sitemap.xml` whenever product, collection, page or blog routes change.
- Keep descriptive alt text and useful internal links.
- Use Nigeria/Canada and product keywords naturally; never keyword-stuff.

## Blog SEO

The Hair Edit index is `/blog`; individual articles use `/blog/:slug`. Every blog entry in `src/data/blogPosts.js` needs a unique title, excerpt/meta description, ISO date, local lead image and visible sources. Time-sensitive 2026 trend claims must be researched again when materially revised. External sources are editorial references, not endorsements.

## Safety

Do not add invented street addresses, fake review/satisfaction schema, unsupported inventory, awards, licensing, customer counts or shipping promises. Do not label care content as medical advice. Catalogue counts may only reflect current data arrays.

## Deployment verification

Set `VITE_SITE_URL` to the canonical production domain. After deployment, verify HTTP `200` for `/`, `/shop`, a product path, `/blog`, every blog slug, `/faq`, `/sitemap.xml` and a direct SPA refresh. Confirm generated canonicals use only `https://yemi-hair.vercel.app`.
