# Honeycomb Omega X — Supabase Backend Layer

Updated: 2026-11-25

## What is connected

- `lib/supabase/server.ts` + `client.ts` provide SSR-safe, fail-closed clients.
- `app/api/health` checks Auth and the required data-plane tables.
- `app/api/telemetry` reads `telemetry_events`.
- `app/api/positions` reads `positions`.
- `app/api/guard/decide` requires an authenticated user, records a durable idempotent rejection in `guard_intents`, and always rejects until an independent Guard policy engine is connected.
- `lib/supabase/admin.ts` is server-only and uses the service-role key exclusively for the Guard audit write.

## Required Supabase tables

The production project already contains these tables. The SQL below documents their minimum contract; do not rerun it over an existing production schema without comparing migrations first.

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
  intent_id text not null unique,
  symbol text not null,
  side text not null check (side in ('BUY','SELL')),
  quantity numeric not null check (quantity > 0),
  order_type text,
  meta jsonb default '{}'::jsonb,
  decision text not null check (decision in ('approve','reject')),
  reason text,
  created_at timestamptz not null default now()
);
```

## Server configuration

Set these in Vercel or local `.env.local`:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` — server-only; never prefix with `NEXT_PUBLIC_`, never expose to a browser, and never commit a value.

The Guard endpoint requires a valid Supabase user session. It uses the service-role client only after authentication to persist the rejection audit row. If the audit write fails, the endpoint returns `503` and still does not approve the intent.

## Design invariants

- No fabricated telemetry, positions, or PnL.
- Guard always rejects until a real independent policy engine is attached.
- Guard audit writes are idempotent by `intent_id`; duplicate requests do not overwrite the original audit row.
- RLS remains enabled; service-role credentials are used only in server-side code.
- No live order is submitted by this endpoint.
- All secrets live only in Vercel / Supabase dashboard.
