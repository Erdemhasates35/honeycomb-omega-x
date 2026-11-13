"use client";
export default function LiveLogs() {
  return <div className="space-y-6">
    <div><h1 className="text-xl font-semibold text-white">Event Logs</h1><p className="mt-1 text-sm text-zinc-500">Append-only events from authenticated services</p></div>
    <div className="h-[520px] rounded-xl border border-honeycomb-border bg-black/50 p-6 font-mono text-sm"><div className="text-honeycomb-yellow">EVENT STREAM NOT CONNECTED</div><p className="mt-3 text-zinc-500">No synthetic heartbeats, random events, or generated trading logs are displayed.</p><p className="mt-1 text-zinc-500">Connect the event API and verify source timestamps, event IDs, and sequence continuity to populate this panel.</p></div>
  </div>;
}
