import { readFileSync } from "node:fs";

const files = [
  "components/Header.tsx",
  "components/Sidebar.tsx",
  "components/CommandBar.tsx",
  "components/modules/Dashboard.tsx",
  "components/modules/Execution.tsx",
  "components/modules/Risk.tsx",
  "components/modules/Agents.tsx",
  "components/modules/Positions.tsx",
  "components/modules/LiveLogs.tsx",
  "components/modules/Signals.tsx",
  "components/modules/SelfHealing.tsx",
  "components/modules/Trade.tsx",
  "components/modules/Admin.tsx",
  "components/modules/Settings.tsx",
];

const forbidden = [
  ["random telemetry generator", /Math\\.random\\s*\\(/],
  ["synthetic periodic log generator", /setInterval\\s*\\(/],
  ["hardcoded fill-rate metric", /98\\.7\\s*%/],
  ["hardcoded latency metric", /11\\.4\\s*ms|Latency\\s+12ms/i],
  ["hardcoded example equity", /\\$48,250|\\+\\$1,842\\.30/],
  ["false online status", /(?:status|state)\\s*[:=]\\s*["']ONLINE["']/i],
  ["false resolved event", /(?:status|state)\\s*[:=]\\s*["']RESOLVED["']/i],
  ["false current green risk", /Risk State.{0,20}GREEN/i],
];

const failures = [];
for (const file of files) {
  const source = readFileSync(file, "utf8");
  for (const [label, pattern] of forbidden) {
    if (pattern.test(source)) failures.push(file + ": " + label);
  }
}
if (failures.length) {
  console.error("UI truthfulness checks failed:");
  for (const failure of failures) console.error(" - " + failure);
  process.exit(1);
}
console.log("UI truthfulness checks passed for " + files.length + " components.");
