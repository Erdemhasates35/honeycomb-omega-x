"use client";

const pipeline = [
  "ERROR",
  "ERROR_SIGNATURE",
  "CLASSIFICATION",
  "ROOT_CAUSE",
  "KNOWN_FIX?",
  "AI_ANALYSIS → CANDIDATE_FIX",
  "UNIT_TEST",
  "INTEGRATION_TEST",
  "BACKTEST",
  "REGRESSION",
  "PAPER",
  "CANARY",
  "PRODUCTION",
];

export default function SelfHealing() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-white">Self-Healing Pipeline</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Controlled, tested, progressive promotion — never “fix instantly and continue”
        </p>
      </div>

      <div className="rounded-xl border border-honeycomb-border bg-honeycomb-panel p-6">
        <ol className="space-y-3">
          {pipeline.map((step, i) => (
            <li key={step} className="flex items-center gap-4">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-honeycomb-bg text-xs font-mono text-zinc-400">
                {i + 1}
              </span>
              <span className="font-mono text-sm text-zinc-200">{step}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="rounded-xl border border-honeycomb-border bg-honeycomb-panel p-5">
        <h2 className="mb-2 text-sm font-semibold text-white">Recent Events</h2>
        <div className="space-y-2 text-sm text-zinc-400">
          <div className="flex justify-between">
            <span>WSS node timeout → Shadow promote</span>
            <span className="text-honeycomb-green">RESOLVED</span>
          </div>
          <div className="flex justify-between">
            <span>Rate limit 429 → backoff + alternate RPC</span>
            <span className="text-honeycomb-green">RESOLVED</span>
          </div>
          <div className="flex justify-between">
            <span>Minor data gap → re-sync</span>
            <span className="text-honeycomb-green">RESOLVED</span>
          </div>
        </div>
      </div>
    </div>
  );
}