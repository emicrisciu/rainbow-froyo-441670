# AGENTS.md — World Cup 2026 Score Predictor

## Overview

A 3-player World Cup 2026 score prediction game with automatic leaderboard. Built with TanStack Start (React SSR framework) deployed on Netlify with a managed Postgres database.

## Key Directories

```
src/
  routes/           TanStack Router file-based routes
    index.tsx       Main SPA — all UI tabs in one file
    api/
      data.ts       GET all data (players, matches, predictions)
      init.ts       POST seed database on first load
      predictions.ts POST save/update a prediction
      players.ts    GET/PUT player names and colors
      matches/
        result.ts   POST set actual match result
  lib/
    scoring.ts      Scoring logic + shared TypeScript types
  data/
    matches.ts      Static seed data: all 104 WC 2026 matches
db/
  schema.ts         Drizzle ORM schema (players, matches, predictions tables)
  index.ts          Drizzle client initialization via @netlify/database
drizzle.config.ts   Drizzle Kit config — migrations → netlify/database/migrations/
netlify/database/migrations/  Auto-applied SQL migrations
```

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | TanStack Start |
| Frontend | React 19, TanStack Router v1 |
| Build | Vite 7 |
| Styling | Tailwind CSS 4 |
| Database | Netlify Database (Postgres) + Drizzle ORM beta |
| Language | TypeScript |
| Deployment | Netlify |

## Architecture Decisions

- **Single-page SPA with server API routes**: The entire UI lives in `src/routes/index.tsx` (tab-based). API routes live in `src/routes/api/`. TanStack Start handles both.
- **Database seeding via `/api/init`**: On every page load, the frontend calls `POST /api/init` which seeds the database if empty. This is idempotent.
- **No auth**: This is a private game for 3 known players. Players are seeded at init time with default names, customizable in Settings tab.
- **Drizzle @beta**: Required for Netlify Database adapter. Always use `drizzle-orm@beta` and `drizzle-kit@beta`.
- **Scoring is client-side**: `src/lib/scoring.ts` computes leaderboard in the browser from raw data fetched from `/api/data`.

## Coding Conventions

- TypeScript throughout
- No auth/middleware — all routes are public (admin is just a UI tab)
- All API responses use `Response.json()`
- Tailwind CSS utility classes for all styling (dark green football theme)
- Romanian language UI

## Scoring System

- Exact score → 10 points
- Correct winner or correct draw prediction (wrong score) → 5 points
- Wrong prediction → 0 points

## Modifying Match Data

Edit `src/data/matches.ts` to change teams, dates, or add/remove matches. After editing, the new data only affects fresh database instances. To re-seed an existing DB, clear the `matches` table manually and redeploy.

## Schema Changes

1. Edit `db/schema.ts`
2. Run `npx drizzle-kit generate`
3. Deploy — migrations apply automatically
