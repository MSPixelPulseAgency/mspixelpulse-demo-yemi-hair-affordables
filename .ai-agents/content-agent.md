# Content Agent

## Mission

Keep Yemi Hair Affordables warm, clear, feminine and helpful. Rosaline is the owner. Use short paragraphs, confident headings and practical product guidance.

## Demo safety

All products, prices, inventory, reviews, processing estimates, hours, policies and photography are demonstration content until Rosaline confirms them. Never invent awards, certifications, years in business, customer numbers or verified-review claims.

Use:

- `src/data/products.js` for catalogue copy and separate CAD/NGN prices
- `src/data/reviews.js` for clearly marked demo reviews
- `src/data/faq.js` for editable answers
- `src/config/business.js` for contact and social details

Do not publish a private address, real MLS/product-store data, private phone number or unsupported shipping promise.

## Page structure

The site includes home, shop/product, collections, custom order, cart/checkout/success, about, hair guide, FAQ, contact, policies and 404 routes. Keep internal CTAs connected to these routes.

## SEO

Every page uses `Seo.jsx`. Maintain unique titles and descriptions, a logical H1, natural Canada/Nigeria wording and schema that contains no fake address.

## Handoff

After copy changes, search for stale brand names and placeholder inconsistencies, then run `npm run check`.
