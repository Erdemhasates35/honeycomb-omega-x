"use client";
const agents=["Scout","Cartographer","Judge","Guard","Executor"];
export default function Agents() {
  return <div className="space-y-6">
    <div><h1 className="text-xl font-semibold text-white">Agent Topology</h1><p className="mt-1 text-sm text-zinc-500">Declared roles; runtime heartbeat and agent registry are not connected.</p></div>
    <div className="rounded-xl border border-honeycomb-yellow/30 bg-honeycomb-yellow/5 p-4"><div className="text-sm font-semibold text-honeycomb-yellow">AGENT RUNTIME NOT CONNECTED</div><p className="mt-1 text-sm text-zinc-400">No agent is reported ONLINE without a verified heartbeat and trace.</p></div>
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{agents.map(agent=><div key={agent} className="flex items-center justify-between rounded-lg border border-honeycomb-border bg-honeycomb-panel px-4 py-4"><span className="text-sm text-zinc-200">{agent}</span><span className="text-xs font-semibold text-zinc-500">NOT CONNECTED</span></div>)}</div>
  </div>;
}
