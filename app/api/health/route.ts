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
      const [authResult, schemaResult] = await Promise.all([
        supabase.auth.getSession(),
        supabase.rpc("honeycomb_dashboard_schema_health"),
      ]);

      checks.auth = authResult.error ? "unavailable" : "connected";
      const schema = schemaResult.data as {
        positions?: boolean;
        telemetry_events?: boolean;
        guard_intents?: boolean;
      } | null;
      checks.telemetryEvents = !schemaResult.error && schema?.telemetry_events === true ? "connected" : "unavailable";
      checks.positions = !schemaResult.error && schema?.positions === true ? "connected" : "unavailable";
      checks.guardIntents = !schemaResult.error && schema?.guard_intents === true ? "connected" : "unavailable";

      const unavailable = Object.entries(checks)
        .filter(([, state]) => state !== "connected")
        .map(([name]) => name);

      message = unavailable.length
        ? "Supabase connection or required schema unavailable: " + unavailable.join(", ")
        : "Supabase Auth and required dashboard schemas available; private records require an authenticated admin session";
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
