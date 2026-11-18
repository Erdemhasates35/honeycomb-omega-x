"use client";

import { useEffect, useState, type FormEvent } from "react";
import type { HealthResponse } from "@/lib/backend/types";
import { getBrowserClient } from "@/lib/supabase/client";

type MarketResponse = {
  status: "connected" | "unavailable";
  sampledAt: string;
  tickers: Array<{ symbol: string; price: number; source: string; sampledAt: string }>;
  message?: string;
};
type AccountResponse = {
  status: "connected" | "unavailable" | "not_configured" | "unauthorized";
  sampledAt: string;
  account?: {
    totalWalletBalance: number;
    totalMarginBalance: number;
    availableBalance: number;
    assets: Array<{ asset: string; walletBalance: number; unrealizedProfit: number; availableBalance: number }>;
  };
  positions?: Array<{
    symbol: string;
    amount: number;
    side: string;
    entryPrice: number;
    markPrice: number;
    unrealizedPnl: number;
    leverage: number;
  }>;
  message?: string;
};

const metrics = ["Equity", "Realized PnL", "Unrealized PnL", "Net PnL", "Fees", "Funding"];
const money = (value: number) =>
  new Intl.NumberFormat("en-US", { maximumFractionDigits: 4 }).format(value);

export default function Dashboard() {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [market, setMarket] = useState<MarketResponse | null>(null);
  const [account, setAccount] = useState<AccountResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [operatorEmail, setOperatorEmail] = useState<string | null>(null);
  const [loginEmail, setLoginEmail] = useState("");
  const [authMessage, setAuthMessage] = useState("");
  const [authBusy, setAuthBusy] = useState(false);

  useEffect(() => {
    const supabase = getBrowserClient();
    void supabase.auth.getUser().then(({ data }) => setOperatorEmail(data.user?.email ?? null));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setOperatorEmail(session?.user?.email ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  const requestLoginLink = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!loginEmail.trim()) return;
    setAuthBusy(true);
    setAuthMessage("");
    const { error } = await getBrowserClient().auth.signInWithOtp({
      email: loginEmail.trim(),
      options: { shouldCreateUser: false, emailRedirectTo: window.location.origin },
    });
    setAuthMessage(error ? error.message : "Giriş bağlantısı kayıtlı e-posta adresine gönderildi.");
    setAuthBusy(false);
  };

  const signOut = async () => {
    await getBrowserClient().auth.signOut();
    setAccount({ status: "unauthorized", sampledAt: new Date().toISOString(), message: "Sign in is required to view private exchange account data." });
  };

  useEffect(() => {
    let cancelled = false;
    let timer: number | undefined;
    const refresh = async () => {
      const results = await Promise.allSettled([
        fetch("/api/health", { cache: "no-store" }).then((res) => res.json() as Promise<HealthResponse>),
        fetch("/api/market", { cache: "no-store" }).then((res) => res.json() as Promise<MarketResponse>),
        fetch("/api/exchange/binance/account", { cache: "no-store" }).then((res) => res.json() as Promise<AccountResponse>),
      ]);
      if (cancelled) return;
      if (results[0].status === "fulfilled") setHealth(results[0].value);
      if (results[1].status === "fulfilled") setMarket(results[1].value);
      if (results[2].status === "fulfilled") setAccount(results[2].value);
      setLoading(false);
      timer = window.setTimeout(() => void refresh(), 10000);
    };
    void refresh();
    return () => {
      cancelled = true;
      if (timer !== undefined) window.clearTimeout(timer);
    };
  }, []);

  const services = [
    ["Supabase", health?.supabase ? "CONNECTED" : "NOT CONNECTED"],
    ["Binance market feed", market?.status === "connected" ? "CONNECTED" : "NOT CONNECTED"],
    ["Binance account", account?.status === "connected" ? "CONNECTED" : account?.status === "not_configured" ? "NOT CONFIGURED" : account?.status === "unauthorized" ? "SIGN IN REQUIRED" : "UNAVAILABLE"],
    ["Risk service", "NOT CONNECTED"],
    ["Execution service", "DISABLED"],
    ["Agent runtime", "NOT CONNECTED"],
    ["Telemetry store", health?.supabase ? "REACHABLE" : "NOT CONNECTED"],
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-white">Control Plane</h1>
        <p className="mt-1 text-sm text-zinc-400">
          Live Binance USDⓈ-M market feed and authenticated read-only account telemetry. Order execution is not connected.
        </p>
      </div>

      <div className="rounded-xl border border-honeycomb-yellow/30 bg-honeycomb-yellow/5 p-4">
        <div className="text-sm font-semibold text-honeycomb-yellow">
          {loading ? "CHECKING CONNECTIVITY…" : market?.status === "connected" ? "BINANCE MARKET FEED ONLINE — EXECUTION DISABLED" : "MARKET FEED UNAVAILABLE — EXECUTION DISABLED"}
        </div>
        <p className="mt-1 text-sm text-zinc-400">
          {market?.message ?? health?.message ?? "Waiting for live service probes…"}
          {market?.sampledAt ? ` · ${market.sampledAt}` : ""}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
        {metrics.map((label) => (
          <div key={label} className="rounded-xl border border-honeycomb-border bg-honeycomb-panel p-4">
            <div className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">{label}</div>
            <div className="mt-2 font-mono text-xl font-semibold text-zinc-500">—</div>
            <div className="mt-1 text-xs text-zinc-600">No verified account ledger</div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-honeycomb-border bg-honeycomb-panel p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-white">Binance USDⓈ-M Live Prices</h2>
          <span className="text-xs text-zinc-500">{market?.sampledAt ?? "Awaiting feed"}</span>
        </div>
        {market?.tickers?.length ? (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {market.tickers.map((ticker) => (
              <div key={ticker.symbol} className="rounded-lg bg-honeycomb-bg px-4 py-3">
                <div className="text-xs text-zinc-400">{ticker.symbol}</div>
                <div className="mt-1 font-mono text-lg font-semibold text-white">{money(ticker.price)}</div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-zinc-500">{market?.message ?? "No market data received."}</p>
        )}
      </div>

      <div className="rounded-xl border border-honeycomb-border bg-honeycomb-panel p-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h2 className="text-sm font-semibold text-white">Operator Session</h2>
          {operatorEmail ? (
            <button type="button" onClick={() => void signOut()} className="rounded-md border border-honeycomb-border px-3 py-1.5 text-xs text-zinc-300 hover:bg-white/5">Sign out</button>
          ) : null}
        </div>
        {operatorEmail ? (
          <p className="text-sm text-emerald-400">Authenticated operator: {operatorEmail}</p>
        ) : (
          <form onSubmit={requestLoginLink} className="flex flex-wrap items-center gap-2">
            <input type="email" required value={loginEmail} onChange={(event) => setLoginEmail(event.target.value)} placeholder="Registered operator email" className="min-w-0 flex-1 rounded-md border border-honeycomb-border bg-honeycomb-bg px-3 py-2 text-sm text-white outline-none focus:border-honeycomb-accent" />
            <button type="submit" disabled={authBusy} className="rounded-md bg-honeycomb-accent px-3 py-2 text-xs font-semibold text-white disabled:opacity-50">
              {authBusy ? "Sending…" : "Send sign-in link"}
            </button>
          </form>
        )}
        {authMessage ? <p className="mt-2 text-xs text-zinc-400">{authMessage}</p> : null}
      </div>

      <div className="rounded-xl border border-honeycomb-border bg-honeycomb-panel p-5">
        <h2 className="mb-4 text-sm font-semibold text-white">Binance Account · Read Only</h2>
        {account?.status === "connected" && account.account ? (
          <>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-lg bg-honeycomb-bg p-3"><div className="text-xs text-zinc-500">Wallet Balance</div><div className="mt-1 font-mono text-lg text-white">{money(account.account.totalWalletBalance)} USDT</div></div>
              <div className="rounded-lg bg-honeycomb-bg p-3"><div className="text-xs text-zinc-500">Margin Balance</div><div className="mt-1 font-mono text-lg text-white">{money(account.account.totalMarginBalance)} USDT</div></div>
              <div className="rounded-lg bg-honeycomb-bg p-3"><div className="text-xs text-zinc-500">Available Balance</div><div className="mt-1 font-mono text-lg text-white">{money(account.account.availableBalance)} USDT</div></div>
            </div>
            <h3 className="mb-2 mt-5 text-xs font-semibold uppercase tracking-wide text-zinc-400">Open Positions</h3>
            {account.positions?.length ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="text-zinc-500"><tr><th className="py-2">Symbol</th><th>Side</th><th>Qty</th><th>Entry</th><th>Mark</th><th>Unrealized PnL</th><th>Leverage</th></tr></thead>
                  <tbody>{account.positions.map((position) => <tr key={position.symbol + position.side} className="border-t border-honeycomb-border text-zinc-300"><td className="py-2">{position.symbol}</td><td>{position.side}</td><td>{money(position.amount)}</td><td>{money(position.entryPrice)}</td><td>{money(position.markPrice)}</td><td>{money(position.unrealizedPnl)}</td><td>{position.leverage}x</td></tr>)}</tbody>
                </table>
              </div>
            ) : <p className="text-sm text-zinc-500">No open positions reported by Binance.</p>}
          </>
        ) : <p className="text-sm text-zinc-500">{account?.message ?? "Account credentials or read permissions are not available."}</p>}
      </div>

      <div className="rounded-xl border border-honeycomb-border bg-honeycomb-panel p-5">
        <h2 className="mb-4 text-sm font-semibold text-white">Service Connectivity</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(([name, status]) => (
            <div key={name} className="flex items-center justify-between rounded-lg bg-honeycomb-bg px-4 py-3">
              <span className="text-sm text-zinc-300">{name}</span>
              <span className={`text-xs font-semibold ${status === "CONNECTED" || status === "REACHABLE" ? "text-emerald-400" : "text-zinc-500"}`}>{status}</span>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-zinc-500">
          Last health probe: {health?.timestamp ?? "Pending"} · Backend: {health?.status?.toUpperCase() ?? "UNKNOWN"}
        </p>
      </div>
    </div>
  );
}
