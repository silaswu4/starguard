import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Database,
  GitBranch,
  Layers,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";
import { AnnouncementBar } from "@/components/marketing/announcement-bar";
import { SiteHeader, SiteFooter, PageHero } from "@/components/marketing/site-chrome";
import { RevealUp } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Solutions. Starguard",
  description:
    "Starguard by team: Security Operations, GRC & Compliance, Agent Platform, and Data & Analytics. Real workflows for the people accountable for agent behavior.",
};

const solutions = [
  {
    id: "secops",
    icon: LockKeyhole,
    label: "Security Operations",
    title: "Contain agent risk before it reaches production",
    body: "Block dangerous actions in flight, watch agents like you watch users, and preserve evidence for every flagged event. Coverage mapped to OWASP LLM Top 10 and MITRE ATLAS.",
    wins: [
      "Block prompt-injected actions inline. No post-hoc forensics",
      "Detect agent behavior drift against baselines",
      "Stream policy decisions to your SIEM in CEF, LEEF, OCSF",
      "Mute noisy agents without losing audit signal",
    ],
    customers: ["CISO", "SOC analysts", "Red team", "Detection engineers"],
  },
  {
    id: "grc",
    icon: ShieldCheck,
    label: "GRC & Compliance",
    title: "Audit-ready by construction, not by ticket",
    body: "Every action carries policy reasoning, reviewer identity, and Merkle-chained evidence. Map controls to SOC 2, ISO 27001, NIST AI RMF, EU AI Act, and your internal frameworks.",
    wins: [
      "Pre-built control mappings for SOC 2, ISO 27001, NIST AI RMF, EU AI Act",
      "Quarterly evidence packs auto-generated for auditors",
      "Retention pinned to your customer-owned bucket",
      "Sub-processor transparency built into the audit ledger",
    ],
    customers: ["Compliance officers", "Privacy counsel", "Audit committee", "Risk managers"],
  },
  {
    id: "platform",
    icon: GitBranch,
    label: "Agent Platform Teams",
    title: "Ship more agents without losing oversight",
    body: "Give product teams a clean SDK, a policy framework that scales, and a developer console that mirrors production. Unblock velocity while keeping control with security.",
    wins: [
      "Three-line SDK integration. No bespoke wrappers",
      "Sandbox + staging environments before production policy",
      "Policy bundles versioned in your repo · canary rollouts",
      "Developer console with replay against last 30 days of traffic",
    ],
    customers: ["Platform engineers", "Agent owners", "Engineering managers", "Internal developer platform"],
  },
  {
    id: "data",
    icon: Database,
    label: "Data & Analytics",
    title: "Telemetry on every agent, every policy, every reviewer",
    body: "Stream Starguard events to Snowflake, Databricks, or BigQuery. Build dashboards on agent ROI, policy hit rates, reviewer SLA, and risk trends. OpenTelemetry-native.",
    wins: [
      "OTLP exports to Datadog, Splunk, Grafana, New Relic, Sumo Logic",
      "Pre-built models for agent SLA, policy efficacy, reviewer load",
      "Anomaly detection on agent behavior baselines",
      "Warehouse loaders for Snowflake, Databricks, BigQuery, Redshift",
    ],
    customers: ["Data engineers", "Analytics leads", "FinOps", "Product analytics"],
  },
] as const;

const persona = [
  {
    role: "Security Operations",
    asks: [
      "Show me every agent that touched customer data this week.",
      "Block any agent that calls SendEmail outside policy.",
      "Stream verdicts to Splunk in OCSF.",
    ],
  },
  {
    role: "GRC & Compliance",
    asks: [
      "Map our policy library to NIST AI RMF and EU AI Act.",
      "Generate the SOC 2 evidence pack for Q3.",
      "Pin retention to our bucket for 7 years.",
    ],
  },
  {
    role: "Agent Platform",
    asks: [
      "Add the SDK to our LangChain wrapper.",
      "Replay last week's traffic against this policy bundle.",
      "Canary the v3 risk classifier to 5% of agents.",
    ],
  },
  {
    role: "Data & Analytics",
    asks: [
      "Land verdicts in Snowflake on a 5-minute cadence.",
      "Build a dashboard on reviewer SLA by team.",
      "Detect agent behavior drift week over week.",
    ],
  },
];

export default function SolutionsPage() {
  return (
    <main className="bg-[color:var(--color-background)] text-[color:var(--color-foreground)] min-h-screen">
      <AnnouncementBar />
      <SiteHeader />
      <PageHero
        eyebrow="Solutions"
        title="Starguard by the team it serves."
        body="Built for security, GRC, platform engineering, and data. The four functions that actually own agent behavior in production."
      />
      <ByTeam />
      <PersonaAsks />
      <ClosingCTA />
      <SiteFooter />
    </main>
  );
}

function ByTeam() {
  return (
    <section className="section-y">
      <div className="container-page">
        <RevealUp stagger={0.08} y={24} className="grid gap-6 lg:grid-cols-2">
          {solutions.map((s) => {
            const Icon = s.icon;
            return (
              <article id={s.id} key={s.id} className="card flex flex-col gap-5 p-7 scroll-mt-24">
                <div className="grid h-11 w-11 place-items-center rounded-[10px] bg-[color:var(--color-icy-soft)] text-[color:var(--color-cobalt-deep)]">
                  <Icon size={20} strokeWidth={1.75} />
                </div>
                <span className="label-mono text-[color:var(--color-foreground)]">{s.label}</span>
                <h3 className="display-3">{s.title}</h3>
                <p className="body-md max-w-[520px]">{s.body}</p>
                <ul className="space-y-2 border-t border-[color:var(--color-line)] pt-4">
                  {s.wins.map((w) => (
                    <li key={w} className="flex items-start gap-2 text-[13.5px] text-[color:var(--color-foreground-soft)]">
                      <CheckCircle2 size={14} className="mt-0.5 flex-shrink-0 text-[color:var(--color-cobalt)]" />
                      <span>{w}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap items-center gap-2 border-t border-[color:var(--color-line)] pt-4">
                  <span className="label-mono-sm">Made for</span>
                  {s.customers.map((c) => (
                    <span key={c} className="rounded-full border border-[color:var(--color-line)] bg-[color:var(--color-background-soft)] px-2.5 py-1 text-[11px] font-medium text-[color:var(--color-foreground-soft)]">
                      {c}
                    </span>
                  ))}
                </div>
              </article>
            );
          })}
        </RevealUp>
      </div>
    </section>
  );
}

function PersonaAsks() {
  return (
    <section className="section-y bg-[color:var(--color-background-soft)] border-y border-[color:var(--color-line)]">
      <div className="container-page">
        <RevealUp y={20} stagger={0.06} className="mb-10 flex flex-col gap-4">
          <span className="label-mono text-[color:var(--color-foreground)]">In their words</span>
          <h2 className="display-2 text-balance">What each team asks Starguard to do.</h2>
        </RevealUp>
        <RevealUp stagger={0.08} y={20} className="grid gap-5 md:grid-cols-2">
          {persona.map((p) => (
            <article key={p.role} className="card flex flex-col gap-4">
              <span className="label-mono text-[color:var(--color-foreground)]">{p.role}</span>
              <ul className="space-y-2">
                {p.asks.map((a) => (
                  <li key={a} className="flex items-start gap-2 text-[14px] text-[color:var(--color-foreground)]">
                    <Layers size={14} className="mt-1 flex-shrink-0 text-[color:var(--color-cobalt)]" />
                    <span>“{a}”</span>
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

function ClosingCTA() {
  return (
    <section className="bg-[color:var(--color-charcoal-2)] text-white">
      <div className="container-page section-y-sm">
        <RevealUp y={20} stagger={0.06} className="flex flex-col items-start gap-6">
          <h2 className="display-1 text-white text-balance">See the workflow for your team.</h2>
          <p className="body-lg max-w-[520px] text-white/70">
            30-minute walkthrough tailored to security, GRC, platform, or data. Bring your toughest agent question.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Link className="btn-primary" href="mailto:silaswu4@gmail.com?subject=Starguard%20demo">
              Book a demo <ArrowRight size={14} />
            </Link>
            <Link className="btn-ghost-inverse" href="/security">
              Trust center
            </Link>
          </div>
        </RevealUp>
      </div>
    </section>
  );
}
