"use client";

export default function Signals() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-white">Signals & Edge Engine</h1>
        <p className="mt-1 text-sm text-zinc-500">
          5 Decision Engines → Trade Score + Expected Net Profit
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {["Technical", "Order Flow", "Derivatives", "Statistical", "Execution"].map((name) => (
          <div
            key={name}
            className="rounded-xl border border-honeycomb-border bg-honeycomb-panel p-4"
          >
            <div className="text-xs font-medium uppercase tracking-wider text-zinc-500">{name} Engine</div>
            <div className="mt-3 flex items-end justify-between">
              <div className="font-mono text-2xl font-semibold text-white">
                {name === "Execution" ? "+0.19" : (72 + Math.floor(Math.random() * 20))}
              </div>
              <div className="text-xs text-zinc-500">{name === "Execution" ? "Net %" : "Score"}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-honeycomb-border bg-honeycomb-panel p-6">
        <h2 className="mb-4 text-sm font-semibold text-white">Edge Calculation (Canonical)</h2>
        <pre className="overflow-x-auto rounded-lg bg-black/40 p-4 font-mono text-xs leading-relaxed text-zinc-300">
{`EXPECTED_GROSS
− TRADING_FEE
− FUNDING
− EXPECTED_SLIPPAGE
− SPREAD
− LATENCY_COST
− EXECUTION_RISK
= EXPECTED_NET_PROFIT

IF ExpectedNetProfit > MinimumEdge
AND RiskState ∈ {GREEN, YELLOW}
AND Liquidity ≥ MinLiquidity
AND Latency ≤ MaxLatency
THEN EXECUTE
ELSE NO_TRADE`}
        </pre>
      </div>
    </div>
  );
}