"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Activity, Bot, ClipboardCheck, Gauge, Play, ScrollText, ShieldCheck } from "lucide-react";

const links = [
  { href: "/dashboard", label: "Overview", icon: Gauge },
  { href: "/agents", label: "Agents", icon: Bot },
  { href: "/policies", label: "Policies", icon: ShieldCheck },
  { href: "/playground", label: "Monitor", icon: Play },
  { href: "/approvals", label: "Approvals", icon: ClipboardCheck },
  { href: "/activity", label: "Audit Log", icon: Activity }
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <Link className="brand" href="/dashboard">
          <span className="brand-symbol" aria-hidden="true"><span /></span>
          <span>
            <span className="brand-mark">STARGUARD AI</span>
            <small>Governance Layer</small>
          </span>
        </Link>
        <nav className="nav" aria-label="primary">
          {links.map((link) => {
            const Icon = link.icon;
            const active = pathname === link.href;
            return (
              <Link className={`nav-link ${active ? "active" : ""}`} href={link.href} key={link.href}>
                <Icon size={17} strokeWidth={1.7} />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>
        <div style={{ marginTop: 36, color: "var(--mute)", lineHeight: 1.7 }}>
          <ScrollText size={17} strokeWidth={1.7} />
          <p>Policy, approvals, audit trails, and observability for enterprise agent systems.</p>
        </div>
      </aside>
      <main className="main">{children}</main>
    </div>
  );
}
