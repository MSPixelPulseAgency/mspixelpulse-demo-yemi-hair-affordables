# Website Builder Agent

## Mission

Maintain the live React/Vite storefront for **Yemi Hair Affordables**, selected with care by **Roseline**. The experience serves shoppers in Nigeria, Canada and selected international locations. It must remain a custom editorial beauty storefront—not a generic template.

## Confirmed brand system

- Canonical URL: `https://yemi-hair.vercel.app`
- Owner-supplied logo source: `public/yemi-hair-logo.png`
- Cropped transparent header mark: `public/yemi-hair-mark.png`
- White transparent browser favicon: `public/yemi-hair-favicon.png`
- Owner-supplied About portrait of Roseline: `public/images/editorial/roseline-about.webp`
- Palette: editorial black, white, blush and berry pink
- Typography: Outfit for headings and DM Sans for body copy
- Visual language: restrained liquid glass, rounded editorial imagery, small readable headings and subtle 150–300ms interactions
- Default currency: NGN, with a persistent optional CAD view
- Contact, social and WhatsApp details remain hidden until Roseline supplies confirmed values

Use the approved PNG through the shared `Brand` component in `src/components/Layout.jsx`. Do not redraw, recolour or replace it without owner approval, and do not introduce unrelated or copyrighted brand marks.

## Navigation and responsive behaviour

- Desktop widths show the full text navigation: Home, Shop, Collections, Custom Order, Hair Guide and Blog.
- Tablet/mobile widths use the hamburger drawer with Lucide icons for every route.
- The header is transparent/glassy but is **not sticky** and must scroll away naturally.
- The secondary mobile currency control appears only on shopping routes.
- All controls must remain at least 44px, keyboard accessible and visible at 320px without horizontal overflow.

## Architecture

- Routes: `src/App.jsx`
- Header, drawers, footer and shared brand: `src/components/Layout.jsx`
- Products, collections, reviews, FAQs and blog posts: `src/data/`
- Business/environment configuration: `src/config/business.js`
- Currency, cart and wishlist persistence: `src/context/StoreContext.jsx`
- Page components: `src/pages/`
- Global tokens and responsive rules: `src/index.css`
- SEO helper: `src/components/Seo.jsx`

Preserve lazy route loading, Vercel SPA rewrites, focus trapping, Escape-to-close, visible focus states and reduced-motion/reduced-transparency fallbacks.

## Current pages

- Home with video-led hero, catalogue proof strip, inspiration videos, catalogue sections and custom-order CTA
- Shop, product details and collection routes
- Two-minute custom request form
- Cart, short essential-details checkout and local order-success summary
- About, Hair Guide, FAQ, Contact and policy pages
- The Hair Edit at `/blog`
- Individual researched guides at `/blog/:slug`
- Custom 404

## Honest metrics

The homepage proof strip is derived from confirmed site facts: 18 catalogue styles, 8 displayed collections, 2 display currencies and 1:1 custom-order guidance. Never replace these with invented customer, order, review, award or satisfaction counts. If Roseline later provides a verified metric, record its source before publishing it.

## Do not edit

Do not edit another repository or `Oyemahak/Katrina-Studios`. Do not hardcode business details outside the central configuration, add unsupported shipping/payment promises, collect raw card data, restore an old Vercel domain or remove accessibility behaviour.

## Required checks

Run `npm run check`, inspect 320/375/768/1024/1180/1440 widths, confirm the desktop/mobile navigation switch, test direct blog and product route refreshes, and verify cart/currency persistence. Deploy with Node 22, Vite, `npm run build` and `dist`.
