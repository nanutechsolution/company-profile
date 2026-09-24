# Production Checklist — PT Nanu Tech Solution

Audit date: 2026-09-23

## A. Technical readiness

**Status: READY for static export on Hostinger shared hosting.**

- The app builds with `output: "export"`; the deployable artifact is the `out/` folder.
- Upload `out/` to the domain's `public_html`. Do not upload `.next/` and do not run `npm start` on shared hosting.
- `next/image` is set to `unoptimized: true` so images serve as plain static files (no Node image optimizer).
- `NEXT_PUBLIC_SITE_URL` is baked in at **build** time for static export — set it before running `npm run build`.
- Locale middleware (server runtime) is not used on static hosting; the root `index.html` performs the `/` → `/id` redirect instead.
- Localized meta tags still generate per-locale `<title>`/description/canonical/OG tags in the static HTML for `/id` and `/en`.
- The contact form POSTs to `contact.php` and delivers inquiries to `contact@nanutechsolution.com` via Hostinger PHP mail.
- `out/contact.php` must be uploaded to `public_html`; local static preview cannot execute PHP, so delivery must be tested on the deployed domain.
- Hostinger PHP `mail()` must be enabled and the recipient mailbox must exist. Configure SPF, DKIM, and DMARC to reduce spam classification.
- The static build now uses trailing-slash directories (`out/id/index.html`, `out/en/index.html`) for Apache/shared-hosting compatibility.
- `/robots.txt` and `/sitemap.xml` are forced static routes and are generated into `out/`.
- Verify after upload: `/`, `/id`, `/en`, `/icon.png`, `/images/logo-pt.png`, `/robots.txt`, `/sitemap.xml`, `/contact.php`, HTTPS, and no horizontal overflow.

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

The recipient address is configured in `public/contact.php` as `$TO_EMAIL`, not in an environment variable — PHP does not read `.env` files. Do not store SMTP passwords or private credentials in this repository.

## E. Final steps before DNS/domain cutover

1. Replace `NEXT_PUBLIC_SITE_URL` with the verified production domain.
2. Confirm legal/contact/social information and update the locale dictionaries.
3. Decide and document the approved portfolio framing and permissions.
4. Add approved privacy, terms, and data-processing copy.
5. Send one real low-risk test inquiry after deployment and confirm delivery to `contact@nanutechsolution.com`; check spam classification and SPF/DKIM/DMARC alignment.
6. Run `npm run typecheck`, `npm run lint`, and `npm run build` in CI.
7. Test `/id` and `/en` on current mobile and desktop browsers, including keyboard navigation, menu behavior, form validation, metadata, and no horizontal overflow.
8. Verify deployed `robots.txt`, `sitemap.xml`, favicon, canonical/hreflang output, HTTPS, security headers, and domain redirects.
9. Submit the verified sitemap to the chosen search-console provider after DNS and HTTPS are active.
10. Monitor the first production release for 404s, form failures, console errors, and content corrections.
