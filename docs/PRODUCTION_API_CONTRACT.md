# Honeycomb Omega X — Production API Contract

## Boundary (enforced)

This repository is the **control-plane UI only**.

- No exchange credentials are stored or accepted in the browser.
- No order is ever signed or sent from the frontend.
- All actionable commands require a server-side authenticated route that itself calls the independent Guard service.
- Positions, PnL, latency, fill ratio and agent status are displayed only when a verified telemetry source provides them with timestamp + event_id + service identity.

## Required server-side endpoints (to be implemented in execution-core or gateway)

| Endpoint | Method | Auth | Purpose |
|----------|--------|------|--------|
| `/api/v1/guard/decide` | POST | mTLS + short-lived JWT | Accept or reject order intent |
| `/api/v1/execution/submit` | POST | Guard decision token required | Submit approved intent |
| `/api/v1/positions` | GET | Session | Reconciled venue positions |
| `/api/v1/telemetry/stream` | GET (SSE/WS) | Session | Freshness-checked events |

## UI truthfulness rules (already enforced by scripts/verify-no-demo-data.mjs)

- No Math.random telemetry generators.
- No hardcoded fill-rate / latency / equity numbers.
- No false ONLINE / RESOLVED / GREEN status strings.
- Unavailable values must render as unavailable, never fabricated.

## Production promotion checklist

1. Server routes exist and are covered by integration tests.
2. Guard is independent of the executor.
3. Approval tokens are short-lived and intent-bound.
4. Venue acknowledgements are reconciled.
5. `npm run typecheck && npm run build` passes.
6. `node scripts/verify-no-demo-data.mjs` exits 0.

This document is the single source of truth for UI production readiness.
