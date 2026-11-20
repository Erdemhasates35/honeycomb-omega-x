"use client";

import { useEffect, useState } from "react";
import type { HealthResponse } from "@/lib/backend/types";

const REQUIRED_ENV = [
  {
    name: "NEXT_PUBLIC_SUPABASE_URL",
    description: "Supabase project URL (Project Settings → API)",
    where: "Vercel Environment Variables + Supabase dashboard",
  },
  {
    name: "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY",
    description: "Supabase publishable key",
    where: "Vercel Environment Variables",
  },
];

export default function Settings() {
  const [health, setHealth] = useState<HealthResponse | null>(null);

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
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-white">Settings & Configuration</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Environment variables are managed only in Vercel and Supabase dashboards. This panel never accepts or stores secrets.
        </p>
      </div>

      <div className="rounded-xl border border-honeycomb-border bg-honeycomb-panel p-5">
        <h2 className="mb-3 text-sm font-semibold text-white">Backend Connectivity</h2>
        <div className="flex items-center gap-3">
          <span
            className={`inline-block h-2.5 w-2.5 rounded-full ${
              health?.status === "connected"
                ? "bg-emerald-400"
                : health?.status === "degraded"
                  ? "bg-amber-400"
                  : "bg-zinc-500"
            }`}
          />
          <span className="text-sm text-zinc-300">
            {health?.status?.toUpperCase() ?? "CHECKING…"} — {health?.message ?? "…"}
          </span>
        </div>
        {health?.timestamp && (
          <p className="mt-2 text-xs text-zinc-500">Last probe: {health.timestamp}</p>
        )}
      </div>

      <div className="rounded-xl border border-honeycomb-border bg-honeycomb-panel p-5">
        <h2 className="mb-4 text-sm font-semibold text-white">Required Environment Variables</h2>
        <p className="mb-4 text-xs text-zinc-500">
          Add these in <strong className="text-zinc-300">Vercel → Project → Settings → Environment Variables</strong>.
          Never paste real values into the UI or into git.
        </p>
        <div className="space-y-3">
          {REQUIRED_ENV.map((item) => (
            <div
              key={item.name}
              className="rounded-lg border border-honeycomb-border bg-honeycomb-bg px-4 py-3"
            >
              <div className="font-mono text-sm text-honeycomb-yellow">{item.name}</div>
              <div className="mt-1 text-xs text-zinc-400">{item.description}</div>
              <div className="mt-1 text-xs text-zinc-500">Where: {item.where}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4">
        <div className="text-sm font-semibold text-amber-400">Security rule</div>
        <p className="mt-1 text-sm text-zinc-400">
          This application does not currently read SUPABASE_SERVICE_ROLE_KEY. Do not add a service-role
          secret unless a reviewed server-only feature explicitly requires it. All secrets must remain
          in their provider's encrypted server-side environment; never expose them to browser code.
        </p>
      </div>

      <div className="rounded-xl border border-honeycomb-border bg-honeycomb-panel p-5">
        <h2 className="mb-3 text-sm font-semibold text-white">Database Migration</h2>
        <p className="text-sm text-zinc-400">
          The canonical schema, indexes, grants, and row-level security policies are maintained in
          <code className="mx-1 text-honeycomb-yellow">supabase/migrations/20261119000000_honeycomb_core_tables.sql</code>.
          Apply that migration to the dedicated Honeycomb Supabase project only after confirming the
          project reference and reviewing the RLS policy scope. Do not create tables manually from this UI.
        </p>
      </div>
    </div>
  );
}
