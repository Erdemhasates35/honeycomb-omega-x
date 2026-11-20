"use client";
const providers=[
  {name:"OpenRouter",models:"Provider/model catalog only"},
  {name:"Groq",models:"Provider/model catalog only"},
  {name:"DeepSeek",models:"Provider/model catalog only"},
  {name:"Anthropic",models:"Provider/model catalog only"},
  {name:"Google Gemini",models:"Provider/model catalog only"},
  {name:"xAI",models:"Provider/model catalog only"},
];
export default function Admin() {
  return <div className="space-y-6">
    <div><h1 className="text-xl font-semibold text-white">Admin & Integrations</h1><p className="mt-1 text-sm text-zinc-500">Connection inventory; this frontend does not collect or persist credentials.</p></div>
    <div className="rounded-xl border border-honeycomb-yellow/30 bg-honeycomb-yellow/5 p-4"><div className="text-sm font-semibold text-honeycomb-yellow">NO PROVIDER CONNECTIONS VERIFIED</div><p className="mt-1 text-sm text-zinc-400">A provider is not marked connected until a server-side health check returns a timestamped, authenticated result.</p></div>
    <div className="rounded-xl border border-honeycomb-border bg-honeycomb-panel p-5"><h2 className="mb-4 text-sm font-semibold text-white">AI provider catalog</h2><div className="space-y-3">{providers.map(p=><div key={p.name} className="flex items-center justify-between rounded-lg bg-honeycomb-bg px-4 py-3"><div><div className="text-sm text-zinc-200">{p.name}</div><div className="text-xs text-zinc-500">{p.models}</div></div><span className="text-xs font-semibold text-zinc-500">NOT CONFIGURED</span></div>)}</div></div>
    <div className="rounded-xl border border-honeycomb-border bg-honeycomb-panel p-5"><h2 className="mb-2 text-sm font-semibold text-white">Exchange credentials</h2><p className="text-sm text-zinc-400">No API-key input exists in this browser UI. Configure least-privilege credentials only in a protected server-side secret manager. Never expose withdrawal permissions or secret values to the client.</p><div className="mt-3 text-xs text-zinc-500">Binance: NOT CONNECTED · Bitget: NOT CONNECTED</div></div>
    <div className="rounded-xl border border-honeycomb-border bg-honeycomb-panel p-5"><h2 className="mb-2 text-sm font-semibold text-white">System services</h2><div className="grid gap-3 sm:grid-cols-2">{["Control API","Independent Guard","Execution adapter","Telemetry database","Agent runtime","Secret manager"].map(s=><div key={s} className="flex justify-between rounded-lg bg-honeycomb-bg px-3 py-2 text-sm"><span className="text-zinc-300">{s}</span><span className="text-zinc-500">NOT VERIFIED</span></div>)}</div></div>
  </div>;
}
