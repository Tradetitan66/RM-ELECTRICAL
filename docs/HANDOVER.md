# RM Electrical — Handover

## What was built

A complete, responsive single-page marketing site for RM Electrical
(React + TypeScript + Tailwind + Vite). It includes:

- Sticky dark header with wordmark, nav, Call Now and WhatsApp Quote, plus an
  accessible mobile menu.
- Dark, text-only hero — "ELECTRICAL WORK. MADE SIMPLE." — with call + WhatsApp
  CTAs.
- Six service cards (lighting, sockets & fittings, fuse board replacement,
  testing & inspection, external power, other) using line icons, each opening the
  WhatsApp enquiry popup with its service preselected.
- About section, illustrative lighting feature (clearly captioned as stock,
  not company work), how-enquiries-work steps, service-area/contact block,
  accessible FAQ accordion, dark final CTA and full footer with Nextdoor +
  MyJobQuote profile links.
- Shared WhatsApp enquiry modal (accessible: focus trap, Escape, focus restore,
  scroll lock, reduced-motion aware, inline validation) that prepares a precise
  `wa.me/447972915912?text=…` message. No backend, no storage, nothing sent
  until the visitor taps Continue.
- Fixed mobile bottom action bar (Call / WhatsApp Quote), safe-area aware.
- SEO title, meta description and Electrician JSON-LD; canonical/absolute URLs
  intentionally left for when the real domain is known (see below).

## How to run and preview

```bash
npm install
npm run dev       # local preview at http://localhost:5173
npm run build     # production build (type-check included) -> dist/
npm run preview   # preview the production build
npm run lint      # oxlint
```

Automated checks were run headlessly against the built site before handover
(see `docs/TESTING.md` for the checklist and evidence). A stale Vite dev server
from a previous project was found occupying port 5173 and killed; if an old
server appears again, free the port before running `npm run dev`.

## Where to change business details and assets

- **Business facts, phone, WhatsApp number, coverage, services & logo path:**
  `src/config/business.ts` (single source of truth).
- **Palette and fonts:** `@theme { … }` in `src/index.css`.
- **SEO title/description + structured data:** `index.html`.
- **Photography:** `public/img/` (sources + licences in `docs/IMAGES.md`).
- **Logo:** replace `public/logo-placeholder.svg` (or point `BUSINESS.logo`
  at a new asset). The wordmark text is rendered from `BUSINESS.wordmarkA/B`.

## Important flags before launch

1. **Wordmark is a temporary prototype treatment**, not an official logo.
   No verified logo exists yet. Confirm with the owner before going live.

2. **WhatsApp availability must be confirmed.** The flow sends enquiries to
   `wa.me/447972915912`, but whether that number has an active WhatsApp account
   has not been verified. Test a real message before launch.

3. **Deployment configuration remaining:**
   - Add the canonical URL, `og:url` and the JSON-LD `url` once the real domain
     exists (currently omitted on purpose to avoid a fabricated domain). The
     `og:image` and `twitter:card` tags reference a relative `/img/og-image.webp`
     and must be converted to absolute URLs at the same time.
   - The telephone number matches the Nextdoor listing; the directory address
     (4 Margaret Drive, Alexandria, G83 0ET) is kept internal — only
     "Alexandria, Scotland" is displayed, per the brief.

4. **Nothing unverified is published:** no ratings (the "5/5 from 17 reviews"
   is unverified and excluded), no founding date, no certifications, no prices,
   no fake portfolio, no EM Electrical Solutions content.

## Verified at handover

- Desktop, tablet and mobile layouts render without horizontal overflow.
- All Call actions are `tel:+447972915912`; the visible number is 07972 915912.
- WhatsApp destinations are digits-only (`wa.me/447972915912`).
- Service preselection works per card; generic CTAs preserve form state in memory.
- Required-field errors show inline and focus the first invalid field.
- The message template matches the spec exactly and is correctly URL-encoded
  (ampersands `%26`, line breaks `%0A`, punctuation) — verified programmatically.
- Modal focus trap, Escape close, focus restore and scroll lock all pass.
- Mobile menu, FAQ keyboard operation and mobile action bar pass.
- No console errors, no broken images, production build passes.