# Honeycomb Omega X — Supabase Backend Layer

Updated: 2026-11-18

## What was added

- `lib/supabase/server.ts` + `client.ts` (SSR-safe, fail-closed if env missing)
- `app/api/health` — connectivity probe
- `app/api/telemetry` — reads `telemetry_events` table (empty if table missing)
- `app/api/positions` — reads `positions` table (empty if table missing)
- `app/api/guard/decide` — fail-closed Guard stub (always rejects until real policy is connected)
- `.env.example` with required variable names only

## Required Supabase tables (create in Supabase SQL editor)

```sql
create table if not exists telemetry_events (
  id uuid primary key default gen_random_uuid(),
  event_id text not null,
  source text not null,
  level text not null check (level in ('info','warn','error','system')),
  message text not null,
  created_at timestamptz not null default now(),
  meta jsonb default '{}'::jsonb
);

create table if not exists positions (
  id uuid primary key default gen_random_uuid(),
  symbol text not null,
  side text not null check (side in ('LONG','SHORT')),
  size numeric not null,
  entry_price numeric not null,
  mark_price numeric,
  unrealized_pnl numeric,
  updated_at timestamptz not null default now(),
  source text not null
);

create table if not exists guard_intents (
  id uuid primary key default gen_random_uuid(),
  intent_id text not null,
  symbol text not null,
  side text not null,
  quantity numeric not null,
  order_type text,
  meta jsonb default '{}'::jsonb,
  decision text not null,
  reason text,
  created_at timestamptz not null default now()
);
```

Enable RLS and add policies appropriate to your auth model.

## Operator steps (no Termux required)

1. Create a Supabase project.
2. Run the SQL above.
3. In Vercel (or local `.env.local`) set:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
4. Deploy / restart.
5. `GET /api/health` must return `"status": "connected"`.

## Design invariants

- No fabricated telemetry, positions, or PnL.
- Guard always rejects until a real independent policy engine is attached.
- Service-role key is optional and never sent to the browser.
- All secrets live only in Vercel / Supabase dashboard.
