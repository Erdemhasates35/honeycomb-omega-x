"use client";

import { useState } from "react";

const commands = [
  { id: "BUY", color: "bg-honeycomb-green/20 text-honeycomb-green border-honeycomb-green/30" },
  { id: "SELL", color: "bg-honeycomb-red/20 text-honeycomb-red border-honeycomb-red/30" },
  { id: "CLOSE", color: "bg-zinc-700/50 text-zinc-300 border-zinc-600" },
  { id: "REDUCE", color: "bg-honeycomb-yellow/20 text-honeycomb-yellow border-honeycomb-yellow/30" },
  { id: "PAUSE", color: "bg-honeycomb-orange/20 text-honeycomb-orange border-honeycomb-orange/30" },
  { id: "RESUME", color: "bg-honeycomb-green/20 text-honeycomb-green border-honeycomb-green/30" },
  { id: "CLOSE-ONLY", color: "bg-honeycomb-orange/20 text-honeycomb-orange border-honeycomb-orange/30" },
  { id: "KILL-SWITCH", color: "bg-honeycomb-red/30 text-honeycomb-red border-honeycomb-red/50 font-bold" },
];

export default function CommandBar() {
  const [last, setLast] = useState<string | null>(null);

  const handle = (cmd: string) => {
    setLast(cmd);
    // Audit log would go here in real system
    console.log(`[AUDIT] Command issued: ${cmd} at ${new Date().toISOString()}`);
  };

  return (
    <div className="border-t border-honeycomb-border bg-honeycomb-panel px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {commands.map((c) => (
            <button
              key={c.id}
              onClick={() => handle(c.id)}
              className={`rounded-md border px-3 py-1.5 text-xs font-semibold transition hover:opacity-80 ${c.color}`}
            >
              {c.id}
            </button>
          ))}
        </div>
        <div className="text-xs text-zinc-500">
          {last ? (
            <span>
              Last: <span className="font-mono text-zinc-300">{last}</span> • Audit logged
            </span>
          ) : (
            "Ready for command"
          )}
        </div>
      </div>
    </div>
  );
}