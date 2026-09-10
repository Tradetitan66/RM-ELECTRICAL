# Testing Notes

Automated checks were run against the site during handover using headless
Chromium (Playwright). This page records what was verified so it can be
re-run quickly.

## Run the checks

Service the app with Vite, then run the scripts:

```bash
npm run dev

# (in another terminal) — example smoke test:
python3 scripts/smoke.py        # view annotated evidence
```

## What passed

### Layout & content
- No horizontal overflow at desktop (1440px) or mobile (390px).
- Title tag: "RM Electrical | Electrician in Alexandria & Balloch".
- All six service cards render with correct headings.
- About section present; no testimonial or "years" claims anywhere.
- The unverified "5/5 from 17 reviews" rating does NOT appear.
- Nextdoor and MyJobQuote profile links present with clear labels.

### Call & WhatsApp flow
- Every call action uses `tel:+447972915912` (≥4 instances checked).
- All WhatsApp destinations use `wa.me/447972915912` (digits only).
- Opening a lighting service card preselects "Lighting installation";
  opening a testing card updates it to "Testing & inspection".
- Generic WhatsApp CTAs preserve previously entered form values across
  open/close within a page session (memory only; no localStorage).
- Invalid submit shows inline errors and moves focus to the first invalid field,
  without navigating away.
- Message structure matches the spec exactly:
  intro, blank line, `Name:` / `Service:` / `Location:` / `Project details:`,
  blank line, closing line.
- The message structure and URL encoding are verified programmatically (newlines
  `%0A`, ampersands `%26`).
- No automatic sending, no "Enquiry sent" / "Booking confirmed" messages.

### Modal & accessibility
- Closes on Escape and reopens cleanly.
- Closed sheet is fully hidden (opacity 0 / off-screen) on every breakpoint —
  no phantom form lingering on desktop or mobile after close.
- Focus trap keeps Tab cycling inside the dialog.
- Focus returns to the triggering control on close.
- Body scroll is locked while open and released on close.
- Mobile action bar hides behind the open modal and remains on top otherwise.
- Mobile menu opens and its WhatsApp button opens the modal.
- FAQ accordion toggles via button and keyboard (Enter/Space, aria-expanded, and
  `aria-controls`/`role=region` panels).
- Reduced-motion preferences are respected (CSS `motion-reduce:` + JS matchMedia).

### Assets & runtime
- About and Lighting imagery all load (naturalWidth > 0) after lazy-load
  scroll-into-view. (Note: two below-the-fold images legitimately only load
  when scrolled near, so immediate-visibility checks on a 390px viewport can
  report them as pending until scrolled.)
- No console errors across full page load + interactions.
- `tsc -b && vite build` passes cleanly; `npm run lint` reports 0 errors
  (a small number of intentional React set-state-in-effect warnings remain for
  the modal's open/close lifecycle sync).

## Known intentional limits
- WhatsApp image attachment is not offered in the form — a prefilled text link
  cannot attach files; visitors add photos inside WhatsApp.
- No fake reviews, no verified-rating display, no fabricated business history.