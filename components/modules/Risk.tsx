"use client";

const states = [
  {
    name: "GREEN",
    color: "border-honeycomb-green bg-honeycomb-green/10 text-honeycomb-green",
    desc: "Normal risk / spread / liquidity / latency → Full automatic execution, normal size",
  },
  {
    name: "YELLOW",
    color: "border-honeycomb-yellow bg-honeycomb-yellow/10 text-honeycomb-yellow",
    desc: "Volatility↑, spread↑, funding anomaly, latency↑ → Size reduced, still automatic",
  },
  {
    name: "ORANGE",
    color: "border-honeycomb-orange bg-honeycomb-orange/10 text-honeycomb-orange",
    desc: "Exchange instability, data gap, execution mismatch → New positions stopped, manage existing",
  },
  {
    name: "RED",
    color: "border-honeycomb-red bg-honeycomb-red/10 text-honeycomb-red",
    desc: "State corruption, auth anomaly, uncontrolled loss → Kill-switch / close-only mode",
  },
];

export default function Risk() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-white">Risk State Machine</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Professional risk regime control — no per-trade human approval required
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {states.map((s) => (
          <div
            key={s.name}
            className={`rounded-xl border p-5 ${s.color}`}
          >
            <div className="text-lg font-bold tracking-wide">{s.name}</div>
            <p className="mt-2 text-sm opacity-90">{s.desc}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-honeycomb-border bg-honeycomb-panel p-5">
        <h2 className="mb-3 text-sm font-semibold text-white">Current Limits</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 text-sm">
          <div>
            <div className="text-zinc-500">Max Drawdown</div>
            <div className="font-mono text-white">1.00%</div>
          </div>
          <div>
            <div className="text-zinc-500">Max Slippage</div>
            <div className="font-mono text-white">0.50%</div>
          </div>
          <div>
            <div className="text-zinc-500">Daily Loss Cap</div>
            <div className="font-mono text-white">$500</div>
          </div>
          <div>
            <div className="text-zinc-500">Max Leverage</div>
            <div className="font-mono text-white">5x</div>
          </div>
        </div>
      </div>
    </div>
  );
}