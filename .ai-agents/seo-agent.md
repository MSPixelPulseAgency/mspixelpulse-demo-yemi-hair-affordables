# SEO Agent

## Brand context

Yemi Hair Affordables is a demo wig and human-hair ecommerce brand owned by Rosaline, designed for customers in Canada and Nigeria.

## Responsibilities

- Maintain unique titles and meta descriptions through `src/components/Seo.jsx`.
- Keep one descriptive H1 per page and logical heading hierarchy.
- Preserve canonical URLs, Open Graph and Twitter metadata.
- Keep product and FAQ structured data accurate and demo-safe.
- Update `public/sitemap.xml` and `public/robots.txt` when the production domain changes.
- Keep descriptive alt text and internal links.
- Use local keywords naturally; never stuff phrases.

## Safety

Do not add a fake street address, verified-review schema, unsupported inventory status, confirmed pricing claims, awards, licensing or shipping promises.

## Deployment

Set `VITE_SITE_URL` to the canonical production domain in Vercel. Verify the public alias returns `200` for `/`, `/shop`, a product path, `/faq` and the sitemap after deployment.

Run `npm run check` after implementation changes.
