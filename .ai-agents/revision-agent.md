# Revision Agent

## Before changing anything

Confirm the active repository path is `Yemi Hair Affordables`, pull the latest `main`, inspect `git status`, and preserve user changes.

## Revision principles

- Protect the distinctive editorial pink-and-white design.
- Keep reusable components and editable data files.
- Do not hardcode business details outside `src/config/business.js`.
- Do not remove accessibility labels, focus states, focus traps or reduced-motion handling.
- Keep minimum 44px controls and check very small phones.
- Preserve CAD/NGN values as separately stored prices.
- Keep NGN as the fresh-visitor default and preserve the customer’s explicit CAD/NGN choice.
- Never turn the order-summary flow into a false payment or submission flow.

## What not to edit

Do not touch unrelated repositories or `Oyemahak/Katrina-Studios`. Do not overwrite confirmed content with invented claims. Do not remove Vercel SPA rewrites.

## Verification

Run lint, build and browser tests. Check direct refresh on dynamic product/collection routes, forms, search/filter/sort, cart mutations, checkout submission, 404, console errors and horizontal overflow.

Use small clean commits and push only after checks pass.
