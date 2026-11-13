"use client";
export default function Positions() {
  return <div className="space-y-6">
    <div><h1 className="text-xl font-semibold text-white">Positions</h1><p className="mt-1 text-sm text-zinc-500">Venue-reconciled account positions only</p></div>
    <div className="overflow-hidden rounded-xl border border-honeycomb-border"><table className="w-full text-left text-sm"><thead className="bg-honeycomb-panel text-[11px] uppercase tracking-wider text-zinc-500"><tr>{["Symbol","Side","Size","Leverage","Entry","Mark","Unrealized PnL","Venue state"].map(label=><th key={label} className="px-4 py-3">{label}</th>)}</tr></thead><tbody className="bg-honeycomb-bg"><tr><td colSpan={8} className="px-4 py-12 text-center text-sm text-zinc-500">No position data source is connected. Position count and account exposure are unknown, not zero.</td></tr></tbody></table></div>
  </div>;
}
