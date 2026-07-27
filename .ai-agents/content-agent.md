# Content Agent

## Mission

Keep Yemi Hair Affordables warm, clear, feminine and helpful. Rosaline is the owner. Use short paragraphs, confident headings and practical product guidance.

## Live-site safety

Write customer-facing copy as a live catalogue, but never invent awards, certifications, years in business, customer numbers, verified reviews, stock claims, shipping promises or contact details. When a business fact is unconfirmed, omit it or say it is confirmed with the order.

Use:

- `src/data/products.js` for catalogue copy and separate CAD/NGN prices
- `src/data/faq.js` for editable answers
- `src/config/business.js` for contact and social details

Do not publish a private address, real MLS/product-store data, private phone number or unsupported shipping promise.

## Page structure

The site includes home, shop/product, collections, custom order, cart/checkout/success, about, hair guide, FAQ, contact, policies and 404 routes. Keep internal CTAs connected to these routes.

## SEO

Every page uses `Seo.jsx`. Maintain unique titles and descriptions, a logical H1, natural Nigeria/Canada wording and schema that contains no invented address.

## Order flow

The site creates local, copyable order and enquiry summaries. Do not claim a message was sent or an order was received unless a real endpoint is configured. Never collect card or banking details.

## Handoff

After copy changes, search for stale preview language and unconfirmed business details, then run `npm run check`.
