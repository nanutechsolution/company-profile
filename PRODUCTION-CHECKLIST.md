# Production Checklist — PT Nanu Tech Solution

Audit date: 2026-09-23

## A. Technical readiness

**Status: READY with one non-blocking framework warning.**

- `/`, `/id`, and `/en` routes build successfully.
- Locale-aware metadata, canonical URLs, hreflang alternates, sitemap, robots, and SVG favicon are present.
- TypeScript, ESLint, and production build pass.
- Responsive layout includes mobile navigation and mobile form layout.
- Skip link, focus-visible states, form labels, required fields, consent checkbox, and mobile menu ARIA state are implemented.
- `robots.txt`, `sitemap.xml`, and `icon.svg` return HTTP 200 without locale redirects after middleware exclusion.
- No fake revenue, user counts, employee counts, awards, certifications, partnerships, branches, or security guarantees were found.
- The current Next.js version reports a non-blocking warning that `middleware` will eventually be replaced by `proxy`.

## B. Content readiness

**Status: PARTIALLY READY.**

- Owner-provided professional experience is included: full-stack work at RS Karitas, backend work at PT MBT Yogyakarta, full SIAKAD development for UNMARIS, and news portals at siletsumba.com, highlightntt.com, lionnews.id, and nusaaksaranews.com.
- These items are framed as professional/founder experience, not automatically as official PT Nanu Tech Solution projects.

## C. Needs owner confirmation

Before public launch, confirm and add only verified information:

- Official production domain
- Official company email
- Official WhatsApp/phone number
- Registered legal entity name and any legal identifiers the owner chooses to publish
- Registered or operating address and service region
- Official social media URLs
- Privacy policy, terms of use, and data/cookie notice
- Whether SIAKAD UNMARIS and other listed work may be presented as founder experience, selected work, or official PT projects
- Client permissions, approved logos, testimonials, dates, outcomes, certifications, or partner references
- Final Indonesian copy review by the owner/native reviewer

## D. Environment variables

Required or recommended before deployment:

```env
NEXT_PUBLIC_SITE_URL=https://your-confirmed-domain.example
```

Optional future variables, only when a real delivery provider and server-side handler are implemented:

```env
CONTACT_EMAIL=
CONTACT_PHONE=
CONTACT_FORM_ENDPOINT=
```

Do not put API keys or private credentials in client-side variables. The current form is a local validation/acknowledgement flow and does not claim to deliver email.

## E. Final steps before DNS/domain cutover

1. Replace `NEXT_PUBLIC_SITE_URL` with the verified production domain.
2. Confirm legal/contact/social information and update the locale dictionaries.
3. Decide and document the approved portfolio framing and permissions.
4. Add approved privacy, terms, and data-processing copy.
5. Configure a real server-side contact delivery provider if inquiry delivery is required; add rate limiting, spam protection, logging policy, and failure handling.
6. Run `npm run typecheck`, `npm run lint`, and `npm run build` in CI.
7. Test `/id` and `/en` on current mobile and desktop browsers, including keyboard navigation, menu behavior, form validation, metadata, and no horizontal overflow.
8. Verify deployed `robots.txt`, `sitemap.xml`, favicon, canonical/hreflang output, HTTPS, security headers, and domain redirects.
9. Submit the verified sitemap to the chosen search-console provider after DNS and HTTPS are active.
10. Monitor the first production release for 404s, form failures, console errors, and content corrections.
