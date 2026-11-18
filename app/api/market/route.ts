import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SYMBOLS = ["BTCUSDT", "ETHUSDT", "SOLUSDT", "BNBUSDT", "XRPUSDT"];

type BinanceTicker = { symbol: string; price: string };

export async function GET() {
  const sampledAt = new Date().toISOString();
  try {
    const rows = await Promise.all(
      SYMBOLS.map(async (symbol) => {
        const response = await fetch(
          `https://fapi.binance.com/fapi/v1/ticker/price?symbol=${symbol}`,
          { cache: "no-store", signal: AbortSignal.timeout(5000) }
        );
        if (!response.ok) throw new Error(`Binance ${symbol} returned HTTP ${response.status}`);
        const ticker = (await response.json()) as BinanceTicker;
        const price = Number(ticker.price);
        if (!Number.isFinite(price) || price <= 0) throw new Error(`Invalid price for ${symbol}`);
        return { symbol: ticker.symbol, price, source: "BINANCE_USDM", sampledAt };
      })
    );
    return NextResponse.json(
      { status: "connected", venue: "BINANCE_USDM_PUBLIC", sampledAt, tickers: rows },
      { headers: { "Cache-Control": "no-store, max-age=0" } }
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: "unavailable",
        venue: "BINANCE_USDM_PUBLIC",
        sampledAt,
        tickers: [],
        message: error instanceof Error ? error.message : "Market data request failed",
      },
      { status: 503, headers: { "Cache-Control": "no-store, max-age=0" } }
    );
  }
}
