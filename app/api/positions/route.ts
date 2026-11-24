import { NextResponse } from "next/server";
import type { PositionRow } from "@/lib/backend/types";

export const dynamic = "force-dynamic";

/**
 * Returns reconciled positions from Supabase table `positions`.
 * Never invents positions or PnL.
 */
export async function GET() {
  try {
    const { createServerClient } = await import("@/lib/supabase/server");
    const supabase = await createServerClient();
    const { data: userData, error: authError } = await supabase.auth.getUser();
    if (authError || !userData.user) {
      return NextResponse.json({ status: "unauthorized", positions: [], message: "An authenticated operator session is required" }, { status: 401 });
    }

    const { data, error } = await supabase
      .from("positions")
      .select("id, symbol, side, size, entry_price, mark_price, unrealized_pnl, updated_at, source")
      .order("updated_at", { ascending: false });

    if (error) {
      return NextResponse.json(
        {
          status: "unavailable",
          positions: [] as PositionRow[],
          message: error.message,
          timestamp: new Date().toISOString(),
        },
        { status: error.code === "42501" ? 403 : 503 }
      );
    }

    return NextResponse.json({
      status: "connected",
      positions: (data ?? []) as PositionRow[],
      timestamp: new Date().toISOString(),
    });
  } catch (e) {
    return NextResponse.json(
      {
        status: "unavailable",
        positions: [] as PositionRow[],
        message: e instanceof Error ? e.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 503 }
    );
  }
}
