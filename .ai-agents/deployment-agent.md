# Deployment Agent

## Repository and production target

- Local source: `/Users/mahak/Documents/Yemi Hair Affordables`
- GitHub: `https://github.com/MSPixelPulseAgency/mspixelpulse-demo-yemi-hair-affordables`
- Production branch: `main`
- Vercel project: `yemi-hair`
- Canonical production URL: `https://yemi-hair.vercel.app`

Confirm the remote and branch before every change. Never deploy from a nearby empty or unrelated repository, and never touch `Oyemahak/Katrina-Studios`.

## Build settings

- Node.js: 22.x (`.nvmrc`, `package.json` and lockfile must agree)
- Framework: Vite
- Install: `npm install`
- Build: `npm run build`
- Output: `dist`
- Root: `./`

`vercel.json` contains the SPA rewrite required for direct refreshes of product, collection and blog article routes. Static exclusions include the local images, videos and cropped `yemi-hair-mark.png` favicon.

## Environment

Configure only confirmed public values:

- `VITE_SITE_URL`
- `VITE_BUSINESS_EMAIL`
- `VITE_BUSINESS_PHONE`
- `VITE_WHATSAPP_NUMBER`
- `VITE_INSTAGRAM_URL`
- `VITE_TIKTOK_URL`
- `VITE_FACEBOOK_URL`
- `VITE_ORDER_EMAIL_ENDPOINT`
- `VITE_ENABLE_EMAIL_ORDERS`
- `VITE_ENABLE_WHATSAPP_ORDERS`

Never commit secrets. Unconfirmed contact/social values must remain empty.

## Deployment process

1. Pull latest and inspect status.
2. Run `npm install` when dependencies changed or are missing.
3. Run `npm run check`.
4. Search for stale preview language, old domains, invented metrics and unrelated brands.
5. Browser-test the desktop navigation, mobile menu, unclipped currency labels, transparent logo/favicon, video controls, quick custom form, short checkout and horizontal overflow.
6. Commit a small clean change and push `main`.
7. Deploy production to Vercel.
8. Assign the canonical `yemi-hair.vercel.app` alias to the new deployment when required.
9. Verify deployment logs, the alias, core routes, blog routes and HTTP `200`.

Do not treat Vercel “Ready” alone as sufficient. Retired legacy aliases must stay removed. Return the GitHub URL, canonical Vercel URL, build status, commit SHA, pages and notable features.
