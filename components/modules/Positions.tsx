"use client";

import { useEffect, useState } from "react";
import type { PositionRow } from "@/lib/backend/types";

export default function Positions() {
  const [positions, setPositions] = useState<PositionRow[]>([]);
  const [status, setStatus] = useState<"loading" | "connected" | "unavailable">("loading");
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/positions", { cache: "no-store" });
        const data = await res.json();
        if (cancelled) return;
        setPositions(Array.isArray(data.positions) ? data.positions : []);
        setStatus(data.status === "connected" ? "connected" : "unavailable");
        setMessage(data.message ?? "");
      } catch {
        if (!cancelled) {
          setStatus("unavailable");
          setMessage("Positions endpoint unreachable");
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
        <h1 className="text-xl font-semibold text-white">Positions</h1>
        <p className="mt-1 text-sm text-zinc-500">Venue-reconciled account positions only</p>
      </div>

      <div className="overflow-hidden rounded-xl border border-honeycomb-border">
        <table className="w-full text-left text-sm">
          <thead className="bg-honeycomb-panel text-[11px] uppercase tracking-wider text-zinc-500">
            <tr>
              {["Symbol", "Side", "Size", "Entry", "Mark", "Unrealized PnL", "Source", "Updated"].map((label) => (
                <th key={label} className="px-4 py-3">{label}</th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-honeycomb-bg">
            {status === "loading" && (
              <tr>
                <td colSpan={8} className="px-4 py-12 text-center text-sm text-zinc-500">
                  Loading…
                </td>
              </tr>
            )}
            {status === "unavailable" && (
              <tr>
                <td colSpan={8} className="px-4 py-12 text-center text-sm text-zinc-500">
                  No position data source is connected.
                  {message ? ` (${message})` : ""} Position count and account exposure are unknown, not zero.
                </td>
              </tr>
            )}
            {status === "connected" && positions.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-12 text-center text-sm text-zinc-500">
                  Connected — no open positions returned by the source.
                </td>
              </tr>
            )}
            {status === "connected" &&
              positions.map((p) => (
                <tr key={p.id} className="border-t border-honeycomb-border">
                  <td className="px-4 py-3 font-medium text-white">{p.symbol}</td>
                  <td className="px-4 py-3">{p.side}</td>
                  <td className="px-4 py-3 font-mono">{p.size}</td>
                  <td className="px-4 py-3 font-mono">{p.entry_price}</td>
                  <td className="px-4 py-3 font-mono">{p.mark_price ?? "—"}</td>
                  <td className="px-4 py-3 font-mono">{p.unrealized_pnl ?? "—"}</td>
                  <td className="px-4 py-3 text-zinc-400">{p.source}</td>
                  <td className="px-4 py-3 text-zinc-500">{p.updated_at}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
