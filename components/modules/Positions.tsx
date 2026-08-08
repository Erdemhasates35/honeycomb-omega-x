"use client";

const positions = [
  {
    symbol: "BTCUSDT",
    side: "LONG",
    size: "0.42",
    lev: "5x",
    entry: "64,280",
    mark: "65,110",
    pnl: "+348.60",
    pnlPct: "+1.29%",
    up: true,
  },
  {
    symbol: "ETHUSDT",
    side: "SHORT",
    size: "3.80",
    lev: "3x",
    entry: "3,420",
    mark: "3,385",
    pnl: "+133.00",
    pnlPct: "+1.02%",
    up: true,
  },
];

export default function Positions() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-white">Open Positions</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Position lifecycle: OPEN → MONITOR → ADD/REDUCE → MOVE SL → TP → EXIT → RECONCILIATION → LEARNING
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border border-honeycomb-border">
        <table className="w-full text-left text-sm">
          <thead className="bg-honeycomb-panel text-[11px] uppercase tracking-wider text-zinc-500">
            <tr>
              <th className="px-4 py-3">Symbol</th>
              <th className="px-4 py-3">Side</th>
              <th className="px-4 py-3">Size</th>
              <th className="px-4 py-3">Leverage</th>
              <th className="px-4 py-3">Entry</th>
              <th className="px-4 py-3">Mark</th>
              <th className="px-4 py-3">Unrealized PnL</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-honeycomb-border bg-honeycomb-bg">
            {positions.map((p) => (
              <tr key={p.symbol} className="hover:bg-white/[0.02]">
                <td className="px-4 py-3.5 font-medium text-white">{p.symbol}</td>
                <td className="px-4 py-3.5">
                  <span
                    className={`rounded px-2 py-0.5 text-xs font-semibold ${
                      p.side === "LONG"
                        ? "bg-honeycomb-green/15 text-honeycomb-green"
                        : "bg-honeycomb-red/15 text-honeycomb-red"
                    }`}
                  >
                    {p.side}
                  </span>
                </td>
                <td className="px-4 py-3.5 font-mono text-zinc-300">{p.size}</td>
                <td className="px-4 py-3.5 font-mono text-zinc-300">{p.lev}</td>
                <td className="px-4 py-3.5 font-mono text-zinc-300">{p.entry}</td>
                <td className="px-4 py-3.5 font-mono text-zinc-300">{p.mark}</td>
                <td className="px-4 py-3.5">
                  <div className={`font-mono font-medium ${p.up ? "text-honeycomb-green" : "text-honeycomb-red"}`}>
                    {p.pnl}
                  </div>
                  <div className="text-xs text-zinc-500">{p.pnlPct}</div>
                </td>
                <td className="px-4 py-3.5">
                  <div className="flex gap-2">
                    <button className="rounded bg-zinc-800 px-2 py-1 text-xs text-zinc-300 hover:bg-zinc-700">
                      Reduce
                    </button>
                    <button className="rounded bg-honeycomb-red/20 px-2 py-1 text-xs text-honeycomb-red hover:bg-honeycomb-red/30">
                      Close
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}