import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SYMBOLS = ["BTCUSDT", "ETHUSDT", "SOLUSDT", "BNBUSDT", "XRPUSDT"];

type BinanceTicker = { symbol: string; price: string };
type BitgetTicker = { symbol: string; lastPr: string; ts?: string };
type BitgetResponse = { code: string; msg?: string; data?: BitgetTicker[] };

async function getBinanceTickers(sampledAt: string) {
  return Promise.all(
    SYMBOLS.map(async (symbol) => {
      const response = await fetch(
        `https://fapi.binance.com/fapi/v1/ticker/price?symbol=${symbol}`,
        { cache: "no-store", signal: AbortSignal.timeout(5000) }
      );
      if (!response.ok) throw new Error(`Binance ${symbol} returned HTTP ${response.status}`);
      const ticker = (await response.json()) as BinanceTicker;
      const price = Number(ticker.price);
      if (!Number.isFinite(price) || price <= 0) throw new Error(`Invalid Binance price for ${symbol}`);
      return { symbol: ticker.symbol, price, source: "BINANCE_USDM", sampledAt };
    })
  );
}

async function getBitgetTickers(sampledAt: string) {
  const response = await fetch(
    "https://api.bitget.com/api/v2/mix/market/tickers?productType=USDT-FUTURES",
    { cache: "no-store", signal: AbortSignal.timeout(7000) }
  );
  if (!response.ok) throw new Error(`Bitget returned HTTP ${response.status}`);
  const payload = (await response.json()) as BitgetResponse;
  if (payload.code !== "00000" || !Array.isArray(payload.data)) {
    throw new Error(payload.msg || "Bitget returned an invalid ticker response");
  }
  const bySymbol = new Map(payload.data.map((ticker) => [ticker.symbol, ticker]));
  return SYMBOLS.flatMap((symbol) => {
    const ticker = bySymbol.get(symbol);
    if (!ticker) return [];
    const price = Number(ticker.lastPr);
    if (!Number.isFinite(price) || price <= 0) return [];
    const sourceTime = ticker.ts ? new Date(Number(ticker.ts)).toISOString() : sampledAt;
    return [{ symbol, price, source: "BITGET_USDT_FUTURES", sampledAt: sourceTime }];
  });
}

export async function GET() {
  const sampledAt = new Date().toISOString();
  const [binanceResult, bitgetResult] = await Promise.allSettled([
    getBinanceTickers(sampledAt),
    getBitgetTickers(sampledAt),
  ]);

  const binanceTickers = binanceResult.status === "fulfilled" ? binanceResult.value : [];
  const bitgetTickers = bitgetResult.status === "fulfilled" ? bitgetResult.value : [];
  const binanceStatus = binanceTickers.length === SYMBOLS.length ? "connected" : "unavailable";
  const bitgetStatus = bitgetTickers.length > 0 ? "connected" : "unavailable";
  const connectedVenues = Number(binanceStatus === "connected") + Number(bitgetStatus === "connected");
  const errors = [
    binanceResult.status === "rejected" ? String(binanceResult.reason) : null,
    bitgetResult.status === "rejected" ? String(bitgetResult.reason) : null,
  ].filter(Boolean);

  if (connectedVenues === 0) {
    return NextResponse.json(
      {
        status: "unavailable",
        sampledAt,
        venues: { binance: binanceStatus, bitget: bitgetStatus },
        tickers: [],
        bitgetTickers: [],
        message: errors.join(" | ") || "No exchange market data available",
      },
      { status: 503, headers: { "Cache-Control": "no-store, max-age=0" } }
    );
  }

  return NextResponse.json(
    {
      status: connectedVenues === 2 ? "connected" : "degraded",
      sampledAt,
      venues: { binance: binanceStatus, bitget: bitgetStatus },
      tickers: binanceTickers,
      bitgetTickers,
      message: errors.length ? errors.join(" | ") : undefined,
    },
    { headers: { "Cache-Control": "no-store, max-age=0" } }
  );
}
