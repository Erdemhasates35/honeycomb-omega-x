"use client";

export default function Settings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-white">Settings & Deployment</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Corporate configuration • Secrets never in frontend
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-honeycomb-border bg-honeycomb-panel p-5">
          <h2 className="mb-3 text-sm font-semibold text-white">Environment</h2>
          <ul className="space-y-2 text-sm text-zinc-400">
            <li>• Control Plane → Vercel (this app)</li>
            <li>• Execution Core → Linux x64 VPS (Go/Rust)</li>
            <li>• State → Redis + PostgreSQL</li>
            <li>• Secrets → Vercel Env + VPS .env</li>
            <li>• AI fallback → OpenRouter free tier</li>
          </ul>
        </div>

        <div className="rounded-xl border border-honeycomb-border bg-honeycomb-panel p-5">
          <h2 className="mb-3 text-sm font-semibold text-white">Subscription Ready</h2>
          <p className="text-sm text-zinc-400">
            This control plane is structured as a modular SaaS product.
            You can add auth (Clerk / NextAuth), plans (Free / Pro / Enterprise),
            and billing (Stripe) on top of the existing module system without
            rewriting the core.
          </p>
        </div>
      </div>
    </div>
  );
}