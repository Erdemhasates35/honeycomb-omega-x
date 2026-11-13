"use client";
import { Bell, Wifi, Database, Server } from "lucide-react";
const connections=[["BINANCE","NOT CONNECTED"],["BITGET","NOT CONNECTED"],["REDIS","NOT CONNECTED"],["POSTGRES","NOT CONNECTED"]];
export default function Header() {
  return <header className="flex min-h-14 items-center justify-between gap-4 border-b border-honeycomb-border bg-honeycomb-panel/80 px-6 py-3 backdrop-blur">
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs">{connections.map(([name,status],i)=><div key={name} className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-zinc-600"/><span className="text-zinc-400">{name}</span><span className="font-mono text-zinc-500">{status}</span></div>)}</div>
    <div className="flex items-center gap-4"><div className="flex items-center gap-2 rounded-full bg-honeycomb-bg px-3 py-1.5 text-xs"><Wifi className="h-3.5 w-3.5 text-zinc-500"/><span className="text-zinc-400">Latency —</span></div><span className="text-xs font-semibold text-honeycomb-yellow">EXECUTION DISABLED</span><button disabled aria-label="Notifications unavailable" className="rounded-lg p-2 text-zinc-600"><Bell className="h-4 w-4"/></button></div>
  </header>;
}
