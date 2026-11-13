"use client";
const commands=["BUY","SELL","CLOSE","REDUCE","PAUSE","RESUME","CLOSE-ONLY","KILL-SWITCH"];
export default function CommandBar() {
  return <div className="border-t border-honeycomb-border bg-honeycomb-panel px-6 py-3"><div className="flex flex-wrap items-center justify-between gap-3"><div className="flex flex-wrap gap-2">{commands.map(cmd=><button key={cmd} disabled title="Disabled until authenticated Guard and Executor APIs are connected" className="cursor-not-allowed rounded-md border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs font-semibold text-zinc-600">{cmd}</button>)}</div><div className="text-xs text-honeycomb-yellow">Commands disabled — no Guard/Executor API</div></div></div>;
}
