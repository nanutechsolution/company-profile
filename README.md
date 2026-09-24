# PT Nanu Tech Solution

Bilingual company profile website for PT Nanu Tech Solution. Indonesian is the default language (`/id`) and English is available at `/en`.

## Run locally

```bash
npm install
npm run dev
```

Validation commands:

```bash
npm run lint
npm run typecheck
npm run build
```

## Deploy to Hostinger shared hosting

This project is configured for a static export, which is the compatible option for Hostinger shared hosting without a Node.js process.

1. Set the confirmed production domain in `.env.local` or the Hostinger build environment:

   ```env
   NEXT_PUBLIC_SITE_URL=https://your-confirmed-domain.example
   ```

2. Build locally or in CI:

   ```bash
   npm ci
   npm run typecheck
   npm run lint
   npm run build:hostinger
   ```

3. Upload the generated files to the domain's `public_html` directory. Confirm `contact.php` was uploaded too — it is required for the contact form.
4. Enable HTTPS and verify `/`, `/id`, `/en`, `/robots.txt`, `/sitemap.xml`, `/icon.png`, `/images/logo-pt.png`, and `/contact.php`.
5. Configure the domain's preferred HTTPS redirect in Hostinger if it is not already enabled.

## Contact form email delivery

The form POSTs to `/contact.php`, a PHP endpoint on Hostinger that sends inquiries to `contact@nanutechsolution.com`. To change the recipient, edit `$TO_EMAIL` in `public/contact.php` and rebuild/upload.

Hostinger requirements:

- PHP must be enabled for the domain (PHP `mail()` must be allowed).
- The domain must have a real mailbox; configure SPF, DKIM, and DMARC in Hostinger to reduce spam classification.
- If Hostinger disables `mail()`, switch the endpoint to an authenticated SMTP connection with credentials stored only on the host, never in this repository.
- PHP cannot be executed by a local static preview — test delivery on the deployed domain.

## Auto-deploy to Hostinger (GitHub Actions)

The repo includes `.github/workflows/deploy.yml`. On every push to `main`, GitHub Actions runs typecheck, lint, and the static build, then uploads the generated site files directly to Hostinger `public_html` over SFTP.

Configure these repository secrets at **GitHub → Settings → Secrets and variables → Actions**:

| Secret | Value |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | `https://nanutechsolution.com` |
| `SFTP_HOST` | Your Hostinger SFTP host, e.g. `srv123.hostinger.com` (hPanel → Advanced → SSH Access) |
| `SFTP_USER` | Your SFTP username, e.g. `u123456789` |
| `SFTP_PASSWORD` | Your SFTP/hosting password |
| `SFTP_PORT` | Optional, defaults to `22` |
| `SFTP_REMOTE_PATH` | Optional, defaults to `/home/<SFTP_USER>/public_html` |
| `SFTP_PRIVATE_KEY` | Optional alternative to `SFTP_PASSWORD`: a private key whose public half is added in hPanel → Advanced → SSH Access |

Notes:

- Deploy triggers on push to `main`. You can also run it manually from the **Actions** tab.
- The workflow fails fast if a secret is missing, so a broken site is never uploaded.
- It uses upload-and-overwrite, never deletes `public_html`, so any file you add on the host (`.htaccess`, other mail accounts) stays untouched.
- The smoke test expects `GET /contact.php` to return `405` (method not allowed) and all page/asset routes to return `200`.
- Hostinger's SFTP and SSH are available on Business/Cloud plans. The Single plan has no SSH/SFTP — use manual File Manager uploads instead.

Manual alternative:

```bash
npm ci && npm run typecheck && npm run lint && npm run build:hostinger
# then upload the generated site files to public_html
```

## Owner-provided professional experience

The profile includes owner-provided experience framed as professional/founder experience:

- Full-stack development at RS Karitas
- Backend development at PT MBT Yogyakarta
- Full SIAKAD development for UNMARIS
- News portals: siletsumba.com, highlightntt.com, lionnews.id, and nusaaksaranews.com

These are not automatically presented as official PT Nanu Tech Solution projects. Confirm the relationship, publication permission, and any brand/logo usage before launch.


The site intentionally avoids inventing corporate information. Update the following only when verified:

- Official production domain
- Registered legal entity details, address, and service area
- Social media URLs
- Privacy policy, terms, and cookie/data notice
- Approved portfolio descriptions, client permissions, outcomes, testimonials, and certifications

The official inquiry email is now `contact@nanutechsolution.com`. Selected work is described neutrally unless separately approved.
