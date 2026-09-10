# RM Electrical — Website

A responsive, single-page marketing website for **RM Electrical**, a local electrician
serving Alexandria, Balloch and surrounding areas in Scotland.

Built with **React + TypeScript + Tailwind CSS + Vite**.

## About this project

The site is a real, production-ready implementation: it does **not** include
unverified claims (no reviews rating, no founding date, no certifications, no pricing,
no fake portfolio). Unknown facts are simply left out — nothing is invented.

| Component | Purpose |
| --------- | ------- |
| Header | Sticky dark header with wordmark, nav and desktop CTAs |
| Hero | Dark text-only hero with call + WhatsApp CTA |
| Services | Six line-icon service cards that preselect the WhatsApp form |
| About | Real RM Electrical project photo (client-provided) |
| Lighting feature | Auto-rotating carousel of client-provided RM Electrical project photos |
| How enquiries work | Three-step explanation |
| Service area | Local Google Map embed + contact details |
| FAQs | Accessible accordion |
| Final CTA + Footer | Strong closing contact block |
| WhatsApp modal | Shared enquiry popup that prepares a `wa.me` message |
| Mobile action bar | Fixed bottom Call / WhatsApp bar (safe-area aware) |

## Quick start

```bash
npm install
npm run dev        # dev server at http://localhost:5173
npm run build      # type-check + production build into dist/
npm run preview    # preview the production build
npm run lint       # oxlint check
```

## Where to change content

Everything customer-facing is driven from a single configuration file:

**`src/config/business.ts`**
- `BUSINESS.name`, `contactName`, `phoneDisplay`, `phoneHref`, `whatsappHref`, `area`, `coverage`
- `BUSINESS.logo` — swap the placeholder asset path here for a real logo
- `SERVICES` — the WhatsApp dropdown options

**`src/index.css`**
- `@theme` block — colors (`--color-ink`, `--color-orange`, etc.) and fonts

**`index.html`**
- SEO title, meta description, JSON-LD Electrician structured data

**Images** — `public/img/`, see [docs/IMAGES.md](docs/IMAGES.md) for sources and how to replace.

## Important release notes

1. **Wordmark is a temporary prototype treatment.** No official logo has been verified.
   The `RM ELECTRICAL` text wordmark and `public/logo-placeholder.svg` are placeholders,
   not the business logo. Replace via `BUSINESS.logo` once a genuine asset exists.

2. **WhatsApp availability is NOT yet verified.** `wa.me/447972915912` is used per the
   brief, but the number's WhatsApp profile has not been confirmed. Confirm it works
   before launch.

3. **Directory address.** The listed directory address (4 Margaret Drive, Alexandria,
   G83 0ET) is kept internal only. The site displays "Alexandria, Scotland" as the
   customer-facing location.

4. **Deployment config.** Canonical URL, Open Graph URLs and the JSON-LD `url` field are
   intentionally omitted until the real domain is known. Once deployed, add the absolute
   URL in `index.html` before submitting to search engines.

5. **Ratings.** The unverified "5/5 from 17 reviews" is not published anywhere on the site.

## Notes on implementation

- All WhatsApp CTAs open one shared modal (React context). Service cards preselect the
  matching service; generic buttons preserve the visitor's previously entered details.
- Form values live in memory only — no local/session storage, no analytics, no backend.
  Nothing is transmitted until the visitor taps **Continue to WhatsApp**.
- The modal traps focus, closes on Escape, restores focus to the trigger, locks body
  scroll, respects reduced motion and works with the mobile keyboard open.
- Message text is built with `encodeURIComponent`; the ampersand, line breaks and
  punctuation are encoded correctly and verified by automated tests (`docs/TESTING.md`).
- Imagery: the social preview photo is licensed stock (Unsplash) that is clearly
  **illustrative**, never labelled as RM Electrical's own work. The About and lighting
  feature photos are real RM Electrical projects supplied by the client. See
  [docs/IMAGES.md](docs/IMAGES.md).