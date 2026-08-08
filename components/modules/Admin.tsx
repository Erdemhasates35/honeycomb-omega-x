"use client";

import { useState } from "react";
import { Key, Bot, Shield, RefreshCw, CheckCircle2, XCircle, AlertTriangle } from "lucide-react";

const AI_PROVIDERS = [
  { id: "openrouter", name: "OpenRouter", free: true, models: ["meta-llama/llama-3.1-8b-instruct:free", "google/gemma-2-9b-it:free", "mistralai/mistral-7b-instruct:free"] },
  { id: "groq", name: "Groq", free: true, models: ["llama-3.1-8b-instant", "gemma2-9b-it", "mixtral-8x7b-32768"] },
  { id: "deepseek", name: "DeepSeek", free: false, models: ["deepseek-chat", "deepseek-reasoner"] },
  { id: "anthropic", name: "Claude (Anthropic)", free: false, models: ["claude-3-5-sonnet-20241022", "claude-3-haiku-20240307"] },
  { id: "google", name: "Gemini", free: false, models: ["gemini-1.5-flash", "gemini-1.5-pro"] },
  { id: "xai", name: "Grok (xAI)", free: false, models: ["grok-2", "grok-2-mini"] },
];

const EXCHANGE_KEYS = [
  { id: "binance_api_key", label: "Binance API Key", placeholder: "Your Binance API Key" },
  { id: "binance_secret", label: "Binance Secret", placeholder: "Your Binance Secret" },
  { id: "bitget_api_key", label: "Bitget API Key", placeholder: "Your Bitget API Key" },
  { id: "bitget_secret", label: "Bitget Secret", placeholder: "Your Bitget Secret" },
  { id: "bitget_passphrase", label: "Bitget Passphrase", placeholder: "Your Bitget Passphrase" },
];

export default function Admin() {
  const [activeTab, setActiveTab] = useState<"ai" | "exchange" | "system">("ai");
  const [keys, setKeys] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Record<string, "ok" | "fail" | "unknown">>({});

  const handleSave = (id: string, value: string) => {
    setKeys((prev) => ({ ...prev, [id]: value }));
  };

  const testProvider = (id: string) => {
    // Simulated test — real test would call backend
    setStatus((prev) => ({ ...prev, [id]: Math.random() > 0.3 ? "ok" : "fail" }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-white">Admin Control</h1>
        <p className="mt-1 text-sm text-zinc-500">
          API Key yönetimi • AI Parliament • Sistem durumu • Fallback zinciri
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-honeycomb-border pb-2">
        {[
          { id: "ai", label: "AI Parliament & Keys", icon: Bot },
          { id: "exchange", label: "Exchange Keys", icon: Key },
          { id: "system", label: "System Status", icon: Shield },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id as any)}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition ${
              activeTab === t.id
                ? "bg-honeycomb-accent/15 text-honeycomb-accent"
                : "text-zinc-400 hover:bg-white/5 hover:text-zinc-200"
            }`}
          >
            <t.icon className="h-4 w-4" />
            {t.label}
          </button>
        ))}
      </div>

      {activeTab === "ai" && (
        <div className="space-y-4">
          <div className="rounded-xl border border-honeycomb-border bg-honeycomb-panel p-4">
            <h2 className="mb-3 text-sm font-semibold text-white">Fallback Sırası (Önerilen)</h2>
            <ol className="list-decimal space-y-1 pl-5 text-sm text-zinc-400">
              <li>OpenRouter (ücretsiz modeller)</li>
              <li>Groq (ücretsiz / yüksek hız)</li>
              <li>DeepSeek</li>
              <li>Claude / Gemini / Grok (ücretli yedek)</li>
            </ol>
            <p className="mt-3 text-xs text-zinc-500">
              Bir provider hata verdiğinde sistem otomatik sıradaki provider’a geçer. Self-healing kaydı tutulur.
            </p>
          </div>

          {AI_PROVIDERS.map((p) => (
            <div key={p.id} className="rounded-xl border border-honeycomb-border bg-honeycomb-panel p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-white">{p.name}</span>
                  {p.free && (
                    <span className="rounded bg-honeycomb-green/15 px-2 py-0.5 text-[10px] font-medium text-honeycomb-green">
                      FREE TIER
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {status[p.id] === "ok" && <CheckCircle2 className="h-4 w-4 text-honeycomb-green" />}
                  {status[p.id] === "fail" && <XCircle className="h-4 w-4 text-honeycomb-red" />}
                  {status[p.id] === undefined && <AlertTriangle className="h-4 w-4 text-zinc-600" />}
                  <button
                    onClick={() => testProvider(p.id)}
                    className="flex items-center gap-1 rounded bg-zinc-800 px-2.5 py-1 text-xs text-zinc-300 hover:bg-zinc-700"
                  >
                    <RefreshCw className="h-3 w-3" /> Test
                  </button>
                </div>
              </div>
              <div className="mt-3">
                <label className="text-xs text-zinc-500">API Key</label>
                <input
                  type="password"
                  placeholder={`${p.name} API Key`}
                  value={keys[p.id] || ""}
                  onChange={(e) => handleSave(p.id, e.target.value)}
                  className="mt-1 w-full rounded-lg border border-honeycomb-border bg-honeycomb-bg px-3 py-2 text-sm text-white placeholder:text-zinc-600 focus:border-honeycomb-accent focus:outline-none"
                />
              </div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {p.models.map((m) => (
                  <span key={m} className="rounded bg-zinc-800/80 px-2 py-0.5 text-[10px] text-zinc-400">
                    {m}
                  </span>
                ))}
              </div>
            </div>
          ))}

          <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-amber-200/90">
            <strong>Önemli:</strong> Key’ler tarayıcıda saklanmaz. Gerçek kullanımda Vercel Environment Variables
            veya VPS `.env` dosyasına yazılmalıdır. Bu panel sadece yönetim ve test arayüzüdür.
          </div>
        </div>
      )}

      {activeTab === "exchange" && (
        <div className="space-y-4">
          {EXCHANGE_KEYS.map((k) => (
            <div key={k.id} className="rounded-xl border border-honeycomb-border bg-honeycomb-panel p-5">
              <label className="text-xs font-medium uppercase tracking-wider text-zinc-500">{k.label}</label>
              <input
                type="password"
                placeholder={k.placeholder}
                value={keys[k.id] || ""}
                onChange={(e) => handleSave(k.id, e.target.value)}
                className="mt-2 w-full rounded-lg border border-honeycomb-border bg-honeycomb-bg px-3 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:border-honeycomb-accent focus:outline-none"
              />
            </div>
          ))}
          <div className="rounded-xl border border-honeycomb-border bg-honeycomb-panel p-4 text-sm text-zinc-400">
            <p className="font-medium text-white">Rate Limit Önerileri (Maksimum güvenli)</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Binance Futures: REST 1200 req/min, WSS bağlantı limitine dikkat</li>
              <li>Bitget: Dokümantasyona göre weight limitlerini aşma</li>
              <li>Sistemde Agent Timeout: 15ms, Reconnect: 50ms, Circuit Breaker: 3 fail → 10s cooldown</li>
            </ul>
          </div>
        </div>
      )}

      {activeTab === "system" && (
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-honeycomb-border bg-honeycomb-panel p-5">
            <h3 className="text-sm font-semibold text-white">Control Plane</h3>
            <p className="mt-2 text-sm text-zinc-400">Vercel • Next.js • READY</p>
            <p className="mt-1 text-xs text-honeycomb-green">● Online</p>
          </div>
          <div className="rounded-xl border border-honeycomb-border bg-honeycomb-panel p-5">
            <h3 className="text-sm font-semibold text-white">Execution Core</h3>
            <p className="mt-2 text-sm text-zinc-400">Linux VPS (bekleniyor)</p>
            <p className="mt-1 text-xs text-honeycomb-yellow">● Not connected</p>
          </div>
          <div className="rounded-xl border border-honeycomb-border bg-honeycomb-panel p-5">
            <h3 className="text-sm font-semibold text-white">AI Parliament</h3>
            <p className="mt-2 text-sm text-zinc-400">Fallback zinciri hazır</p>
            <p className="mt-1 text-xs text-honeycomb-green">● Standby</p>
          </div>
          <div className="rounded-xl border border-honeycomb-border bg-honeycomb-panel p-5">
            <h3 className="text-sm font-semibold text-white">Risk State</h3>
            <p className="mt-2 text-sm text-zinc-400">Current regime</p>
            <p className="mt-1 text-xs text-honeycomb-green">● GREEN</p>
          </div>
        </div>
      )}
    </div>
  );
}