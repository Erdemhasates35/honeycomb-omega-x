import { NextResponse } from "next/server";
import type { HealthResponse } from "@/lib/backend/types";

export const dynamic = "force-dynamic";

export async function GET() {
  const hasUrl = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL);
  const hasKey = Boolean(process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY);
  const checks: HealthResponse["checks"] = {
    auth: "unavailable",
    telemetryEvents: "unavailable",
    positions: "unavailable",
    guardIntents: "unavailable",
  };

  let message = "Supabase environment variables missing";

  if (hasUrl && hasKey) {
    try {
      const { createServerClient } = await import("@/lib/supabase/server");
      const supabase = await createServerClient();
      const [authResult, telemetryResult, positionsResult, guardResult] =
        await Promise.all([
          supabase.auth.getSession(),
          supabase.from("telemetry_events").select("id").limit(0),
          supabase.from("positions").select("id").limit(0),
          supabase.from("guard_intents").select("id").limit(0),
        ]);

      checks.auth = authResult.error ? "unavailable" : "connected";
      checks.telemetryEvents = telemetryResult.error ? "unavailable" : "connected";
      checks.positions = positionsResult.error ? "unavailable" : "connected";
      checks.guardIntents = guardResult.error ? "unavailable" : "connected";

      const unavailable = Object.entries(checks)
        .filter(([, state]) => state !== "connected")
        .map(([name]) => name);

      message = unavailable.length
        ? "Supabase reachable; required data-plane checks unavailable: " + unavailable.join(", ")
        : "Supabase Auth and required data tables reachable";
    } catch (e) {
      message = e instanceof Error ? e.message : "Supabase client initialization failed";
    }
  }

  const supabaseOk = Object.values(checks).every((state) => state === "connected");
  const anyCheck = Object.values(checks).some((state) => state === "connected");
  const body: HealthResponse = {
    status: supabaseOk ? "connected" : anyCheck ? "degraded" : "unavailable",
    supabase: supabaseOk,
    timestamp: new Date().toISOString(),
    service: "honeycomb-omega-x",
    message,
    checks,
  };

  return NextResponse.json(body, { status: supabaseOk ? 200 : 503 });
}
