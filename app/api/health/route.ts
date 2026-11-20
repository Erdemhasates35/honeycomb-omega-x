import { NextResponse } from "next/server";
import type { HealthResponse } from "@/lib/backend/types";

export const dynamic = "force-dynamic";

export async function GET() {
  const hasUrl = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL);
  const hasKey = Boolean(process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY);

  let supabaseOk = false;
  let message = "Supabase environment variables missing";

  if (hasUrl && hasKey) {
    try {
      const { createServerClient } = await import("@/lib/supabase/server");
      const supabase = await createServerClient();
      // Lightweight check: auth session (does not require tables)
      const { error } = await supabase.auth.getSession();
      supabaseOk = !error;
      message = supabaseOk ? "Supabase reachable" : `Supabase error: ${error?.message}`;
    } catch (e) {
      message = e instanceof Error ? e.message : "Supabase client init failed";
    }
  }

  const body: HealthResponse = {
    status: supabaseOk ? "connected" : hasUrl && hasKey ? "degraded" : "unavailable",
    supabase: supabaseOk,
    timestamp: new Date().toISOString(),
    service: "honeycomb-omega-x",
    message,
  };

  return NextResponse.json(body, {
    status: supabaseOk ? 200 : 503,
  });
}
