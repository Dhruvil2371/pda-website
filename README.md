# Purvang Doshi & Associates — Website

Marketing site for **Purvang Doshi & Associates, Chartered Accountants** (Mahesana, Gujarat).
Built with **Next.js 16 (App Router)** and **TypeScript**.
Enquiries are emailed to the admin inbox; on servers with disk they are also stored in **SQLite** as an audit trail.

- **Phone:** +91 63544 90042
- **Email:** babusheth123@gmail.com

## Stack

- Next.js 16 · React 19 · TypeScript
- Nodemailer (SMTP) — email notification to admin
- SQLite (`better-sqlite3`) — optional audit log (skipped automatically on serverless)
- SEO: per-page `<Metadata>`, `sitemap.xml`, `robots.txt`, Organization JSON-LD, semantic HTML

## Pages

`/` · `/services` · `/industries` · `/about` · `/team` · `/resources` · `/insights` · `/careers` · `/contact`

## Local setup

```bash
npm install
cp .env.example .env.local     # fill in SMTP + admin email
npm run dev                    # http://localhost:3000
```

For a production build locally:

```bash
npm run build
npm run start
```

## Getting the Gmail App Password (for babusheth123@gmail.com)

Gmail no longer allows plain-password SMTP. You need a 16-character App Password:

1. Turn on **2-Step Verification**: https://myaccount.google.com/signinoptions/two-step-verification
2. Create an App Password: https://myaccount.google.com/apppasswords
   - App: "Mail", Device: "Other (Custom name)" — call it "Purvang Doshi Website"
3. Copy the 16-character password Google shows you. Paste it as `SMTP_PASS` (no spaces).

## Deploy to Vercel (recommended — free tier is enough)

Vercel is the fastest path for Next.js. In your project folder:

```bash
npx vercel login       # opens browser, sign in with GitHub / Google
npx vercel             # first-time setup — accept the defaults
npx vercel --prod      # deploy to production
```

Then set environment variables in the Vercel dashboard (Project → Settings → Environment Variables):

| Variable                | Value                                              |
| ----------------------- | -------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`  | `https://your-vercel-url.vercel.app` (or your custom domain) |
| `ADMIN_EMAIL`           | `babusheth123@gmail.com`                           |
| `SMTP_HOST`             | `smtp.gmail.com`                                   |
| `SMTP_PORT`             | `587`                                              |
| `SMTP_SECURE`           | `false`                                            |
| `SMTP_USER`             | `babusheth123@gmail.com`                           |
| `SMTP_PASS`             | your 16-char Gmail app password                    |
| `SMTP_FROM`             | `Purvang Doshi Website <babusheth123@gmail.com>`   |

After setting env vars, redeploy: `npx vercel --prod`.

**About the audit log on Vercel:** Vercel serverless functions don't have a persistent disk, so the SQLite audit log is automatically skipped. Emails to `ADMIN_EMAIL` are the single source of truth for enquiries. If you later want an audit log on Vercel, swap the SQLite call for [Turso](https://turso.tech) or Vercel Postgres — the code already isolates DB writes in `src/lib/db.ts`.

### Custom domain

In Vercel: Project → Settings → Domains → Add. Vercel guides you through the CNAME / A-record setup. Once mapped, update `NEXT_PUBLIC_SITE_URL` to the custom domain and redeploy so canonical URLs, sitemap and JSON-LD use it.

## Deploy to Netlify (alternative)

```bash
npm install -g netlify-cli
netlify login
netlify init                      # follow prompts, "Yes" to create a new site
netlify env:set NEXT_PUBLIC_SITE_URL "https://your-site.netlify.app"
netlify env:set ADMIN_EMAIL "babusheth123@gmail.com"
netlify env:set SMTP_HOST "smtp.gmail.com"
netlify env:set SMTP_PORT "587"
netlify env:set SMTP_SECURE "false"
netlify env:set SMTP_USER "babusheth123@gmail.com"
netlify env:set SMTP_PASS "your-gmail-app-password"
netlify env:set SMTP_FROM "Purvang Doshi Website <babusheth123@gmail.com>"
netlify deploy --build --prod
```

## Deploy where SQLite persists (Railway / Render / Fly.io)

These hosts give you a real disk, so the audit log survives across requests.

**Railway** (simplest): push your repo to GitHub, then https://railway.app → "New Project → Deploy from GitHub". It auto-detects Next.js. Add the same env vars in the Variables tab. Attach a Volume mounted at `/app/data` for SQLite persistence.

## Enquiry flow (admin review by email)

1. Visitor submits the form on `/` or `/contact` (or opens the sticky WhatsApp button).
2. `POST /api/enquiry` validates + rate-limits + tries to persist to SQLite (skipped on serverless).
3. A notification email is sent to `ADMIN_EMAIL` (with `Reply-To` set to the visitor's email — just reply and it goes straight to them).
4. If SMTP fails and SQLite is available, the failure reason is stored in the `email_error` column.

**Anti-spam** built in:
- Server-side field validation (name, phone, email)
- Hidden honeypot field (`website`)
- Per-IP rate limit: 5 submissions / 10 minutes

## Environment variables

See [`.env.example`](.env.example).

## SEO checklist

- [x] Server-rendered pages, semantic HTML (`<main>`, `<section>`, `<article>`, `<nav>`)
- [x] Unique `<title>` and `meta description` per page
- [x] Canonical URLs
- [x] Open Graph + Twitter card meta
- [x] `sitemap.xml` (auto at `/sitemap.xml`)
- [x] `robots.txt` (auto at `/robots.txt`)
- [x] Organization + AccountingService JSON-LD
- [x] Preconnect + swap Google Fonts
- [x] Mobile-first responsive layout
- [x] Skip-to-content link, focus rings for a11y
- [x] Image `alt` text on every image
