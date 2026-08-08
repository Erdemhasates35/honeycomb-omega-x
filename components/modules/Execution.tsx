"use client";

export default function Execution() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-white">Execution Core</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Layer 3 — Risk Engine • Order Router • Position Manager (Linux x64 target)
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-honeycomb-border bg-honeycomb-panel p-5">
          <div className="text-xs uppercase tracking-wider text-zinc-500">Avg Latency</div>
          <div className="mt-2 font-mono text-2xl text-white">11.4 ms</div>
        </div>
        <div className="rounded-xl border border-honeycomb-border bg-honeycomb-panel p-5">
          <div className="text-xs uppercase tracking-wider text-zinc-500">Fill Rate 24h</div>
          <div className="mt-2 font-mono text-2xl text-white">98.7%</div>
        </div>
        <div className="rounded-xl border border-honeycomb-border bg-honeycomb-panel p-5">
          <div className="text-xs uppercase tracking-wider text-zinc-500">Slippage Avg</div>
          <div className="mt-2 font-mono text-2xl text-white">0.04%</div>
        </div>
      </div>

      <div className="rounded-xl border border-honeycomb-border bg-honeycomb-panel p-5">
        <h2 className="mb-3 text-sm font-semibold text-white">Architecture Note (Honesty)</h2>
        <p className="text-sm leading-relaxed text-zinc-400">
          High-frequency WSS + order execution cannot run reliably on Vercel serverless.
          This Control Plane (UI + commands + monitoring) is production-ready on Vercel.
          The real Execution Core (Go/Rust) must be deployed on a Linux x64 VPS and
          communicate with this dashboard via secure API / WebSocket.
          Real API keys are never stored in the frontend.
        </p>
      </div>
    </div>
  );
}