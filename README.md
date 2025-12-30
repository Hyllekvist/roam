# Roam (MVP)

High-end, mobile-first Next.js app scaffold for Roam.

## Stack
- Next.js App Router
- Supabase (Auth + Postgres + RLS)
- Vercel deployment

## What’s intentionally **NOT** here yet
- Real discover algo (RPC placeholder)
- Real-time chat (placeholder)
- Payments, moderation, device verification

## Local setup
1) Install deps
```bash
pnpm i
```
2) Create `.env.local` based on `.env.example`
3) Run
```bash
pnpm dev
```

## Supabase setup
Run migrations in `supabase/migrations/` in order.

### Tables
- `profiles` (username mapping + minimal fields)
- `matches` (mutual connections)
- `messages` (chat messages)
- `after_feedback` (private, non-public signals)

## Security baseline
- Protected routes enforced by `middleware.ts`
- RLS required for all tables
- No public rating / no public score endpoints

## Design tokens
`src/styles/tokens.css`

