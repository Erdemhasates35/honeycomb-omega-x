"use client";
export default function Trade() {
  return <div className="space-y-6">
    <div><h1 className="text-xl font-semibold text-white">Trade Desk</h1><p className="mt-1 text-sm text-zinc-500">Order intent interface — submission is unavailable.</p></div>
    <div className="rounded-xl border border-honeycomb-red/30 bg-honeycomb-red/5 p-5">
      <div className="text-sm font-semibold text-honeycomb-red">ALL ORDER ACTIONS DISABLED</div>
      <p className="mt-2 text-sm text-zinc-300">This UI has no connected order API, independent Guard approval, venue adapter, or reconciliation service. Buttons that only write to browser state are not represented as trades.</p>
      <p className="mt-2 text-sm text-zinc-400">No paper or live order can be submitted from this interface.</p>
    </div>
    <div className="grid gap-4 rounded-xl border border-honeycomb-border bg-honeycomb-panel p-6 md:grid-cols-2">
      <div><label className="text-xs text-zinc-500">Execution mode</label><div className="mt-1 rounded-lg bg-honeycomb-bg px-3 py-3 text-sm text-zinc-500">DISABLED — adapter unavailable</div></div>
      <div><label className="text-xs text-zinc-500">Guard authorization</label><div className="mt-1 rounded-lg bg-honeycomb-bg px-3 py-3 text-sm text-zinc-500">NOT AVAILABLE</div></div>
    </div>
  </div>;
}
