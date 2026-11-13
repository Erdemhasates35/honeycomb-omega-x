"use client";
const services=[
  ["Control plane hosting","Vercel project exists; route-level test pending"],
  ["Execution VPS","NOT VERIFIED"],
  ["Redis state","NOT CONNECTED"],
  ["PostgreSQL state","NOT CONNECTED"],
  ["Server-side secrets","NOT VERIFIED"],
  ["AI inference providers","NOT CONNECTED"],
];
export default function Settings() {
  return <div className="space-y-6">
    <div><h1 className="text-xl font-semibold text-white">Settings & Deployment</h1><p className="mt-1 text-sm text-zinc-500">Observed configuration status only; no unverified service is marked ready.</p></div>
    <div className="rounded-xl border border-honeycomb-border bg-honeycomb-panel p-5"><h2 className="mb-4 text-sm font-semibold text-white">Service inventory</h2><div className="space-y-3">{services.map(([name,status])=><div key={name} className="flex items-center justify-between gap-4 rounded-lg bg-honeycomb-bg px-4 py-3"><span className="text-sm text-zinc-300">{name}</span><span className="text-right text-xs text-zinc-500">{status}</span></div>)}</div></div>
    <div className="rounded-xl border border-honeycomb-yellow/30 bg-honeycomb-yellow/5 p-4"><div className="text-sm font-semibold text-honeycomb-yellow">CONFIGURATION IS NOT PRODUCTION-READY</div><p className="mt-1 text-sm text-zinc-400">Authentication, RBAC, audit persistence, API connectivity, secret management, monitoring, backup and recovery must be implemented and tested before this UI can control production services.</p></div>
  </div>;
}
