"use client";

import { useEffect, useState } from "react";
import type { TelemetryEvent } from "@/lib/backend/types";

export default function LiveLogs() {
  const [events, setEvents] = useState<TelemetryEvent[]>([]);
  const [status, setStatus] = useState<"loading" | "connected" | "unavailable">("loading");
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/telemetry", { cache: "no-store" });
        const data = await res.json();
        if (cancelled) return;
        setEvents(Array.isArray(data.events) ? data.events : []);
        setStatus(data.status === "connected" ? "connected" : "unavailable");
        setMessage(data.message ?? "");
      } catch {
        if (!cancelled) {
          setStatus("unavailable");
          setMessage("Telemetry endpoint unreachable");
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-white">Event Logs</h1>
        <p className="mt-1 text-sm text-zinc-500">Append-only events from authenticated services</p>
      </div>

      <div className="h-[520px] overflow-y-auto rounded-xl border border-honeycomb-border bg-black/50 p-6 font-mono text-sm">
        {status === "loading" && <div className="text-zinc-500">Loading telemetry…</div>}

        {status === "unavailable" && (
          <>
            <div className="text-honeycomb-yellow">EVENT STREAM NOT CONNECTED</div>
            <p className="mt-3 text-zinc-500">
              No synthetic heartbeats, random events, or generated trading logs are displayed.
            </p>
            <p className="mt-1 text-zinc-500">{message || "Connect Supabase and create the telemetry_events table."}</p>
          </>
        )}

        {status === "connected" && events.length === 0 && (
          <div className="text-zinc-500">Connected — no events in the last query window.</div>
        )}

        {status === "connected" &&
          events.map((e) => (
            <div key={e.id} className="mb-2 border-b border-zinc-800 pb-2">
              <span className="text-zinc-500">{e.created_at}</span>{" "}
              <span className="text-zinc-400">[{e.source}]</span>{" "}
              <span className={e.level === "error" ? "text-red-400" : e.level === "warn" ? "text-amber-400" : "text-zinc-300"}>
                {e.level.toUpperCase()}
              </span>{" "}
              <span className="text-zinc-200">{e.message}</span>
            </div>
          ))}
      </div>
    </div>
  );
}
