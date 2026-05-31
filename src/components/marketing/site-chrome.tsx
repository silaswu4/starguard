import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { RevealText, RevealUp } from "@/components/motion/reveal";

const navLinks = [
  { label: "Platform", href: "/platform" },
  { label: "Solutions", href: "/solutions" },
  { label: "Pricing", href: "/pricing" },
  { label: "Resources", href: "/resources" },
  { label: "Company", href: "/company" },
];

const footerColumns = [
  {
    heading: "Platform",
    links: [
      { label: "Overview", href: "/platform" },
      { label: "Policy Engine", href: "/platform#policy" },
      { label: "Approval Routes", href: "/platform#approvals" },
      { label: "Audit Ledger", href: "/platform#audit" },
      { label: "Integrations", href: "/platform#integrations" },
    ],
  },
  {
    heading: "Solutions",
    links: [
      { label: "Security Operations", href: "/solutions#secops" },
      { label: "GRC & Compliance", href: "/solutions#grc" },
      { label: "Agent Platform Teams", href: "/solutions#platform" },
      { label: "Data & Analytics", href: "/solutions#data" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Docs", href: "/resources#docs" },
      { label: "Trust Center", href: "/security" },
      { label: "Status", href: "/resources#status" },
      { label: "Blog", href: "/resources#blog" },
      { label: "Changelog", href: "/resources#changelog" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/company" },
      { label: "Careers", href: "/company#careers" },
      { label: "Press", href: "/company#press" },
      { label: "Privacy Policy", href: "/company#privacy" },
      { label: "Terms of Service", href: "/company#terms" },
    ],
  },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 h-16 border-b border-[color:var(--color-line)] bg-[color:var(--color-background)]/85 backdrop-blur-md">
      <div className="container-page flex h-full items-center justify-between gap-8">
        <Link href="/" className="flex items-center" aria-label="Starguard home">
          <Logo markSize={26} />
        </Link>
        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <Link key={link.label} href={link.href} className="nav-link">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link className="hidden text-[14px] font-medium text-[color:var(--color-foreground-soft)] hover:text-[color:var(--color-foreground)] sm:inline-block" href="/dashboard">
            Sign in
          </Link>
          <Link className="btn-primary" href="mailto:silaswu4@gmail.com?subject=Starguard%20demo">
            Book a demo
          </Link>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-[color:var(--color-sapphire)] text-white">
      <div className="container-page pt-20 pb-10">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_2fr] lg:gap-20">
          <div className="flex flex-col gap-6">
            <Logo inverse markSize={28} />
            <p className="max-w-[320px] text-[15px] leading-[1.55] text-white/65">
              The control plane for AI agents. Govern every agent. Reduce risk everywhere.
            </p>
            <div className="flex flex-wrap items-center gap-2">
              {["SOC 2 Type II", "ISO 27001", "GDPR", "FedRAMP (in process)"].map((badge) => (
                <span
                  key={badge}
                  className="rounded-full border border-white/15 px-3 py-1 text-[10.5px] font-semibold tracking-[0.05em] text-white/70 uppercase"
                  style={{ fontFamily: "var(--font-mono-stack)" }}
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {footerColumns.map((col) => (
              <div key={col.heading}>
                <p className="label-mono text-white/55">{col.heading}</p>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="text-[14px] text-white/80 transition-colors hover:text-white">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div
          className="pointer-events-none mt-20 select-none text-center leading-none tracking-[-0.075em] uppercase"
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(80px, 18vw, 240px)",
            fontWeight: 500,
            color: "rgba(255, 255, 255, 0.08)",
          }}
        >
          Starguard
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3 text-[12px] text-white/60">
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#5ED49C]" />
              All systems operational
            </span>
            <span className="text-white/30">·</span>
            <span>© 2026 Starguard, Inc.</span>
          </div>
          <div className="flex items-center gap-5 text-[10.5px] text-white/45 uppercase tracking-[0.06em]" style={{ fontFamily: "var(--font-mono-stack)" }}>
            <span>Powered by SG-1</span>
            <span>Built for governance</span>
            <span>Always on</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function PageHero({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body: string;
}) {
  return (
    <section className="border-b border-[color:var(--color-line)] bg-[color:var(--color-background)]">
      <div className="container-page pt-20 pb-16 lg:pt-28 lg:pb-20">
        <RevealUp trigger="mount" y={16} stagger={0.05} className="space-y-6">
          <span className="eyebrow-pill inline-flex">
            <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-cobalt)]" />
            {eyebrow}
          </span>
        </RevealUp>
        <h1 className="display-1 mt-6 max-w-[920px] text-balance">
          <RevealText trigger="mount" delay={0.1} stagger={0.04}>
            {title}
          </RevealText>
        </h1>
        <RevealUp trigger="mount" delay={0.4} y={14} stagger={0.05} className="space-y-0">
          <p className="body-lg max-w-[680px] text-balance mt-6">{body}</p>
        </RevealUp>
      </div>
    </section>
  );
}
