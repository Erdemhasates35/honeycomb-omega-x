# Honeycomb Omega X — Quant Control Plane

Honeycomb Omega X is a deployed Next.js control-plane UI with a live Binance USDⓈ-M public market-data adapter and an authenticated, read-only Binance account adapter. It is **not yet an autonomous or live order-execution system**.

## Verified integration boundary

- `GET /api/market` reads live Binance USDⓈ-M prices for BTCUSDT, ETHUSDT, SOLUSDT, BNBUSDT and XRPUSDT.
- `GET /api/exchange/binance/account` is a server-side signed, read-only integration for USDⓈ-M balances and open positions. It requires a Supabase-authenticated session and server-side Binance credentials.
- The account adapter calls only Binance GET endpoints. It does not place, amend or cancel orders.
- Dashboard refreshes live service snapshots every 10 seconds.
- Trade and command-bar actions remain disabled.
- The Supabase telemetry and positions APIs require the migration in `supabase/migrations/`; the migration file is committed but has not been applied to the configured production project.
- No telemetry, positions, PnL, latency, fill ratio or agent status are fabricated.
- Exchange credentials are never returned to the browser.

## Required production environment

Vercel Production variables:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `BINANCE_API_KEY`
- `BINANCE_SECRET_KEY`

The Binance API key needs USDⓈ-M Futures read permission. No trading permission is used by the account telemetry adapter.

## Supabase schema

Apply the idempotent migration:

`supabase/migrations/20261119000000_honeycomb_core_tables.sql`

It creates `telemetry_events`, `positions`, and `guard_intents`, indexes, grants and authenticated RLS policies. The production migration remains pending until the Supabase project connected to `NEXT_PUBLIC_SUPABASE_URL` is accessible to the deployment operator.

## UI modules

- Dashboard and service connectivity
- Trade desk (disabled until Guard and Executor APIs exist)
- Positions (Supabase-backed after schema migration; Binance read-only account snapshot is shown separately)
- Signals and net-edge reference
- Risk policy reference (not active policy state)
- Scout / Cartographer / Judge / Guard / Executor role topology (not connected)
- Execution boundary and release requirements
- Self-healing governance reference
- Event log connection state
- Admin/integration inventory without browser-side secrets
- Deployment/configuration status

## Local development

Requires Node.js compatible with the Next.js 14.2.5 version range declared in `package.json`.

    npm install
    npm run typecheck
    npm run build
    npm run dev

The repository currently has no committed package-lock.json. Dependency reproducibility is therefore not certified until a lockfile is generated, reviewed and committed.

## Remaining work before live execution

1. Apply the Supabase migration to the configured production project and verify `telemetry_events`, `positions` and `guard_intents`.
2. Complete Supabase sign-in and operator authorization for private exchange views.
3. Implement an independent Guard policy service and authenticated Executor service.
4. Add short-lived, intent-bound approvals and replay protection.
5. Reconcile venue acknowledgements, partial fills, cancellations and final positions.
6. Persist source identity, event ID, timestamp and freshness for every telemetry record.
7. Complete authenticated end-to-end tests before enabling any order command.

**No live trading, profitability, 24/7 availability or autonomous operation is claimed by this repository.**
