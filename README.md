# Yemi Hair Affordables

A polished, responsive ecommerce catalogue and editorial hair guide for Yemi Hair Affordables. The site presents wigs and human-hair styles for customers in Nigeria, Canada and selected international locations, with NGN shown by default and an optional CAD view.

## Tech stack

- React 18
- Vite 6
- React Router
- Lucide React icons
- Plain CSS with shared design tokens
- Browser `localStorage` for currency, cart, wishlist and order-summary persistence

## Local development

Use Node.js 22:

```bash
nvm use
npm install
npm run dev
```

## Quality commands

```bash
npm run lint
npm run build
npm run check
npm run preview
```

The production output is written to `dist/`.

## Routes

- `/` — editorial home page
- `/shop` — searchable, sortable and filterable catalogue
- `/shop/:slug` — product details and variations
- `/collections` and `/collections/:slug`
- `/custom-order` — six-step custom request
- `/cart`, `/checkout`, `/order-success`
- `/about`, `/hair-guide`, `/faq`, `/contact`
- `/blog` — The Hair Edit article index
- `/blog/:slug` — researched Nigeria/Canada trend and care articles
- `/privacy`, `/terms`, `/shipping-returns`
- custom catch-all 404

Vercel SPA rewrites are defined in `vercel.json`, so every route works after a direct refresh.

## Environment variables

Copy `.env.example` to `.env.local`:

```env
VITE_SITE_URL=https://yemi-hair.vercel.app
VITE_BUSINESS_EMAIL=
VITE_BUSINESS_PHONE=
VITE_WHATSAPP_NUMBER=
VITE_INSTAGRAM_URL=
VITE_TIKTOK_URL=
VITE_FACEBOOK_URL=
VITE_ORDER_EMAIL_ENDPOINT=
VITE_ENABLE_EMAIL_ORDERS=false
VITE_ENABLE_WHATSAPP_ORDERS=true
```

Never commit secrets. Only publish contact details confirmed by the business. `VITE_WHATSAPP_NUMBER` should use an international number; the app removes formatting when building a `wa.me` link.

## Updating products and prices

Edit `src/data/products.js`.

- Keep slugs unique.
- Store `priceCAD` and `priceNGN` explicitly.
- Do not derive one currency from the other.
- Keep at least two image paths for card crossfades.
- Update category and collection slugs carefully because routes depend on them.
- Confirm availability, processing times and product claims with Rosaline.

## Updating The Hair Edit

Edit `src/data/blogPosts.js`.

- Keep slugs and meta descriptions unique.
- Use an ISO publication date, descriptive local image/alt text and useful internal links.
- Research time-sensitive trend claims before revising them.
- Write original summaries and retain direct source links.
- Never invent customer counts, satisfaction rates or medical claims.

## Brand assets and navigation

The approved flowing-hair logo supplied by the owner lives at `public/yemi-hair-logo.png` and is also used as the browser icon.

- Desktop uses the full text navigation.
- Tablet and mobile use an icon-led drawer.
- The glass header is intentionally non-sticky.
- The mobile currency bar only appears on shopping-related routes.

## Updating business details

Business and integration settings live in `src/config/business.js`. Public contact and social values are supplied through environment variables and stay hidden when not configured.

Do not add a home address, private contact detail or unsupported business claim.

## Updating images

Add optimized WebP or AVIF files under `public/images/`. Use descriptive filenames, meaningful alt text and fixed image dimensions/aspect ratios.

Pexels sources are listed in `public/images/IMAGE_CREDITS.md`. The photography represents hairstyle, texture and finish references and may not depict the exact item supplied.

## How order summaries work

Checkout validates customer and delivery information, creates a reference such as `YHA-2026-1048`, stores the summary locally, and prepares a copyable message.

The storefront:

- does not charge a card;
- does not store card or banking information;
- does not promise fulfilment;
- enables one-tap WhatsApp handoff only after a confirmed number is configured.

Connect a protected backend or form service before accepting automatic submissions. Keep private API keys server-side.

## Future payment integration

The interface can support Stripe for CAD and Paystack or Flutterwave for NGN. Do not add raw card fields directly to this frontend. Use the provider’s hosted or secure embedded checkout and approve policy content before enabling payment.

## Deployment

Vercel settings:

- Framework: Vite
- Root Directory: `./`
- Install Command: `npm install`
- Build Command: `npm run build`
- Output Directory: `dist`
- Node.js: 22.x
- Production URL: `https://yemi-hair.vercel.app`

Keep `VITE_SITE_URL`, `public/robots.txt` and `public/sitemap.xml` aligned with the production URL.

## Maintenance

Read all five files in `.ai-agents/` before AI-assisted edits. Preserve the centralized data/config architecture, accessibility behaviour, honest order-summary flow, blog sourcing, retired-domain rule, SPA rewrite and responsive design system.
