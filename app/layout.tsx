import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "α-HONEYCOMB OMEGA X∞ | Quant Control Plane",
  description: "Corporate Autonomous Quant Execution Platform — Edge Engine • Risk State Machine • Multi-Agent",
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