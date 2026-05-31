import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AgentGateProvider } from "@/components/agentgate-provider";
import { ShellRouter } from "@/components/shell-router";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Starguard. The control plane for AI agents",
  description:
    "Discover, monitor, and govern AI agents across your environment. Enforce policy, approve risky actions, and preserve a complete audit trail."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="font-sans">
        <AgentGateProvider>
          <ShellRouter>{children}</ShellRouter>
        </AgentGateProvider>
      </body>
    </html>
  );
}
