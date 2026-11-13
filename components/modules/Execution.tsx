"use client";
export default function Execution() {
  return <div className="space-y-6">
    <div><h1 className="text-xl font-semibold text-white">Execution Core</h1><p className="mt-1 text-sm text-zinc-500">Venue order routing and position reconciliation status</p></div>
    <div className="rounded-xl border border-honeycomb-red/30 bg-honeycomb-red/5 p-5"><div className="text-sm font-semibold text-honeycomb-red">EXECUTION DISABLED</div><p className="mt-2 text-sm leading-relaxed text-zinc-300">No verified venue adapter, independent Guard approval endpoint, or order/fill reconciliation feed is connected. No order can be submitted from this control plane.</p></div>
    <div className="grid gap-4 md:grid-cols-3">{["Acknowledgement latency","Fill ratio","Realized slippage"].map(label=><div key={label} className="rounded-xl border border-honeycomb-border bg-honeycomb-panel p-5"><div className="text-xs uppercase tracking-wider text-zinc-500">{label}</div><div className="mt-2 font-mono text-2xl text-zinc-500">—</div><div className="mt-1 text-xs text-zinc-600">No venue receipts</div></div>)}</div>
    <div className="rounded-xl border border-honeycomb-border bg-honeycomb-panel p-5"><h2 className="mb-2 text-sm font-semibold text-white">Release requirements</h2><ul className="list-disc space-y-1 pl-5 text-sm text-zinc-400"><li>Independent, fail-closed Guard service</li><li>Short-lived, intent-bound approval</li><li>Venue acknowledgement and fill reconciliation</li><li>Idempotency, cancel/replace, timeout and recovery controls</li></ul></div>
  </div>;
}
