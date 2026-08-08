"use client";

import { TrendingUp, TrendingDown, Activity, Shield } from "lucide-react";

const kpi = [
  { label: "EQUITY", value: "$48,250.00", change: "+2.4%", up: true },
  { label: "REALIZED PnL", value: "+$1,842.30", change: "Today", up: true },
  { label: "UNREALIZED PnL", value: "+$312.80", change: "Open", up: true },
  { label: "NET PnL", value: "+$2,155.10", change: "Fees deducted", up: true },
  { label: "FEES", value: "-$186.40", change: "Today", up: false },
  { label: "FUNDING", value: "-$42.15", change: "Today", up: false },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-white">Control Plane</h1>
        <p className="mt-1 text-sm text-zinc-500">
          α-HONEYCOMB OMEGA X∞ • Live overview • All modules operational
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
        {kpi.map((k) => (
          <div
            key={k.label}
            className="rounded-xl border border-honeycomb-border bg-honeycomb-panel p-4"
          >
            <div className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">
              {k.label}
            </div>
            <div className="mt-2 font-mono text-lg font-semibold text-white">{k.value}</div>
            <div
              className={`mt-1 flex items-center gap-1 text-xs ${
                k.up ? "text-honeycomb-green" : "text-honeycomb-red"
              }`}
            >
              {k.up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
              {k.change}
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-xl border border-honeycomb-border bg-honeycomb-panel p-5 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white">Edge Engine Snapshot</h2>
            <span className="rounded-full bg-honeycomb-green/10 px-2.5 py-0.5 text-[10px] font-medium text-honeycomb-green">
              POSITIVE EDGE
            </span>
          </div>
          <div className="space-y-3 font-mono text-sm">
            <div className="flex justify-between text-zinc-400">
              <span>Gross Spread</span>
              <span className="text-honeycomb-green">+0.42%</span>
            </div>
            <div className="flex justify-between text-zinc-400">
              <span>Trading Fees</span>
              <span className="text-honeycomb-red">−0.10%</span>
            </div>
            <div className="flex justify-between text-zinc-400">
              <span>Funding</span>
              <span className="text-honeycomb-red">−0.04%</span>
            </div>
            <div className="flex justify-between text-zinc-400">
              <span>Expected Slippage</span>
              <span className="text-honeycomb-red">−0.06%</span>
            </div>
            <div className="flex justify-between text-zinc-400">
              <span>Latency Cost</span>
              <span className="text-honeycomb-red">−0.03%</span>
            </div>
            <div className="border-t border-honeycomb-border pt-3 flex justify-between font-semibold">
              <span className="text-white">Expected Net Profit</span>
              <span className="text-honeycomb-green">+0.19%</span>
            </div>
          </div>
          <p className="mt-4 text-xs text-zinc-500">
            Rule: IF ExpectedNetProfit &gt; MinimumEdge AND RiskState ∈ {'{GREEN, YELLOW}'} → EXECUTE
          </p>
        </div>

        <div className="rounded-xl border border-honeycomb-border bg-honeycomb-panel p-5">
          <h2 className="mb-4 text-sm font-semibold text-white">System Health</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-honeycomb-green" />
                <span className="text-sm text-zinc-300">Agents Online</span>
              </div>
              <span className="font-mono text-sm text-white">19 / 19</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-honeycomb-green" />
                <span className="text-sm text-zinc-300">Risk State</span>
              </div>
              <span className="rounded bg-honeycomb-green/15 px-2 py-0.5 text-xs font-semibold text-honeycomb-green">
                GREEN
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-300">Fill Rate (24h)</span>
              <span className="font-mono text-sm text-white">98.7%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-300">Avg Latency</span>
              <span className="font-mono text-sm text-white">11.4 ms</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-300">Self-Healing Events</span>
              <span className="font-mono text-sm text-white">3 resolved</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}