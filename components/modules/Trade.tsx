"use client";

import { useState } from "react";

export default function Trade() {
  const [symbol, setSymbol] = useState("BTCUSDT");
  const [side, setSide] = useState<"LONG" | "SHORT">("LONG");
  const [size, setSize] = useState("0.01");
  const [leverage, setLeverage] = useState("3");
  const [mode, setMode] = useState<"paper" | "live">("paper");
  const [lastAction, setLastAction] = useState<string | null>(null);

  const openPosition = () => {
    const msg = `[${mode.toUpperCase()}] OPEN ${side} ${symbol} size=${size} lev=${leverage}x`;
    setLastAction(msg);
    console.log("[TRADE]", msg);
  };

  const closePosition = () => {
    const msg = `[${mode.toUpperCase()}] CLOSE ${symbol}`;
    setLastAction(msg);
    console.log("[TRADE]", msg);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-white">Trade Desk</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Basit pozisyon aç / kapat • Paper (varsayılan) veya Live (VPS + key gerekli)
        </p>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => setMode("paper")}
          className={`rounded-lg px-4 py-2 text-sm font-medium ${
            mode === "paper"
              ? "bg-honeycomb-accent/20 text-honeycomb-accent"
              : "bg-zinc-800 text-zinc-400"
          }`}
        >
          PAPER MODE
        </button>
        <button
          onClick={() => setMode("live")}
          className={`rounded-lg px-4 py-2 text-sm font-medium ${
            mode === "live"
              ? "bg-honeycomb-red/20 text-honeycomb-red"
              : "bg-zinc-800 text-zinc-400"
          }`}
        >
          LIVE MODE
        </button>
      </div>

      {mode === "live" && (
        <div className="rounded-xl border border-honeycomb-red/40 bg-honeycomb-red/10 p-4 text-sm text-honeycomb-red">
          LIVE mod gerçek para riski taşır. Execution Core (Linux VPS) bağlı ve geçerli exchange API
          key’leri tanımlı olmalıdır. Aksi halde emir gönderilmez.
        </div>
      )}

      <div className="grid gap-4 rounded-xl border border-honeycomb-border bg-honeycomb-panel p-6 md:grid-cols-2">
        <div>
          <label className="text-xs text-zinc-500">Symbol</label>
          <select
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            className="mt-1 w-full rounded-lg border border-honeycomb-border bg-honeycomb-bg px-3 py-2.5 text-sm text-white"
          >
            <option value="BTCUSDT">BTCUSDT</option>
            <option value="ETHUSDT">ETHUSDT</option>
            <option value="SOLUSDT">SOLUSDT</option>
          </select>
        </div>
        <div>
          <label className="text-xs text-zinc-500">Side</label>
          <div className="mt-1 flex gap-2">
            <button
              onClick={() => setSide("LONG")}
              className={`flex-1 rounded-lg py-2.5 text-sm font-semibold ${
                side === "LONG"
                  ? "bg-honeycomb-green/20 text-honeycomb-green"
                  : "bg-zinc-800 text-zinc-400"
              }`}
            >
              LONG
            </button>
            <button
              onClick={() => setSide("SHORT")}
              className={`flex-1 rounded-lg py-2.5 text-sm font-semibold ${
                side === "SHORT"
                  ? "bg-honeycomb-red/20 text-honeycomb-red"
                  : "bg-zinc-800 text-zinc-400"
              }`}
            >
              SHORT
            </button>
          </div>
        </div>
        <div>
          <label className="text-xs text-zinc-500">Size</label>
          <input
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="mt-1 w-full rounded-lg border border-honeycomb-border bg-honeycomb-bg px-3 py-2.5 text-sm text-white"
          />
        </div>
        <div>
          <label className="text-xs text-zinc-500">Leverage</label>
          <input
            value={leverage}
            onChange={(e) => setLeverage(e.target.value)}
            className="mt-1 w-full rounded-lg border border-honeycomb-border bg-honeycomb-bg px-3 py-2.5 text-sm text-white"
          />
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={openPosition}
          className="rounded-lg bg-honeycomb-green/20 px-6 py-3 text-sm font-bold text-honeycomb-green hover:bg-honeycomb-green/30"
        >
          POZİSYON AÇ
        </button>
        <button
          onClick={closePosition}
          className="rounded-lg bg-honeycomb-red/20 px-6 py-3 text-sm font-bold text-honeycomb-red hover:bg-honeycomb-red/30"
        >
          POZİSYON KAPAT
        </button>
      </div>

      {lastAction && (
        <div className="rounded-lg border border-honeycomb-border bg-honeycomb-bg px-4 py-3 font-mono text-sm text-zinc-300">
          Son işlem: {lastAction}
        </div>
      )}
    </div>
  );
}