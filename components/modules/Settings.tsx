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
    description: "Supabase anon / publishable key",
    where: "Vercel Environment Variables",
  },
];

const OPTIONAL_ENV = [
  {
    name: "SUPABASE_SERVICE_ROLE_KEY",
    description: "Service-role key (server-only, never expose to browser)",
    where: "Vercel Environment Variables only",
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

      <div className="rounded-xl border border-honeycomb-border bg-honeycomb-panel p-5">
        <h2 className="mb-4 text-sm font-semibold text-white">Optional (Server-only)</h2>
        <div className="space-y-3">
          {OPTIONAL_ENV.map((item) => (
            <div
              key={item.name}
              className="rounded-lg border border-honeycomb-border bg-honeycomb-bg px-4 py-3"
            >
              <div className="font-mono text-sm text-zinc-300">{item.name}</div>
              <div className="mt-1 text-xs text-zinc-400">{item.description}</div>
              <div className="mt-1 text-xs text-zinc-500">Where: {item.where}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4">
        <div className="text-sm font-semibold text-amber-400">Security rule</div>
        <p className="mt-1 text-sm text-zinc-400">
          This application never collects API keys, secrets, or tokens in the browser.
          All secrets must be set in Vercel Environment Variables (and Supabase dashboard for project keys).
          After adding variables, trigger a Redeploy.
        </p>
      </div>

      <div className="rounded-xl border border-honeycomb-border bg-honeycomb-panel p-5">
        <h2 className="mb-3 text-sm font-semibold text-white">Supabase Tables (run once in SQL Editor)</h2>
        <pre className="overflow-x-auto rounded-lg bg-black/50 p-4 text-xs text-zinc-300">
{`create table if not exists telemetry_events (
  id uuid primary key default gen_random_uuid(),
  event_id text not null,
  source text not null,
  level text not null check (level in ('info','warn','error','system')),
  message text not null,
  created_at timestamptz not null default now(),
  meta jsonb default '{}'::jsonb
);

create table if not exists positions (
  id uuid primary key default gen_random_uuid(),
  symbol text not null,
  side text not null check (side in ('LONG','SHORT')),
  size numeric not null,
  entry_price numeric not null,
  mark_price numeric,
  unrealized_pnl numeric,
  updated_at timestamptz not null default now(),
  source text not null
);

create table if not exists guard_intents (
  id uuid primary key default gen_random_uuid(),
  intent_id text not null,
  symbol text not null,
  side text not null,
  quantity numeric not null,
  order_type text,
  meta jsonb default '{}'::jsonb,
  decision text not null,
  reason text,
  created_at timestamptz not null default now()
);`}
        </pre>
        <p className="mt-2 text-xs text-zinc-500">
          Copy → Supabase Dashboard → SQL Editor → Run. Then enable RLS as needed.
        </p>
      </div>
    </div>
  );
}
