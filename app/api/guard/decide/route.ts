import { NextRequest, NextResponse } from "next/server";
import type { GuardDecisionRequest, GuardDecisionResponse } from "@/lib/backend/types";

export const dynamic = "force-dynamic";

/**
 * Guard decision endpoint.
 * Current policy: fail-closed. Approves nothing until a real policy engine
 * and independent Guard service are wired. Records the intent for audit.
 */
export async function POST(req: NextRequest) {
  let body: GuardDecisionRequest;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body.intent_id || !body.symbol || !body.side || typeof body.quantity !== "number") {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  // Optional: persist intent for audit if Supabase is available
  try {
    const { createServerClient } = await import("@/lib/supabase/server");
    const supabase = await createServerClient();
    await supabase.from("guard_intents").insert({
      intent_id: body.intent_id,
      symbol: body.symbol,
      side: body.side,
      quantity: body.quantity,
      order_type: body.order_type ?? "MARKET",
      meta: body.metadata ?? {},
      decision: "reject",
      reason: "Guard policy engine not yet connected — fail closed",
    });
  } catch {
    // Non-fatal: still reject
  }

  const response: GuardDecisionResponse = {
    intent_id: body.intent_id,
    decision: "reject",
    reason: "Independent Guard policy engine is not connected. Fail-closed.",
    timestamp: new Date().toISOString(),
  };

  return NextResponse.json(response, { status: 200 });
}
