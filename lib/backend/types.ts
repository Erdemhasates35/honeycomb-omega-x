export type ConnectivityStatus = "connected" | "degraded" | "unavailable";

export interface HealthResponse {
  status: ConnectivityStatus;
  supabase: boolean;
  timestamp: string;
  service: string;
  message?: string;
}

export interface TelemetryEvent {
  id: string;
  event_id: string;
  source: string;
  level: "info" | "warn" | "error" | "system";
  message: string;
  created_at: string;
  meta?: Record<string, unknown>;
}

export interface PositionRow {
  id: string;
  symbol: string;
  side: "LONG" | "SHORT";
  size: number;
  entry_price: number;
  mark_price: number | null;
  unrealized_pnl: number | null;
  updated_at: string;
  source: string;
}

export interface GuardDecisionRequest {
  intent_id: string;
  symbol: string;
  side: "BUY" | "SELL";
  quantity: number;
  order_type: string;
  metadata?: Record<string, unknown>;
}

export interface GuardDecisionResponse {
  intent_id: string;
  decision: "approve" | "reject" | "unavailable";
  reason: string;
  timestamp: string;
  token?: string; // short-lived, only when approved
}
