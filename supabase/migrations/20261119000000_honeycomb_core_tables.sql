-- Honeycomb Omega X core persistence schema.
-- Apply to the Supabase project configured by NEXT_PUBLIC_SUPABASE_URL.

create table if not exists public.telemetry_events (
  id uuid primary key default gen_random_uuid(),
  event_id text not null,
  source text not null,
  level text not null check (level in ('info', 'warn', 'error', 'system')),
  message text not null,
  created_at timestamptz not null default now(),
  meta jsonb default '{}'::jsonb
);

create table if not exists public.positions (
  id uuid primary key default gen_random_uuid(),
  symbol text not null,
  side text not null check (side in ('LONG', 'SHORT')),
  size numeric not null,
  entry_price numeric not null,
  mark_price numeric,
  unrealized_pnl numeric,
  updated_at timestamptz not null default now(),
  source text not null
);

create table if not exists public.guard_intents (
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

create index if not exists telemetry_events_created_at_idx
  on public.telemetry_events (created_at desc);
create index if not exists telemetry_events_event_id_idx
  on public.telemetry_events (event_id);
create index if not exists positions_symbol_updated_at_idx
  on public.positions (symbol, updated_at desc);
create index if not exists guard_intents_intent_id_idx
  on public.guard_intents (intent_id);

alter table public.telemetry_events enable row level security;
alter table public.positions enable row level security;
alter table public.guard_intents enable row level security;

revoke all on public.telemetry_events, public.positions, public.guard_intents
  from public, anon, authenticated;

grant select on public.telemetry_events, public.positions to authenticated;
grant select, insert on public.guard_intents to authenticated;

drop policy if exists telemetry_events_authenticated_read on public.telemetry_events;
create policy telemetry_events_authenticated_read
  on public.telemetry_events for select to authenticated
  using (auth.uid() is not null);

drop policy if exists positions_authenticated_read on public.positions;
create policy positions_authenticated_read
  on public.positions for select to authenticated
  using (auth.uid() is not null);

drop policy if exists guard_intents_authenticated_read on public.guard_intents;
create policy guard_intents_authenticated_read
  on public.guard_intents for select to authenticated
  using (auth.uid() is not null);

drop policy if exists guard_intents_authenticated_insert on public.guard_intents;
create policy guard_intents_authenticated_insert
  on public.guard_intents for insert to authenticated
  with check (auth.uid() is not null);
