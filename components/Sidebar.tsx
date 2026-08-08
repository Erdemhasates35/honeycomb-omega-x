"use client";

import {
  LayoutDashboard,
  Briefcase,
  Activity,
  Shield,
  Bot,
  Zap,
  HeartPulse,
  Settings,
  Hexagon,
} from "lucide-react";
import clsx from "clsx";

const items = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "positions", label: "Positions", icon: Briefcase },
  { id: "signals", label: "Signals & Edge", icon: Activity },
  { id: "risk", label: "Risk State", icon: Shield },
  { id: "agents", label: "Agents (19+)", icon: Bot },
  { id: "execution", label: "Execution", icon: Zap },
  { id: "selfhealing", label: "Self-Healing", icon: HeartPulse },
  { id: "settings", label: "Settings", icon: Settings },
] as const;

interface Props {
  active: string;
  onSelect: (id: any) => void;
}

export default function Sidebar({ active, onSelect }: Props) {
  return (
    <aside className="flex w-60 flex-col border-r border-honeycomb-border bg-honeycomb-panel">
      <div className="flex items-center gap-3 border-b border-honeycomb-border px-5 py-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-honeycomb-accent/10">
          <Hexagon className="h-5 w-5 text-honeycomb-accent" />
        </div>
        <div>
          <div className="text-sm font-semibold tracking-tight text-white">HONEYCOMB</div>
          <div className="text-[10px] font-medium uppercase tracking-widest text-honeycomb-muted">
            OMEGA X∞
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-1 p-3">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelect(item.id)}
              className={clsx(
                "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-honeycomb-accent/10 text-honeycomb-accent"
                  : "text-zinc-400 hover:bg-white/5 hover:text-zinc-200"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="border-t border-honeycomb-border p-4">
        <div className="rounded-lg bg-honeycomb-bg px-3 py-2.5">
          <div className="text-[10px] uppercase tracking-wider text-honeycomb-muted">Risk State</div>
          <div className="mt-1 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-honeycomb-green animate-pulse" />
            <span className="text-sm font-semibold text-honeycomb-green">GREEN</span>
          </div>
        </div>
      </div>
    </aside>
  );
}