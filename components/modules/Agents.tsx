"use client";

const agents = [
  "SUPREME SUPERVISOR",
  "Market Intelligence",
  "Technical Analysis",
  "Order Flow",
  "Arbitrage",
  "Funding",
  "Open Interest",
  "Liquidation",
  "Volatility",
  "Statistical",
  "Execution",
  "Position Manager",
  "PnL",
  "Cost",
  "Portfolio",
  "Risk",
  "Security",
  "Anomaly",
  "Backtest",
  "Learning",
  "Audit",
];

export default function Agents() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-white">Master Agents (19+)</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Fast decisions by mathematical engines • LLM only for high-level analysis & self-healing
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {agents.map((a) => (
          <div
            key={a}
            className="flex items-center justify-between rounded-lg border border-honeycomb-border bg-honeycomb-panel px-4 py-3"
          >
            <span className="text-sm text-zinc-200">{a}</span>
            <span className="flex items-center gap-1.5 text-xs text-honeycomb-green">
              <span className="h-1.5 w-1.5 rounded-full bg-honeycomb-green" />
              ONLINE
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}