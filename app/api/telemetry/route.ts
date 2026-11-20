import { NextResponse } from "next/server";
import type { TelemetryEvent } from "@/lib/backend/types";

export const dynamic = "force-dynamic";

/**
 * Returns real telemetry events from Supabase table `telemetry_events`
 * if configured. Never fabricates events.
 */
export async function GET() {
  try {
    const { createServerClient } = await import("@/lib/supabase/server");
    const supabase = await createServerClient();

    const { data, error } = await supabase
      .from("telemetry_events")
      .select("id, event_id, source, level, message, created_at, meta")
      .order("created_at", { ascending: false })
      .limit(50);

    if (error) {
      // Table may not exist yet — fail closed with empty list + clear status
      return NextResponse.json(
        {
          status: "unavailable",
          events: [] as TelemetryEvent[],
          message: error.message,
          timestamp: new Date().toISOString(),
        },
        { status: 503 }
      );
    }

    return NextResponse.json({
      status: "connected",
      events: (data ?? []) as TelemetryEvent[],
      timestamp: new Date().toISOString(),
    });
  } catch (e) {
    return NextResponse.json(
      {
        status: "unavailable",
        events: [] as TelemetryEvent[],
        message: e instanceof Error ? e.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 503 }
    );
  }
}
