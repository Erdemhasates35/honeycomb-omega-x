import { createHmac } from "node:crypto";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function signedQuery(secret: string, params: URLSearchParams): string {
  const signature = createHmac("sha256", secret).update(params.toString()).digest("hex");
  return `${params.toString()}&signature=${signature}`;
}

async function binanceGet<T>(path: string, apiKey: string, secret: string): Promise<T> {
  const params = new URLSearchParams({
    recvWindow: "5000",
    timestamp: String(Date.now()),
  });
  const response = await fetch(
    `https://fapi.binance.com${path}?${signedQuery(secret, params)}`,
    {
      method: "GET",
      headers: { "X-MBX-APIKEY": apiKey },
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    }
  );
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    const detail =
      payload && typeof payload === "object" && "msg" in payload
        ? String((payload as { msg: unknown }).msg)
        : `Binance returned HTTP ${response.status}`;
    throw new Error(detail);
  }
  return payload as T;
}

type BinanceAccount = {
  totalWalletBalance: string;
  totalUn unrealizedProfit?: string;
  totalMarginBalance: string;
  availableBalance: string;
  assets: Array<{ asset: string; walletBalance: string; unrealizedProfit: string; availableBalance: string }>;
};
type BinancePosition = {
  symbol: string;
  positionAmt: string;
  entryPrice: string;
  markPrice: string;
  unRealizedProfit: string;
  leverage: string;
  positionSide: string;
};

export async function GET() {
  const apiKey = process.env.BINANCE_API_KEY;
  const secret = process.env.BINANCE_SECRET_KEY;
  const sampledAt = new Date().toISOString();

  if (!apiKey || !secret) {
    return NextResponse.json(
      { status: "not_configured", venue: "BINANCE_USDM", sampledAt, message: "Server-side Binance read credentials are not configured." },
      { status: 503, headers: { "Cache-Control": "no-store, max-age=0" } }
    );
  }

  try {
    const [account, positions] = await Promise.all([
      binanceGet<BinanceAccount>("/fapi/v2/account", apiKey, secret),
      binanceGet<BinancePosition[]>("/fapi/v2/positionRisk", apiKey, secret),
    ]);
    const activePositions = positions
      .filter((position) => Number(position.positionAmt) !== 0)
      .map((position) => ({
        symbol: position.symbol,
        amount: Number(position.positionAmt),
        side: Number(position.positionAmt) > 0 ? "LONG" : "SHORT",
        entryPrice: Number(position.entryPrice),
        markPrice: Number(position.markPrice),
        unrealizedPnl: Number(position.unRealizedProfit),
        leverage: Number(position.leverage),
        positionSide: position.positionSide,
      }));
    return NextResponse.json(
      {
        status: "connected",
        venue: "BINANCE_USDM",
        sampledAt,
        account: {
          totalWalletBalance: Number(account.totalWalletBalance),
          totalMarginBalance: Number(account.totalMarginBalance),
          availableBalance: Number(account.availableBalance),
          assets: account.assets
            .filter((asset) => Number(asset.walletBalance) !== 0)
            .map((asset) => ({
              asset: asset.asset,
              walletBalance: Number(asset.walletBalance),
              unrealizedProfit: Number(asset.unrealizedProfit),
              availableBalance: Number(asset.availableBalance),
            })),
        },
        positions: activePositions,
      },
      { headers: { "Cache-Control": "no-store, max-age=0" } }
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: "unavailable",
        venue: "BINANCE_USDM",
        sampledAt,
        message: error instanceof Error ? error.message : "Binance account request failed",
      },
      { status: 503, headers: { "Cache-Control": "no-store, max-age=0" } }
    );
  }
}
