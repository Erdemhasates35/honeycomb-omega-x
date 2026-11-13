"use client";
const states=[{name:"GREEN",desc:"Normal operating envelope. This is a policy definition, not a live status."},{name:"YELLOW",desc:"Reduced risk budget under elevated volatility, spread, funding, or latency."},{name:"ORANGE",desc:"Block new exposure when data, venue, or reconciliation health degrades."},{name:"RED",desc:"Fail closed: kill switch, close-only policy, and incident escalation."}];
export default function Risk() {
  return <div className="space-y-6">
    <div><h1 className="text-xl font-semibold text-white">Risk Policy</h1><p className="mt-1 text-sm text-zinc-500">Policy reference only — no active risk service is connected.</p></div>
    <div className="rounded-xl border border-honeycomb-yellow/30 bg-honeycomb-yellow/5 p-4"><div className="text-sm font-semibold text-honeycomb-yellow">LIVE RISK STATE: UNAVAILABLE</div><p className="mt-1 text-sm text-zinc-400">No current account snapshot or signed Guard verdict is available. The interface does not infer GREEN or safe-to-trade status.</p></div>
    <div className="grid gap-4 md:grid-cols-2">{states.map(state=><div key={state.name} className="rounded-xl border border-honeycomb-border bg-honeycomb-panel p-5"><div className="text-lg font-bold tracking-wide text-zinc-200">{state.name}</div><p className="mt-2 text-sm text-zinc-400">{state.desc}</p></div>)}</div>
    <div className="rounded-xl border border-honeycomb-border bg-honeycomb-panel p-5"><h2 className="mb-2 text-sm font-semibold text-white">Configured limits</h2><p className="text-sm text-zinc-400">Not available. Limits must be read from a versioned, authenticated policy service; no frontend defaults are treated as active risk controls.</p></div>
  </div>;
}
