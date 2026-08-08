"use client";

import { Bell, Wifi, Database, Server } from "lucide-react";

export default function Header() {
  return (
    <header className="flex h-14 items-center justify-between border-b border-honeycomb-border bg-honeycomb-panel/80 px-6 backdrop-blur">
      <div className="flex items-center gap-6 text-xs">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-honeycomb-green" />
          <span className="text-zinc-400">BINANCE</span>
          <span className="font-mono text-honeycomb-green">●</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-honeycomb-green" />
          <span className="text-zinc-400">BITGET</span>
          <span className="font-mono text-honeycomb-green">●</span>
        </div>
        <div className="flex items-center gap-2">
          <Database className="h-3.5 w-3.5 text-zinc-500" />
          <span className="text-zinc-400">REDIS</span>
          <span className="font-mono text-honeycomb-green">●</span>
        </div>
        <div className="flex items-center gap-2">
          <Server className="h-3.5 w-3.5 text-zinc-500" />
          <span className="text-zinc-400">PG</span>
          <span className="font-mono text-honeycomb-green">●</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 rounded-full bg-honeycomb-bg px-3 py-1.5 text-xs">
          <Wifi className="h-3.5 w-3.5 text-honeycomb-green" />
          <span className="text-zinc-300">Latency 12ms</span>
        </div>
        <button className="relative rounded-lg p-2 text-zinc-400 hover:bg-white/5 hover:text-white">
          <Bell className="h-4 w-4" />
          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-honeycomb-accent" />
        </button>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-honeycomb-accent/20 text-xs font-bold text-honeycomb-accent">
          EH
        </div>
      </div>
    </header>
  );
}