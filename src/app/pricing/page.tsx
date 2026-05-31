import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { AnnouncementBar } from "@/components/marketing/announcement-bar";
import { SiteHeader, SiteFooter, PageHero } from "@/components/marketing/site-chrome";
import { RevealUp } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Pricing. Starguard",
  description:
    "Pricing scopes to your fleet, your deployment model, and your retention. Book a 30-minute walkthrough to size it.",
};

const included = [
  "Unlimited policies",
  "Slack · Teams · Jira · Linear · PagerDuty",
  "SAML 2.0 SSO · SCIM 2.0 provisioning",
  "Append-only Merkle-chained audit ledger",
  "SIEM exports. JSON · CEF · LEEF · OCSF",
  "Region pinning. US · EU · UK · APAC",
  "SaaS, dedicated VPC, or self-hosted",
  "Bring-your-own-key via KMS",
];

const sizing = [
  {
    label: "01",
    title: "Fleet",
    body: "How many agents you want governed, in which environments, and with what risk profile.",
  },
  {
    label: "02",
    title: "Deployment",
    body: "SaaS, dedicated VPC, or self-hosted. Each shifts where the data lives and who holds the keys.",
  },
  {
    label: "03",
    title: "Retention",
    body: "How long the audit ledger holds evidence. From 90 days to 7 years, pinned to your bucket.",
  },
];

export default function PricingPage() {
  return (
    <main className="bg-[color:var(--color-background)] text-[color:var(--color-foreground)] min-h-screen">
      <AnnouncementBar />
      <SiteHeader />
      <PageHero
        eyebrow="Pricing"
        title="Pricing scopes to your fleet."
        body="Starguard charges by governed-agent count, deployment model, and retention. Book a 30-minute walkthrough. We'll quote it inside that call."
      />
      <Sizing />
      <DemoCard />
      <Included />
      <SiteFooter />
    </main>
  );
}

function Sizing() {
  const ranges = [
    { label: "Fleet sizes", value: "5 to 5,000+" },
    { label: "Deployment modes", value: "3" },
    { label: "Retention", value: "90d to 7yr" },
    { label: "Quote turnaround", value: "Same day" },
  ];
  return (
    <section className="section-y-sm">
      <div className="container-page">
        <RevealUp y={20} stagger={0.06} className="mb-12 max-w-[720px] space-y-3">
          <span className="label-mono text-[color:var(--color-foreground)]">How we size it</span>
          <h2 className="display-2 text-balance">Three inputs, one quote.</h2>
        </RevealUp>
        <RevealUp stagger={0.1} y={24} className="grid gap-5 md:grid-cols-3">
          {sizing.map((s) => (
            <article key={s.title} className="card flex flex-col gap-3">
              <span className="label-mono text-[color:var(--color-cobalt-deep)]">{s.label}</span>
              <h3 className="display-3 text-[22px]">{s.title}</h3>
              <p className="body-md">{s.body}</p>
            </article>
          ))}
        </RevealUp>
        <RevealUp stagger={0.06} y={16} className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-[14px] border border-[color:var(--color-line)] bg-[color:var(--color-line)] lg:grid-cols-4">
          {ranges.map((r) => (
            <div key={r.label} className="flex flex-col gap-2 bg-[color:var(--color-background-soft)] p-5">
              <span className="label-mono-sm">{r.label}</span>
              <span className="text-[28px] font-medium leading-none tracking-[-0.04em] text-[color:var(--color-foreground)]" style={{ fontFamily: "var(--font-sans)" }}>
                {r.value}
              </span>
            </div>
          ))}
        </RevealUp>
      </div>
    </section>
  );
}

function DemoCard() {
  return (
    <section id="contact" className="section-y bg-[color:var(--color-background-soft)] border-y border-[color:var(--color-line)]">
      <div className="container-page">
        <RevealUp y={28} stagger={0.08} className="mx-auto max-w-[820px]">
          <article className="card flex flex-col items-start gap-6 p-10 lg:p-14">
            <span className="label-mono text-[color:var(--color-cobalt-deep)]">Get in touch</span>
            <h2 className="display-1 text-balance">Book a 30-minute walkthrough.</h2>
            <p className="body-lg max-w-[600px]">
              Bring your toughest agent question. We'll walk the architecture, scope the deployment, and quote the price. In one call.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Link className="btn-primary" href="mailto:hello@starguard.ai?subject=Starguard%20demo">
                Email for a demo <ArrowRight size={14} />
              </Link>
              <Link className="btn-secondary" href="/platform">
                Read the platform overview
              </Link>
            </div>
            <p className="text-[12.5px] text-[color:var(--color-muted)]">
              Average response time: same business day. NDA available on request.
            </p>
          </article>
        </RevealUp>
      </div>
    </section>
  );
}

function Included() {
  return (
    <section className="section-y">
      <div className="container-page">
        <RevealUp y={20} stagger={0.06} className="mb-10 max-w-[720px] space-y-3">
          <span className="label-mono text-[color:var(--color-foreground)]">What every plan includes</span>
          <h2 className="display-2 text-balance">One product, every capability.</h2>
          <p className="body-lg">
            Starguard doesn't gate the things you'd need at 3am. SSO, audit, region pinning, SIEM exports, BYOK. Every customer gets the same runtime.
          </p>
        </RevealUp>
        <RevealUp stagger={0.04} y={16} className="grid gap-x-10 gap-y-px border-t border-[color:var(--color-line)] sm:grid-cols-2">
          {included.map((f) => (
            <div
              key={f}
              className="flex items-center gap-3 border-b border-[color:var(--color-line)] py-4"
            >
              <CheckCircle2 size={15} className="flex-shrink-0 text-[color:var(--color-cobalt)]" />
              <span className="text-[14.5px] font-medium tracking-[-0.01em] text-[color:var(--color-foreground)]">{f}</span>
            </div>
          ))}
        </RevealUp>
      </div>
    </section>
  );
}
