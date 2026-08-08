"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Dashboard from "@/components/modules/Dashboard";
import Positions from "@/components/modules/Positions";
import Signals from "@/components/modules/Signals";
import Risk from "@/components/modules/Risk";
import Agents from "@/components/modules/Agents";
import Execution from "@/components/modules/Execution";
import SelfHealing from "@/components/modules/SelfHealing";
import Settings from "@/components/modules/Settings";
import Admin from "@/components/modules/Admin";
import LiveLogs from "@/components/modules/LiveLogs";
import Trade from "@/components/modules/Trade";
import CommandBar from "@/components/CommandBar";

type Module =
  | "dashboard"
  | "trade"
  | "positions"
  | "signals"
  | "risk"
  | "agents"
  | "execution"
  | "selfhealing"
  | "logs"
  | "admin"
  | "settings";

export default function Home() {
  const [active, setActive] = useState<Module>("dashboard");

  const renderModule = () => {
    switch (active) {
      case "dashboard":
        return <Dashboard />;
      case "trade":
        return <Trade />;
      case "positions":
        return <Positions />;
      case "signals":
        return <Signals />;
      case "risk":
        return <Risk />;
      case "agents":
        return <Agents />;
      case "execution":
        return <Execution />;
      case "selfhealing":
        return <SelfHealing />;
      case "logs":
        return <LiveLogs />;
      case "admin":
        return <Admin />;
      case "settings":
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar active={active} onSelect={setActive} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">{renderModule()}</main>
        <CommandBar />
      </div>
    </div>
  );
}