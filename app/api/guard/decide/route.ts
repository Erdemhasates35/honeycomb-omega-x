import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { createServerClient } from "@/lib/supabase/server";
import type { GuardDecisionRequest, GuardDecisionResponse } from "@/lib/backend/types";

export const dynamic = "force-dynamic";

const REJECT_REASON = "Independent Guard policy engine is not connected. Fail-closed.";
const ORDER_TYPES = new Set([
  "MARKET",
  "LIMIT",
  "STOP",
  "STOP_MARKET",
  "TAKE_PROFIT",
  "TAKE_PROFIT_MARKET",
  "TRAILING_STOP_MARKET",
]);

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * Guard decision endpoint.
 * Current policy: fail-closed. It approves nothing until a real independent
 * policy engine is connected. Every authenticated request is durably audited.
 */
export async function POST(req: NextRequest) {
  let parsed: unknown;
  try {
    parsed = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!isRecord(parsed)) {
    return NextResponse.json({ error: "Request body must be an object" }, { status: 400 });
  }

  const intentId = typeof parsed.intent_id === "string" ? parsed.intent_id.trim() : "";
  const symbol = typeof parsed.symbol === "string" ? parsed.symbol.trim().toUpperCase() : "";
  const side = parsed.side;
  const quantity = parsed.quantity;
  const orderType = typeof parsed.order_type === "string"
    ? parsed.order_type.trim().toUpperCase()
    : "MARKET";
  const metadata = isRecord(parsed.metadata) ? parsed.metadata : {};

  if (
    !intentId ||
    intentId.length > 128 ||
    !/^[A-Z0-9._:-]{1,40}$/.test(symbol) ||
    (side !== "BUY" && side !== "SELL") ||
    typeof quantity !== "number" ||
    !Number.isFinite(quantity) ||
    quantity <= 0 ||
    !ORDER_TYPES.has(orderType)
  ) {
    return NextResponse.json({ error: "Invalid guard intent fields" }, { status: 400 });
  }

  if (JSON.stringify(metadata).length > 8192) {
    return NextResponse.json({ error: "Metadata exceeds the 8 KiB limit" }, { status: 413 });
  }

  let userId: string;
  try {
    const supabase = await createServerClient();
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }
    userId = data.user.id;
  } catch {
    return NextResponse.json({ error: "Authentication service unavailable" }, { status: 503 });
  }

  const auditRecord = {
    intent_id: intentId,
    symbol,
    side,
    quantity,
    order_type: orderType,
    meta: { ...metadata, actor_user_id: userId },
    decision: "reject" as const,
    reason: REJECT_REASON,
  };

  try {
    const admin = createAdminClient();
    const { error } = await admin
      .from("guard_intents")
      .upsert(auditRecord, { onConflict: "intent_id", ignoreDuplicates: true });

    if (error) {
      return NextResponse.json({
        intent_id: intentId,
        decision: "reject",
        reason: "Audit persistence unavailable. Request rejected.",
        timestamp: new Date().toISOString(),
      } satisfies GuardDecisionResponse, { status: 503 });
    }
  } catch {
    return NextResponse.json({
      intent_id: intentId,
      decision: "reject",
      reason: "Audit persistence unavailable. Request rejected.",
      timestamp: new Date().toISOString(),
    } satisfies GuardDecisionResponse, { status: 503 });
  }

  const response: GuardDecisionResponse = {
    intent_id: intentId,
    decision: "reject",
    reason: REJECT_REASON,
    timestamp: new Date().toISOString(),
  };

  return NextResponse.json(response, { status: 200 });
}
