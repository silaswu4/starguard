import type { Metadata } from "next";
import "./globals.css";
import { AppShell } from "@/components/app-shell";
import { AgentGateProvider } from "@/components/agentgate-provider";

export const metadata: Metadata = {
  title: "AgentGate",
  description: "Approval and audit layer for AI agent actions"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AgentGateProvider>
          <AppShell>{children}</AppShell>
        </AgentGateProvider>
      </body>
    </html>
  );
}
