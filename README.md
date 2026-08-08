# α-HONEYCOMB OMEGA X∞

**Autonomous Quant Execution Control Plane**  
Corporate-grade modular dashboard for multi-agent trading systems.

## Architecture (Honest)

| Layer | Responsibility | Runtime |
|-------|----------------|---------|
| Control Plane (this repo) | Dashboard, commands, monitoring, risk visualization | Vercel / Next.js |
| Execution Core | WSS, order routing, position management, edge calc | Linux x64 VPS (Go/Rust) |
| State | Redis + PostgreSQL | Managed or VPS |

## Risk State Machine
- **GREEN** → Full auto
- **YELLOW** → Reduced size, still auto
- **ORANGE** → No new positions
- **RED** → Kill-switch / close-only

## Edge Rule
```
Expected Net Profit = Gross − Fees − Funding − Slippage − Spread − Latency − Exec Risk
IF ExpectedNetProfit > MinEdge AND Risk ∈ {GREEN,YELLOW} → EXECUTE
```

## Local Development
```bash
npm install
npm run dev
```

## Production
Deployed on Vercel. Execution Core must run on a separate Linux VPS.

## License
Private / Commercial use intended.
