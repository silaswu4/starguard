import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, BookOpen, FileText, GitCommit, Newspaper, Radio } from "lucide-react";
import { AnnouncementBar } from "@/components/marketing/announcement-bar";
import { SiteHeader, SiteFooter, PageHero } from "@/components/marketing/site-chrome";
import { RevealUp } from "@/components/motion/reveal";
import { Sparkline } from "@/components/viz/sparkline";

export const metadata: Metadata = {
  title: "Resources. Starguard",
  description:
    "Docs, blog, changelog, status, and trust resources for engineers, security teams, and operators running governed AI agents.",
};

const hubs = [
  {
    id: "docs",
    icon: BookOpen,
    label: "Docs",
    title: "Quickstart, API reference, policy cookbook",
    body: "From three-line SDK quickstart to OPA-dialect policy reference, OpenAPI 3.1 schemas, and audit-export specs.",
    cta: "Open docs",
    href: "/dashboard",
  },
  {
    id: "changelog",
    icon: GitCommit,
    label: "Changelog",
    title: "What shipped, when, and why",
    body: "Weekly release notes with breakage policy, deprecation timelines, and full migration paths.",
    cta: "Read changelog",
    href: "#changelog",
  },
  {
    id: "status",
    icon: Radio,
    label: "Status",
    title: "Real-time health of every region",
    body: "Live status across US, EU, UK, APAC regions. Subscribed incident history. RSS + JSON feeds.",
    cta: "Open status page",
    href: "#status",
  },
  {
    id: "blog",
    icon: Newspaper,
    label: "Blog",
    title: "Engineering and research notes",
    body: "Deep dives on policy modeling, risk classifier evaluations, and runtime architecture.",
    cta: "Read the blog",
    href: "#blog",
  },
];

const changelog = [
  {
    version: "v0.42.0",
    date: "May 28, 2026",
    items: [
      "OCSF 1.3 audit export added alongside CEF / LEEF / JSON",
      "Policy bundles now support staged rollouts at 1% / 5% / 25% / 100% canaries",
      "WebAuthn step-up MFA generally available on Business and above",
    ],
  },
  {
    version: "v0.41.0",
    date: "May 14, 2026",
    items: [
      "New connector: ServiceNow approval routing",
      "Risk classifier v3. 22% reduction in false-positive PII detections",
      "SCIM 2.0 now supports group sync with nested groups",
    ],
  },
  {
    version: "v0.40.0",
    date: "Apr 30, 2026",
    items: [
      "Self-hosted Helm chart certified on OpenShift 4.15",
      "Region added: APAC Sydney (Cobalt-AU1)",
      "Policy replay against historical traffic up to 30 days",
    ],
  },
];

const posts = [
  {
    category: "Engineering",
    title: "Why we wrote the audit ledger as a Merkle-chained WAL",
    excerpt: "We needed an evidence layer that auditors trust and engineers can verify themselves. Here's the design and the trade-offs.",
    minutes: 12,
  },
  {
    category: "Research",
    title: "Evaluating prompt injection classifiers against MITRE ATLAS",
    excerpt: "We benchmarked our v3 classifier against five public adversarial sets. Coverage map and methodology, in full.",
    minutes: 18,
  },
  {
    category: "Practice",
    title: "Designing approval routes that don't exhaust your reviewers",
    excerpt: "SLA timers, escalation chains, and on-call rotation. The operational patterns we see working in production.",
    minutes: 9,
  },
  {
    category: "Policy",
    title: "A cookbook for the OWASP LLM Top 10",
    excerpt: "Concrete policy bundles for each of the OWASP LLM Top 10 risks, plus the trade-offs each one introduces.",
    minutes: 22,
  },
];

const statusRegions = [
  { name: "Cobalt-1 · US-East", state: "Operational", uptime: "99.998%", series: [100, 99.99, 100, 99.98, 99.99, 100, 100] },
  { name: "Cobalt-2 · US-West", state: "Operational", uptime: "99.962%", series: [99.94, 99.96, 99.99, 99.91, 100, 99.97, 99.98] },
  { name: "Cobalt-EU1 · Frankfurt", state: "Operational", uptime: "99.991%", series: [100, 99.97, 100, 100, 99.98, 100, 100] },
  { name: "Cobalt-EU2 · Dublin", state: "Operational", uptime: "99.847%", series: [99.62, 99.78, 99.94, 99.81, 99.99, 99.97, 99.99] },
  { name: "Cobalt-UK1 · London", state: "Operational", uptime: "100.0%", series: [100, 100, 100, 100, 100, 100, 100] },
  { name: "Cobalt-AP1 · Tokyo", state: "Operational", uptime: "99.974%", series: [99.99, 100, 99.92, 100, 99.96, 99.99, 100] },
  { name: "Cobalt-AU1 · Sydney", state: "Operational", uptime: "99.903%", series: [99.78, 99.87, 99.94, 99.98, 99.91, 99.96, 99.88] },
];

export default function ResourcesPage() {
  return (
    <main className="bg-[color:var(--color-background)] text-[color:var(--color-foreground)] min-h-screen">
      <AnnouncementBar />
      <SiteHeader />
      <PageHero
        eyebrow="Resources"
        title="Everything you need to operate Starguard."
        body="Docs, changelog, status, and writing from the team. For engineers shipping agents, security teams defending them, and auditors verifying the evidence."
      />
      <Hubs />
      <ChangelogSection />
      <BlogSection />
      <StatusSection />
      <SiteFooter />
    </main>
  );
}

function Hubs() {
  return (
    <section className="section-y-sm">
      <div className="container-page">
        <RevealUp stagger={0.08} y={24} className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {hubs.map((h) => {
            const Icon = h.icon;
            return (
              <article id={h.id} key={h.id} className="card flex flex-col gap-4 scroll-mt-24">
                <div className="grid h-11 w-11 place-items-center rounded-[10px] bg-[color:var(--color-icy-soft)] text-[color:var(--color-cobalt-deep)]">
                  <Icon size={20} strokeWidth={1.75} />
                </div>
                <span className="label-mono text-[color:var(--color-foreground)]">{h.label}</span>
                <h3 className="text-[20px] font-semibold tracking-[-0.025em] text-[color:var(--color-foreground)]">{h.title}</h3>
                <p className="body-md">{h.body}</p>
                <Link className="mt-2 inline-flex items-center gap-1 text-[13px] font-semibold text-[color:var(--color-cobalt-deep)]" href={h.href}>
                  {h.cta} <ArrowUpRight size={13} />
                </Link>
              </article>
            );
          })}
        </RevealUp>
      </div>
    </section>
  );
}

function ChangelogSection() {
  return (
    <section id="changelog" className="section-y bg-[color:var(--color-background-soft)] border-y border-[color:var(--color-line)]">
      <div className="container-page">
        <RevealUp y={20} stagger={0.06} className="mb-10 flex flex-col gap-4">
          <span className="label-mono text-[color:var(--color-foreground)]">Changelog</span>
          <h2 className="display-2 text-balance">What shipped recently.</h2>
        </RevealUp>
        <RevealUp stagger={0.06} y={20} className="grid gap-5">
          {changelog.map((c) => (
            <article key={c.version} className="card flex flex-col gap-3 lg:flex-row lg:items-start lg:gap-8">
              <div className="lg:w-[200px] lg:flex-shrink-0">
                <span className="label-mono text-[color:var(--color-cobalt-deep)]">{c.version}</span>
                <p className="mt-1 text-[12px] text-[color:var(--color-muted)]" style={{ fontFamily: "var(--font-mono-stack)" }}>{c.date}</p>
              </div>
              <ul className="flex flex-1 flex-col gap-2">
                {c.items.map((i) => (
                  <li key={i} className="flex items-start gap-2 text-[14.5px] text-[color:var(--color-foreground-soft)]">
                    <FileText size={14} className="mt-1 flex-shrink-0 text-[color:var(--color-cobalt)]" />
                    <span>{i}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </RevealUp>
      </div>
    </section>
  );
}

function BlogSection() {
  return (
    <section id="blog" className="section-y">
      <div className="container-page">
        <RevealUp y={20} stagger={0.06} className="mb-10 flex flex-col gap-4">
          <span className="label-mono text-[color:var(--color-foreground)]">Writing</span>
          <h2 className="display-2 text-balance">From the team.</h2>
        </RevealUp>
        <RevealUp stagger={0.08} y={20} className="grid gap-5 md:grid-cols-2">
          {posts.map((p) => (
            <article key={p.title} className="card flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="label-mono-sm text-[color:var(--color-cobalt-deep)]">{p.category}</span>
                <span className="text-[11px] text-[color:var(--color-muted)]" style={{ fontFamily: "var(--font-mono-stack)" }}>{p.minutes} min read</span>
              </div>
              <h3 className="text-[20px] font-semibold tracking-[-0.025em] text-[color:var(--color-foreground)]">{p.title}</h3>
              <p className="body-md">{p.excerpt}</p>
            </article>
          ))}
        </RevealUp>
      </div>
    </section>
  );
}

function StatusSection() {
  return (
    <section id="status" className="section-y bg-[color:var(--color-background-soft)] border-y border-[color:var(--color-line)]">
      <div className="container-page">
        <RevealUp y={20} stagger={0.06} className="mb-10 flex flex-col gap-4">
          <span className="label-mono text-[color:var(--color-foreground)]">Status</span>
          <div className="flex items-center gap-3">
            <h2 className="display-2 text-balance">All systems operational.</h2>
            <span className="h-3 w-3 rounded-full bg-[#5ED49C]" />
          </div>
          <p className="body-md max-w-[640px]">90-day rolling uptime across regions. Subscribe to incident updates by email or RSS.</p>
        </RevealUp>
        <RevealUp y={20} className="overflow-hidden rounded-[14px] border border-[color:var(--color-line)] bg-white">
          {statusRegions.map((r, i) => (
            <div
              key={r.name}
              className={`flex items-center justify-between px-5 py-4 ${i !== statusRegions.length - 1 ? "border-b border-[color:var(--color-line)]" : ""}`}
            >
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-[#5ED49C]" />
                <span className="text-[14px] font-medium text-[color:var(--color-foreground)]">{r.name}</span>
              </div>
              <div className="flex items-center gap-5">
                <Sparkline values={r.series} width={88} height={24} />
                <span className="text-[12px] text-[color:var(--color-muted)]" style={{ fontFamily: "var(--font-mono-stack)" }}>{r.uptime} · 7d</span>
                <span className="pill tag-approved">{r.state}</span>
              </div>
            </div>
          ))}
        </RevealUp>
      </div>
    </section>
  );
}
