import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "α-HONEYCOMB OMEGA X∞ | Quant Control Plane",
  description:
    "Live Binance USDⓈ-M market data, authenticated read-only account telemetry, and a fail-closed execution control plane.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className="dark">
      <body className="min-h-screen bg-honeycomb-bg antialiased">
        {children}
      </body>
    </html>
  );
}
