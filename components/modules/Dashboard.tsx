"use client";

import { useEffect, useState } from "react";
import type { HealthResponse } from "@/lib/backend/types";

const metrics = ["Equity", "Realized PnL", "Unrealized PnL", "Net PnL", "Fees", "Funding"];

export default function Dashboard() {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/health", { cache: "no-store" });
        const data = (await res.json()) as HealthResponse;
        if (!cancelled) setHealth(data);
      } catch {
        if (!cancelled) {
          setHealth({
            status: "unavailable",
            supabase: false,
            timestamp: new Date().toISOString(),
            service: "honeycomb-omega-x",
            message: "Health endpoint unreachable",
          });
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const statusColor =
    health?.status === "connected"
      ? "text-emerald-400"
      : health?.status === "degraded"
        ? "text-amber-400"
        : "text-zinc-500";

  const services = [
    ["Supabase", health?.supabase ? "CONNECTED" : "NOT CONNECTED"],
    ["Market data", "NOT CONNECTED"],
    ["Exchange accounts", "NOT CONNECTED"],
    ["Risk service", "NOT CONNECTED"],
    ["Execution service", "DISABLED"],
    ["Agent runtime", "NOT CONNECTED"],
    ["Telemetry store", health?.supabase ? "READY" : "NOT CONNECTED"],
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-white">Control Plane</h1>
        <p className="mt-1 text-sm text-zinc-400">
          Monitoring interface. Metrics stay blank until a verified telemetry source is connected.
        </p>
      </div>

      <div className="rounded-xl border border-honeycomb-yellow/30 bg-honeycomb-yellow/5 p-4">
        <div className="text-sm font-semibold text-honeycomb-yellow">
          {loading ? "CHECKING CONNECTIVITY…" : health?.status === "connected" ? "BACKEND REACHABLE — EXECUTION STILL DISABLED" : "NO LIVE DATA — EXECUTION DISABLED"}
        </div>
        <p className="mt-1 text-sm text-zinc-400">
          {health?.message ?? "Waiting for health probe…"}
          {health?.timestamp ? ` · ${health.timestamp}` : ""}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
        {metrics.map((label) => (
          <div key={label} className="rounded-xl border border-honeycomb-border bg-honeycomb-panel p-4">
            <div className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">{label}</div>
            <div className="mt-2 font-mono text-xl font-semibold text-zinc-500">—</div>
            <div className="mt-1 text-xs text-zinc-600">No verified source</div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-honeycomb-border bg-honeycomb-panel p-5">
        <h2 className="mb-4 text-sm font-semibold text-white">Service Connectivity</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(([name, status]) => (
            <div key={name} className="flex items-center justify-between rounded-lg bg-honeycomb-bg px-4 py-3">
              <span className="text-sm text-zinc-300">{name}</span>
              <span className={`text-xs font-semibold ${status === "CONNECTED" || status === "READY" ? "text-emerald-400" : "text-zinc-500"}`}>
                {status}
              </span>
            </div>
          ))}
        </div>
        <p className={`mt-4 text-xs ${statusColor}`}>
          Overall: {loading ? "…" : health?.status?.toUpperCase() ?? "UNKNOWN"}
        </p>
      </div>
    </div>
  );
}
