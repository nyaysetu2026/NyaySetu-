# NyaySetu — AI-Powered Legal Platform for India

## Project Overview

NyaySetu ("Justice Bridge") is a premium AI-powered legal assistance platform for Indian citizens. It helps with filing complaints, finding lawyers, accessing legal documents, knowing fundamental rights, and getting instant AI-driven legal guidance.

## Stack

- **Frontend**: React 19 + Vite + Tailwind CSS v4 + Framer Motion (pnpm workspace `@workspace/nyaaysetu`)
- **Backend**: Express 5 + Drizzle ORM + Gemini AI (`@workspace/api-server`, port 8080)
- **Monorepo**: pnpm workspaces at `artifacts/`, `lib/`

## Running Locally

```bash
pnpm install

# Start everything (runs both frontend + API)
# Frontend: http://localhost:3000
# API:      http://localhost:8080
```

Use the Replit **Project** workflow button to start both services simultaneously.

## Architecture

```
artifacts/
  nyaaysetu/        — React/Vite frontend (port 3000)
  api-server/       — Express API (port 8080)
  mockup-sandbox/   — Design mockup previews
lib/
  api-spec/         — OpenAPI spec + codegen
  api-client-react/ — Generated React Query hooks
  api-zod/          — Zod validation schemas
  db/               — Drizzle ORM schema + migrations
  integrations/     — External service integrations
  integrations-gemini-ai/ — Gemini AI helper
```

## Key Pages & Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Main landing + dashboard |
| `/ai-chat` | AIChat | AI Legal Assistant chat |
| `/cases` | Cases | File/track complaints |
| `/lawyers` | Lawyers | Find verified lawyers |
| `/documents` | Documents | Legal document templates |
| `/rights` | Rights | Know your rights |
| `/dashboard` | Dashboard | Citizen dashboard |
| `/emergency` | Emergency | 24×7 emergency help |

## Design System

- **Colors**: Deep navy background (`hsl(222 47% 7%)`), rich gold accent (`#d4af37`), royal blue secondary (`#3b82f6`)
- **Typography**: Playfair Display (serif headings) + Inter (UI)
- **Style**: Glassmorphism cards, cinematic lighting, gold glow effects, India flag motifs
- **Animations**: Framer Motion page transitions, CSS keyframe particles, waving Indian flag

## Environment Secrets

- `SESSION_SECRET` — Required for cookie-based sessions in the API server

## User Preferences

- Keep all 20 feature cards visible — first 6 prominently, remaining 14 in a secondary grid
- Maintain all "Coming Soon" labels for unimplemented features
- Dark premium aesthetic with Indian national theme throughout
- All existing routes and components must be preserved
