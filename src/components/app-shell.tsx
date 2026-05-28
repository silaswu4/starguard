"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Activity, Bot, ClipboardCheck, Gauge, Play, ScrollText, ShieldCheck } from "lucide-react";

const links = [
  { href: "/dashboard", label: "dashboard", icon: Gauge },
  { href: "/agents", label: "agents", icon: Bot },
  { href: "/policies", label: "policies", icon: ShieldCheck },
  { href: "/playground", label: "playground", icon: Play },
  { href: "/approvals", label: "approvals", icon: ClipboardCheck },
  { href: "/activity", label: "activity", icon: Activity }
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <Link className="brand" href="/dashboard">
          <span className="brand-mark">AgentGate</span>
          <small>Approval Layer / 2026</small>
        </Link>
        <nav className="nav" aria-label="primary">
          {links.map((link) => {
            const Icon = link.icon;
            const active = pathname === link.href;
            return (
              <Link className={`nav-link ${active ? "active" : ""}`} href={link.href} key={link.href}>
                <Icon size={17} strokeWidth={1.7} />
                <span>{link.label[0].toUpperCase() + link.label.slice(1)}</span>
              </Link>
            );
          })}
        </nav>
        <div style={{ marginTop: 36, color: "var(--mute)", lineHeight: 1.7 }}>
          <ScrollText size={17} strokeWidth={1.7} />
          <p>Simulated agents propose actions. Policy gates decide what can continue.</p>
        </div>
      </aside>
      <main className="main">{children}</main>
    </div>
  );
}
