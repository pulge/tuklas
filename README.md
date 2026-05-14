<div align="center">
  <img src="./public/logo.svg" alt="Tuklas Logo" width="120" height="120" />
  <h1>Tuklas</h1>
  <p><i>Self-hosted, offline-first job hunting assistant</i></p>
  <p>
    <img src="https://img.shields.io/badge/Next.js-16-black?logo=next.js" alt="Next.js" />
    <img src="https://img.shields.io/github/languages/top/pulge/tuklas?color=blueviolet" alt="Top Language" />
    <img src="https://img.shields.io/github/repo-size/pulge/tuklas?color=brightgreen" alt="Repo Size" />
  </p>
</div>

---

> *Tuklas* (Filipino, /tuːklɑːs/) — to discover, to uncover, to find.

Tuklas is a self-hosted, offline-first job hunting assistant. Scrape jobs via JSearch, parse email alerts from JobStreet/LinkedIn/Indeed, generate AI cover letters, and track every application — all from your local machine.

---

## Quick Start

```bash
# 1. Clone
git clone https://github.com/pulge/tuklas.git
cd tuklas

# 2. Install
npm install

# 3. Configure
cp .env.example .env
```

Generate an encryption key and add it to `.env`:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

```bash
# 4. Initialize database
npm run db:generate
npm run db:migrate

# 5. Run
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you'll land directly on the Jobs queue.

---

## Architecture

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Database | Local SQLite via libSQL + Drizzle ORM |
| Styling | Tailwind CSS 4 |
| AI | Gemini / OpenRouter (BYOK) |
| Job Data | JSearch API (RapidAPI) |
| Email Parsing | Gmail API (OAuth) |
| Encryption | AES-256-GCM (local) |

All data lives in `~/.tuklas/tuklas.db`. File uploads go to `~/.tuklas/uploads/`.

There is **no authentication layer** — the app runs in single-user local mode. There are **no cloud dependencies** — no Supabase, no Upstash, no external databases.

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `ENCRYPTION_KEY` | **Yes** | 64-char hex string (32 bytes). Encrypts API keys at rest. |
| `ENABLE_DIRECT_SCRAPE` | No | Set `true` to enable direct platform scrapers instead of JSearch. See note below. |

> API keys for JSearch, Gemini, OpenRouter, and Gmail are managed in the UI via the **Integrations** page — no `.env` editing required after initial setup.

### Direct scrape notice

Setting `ENABLE_DIRECT_SCRAPE=true` bypasses JSearch and hits job platforms (JobStreet, Indeed) directly. Check each platform's Terms of Service before enabling this in production. You are responsible for compliance in your jurisdiction.

---

## Features

- **Job Queue** — Review scraped/ingested jobs. Apply, skip, or save.
- **JSearch Scraping** — Fetch jobs from Google for Jobs via the JSearch API (RapidAPI).
- **Email Ingestion** — Parse job alert emails from JobStreet, LinkedIn, Indeed via Gmail + Pub/Sub.
- **AI Cover Letters** — Generate tailored cover letters per job (Gemini or OpenRouter).
- **AI CV Parsing** — Extract and clean resume text from uploaded PDFs.
- **Application Tracker** — Track status from applied → interviewing → offer / rejected.
- **Manual Job Entry** — Add jobs from any platform manually.
- **BYOK** — Bring Your Own Keys for all API integrations via the Integrations page.
- **Extensible Connectors** — Add support for any job platform using the standardized connector template.

---

## Setting Up Gmail Email Ingestion

Tuklas can ingest job alert emails automatically via Gmail API + Google Cloud Pub/Sub. This is optional — JSearch scraping works without it.

1. Create a Google Cloud project and enable the **Gmail API**
2. Create an OAuth 2.0 client (Desktop app type)
3. Set up a Pub/Sub topic and subscription pointed at your local webhook
4. Add your OAuth credentials in the **Integrations** page
5. Follow the in-app **Email Ingestion Setup Guide** for the full walkthrough

---

## Database

Tuklas uses a local SQLite database managed by Drizzle ORM.

**Schema tables:**
- `jobs` — Scraped and manually entered job listings
- `applications` — Application tracking with status history
- `integrations` — Encrypted API keys (AES-256-GCM)
- `profile` — Resume text, keywords, AI prompt preferences
- `cover_letters` — Generated and edited cover letters
- `activity_log` — System activity audit trail

**Commands:**

```bash
npm run db:generate   # Generate migration files from schema changes
npm run db:migrate    # Apply pending migrations
npm run db:studio     # Open Drizzle Studio (visual DB browser)
```

---

## Project Structure

```
app/
├── (dashboard)/        # Main app pages (jobs, applications, setup, integrations, profile)
├── actions/            # Server actions (job, application, AI, integration management)
├── api/                # API routes (scrape, email sync)
└── page.tsx            # Root redirect → /jobs
components/
├── integrations/       # Integration cards and forms
├── layout/             # Sidebar, BottomNav, DashboardShell
├── profile/            # Resume manager, preferences, AI config
├── tracker/            # Job queue and application tables
└── ui/                 # Shared UI primitives
lib/
├── connectors/         # Job platform connectors (JSearch, JobStreet, Indeed, LinkedIn)
├── db/                 # Drizzle client, schema, SQLite repositories
├── encryption.ts       # AES-256-GCM encrypt/decrypt
├── llm.ts              # LLM abstraction (Gemini, OpenRouter)
├── llm-config.ts       # LLM config resolver
└── logger.ts           # Activity logging
```

---

## Troubleshooting

### Out of Memory on `npm run dev`

If Turbopack crashes with OOM errors, switch to Webpack:

```bash
npx next dev --webpack
```

Or update `package.json` permanently:

```json
"dev": "next dev --webpack"
```

### Multiple lockfile warning

If you see a warning about multiple `package-lock.json` files, delete the one outside your project directory:

```powershell
# Windows
Remove-Item ~\package-lock.json

# macOS / Linux
rm ~/package-lock.json
```

### Database not found

If the app errors on first run with a missing database, run migrations:

```bash
npm run db:migrate
```

The database file will be created at `~/.tuklas/tuklas.db` automatically.

---

## Contributing

Tuklas is designed to be extensible. You can contribute new job platform connectors to support more sites.

- **Connectors**: See [CONTRIBUTING.md](./CONTRIBUTING.md#contributing-connectors) for a guide on how to add new platforms using the built-in template.
- **Commit Convention**: We follow [Conventional Commits](https://www.conventionalcommits.org).
- **Guidelines**: See the full [CONTRIBUTING.md](./CONTRIBUTING.md) for branching strategies and PR checklists.

---

## License

[MIT](./LICENSE) — free to use, self-host, fork, and modify. No restrictions.

The hosted product at [tuklas.dev](https://tuklasjobs.vercel.app) is a separate commercial offering.
