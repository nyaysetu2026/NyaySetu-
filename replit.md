# NyaySetu — India's Legal Technology Platform

**Tagline:** Justice For Every Citizen

A full-stack legal platform built for every Indian citizen — students, lawyers, judges, NGOs, and beyond.

## Architecture

pnpm monorepo with three artifacts:

| Artifact | Path | Purpose |
|---|---|---|
| `nyaaysetu` | `artifacts/nyaaysetu` | React + Vite frontend |
| `api-server` | `artifacts/api-server` | Express API server |
| `mockup-sandbox` | `artifacts/mockup-sandbox` | Design/component canvas |

Shared libraries under `lib/`:
- `lib/api-spec` — OpenAPI spec + Orval codegen
- `lib/api-client-react` — generated React Query hooks
- `lib/api-zod` — generated Zod validators
- `lib/db` — Drizzle ORM + PostgreSQL schema
- `lib/integrations/integrations-gemini-ai` — Gemini AI wrapper

## Running the App

All three workflows start automatically. To run manually:

```bash
# Install dependencies (once)
pnpm install

# Frontend (Vite dev server)
pnpm --filter @workspace/nyaaysetu run dev

# API server
pnpm --filter @workspace/api-server run dev

# Push DB schema changes
pnpm --filter @workspace/db run push-force
```

## Required Secrets

| Secret | Description |
|---|---|
| `GEMINI_API_KEY` | Google Gemini API key for AI Chat feature |
| `DATABASE_URL` | Auto-provisioned by Replit (PostgreSQL) |
| `SESSION_SECRET` | Session signing secret |

## Tech Stack

- **Frontend:** React 19, Vite, TailwindCSS v4, Radix UI, Framer Motion, TanStack Query, Wouter, Recharts
- **Backend:** Express 5, TypeScript, Pino logger
- **Database:** PostgreSQL via Drizzle ORM
- **AI:** Google Gemini API
- **Payments:** Razorpay (integration-ready)

## User Preferences

- Keep the existing project structure — do not restructure or migrate to a different stack.
