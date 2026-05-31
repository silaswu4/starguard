import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { AnnouncementBar } from "@/components/marketing/announcement-bar";
import { ProtocolItem } from "@/components/marketing/protocol-item";
import { SiteHeader, SiteFooter } from "@/components/marketing/site-chrome";
import { RevealText, RevealUp } from "@/components/motion/reveal";
import { ParallaxY } from "@/components/motion/parallax";
import { Marquee } from "@/components/motion/marquee";
import { Magnetic } from "@/components/motion/magnetic";
import { GrowthChart } from "@/components/viz/growth-chart";
import { HeroInteractiveMap } from "@/components/hero/dot-map";

const protocolLogos: { name: string; slug?: string }[] = [
  { name: "OpenAI", slug: "openai" },
  { name: "Anthropic", slug: "anthropic" },
  { name: "AWS Bedrock", slug: "amazonwebservices" },
  { name: "Vertex AI", slug: "googlecloud" },
  { name: "Azure OpenAI", slug: "microsoftazure" },
  { name: "LangChain", slug: "langchain" },
  { name: "LlamaIndex" },
  { name: "CrewAI", slug: "crewai" },
  { name: "Vercel", slug: "vercel" },
  { name: "Slack", slug: "slack" },
  { name: "Okta", slug: "okta" },
  { name: "Datadog", slug: "datadog" },
  { name: "Splunk", slug: "splunk" },
  { name: "Snowflake", slug: "snowflake" },
  { name: "GitHub", slug: "github" },
  { name: "Jira", slug: "jira" },
  { name: "Linear", slug: "linear" },
  { name: "PagerDuty", slug: "pagerduty" },
  { name: "HashiCorp", slug: "hashicorp" },
];

const howItWorks = [
  {
    eyebrow: "01 · Inventory",
    title: "Inventory every agent",
    body: "Register agents through the SDK or REST. Track owner, environment, tool scope, and risk class. In one map.",
    visual: "inventory",
  },
  {
    eyebrow: "02 · Policy",
    title: "Apply policy in flight",
    body: "Evaluate every proposed action against a hybrid rule + classifier engine. Allow, route, or block. With full reasoning.",
    visual: "policy",
  },
  {
    eyebrow: "03 · Approve",
    title: "Decide with evidence",
    body: "Flagged actions reach reviewers with payload, policy trail, risk score, and prior context. In Slack, Jira, or Teams.",
    visual: "approval",
  },
] as const;

const platformLayers = [
  { label: "Ingress", body: "SDK · REST · webhooks" },
  { label: "Decision", body: "OPA rules + classifier" },
  { label: "Routing", body: "Slack · Teams · Jira" },
  { label: "Evidence", body: "Merkle-chained WAL" },
];

const faqs = [
  {
    q: "How does Starguard sit between an agent and its tools?",
    a: "Agents call the SDK before any tool execution. The SDK forwards a structured proposal and waits for an Allow / Review / Block verdict in under 50ms. Allowed actions execute. Review actions pause until a human responds. Blocked actions never touch downstream systems.",
  },
  {
    q: "What does the policy engine actually evaluate?",
    a: "Deterministic rules in an OPA-compatible dialect, composed with optional classifier-based risk scoring. PII redaction, jurisdiction guards, spend caps, tool allowlists, prompt-injection screening. Each verdict carries a reasoning trail showing exactly why an action was held.",
  },
  {
    q: "How is the audit ledger tamper-evident?",
    a: "Every event is signed and appended to a write-ahead log. Each block carries the Merkle root of the prior block, so any retroactive change breaks the chain. Roots are checkpoint-anchored on a regular cadence and exported in your retention region.",
  },
  {
    q: "Where does data live?",
    a: "SaaS deployments pin all customer data to a single region. Dedicated VPC and self-hosted deployments run inside your environment. Your encryption keys, your audit-log bucket, your region. More on the platform page.",
  },
];

export default function Home() {
  return (
    <main className="bg-[color:var(--color-background)] text-[color:var(--color-foreground)] min-h-screen">
      <AnnouncementBar />
      <SiteHeader />
      <Hero />
      <ProtocolMarquee />
      <HowItWorks />
      <SetupPair />
      <Highlight />
      <StatementBreak />
      <PlatformTeaser />
      <FAQSection />
      <DarkCTA />
      <SiteFooter />
    </main>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="container-page grid items-center gap-12 pt-16 pb-20 md:pt-24 md:pb-28 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:pt-28 lg:pb-32">
        <div className="relative z-10 max-w-[640px]">
          <RevealUp trigger="mount" stagger={0.06} y={20} className="space-y-6">
            <span className="eyebrow-pill inline-flex">
              <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-cobalt)]" />
              Agent governance platform
            </span>
          </RevealUp>
          <h1 className="hero-title mt-6 text-balance">
            <RevealText trigger="mount" delay={0.1} stagger={0.05}>
              The control plane
            </RevealText>
            <br />
            <RevealText trigger="mount" delay={0.3} stagger={0.05}>
              for AI agents.
            </RevealText>
          </h1>
          <RevealUp trigger="mount" delay={0.6} y={14} stagger={0.05} className="mt-12 space-y-8">
            <p className="body-lg max-w-[540px] text-balance">
              Inventory every agent. Enforce policy at the action level. Route risky calls to humans. Preserve a tamper-evident audit trail across your stack.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Magnetic strength={0.18}>
                <Link className="btn-primary" href="mailto:silaswu4@gmail.com?subject=Starguard%20demo">
                  Book a demo
                  <ArrowRight size={14} />
                </Link>
              </Magnetic>
              <Link className="btn-secondary" href="/platform">
                Explore the platform
              </Link>
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-[color:var(--color-muted)]">
              {[
                "Sub-50ms policy",
                "Merkle-chained audit",
                "SAML · SCIM",
                "Self-hostable",
              ].map((badge) => (
                <span key={badge} className="label-mono">
                  {badge}
                </span>
              ))}
            </div>
          </RevealUp>
        </div>
        <ParallaxY range={-140} className="lg:px-0">
          <HeroInteractiveMap />
        </ParallaxY>
      </div>
    </section>
  );
}

function ProtocolMarquee() {
  return (
    <section className="border-y border-[color:var(--color-line)] bg-[color:var(--color-background-soft)] py-20">
      <div className="container-page mb-10 flex items-center justify-center">
        <span className="label-mono">Built around</span>
      </div>
      <Marquee speed={55} gap={104} slowOnHover className="px-4">
        {protocolLogos.map(({ name, slug }) => (
          <ProtocolItem key={name} name={name} slug={slug} />
        ))}
      </Marquee>
    </section>
  );
}

function SectionHeader({
  index,
  label,
  title,
  subtitle,
}: {
  index: string;
  label: string;
  title: string;
  subtitle: string;
}) {
  return (
    <RevealUp y={20} stagger={0.06} className="mb-14 grid gap-8 md:grid-cols-[auto_1fr] md:gap-16">
      <div className="flex items-start gap-4">
        <span className="label-mono pt-2 text-[color:var(--color-muted-light)]">{index}</span>
        <span className="label-mono pt-2 text-[color:var(--color-foreground)]">{label}</span>
      </div>
      <div className="max-w-[820px]">
        <h2 className="display-2 text-balance">{title}</h2>
        <p className="body-lg mt-5 text-balance">{subtitle}</p>
      </div>
    </RevealUp>
  );
}

function HowItWorks() {
  return (
    <section id="how" className="section-y">
      <div className="container-page">
        <SectionHeader
          index="001"
          label="How it works"
          title="Three steps, repeatable for every agent in your stack."
          subtitle="From single-agent prototype to fleet-wide production, the same loop holds. And the evidence keeps."
        />
        <RevealUp stagger={0.1} y={28} className="grid gap-6 md:grid-cols-3">
          {howItWorks.map((card) => (
            <article key={card.title} className="card flex flex-col gap-6">
              <div className="card-mockup-bg flex h-[260px] items-center justify-center p-5">
                {card.visual === "inventory" && <InventoryMock />}
                {card.visual === "policy" && <PolicyMock />}
                {card.visual === "approval" && <ApprovalMock />}
              </div>
              <div>
                <span className="label-mono text-[color:var(--color-foreground)]">{card.eyebrow}</span>
                <h3 className="display-3 mt-3">{card.title}</h3>
                <p className="body-md mt-3">{card.body}</p>
              </div>
            </article>
          ))}
        </RevealUp>
      </div>
    </section>
  );
}

function InventoryMock() {
  const rows = [
    { name: "Invoice Analyzer", env: "Finance", active: true },
    { name: "Vendor Research", env: "Procurement" },
    { name: "Access Provisioning", env: "IT Ops" },
    { name: "Contract Review", env: "Legal" },
  ];
  return (
    <div className="w-full rounded-[10px] bg-white p-4 shadow-[var(--shadow-subtle)]">
      <div className="flex items-center justify-between pb-3">
        <span className="label-mono-sm">Agents</span>
        <span className="label-mono-sm text-[color:var(--color-cobalt-deep)]">12 active</span>
      </div>
      <div className="space-y-1.5">
        {rows.map((row) => (
          <div
            key={row.name}
            className={`flex items-center justify-between rounded-[6px] border px-3 py-2 ${
              row.active
                ? "border-[color:var(--color-icy)] bg-[color:var(--color-icy-soft)]"
                : "border-[color:var(--color-line)] bg-white"
            }`}
          >
            <div className="flex min-w-0 items-center gap-2">
              <span className={`pill-dot ${row.active ? "bg-[color:var(--color-cobalt)]" : "bg-[color:var(--color-muted-light)]"}`} />
              <span className="truncate text-[12px] font-medium text-[color:var(--color-foreground)]">{row.name}</span>
            </div>
            <span className="text-[11px] text-[color:var(--color-muted)]">{row.env}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PolicyMock() {
  const items = [
    { name: "PII Guardrail", status: "approved" as const },
    { name: "External SendEmail", status: "review" as const },
    { name: "Spend > $1k", status: "blocked" as const },
    { name: "Vendor lookup", status: "approved" as const },
  ];
  const statusLabel = { approved: "Allowed", review: "Review", blocked: "Blocked" };
  const statusClass = { approved: "tag-approved", review: "tag-review", blocked: "tag-blocked" };
  return (
    <div className="w-full rounded-[10px] bg-white p-4 shadow-[var(--shadow-subtle)]">
      <div className="flex items-center justify-between pb-3">
        <span className="label-mono-sm">Policy verdicts</span>
        <ShieldCheck size={14} className="text-[color:var(--color-cobalt)]" />
      </div>
      <div className="space-y-1.5">
        {items.map((item) => (
          <div key={item.name} className="flex items-center justify-between rounded-[6px] border border-[color:var(--color-line)] bg-white px-3 py-2">
            <span className="text-[12px] font-medium text-[color:var(--color-foreground)]">{item.name}</span>
            <span className={`pill ${statusClass[item.status]}`}>{statusLabel[item.status]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ApprovalMock() {
  return (
    <div className="w-full rounded-[10px] bg-white p-4 shadow-[var(--shadow-subtle)]">
      <div className="flex items-center justify-between pb-3">
        <span className="label-mono-sm">Pending approval</span>
        <span className="pill tag-review">Risk · Med</span>
      </div>
      <div className="rounded-[6px] border border-[color:var(--color-line)] p-3">
        <p className="text-[12px] font-semibold text-[color:var(--color-foreground)]">Send vendor onboarding email</p>
        <p className="mt-1 text-[11px] text-[color:var(--color-muted)]">Vendor Research Agent · SendEmail · PII Guardrail flagged</p>
        <div className="mt-3 flex items-center gap-2">
          <button className="rounded-[6px] bg-[color:var(--color-cobalt)] px-3 py-1.5 text-[11px] font-semibold text-white">Approve</button>
          <button className="rounded-[6px] border border-[color:var(--color-line)] bg-white px-3 py-1.5 text-[11px] font-semibold text-[color:var(--color-foreground)]">Deny</button>
          <span className="ml-auto text-[10px] text-[color:var(--color-muted-light)]">2m ago</span>
        </div>
      </div>
    </div>
  );
}

function SetupPair() {
  return (
    <section className="section-y bg-[color:var(--color-background-soft)] border-y border-[color:var(--color-line)]">
      <div className="container-page">
        <RevealUp y={24} stagger={0.06} className="mb-14 max-w-[920px] space-y-3">
          <h2 className="display-1 text-balance leading-[1.02]">
            Wire it up in an hour.
          </h2>
          <h2 className="display-1 text-balance leading-[1.02] text-[color:var(--color-muted)]">
            Sign every decision after.
          </h2>
          <p className="body-lg mt-6 max-w-[560px]">
            Drop the SDK into an agent, point at the gateway, ship. The first policy verdict lands within the hour. Not the quarter.
          </p>
        </RevealUp>
        <RevealUp stagger={0.15} y={28} className="grid gap-6 lg:grid-cols-2">
          <article className="card flex flex-col gap-6 p-8">
            <span className="label-mono text-[color:var(--color-cobalt-deep)]">Agent inventory</span>
            <h3 className="display-3">Agents enter the control plane automatically</h3>
            <p className="body-md max-w-[440px]">
              Register through the SDK or auto-detect through the gateway. Each agent carries owner, environment, tool scope, and risk class.
            </p>
            <div className="card-mockup-bg mt-2 grid h-[280px] place-items-center p-6">
              <div className="w-full max-w-[460px] rounded-[10px] bg-white p-5 shadow-[var(--shadow-card)]">
                <div className="flex items-center justify-between pb-4">
                  <span className="label-mono-sm text-[color:var(--color-foreground)]">Agent map</span>
                </div>
                <div className="space-y-2">
                  {[
                    { name: "Invoice Analyzer", tag: "Finance Ops", risk: "Low" },
                    { name: "Access Provisioning", tag: "IT Ops", risk: "Med" },
                    { name: "Outreach Drafter", tag: "Marketing", risk: "Low" },
                  ].map((row, i) => (
                    <div
                      key={row.name}
                      className={`flex items-center gap-3 rounded-[6px] border px-3 py-2.5 ${
                        i === 1
                          ? "border-[color:var(--color-cobalt)] bg-[color:var(--color-icy-soft)]"
                          : "border-[color:var(--color-line)]"
                      }`}
                    >
                      <div className="flex-1">
                        <p className="text-[12px] font-semibold text-[color:var(--color-foreground)]">
                          {row.name}
                        </p>
                        <p className="text-[11px] text-[color:var(--color-muted)]">{row.tag}</p>
                      </div>
                      <span className="text-[11px] font-semibold text-[color:var(--color-muted)]">
                        {row.risk}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </article>

          <article className="card flex flex-col gap-6 p-8">
            <span className="label-mono text-[color:var(--color-cobalt-deep)]">Real oversight</span>
            <h3 className="display-3">Decisions, not noise</h3>
            <p className="body-md max-w-[440px]">
              Every flagged action arrives with payload, policy reasoning, risk score, and the reviewer's prior context. In one card.
            </p>
            <div className="card-mockup-bg mt-2 grid h-[280px] place-items-center p-6">
              <div className="w-full max-w-[400px] rounded-[10px] border border-[color:var(--color-cobalt)] bg-white p-5 shadow-[var(--shadow-card)]">
                <div className="flex items-start justify-between gap-3 pb-3">
                  <div>
                    <span className="label-mono-sm">Pending approval</span>
                    <p className="mt-1 text-[14px] font-semibold text-[color:var(--color-foreground)]">
                      Export customer roster to vendor
                    </p>
                  </div>
                  <span className="pill tag-review">Risk · Med</span>
                </div>
                <div className="rounded-[6px] bg-[color:var(--color-background-soft)] p-3">
                  <p className="text-[11px] text-[color:var(--color-muted)]">Policy triggered</p>
                  <p className="mt-1 text-[12px] font-medium text-[color:var(--color-foreground)]">
                    PII Guardrail. Customer.email
                  </p>
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <button className="flex-1 rounded-[6px] bg-[color:var(--color-cobalt)] px-3 py-2 text-[12px] font-semibold text-white">
                    Approve
                  </button>
                  <button className="flex-1 rounded-[6px] border border-[color:var(--color-line)] bg-white px-3 py-2 text-[12px] font-semibold text-[color:var(--color-foreground)]">
                    Deny
                  </button>
                </div>
              </div>
            </div>
          </article>
        </RevealUp>
      </div>
    </section>
  );
}

function Highlight() {
  return (
    <section className="section-y">
      <div className="container-page">
        <RevealUp y={24} stagger={0.06} className="mx-auto mb-14 max-w-[820px] text-center">
          <span className="label-mono">Staged rollout</span>
          <h2 className="display-1 mt-5 text-balance">
            Replay, canary, ship. Every bundle.
          </h2>
          <p className="body-lg mx-auto mt-6 max-w-[600px]">
            Test a candidate policy against the last 30 days of real traffic, canary it to 1% of agents, then promote on a schedule. Rollback is a click.
          </p>
        </RevealUp>
        <RevealUp y={32} className="mx-auto max-w-[1100px]">
          <GrowthChart
            title="Policy bundle · canary rollout"
            caption="v3.4 → v3.5"
            stages={[
              { stage: "Replay", pct: 0.1, label: "30d", note: "Historical traffic" },
              { stage: "Canary", pct: 1, label: "1%", note: "5 agents · 1 hr" },
              { stage: "Stage", pct: 10, label: "10%", note: "50 agents · 24 hr" },
              { stage: "Promote", pct: 50, label: "50%", note: "250 agents · 48 hr" },
              { stage: "Ship", pct: 100, label: "100%", note: "Fleet-wide" },
            ]}
          />
        </RevealUp>
      </div>
    </section>
  );
}

function StatementBreak() {
  return (
    <section className="relative overflow-hidden border-y border-[color:var(--color-line)] bg-[color:var(--color-background)]">
      <div className="container-page py-24 md:py-32 lg:py-40">
        <RevealUp y={32} stagger={0.07} className="mx-auto max-w-[1080px] space-y-8 text-center">
          <span className="label-mono inline-block">Why a control plane</span>
          <p
            className="text-balance leading-[0.98]"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(44px, 6.5vw, 96px)",
              fontWeight: 400,
              letterSpacing: "-0.05em",
              color: "var(--color-foreground)",
            }}
          >
            Software that acts on its own
            <br />
            <span style={{ color: "var(--color-muted)" }}>
              needs infrastructure to answer for it.
            </span>
          </p>
        </RevealUp>
      </div>
    </section>
  );
}

function PlatformTeaser() {
  return (
    <section className="section-y-sm bg-[color:var(--color-background-soft)] border-y border-[color:var(--color-line)]">
      <div className="container-page">
        <RevealUp y={20} stagger={0.06} className="mb-10 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <div className="max-w-[640px] space-y-3">
            <span className="label-mono text-[color:var(--color-foreground)]">002 · Platform</span>
            <h2 className="display-2 text-balance">A four-layer runtime, end to end.</h2>
            <p className="body-lg">
              Built like security infrastructure. The SDK, policy engine, approval routing, and audit ledger are one product. The deep tour lives on the platform page.
            </p>
          </div>
          <Link className="btn-secondary" href="/platform">
            Explore the platform <ArrowRight size={14} />
          </Link>
        </RevealUp>
        <RevealUp stagger={0.08} y={20} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {platformLayers.map((l, i) => (
            <Link
              key={l.label}
              href="/platform"
              className="group flex flex-col gap-3 rounded-[12px] border border-[color:var(--color-line)] bg-white p-5 transition-colors hover:border-[color:var(--color-cobalt)]"
            >
              <span className="label-mono text-[color:var(--color-cobalt-deep)]">L{String(i + 1).padStart(2, "0")}</span>
              <span className="text-[18px] font-semibold tracking-[-0.025em] text-[color:var(--color-foreground)]">{l.label}</span>
              <span className="text-[12.5px] text-[color:var(--color-muted)]" style={{ fontFamily: "var(--font-mono-stack)" }}>{l.body}</span>
            </Link>
          ))}
        </RevealUp>
      </div>
    </section>
  );
}

function FAQSection() {
  return (
    <section id="faq" className="section-y">
      <div className="container-page">
        <RevealUp y={20} stagger={0.06} className="mb-10 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <div className="max-w-[640px] space-y-3">
            <span className="label-mono text-[color:var(--color-foreground)]">003 · Questions</span>
            <h2 className="display-2 text-balance">Short answers to common questions.</h2>
          </div>
          <Link className="btn-secondary" href="/resources#docs">
            Read the docs <ArrowRight size={14} />
          </Link>
        </RevealUp>
        <RevealUp stagger={0.06} y={20} className="mx-auto grid max-w-[920px] gap-4">
          {faqs.map((f, i) => (
            <details
              key={f.q}
              className="group rounded-[12px] border border-[color:var(--color-line)] bg-white p-6 transition-colors hover:border-[color:var(--color-line-strong)]"
              open={i === 0}
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 list-none">
                <span className="text-[16px] font-semibold tracking-[-0.015em] text-[color:var(--color-foreground)]">
                  {f.q}
                </span>
                <span className="grid h-7 w-7 flex-shrink-0 place-items-center rounded-full border border-[color:var(--color-line)] text-[color:var(--color-muted)] transition-transform group-open:rotate-45">
                  <span className="text-[18px] leading-none">+</span>
                </span>
              </summary>
              <p className="mt-4 text-[14.5px] leading-[1.6] text-[color:var(--color-muted)]">
                {f.a}
              </p>
            </details>
          ))}
        </RevealUp>
      </div>
    </section>
  );
}

function DarkCTA() {
  return (
    <section className="bg-[color:var(--color-charcoal-2)] text-white">
      <div className="container-page section-y grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
        <div className="flex flex-col gap-8">
          <h2 className="display-1 text-white text-balance">
            <RevealText stagger={0.04}>Govern every agent.</RevealText>
            <br />
            <span className="text-white/45">
              <RevealText stagger={0.04} delay={0.18}>
                Across every stack.
              </RevealText>
            </span>
          </h2>
          <RevealUp y={14} stagger={0.06} className="space-y-6">
            <p className="body-lg max-w-[480px] text-white/70">
              Wire it in under an hour. Watch the first policy verdict land this afternoon.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Link className="btn-primary" href="mailto:silaswu4@gmail.com?subject=Starguard%20demo">
                Book a demo
                <ArrowRight size={14} />
              </Link>
              <Link className="btn-ghost-inverse" href="/platform">
                Explore platform
              </Link>
            </div>
          </RevealUp>
        </div>
        <RevealUp stagger={0.08} y={20} className="grid grid-cols-2 gap-4">
          {[
            { label: "First policy review", value: "< 1 hr" },
            { label: "Coverage", value: "24 / 7" },
            { label: "Approval routing", value: "Built in" },
            { label: "Audit trail", value: "Complete" },
          ].map((m) => (
            <div key={m.label} className="flex min-h-[180px] flex-col justify-between rounded-[10px] bg-[color:var(--color-background)] p-6 text-[color:var(--color-foreground)]">
              <span className="label-mono-sm">{m.label}</span>
              <p className="metric-value mt-3">{m.value}</p>
            </div>
          ))}
        </RevealUp>
      </div>
    </section>
  );
}
