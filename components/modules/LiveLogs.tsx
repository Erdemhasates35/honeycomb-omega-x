"use client";

import { useEffect, useState } from "react";

type LogEntry = {
  id: number;
  time: string;
  level: "info" | "warn" | "error" | "trade";
  message: string;
};

const initialLogs: LogEntry[] = [
  { id: 1, time: new Date().toISOString().slice(11, 19), level: "info", message: "Control Plane online" },
  { id: 2, time: new Date().toISOString().slice(11, 19), level: "info", message: "AI Parliament standby — fallback chain ready" },
  { id: 3, time: new Date().toISOString().slice(11, 19), level: "info", message: "Risk State: GREEN" },
  { id: 4, time: new Date().toISOString().slice(11, 19), level: "warn", message: "Execution Core not connected (VPS required)" },
];

export default function LiveLogs() {
  const [logs, setLogs] = useState<LogEntry[]>(initialLogs);

  useEffect(() => {
    const interval = setInterval(() => {
      const messages = [
        { level: "info" as const, message: "Heartbeat — agents healthy" },
        { level: "info" as const, message: "Edge engine recalculated" },
        { level: "trade" as const, message: "Signal evaluated — net edge below threshold, NO_TRADE" },
        { level: "info" as const, message: "WSS latency check: 11–14ms" },
      ];
      const pick = messages[Math.floor(Math.random() * messages.length)];
      setLogs((prev) =>
        [
          {
            id: Date.now(),
            time: new Date().toISOString().slice(11, 19),
            level: pick.level,
            message: pick.message,
          },
          ...prev,
        ].slice(0, 80)
      );
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const color = (level: string) => {
    switch (level) {
      case "error":
        return "text-honeycomb-red";
      case "warn":
        return "text-honeycomb-yellow";
      case "trade":
        return "text-honeycomb-accent";
      default:
        return "text-zinc-400";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-white">Live Logs</h1>
        <p className="mt-1 text-sm text-zinc-500">Gerçek zamanlı sistem ve işlem logları</p>
      </div>

      <div className="h-[520px] overflow-y-auto rounded-xl border border-honeycomb-border bg-black/50 p-4 font-mono text-xs">
        {logs.map((l) => (
          <div key={l.id} className="flex gap-3 border-b border-white/5 py-1.5">
            <span className="text-zinc-600">{l.time}</span>
            <span className={`w-14 uppercase ${color(l.level)}`}>{l.level}</span>
            <span className="text-zinc-300">{l.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}