# Honeycomb Omega X — Quant Control Plane UI

This repository currently contains a **frontend control-plane scaffold**, not a connected autonomous trading system.

## Verified current boundary
- No live market-data adapter is connected to this UI.
- No exchange account, Redis/PostgreSQL telemetry service, agent runtime, independent Guard API or order-execution API is connected.
- Trade actions and command-bar actions are disabled.
- Positions, PnL, latency, fill ratio, agent status and event logs are not fabricated; unavailable values are shown as unavailable.
- No API keys or exchange credentials are collected by the frontend.
- No order is sent by this application.

## UI modules
- Dashboard and service connectivity
- Trade desk (disabled until Guard and Executor APIs exist)
- Positions (empty until venue reconciliation exists)
- Signals and net-edge reference
- Risk policy reference (not active policy state)
- Scout / Cartographer / Judge / Guard / Executor role topology (not connected)
- Execution boundary and release requirements
- Self-healing governance reference
- Event log connection state
- Admin/integration inventory without browser-side secrets
- Deployment/configuration status

## Local development
Requires Node.js compatible with the pinned Next.js 14.2.5 dependency.

    npm install
    npm run typecheck
    npm run build
    npm run dev

The repository currently has no committed package-lock.json. Dependency reproducibility is therefore not certified until a lockfile is generated, reviewed and committed.

## Security and release requirements
Before enabling any command:
1. Connect authenticated APIs through server-side routes only.
2. Keep exchange signing keys in a least-privilege server-side secret manager.
3. Require an independent Guard decision for every order intent.
4. Require short-lived, intent-bound approvals and reject replayed approvals.
5. Reconcile venue acknowledgements, partial fills, cancellations and final positions.
6. Display only telemetry with source timestamp, event ID, service identity and freshness.
7. Add RBAC, CSRF protection, audit persistence, alerting and incident controls.
8. Complete authenticated end-to-end tests before production promotion.

**No live trading, profitability, 24/7 availability or autonomous operation is claimed by this UI repository.**
