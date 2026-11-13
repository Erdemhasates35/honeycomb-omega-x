"use client";
const engines=["Technical","Order Flow","Derivatives","Statistical","Execution"];
export default function Signals() {
  return <div className="space-y-6">
    <div><h1 className="text-xl font-semibold text-white">Signals & Edge Engine</h1><p className="mt-1 text-sm text-zinc-500">Signal and edge values require timestamped live market inputs.</p></div>
    <div className="rounded-xl border border-honeycomb-yellow/30 bg-honeycomb-yellow/5 p-4"><div className="text-sm font-semibold text-honeycomb-yellow">NO VERIFIED SIGNALS</div><p className="mt-1 text-sm text-zinc-400">No engine score or expected net profit is shown until source data, fees, spread, slippage and latency inputs are verified.</p></div>
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">{engines.map(name=><div key={name} className="rounded-xl border border-honeycomb-border bg-honeycomb-panel p-4"><div className="text-xs font-medium uppercase tracking-wider text-zinc-500">{name} engine</div><div className="mt-3 font-mono text-2xl text-zinc-500">—</div><div className="text-xs text-zinc-600">NO DATA</div></div>)}</div>
    <div className="rounded-xl border border-honeycomb-border bg-honeycomb-panel p-6"><h2 className="mb-4 text-sm font-semibold text-white">Canonical net-edge definition</h2><pre className="overflow-x-auto rounded-lg bg-black/40 p-4 font-mono text-xs leading-relaxed text-zinc-300">EXPECTED GROSS EDGE{"\n"}− TRADING FEES{"\n"}− FUNDING{"\n"}− EXPECTED SLIPPAGE{"\n"}− SPREAD COST{"\n"}− LATENCY COST{"\n"}− EXECUTION RISK{"\n"}= EXPECTED NET EDGE{"\n\n"}A positive estimate is only a proposal.{"\n"}A separate Guard approval is required before any execution.</pre></div>
  </div>;
}
