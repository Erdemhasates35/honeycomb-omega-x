"use client";
const pipeline=["Error event with source ID","Signature and severity classification","Root-cause hypothesis","Human-reviewed candidate fix","Unit and integration tests","Regression and security gates","Shadow observation","Controlled canary","Production promotion"];
export default function SelfHealing() {
  return <div className="space-y-6">
    <div><h1 className="text-xl font-semibold text-white">Self-Healing Governance</h1><p className="mt-1 text-sm text-zinc-500">Promotion policy reference; no automated repair runtime is connected.</p></div>
    <div className="rounded-xl border border-honeycomb-yellow/30 bg-honeycomb-yellow/5 p-4"><div className="text-sm font-semibold text-honeycomb-yellow">REPAIR PIPELINE NOT CONNECTED</div><p className="mt-1 text-sm text-zinc-400">No incident stream or completed repair events are available. No event is marked RESOLVED without evidence.</p></div>
    <div className="rounded-xl border border-honeycomb-border bg-honeycomb-panel p-6"><ol className="space-y-3">{pipeline.map((step,i)=><li key={step} className="flex items-center gap-4"><span className="flex h-7 w-7 items-center justify-center rounded-full bg-honeycomb-bg text-xs font-mono text-zinc-400">{i+1}</span><span className="font-mono text-sm text-zinc-300">{step}</span></li>)}</ol></div>
    <div className="rounded-xl border border-honeycomb-border bg-honeycomb-panel p-5"><h2 className="mb-2 text-sm font-semibold text-white">Recent verified events</h2><p className="text-sm text-zinc-500">No event source connected; no verified repair events.</p></div>
  </div>;
}
