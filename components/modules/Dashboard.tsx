"use client";
const metrics = ["Equity", "Realized PnL", "Unrealized PnL", "Net PnL", "Fees", "Funding"];
const services = [["Market data","NOT CONNECTED"],["Exchange accounts","NOT CONNECTED"],["Risk service","NOT CONNECTED"],["Execution service","DISABLED"],["Agent runtime","NOT CONNECTED"],["Telemetry store","NOT CONNECTED"]];
export default function Dashboard() {
  return <div className="space-y-6">
    <div><h1 className="text-xl font-semibold text-white">Control Plane</h1><p className="mt-1 text-sm text-zinc-400">Monitoring interface scaffold. No authenticated market, account, risk, or execution feed is connected.</p></div>
    <div className="rounded-xl border border-honeycomb-yellow/30 bg-honeycomb-yellow/5 p-4"><div className="text-sm font-semibold text-honeycomb-yellow">NO LIVE DATA — EXECUTION DISABLED</div><p className="mt-1 text-sm text-zinc-400">Metrics are withheld until a verified telemetry source provides timestamps, provenance, and health state.</p></div>
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">{metrics.map(label=><div key={label} className="rounded-xl border border-honeycomb-border bg-honeycomb-panel p-4"><div className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">{label}</div><div className="mt-2 font-mono text-xl font-semibold text-zinc-500">—</div><div className="mt-1 text-xs text-zinc-600">No verified source</div></div>)}</div>
    <div className="rounded-xl border border-honeycomb-border bg-honeycomb-panel p-5"><h2 className="mb-4 text-sm font-semibold text-white">Service Connectivity</h2><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{services.map(([name,status])=><div key={name} className="flex items-center justify-between rounded-lg bg-honeycomb-bg px-4 py-3"><span className="text-sm text-zinc-300">{name}</span><span className="text-xs font-semibold text-zinc-500">{status}</span></div>)}</div></div>
  </div>;
}
