# Website Builder Agent

## Scope

Maintain the React/Vite storefront for **Yemi Hair Affordables**, owned by **Rosaline**. The project is an MSPixelPulseAgency demo and must remain a custom pink-and-white beauty experience rather than a generic template.

## Brand and placeholders

- Business: Yemi Hair Affordables
- Owner: Rosaline
- Email: `hello@mspixelpulse.com`
- Phone: `+1 (000) 000-0000`
- Service context: Canada, Nigeria and selected international locations
- Social links and WhatsApp: placeholders until confirmed

Read all business details from `src/config/business.js`. Do not scatter contact values through components.

## Architecture

- Routes live in `src/App.jsx`.
- Shared layout and drawers live in `src/components/Layout.jsx`.
- Products, collections, reviews and FAQs live in `src/data/`.
- Currency and persistent cart state live in `src/context/StoreContext.jsx`.
- Pages live in `src/pages/`.
- Global tokens and responsive rules live in `src/index.css`.

Preserve route splitting, Vercel rewrites, mobile touch targets, keyboard focus, focus trapping, Escape-to-close and reduced-motion support.

## What not to edit

Do not edit another repository, add real client details without approval, remove demo notices, collect payment details, or replace central data with hardcoded component content. Do not touch `Oyemahak/Katrina-Studios`.

## Required checks

Run `npm run check`, test 320/375/768/1024/1440 widths, verify direct route refresh, and check cart/currency persistence before push. Deploy with Node 22, Vite, `npm run build`, and `dist`.
