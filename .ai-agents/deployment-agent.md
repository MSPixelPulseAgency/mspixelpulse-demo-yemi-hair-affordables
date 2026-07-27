# Deployment Agent

## Repository and branch

This demo must live in its own MSPixelPulseAgency GitHub repository. Confirm the remote and active branch before edits. Never deploy from a nearby empty or unrelated repository.

## Build settings

- Node.js: 22.x (`.nvmrc`, `package.json` and lockfile must agree)
- Framework: Vite
- Install: `npm install`
- Build: `npm run build`
- Output: `dist`
- Root: `./`

`vercel.json` contains the SPA rewrite required for direct route refresh.

## Environment

Configure only confirmed values:

- `VITE_SITE_URL`
- `VITE_ORDER_EMAIL_ENDPOINT`
- `VITE_WHATSAPP_NUMBER`
- `VITE_ENABLE_EMAIL_ORDERS`
- `VITE_ENABLE_WHATSAPP_ORDERS`

Never commit secrets.

## Deployment process

1. Pull latest and inspect status.
2. Run `npm install`.
3. Run `npm run check`.
4. Search for old demo/brand references.
5. Commit a small clean change and push `main`.
6. Deploy production to Vercel.
7. Verify deployment logs, the public alias, core routes and an HTTP `200`.

Do not treat a Vercel “Ready” label alone as final verification. Return the GitHub URL, Vercel production URL, build status and commit SHA.
