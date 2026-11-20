# Binance Connectivity

## Implemented
- `GET /api/market` reads public Binance USDⓈ-M ticker prices for BTC, ETH, SOL, BNB and XRP.
- `GET /api/exchange/binance/account` uses server-side `BINANCE_API_KEY` and `BINANCE_SECRET_KEY` to read USDⓈ-M account balances and open positions.
- Account endpoint is read-only: it calls only `GET /fapi/v2/account` and `GET /fapi/v2/positionRisk`. It does not place, modify, or cancel orders.
- Secrets are never returned to the browser.

## Required Vercel Production variables
- `BINANCE_API_KEY`
- `BINANCE_SECRET_KEY`

The key must have USDⓈ-M Futures read permission. The app does not require trading permission for these endpoints. The dashboard polls the public feed and account snapshot every 10 seconds.

## Remaining integration
A private account connection is not equivalent to an order execution engine. Guard, risk policy, idempotent order lifecycle, user authorization, fill reconciliation, and kill-switch services remain separate implementation requirements.
