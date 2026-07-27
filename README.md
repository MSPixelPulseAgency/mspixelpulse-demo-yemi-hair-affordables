# Yemi Hair Affordables

A polished, responsive ecommerce demo for Yemi Hair Affordables, owned by Rosaline. The site presents affordable wigs and human-hair styles to customers in Canada and Nigeria with separate CAD and NGN demo pricing.

> All product names, prices, availability, reviews, photography and shipping estimates are demo content. Rosaline must confirm them before commercial launch.

## Tech stack

- React 18
- Vite 6
- React Router
- Lucide React icons
- Plain CSS with shared design tokens
- Browser `localStorage` for demo currency, cart, wishlist and order-request persistence

## Local development

Use Node.js 22:

```bash
nvm use
npm install
npm run dev
```

Open the local URL printed by Vite.

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
- `/privacy`, `/terms`, `/shipping-returns`
- custom catch-all 404

Vercel SPA rewrites are defined in `vercel.json`, so every route works after a direct refresh.

## Environment variables

Copy `.env.example` to `.env.local`:

```env
VITE_SITE_URL=
VITE_ORDER_EMAIL_ENDPOINT=
VITE_WHATSAPP_NUMBER=
VITE_ENABLE_EMAIL_ORDERS=false
VITE_ENABLE_WHATSAPP_ORDERS=true
```

Never commit secrets. `VITE_WHATSAPP_NUMBER` should use an international number; the app removes formatting when building a `wa.me` link.

## Updating products and prices

Edit `src/data/products.js`.

- Keep slugs unique.
- Store `priceCAD` and `priceNGN` explicitly.
- Do not derive one currency from the other.
- Keep at least two image paths for card crossfades.
- Update category and collection slugs carefully because routes depend on them.
- Confirm availability, processing times and all claims with Rosaline.

## Updating business details

Edit `src/config/business.js`. Name, owner, email, phone, social links, service note, currencies and integration flags are centralized there.

The current email and phone are MSPixelPulse demo placeholders:

- `hello@mspixelpulse.com`
- `+1 (000) 000-0000`

Do not add a home address or private contact detail.

## Updating images

Add optimized WebP or AVIF files under `public/images/`. Use descriptive filenames, meaningful alt text and fixed image dimensions/aspect ratios.

Temporary Pexels sources are listed in `public/images/IMAGE_CREDITS.md`. Replace the owner placeholder with Rosaline’s approved portrait before launch.

## How order requests work

Checkout validates customer and delivery information, creates a reference such as `YHA-2026-1048`, stores a demonstration order locally, and prepares a formatted message.

The demo:

- does not charge a card;
- does not store card or banking information;
- does not promise fulfilment;
- does not send email unless a secure endpoint is added;
- enables WhatsApp handoff only after a confirmed number is configured.

For live orders, connect a protected backend or form service. Keep private API keys server-side.

## Future payment integration

The interface is ready to add Stripe for CAD and Paystack or Flutterwave for NGN. Do not add card fields directly to this frontend. Use the provider’s hosted or secure embedded checkout and confirm legal/policy content before enabling payment.

## Deployment

Vercel settings:

- Framework: Vite
- Root Directory: `./`
- Install Command: `npm install`
- Build Command: `npm run build`
- Output Directory: `dist`
- Node.js: 22.x

Set `VITE_SITE_URL` to the final production domain, then update `public/robots.txt` and `public/sitemap.xml` if the alias differs from the current placeholder.

## Maintenance

Read `.ai-agents/` before AI-assisted edits. Preserve the centralized data/config architecture, demo-safety notices, accessibility behaviour, local SPA rewrite and responsive design system.
