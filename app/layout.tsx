import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "α-HONEYCOMB OMEGA X∞ | Quant Control Plane",
  description: "Quant control-plane UI scaffold. Live telemetry and execution adapters are not connected.",
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