# Revision Agent

## Before changing anything

Confirm the active path is `/Users/mahak/Documents/Yemi Hair Affordables`, the remote is `MSPixelPulseAgency/mspixelpulse-demo-yemi-hair-affordables`, the branch is `main`, and the canonical deployment is `https://yemi-hair.vercel.app`. Pull latest, inspect `git status` and preserve user changes.

## Decisions to preserve

- The desktop header uses a full text navigation; no desktop hamburger.
- The hamburger drawer is only for tablet/mobile and each menu item uses a Lucide icon.
- The header is glassy but non-sticky and scrolls away normally.
- Mobile shopping routes show a separate, uncropped NGN/CAD control; content routes do not.
- `public/yemi-hair-logo.png` is the untouched owner-supplied source; `public/yemi-hair-mark.png` is the cropped transparent header mark; `public/yemi-hair-favicon.png` is the white transparent dark-tab favicon; `public/images/editorial/roseline-about.webp` is Roseline’s optimized owner-supplied About portrait.
- NGN is the fresh-visitor default and an explicit CAD/NGN choice persists.
- Primary shopping and content pages use local Pexels-sourced videos through `src/components/LoopingVideo.jsx`, with controls and reduced-motion handling.
- Keep `/custom-order` and `/checkout` short. Do not restore the former six-step custom-order wizard or request full address/payment details before follow-up.
- The proof strip uses catalogue/service facts, never invented customer counts.
- Blog content lives centrally in `src/data/blogPosts.js` and routes through `/blog/:slug`.
- Footer spacing and three-column link structure must remain deliberate and responsive.

## Revision principles

- Protect the editorial pink, white and black identity.
- Keep readable type sizes and avoid oversized headings.
- Preserve reusable components and data files.
- Do not hardcode business details outside `src/config/business.js`.
- Keep 44px controls, labels, focus traps, visible focus states and descriptive alt text.
- Keep CAD and NGN prices separately stored.
- Never turn the order-summary flow into a false payment or submission flow.
- Use restrained 150–300ms transitions and respect reduced motion/transparency.

## What not to edit

Do not touch unrelated repositories or `Oyemahak/Katrina-Studios`. Do not overwrite confirmed content with invented claims, restore the removed old Vercel URL, remove Vercel SPA rewrites, redraw the approved logo or replace Lucide navigation icons with emojis.

## Verification

Run lint, build and browser tests. Check 320/375/768/1024/1180/1440 widths, header mode changes, blog index/articles, logo rendering, mobile overflow, direct route refreshes, search/filter/sort, cart mutations, checkout summary, 404 and console errors. Use a small clean commit and push only after checks pass.
