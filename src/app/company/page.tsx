import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Compass, ShieldCheck, Sparkles } from "lucide-react";
import { AnnouncementBar } from "@/components/marketing/announcement-bar";
import { SiteHeader, SiteFooter, PageHero } from "@/components/marketing/site-chrome";
import { RevealUp } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Company. Starguard",
  description:
    "Starguard is building the control plane for AI agents. Early-stage, founder-led, headquartered in California.",
};

const beliefs = [
  {
    icon: Compass,
    label: "Premise",
    title: "Agents will run the next generation of software",
    body: "The shift from chatbots to autonomous agents is already happening. Within five years, most production software will have an agent acting on its behalf. The teams that own those agents will need a control layer that didn't exist five years ago.",
  },
  {
    icon: ShieldCheck,
    label: "Position",
    title: "Govern at the action, not the model",
    body: "Existing tools sit too far from the actual harm. They filter prompts or score outputs. Starguard sits at the action: every tool call, every database write, every email send. That's where the consequences live and that's where the control should live.",
  },
  {
    icon: Sparkles,
    label: "Posture",
    title: "Build it like security infrastructure",
    body: "This is the layer between an enterprise's agents and its production systems. It has to hold the same posture as the KMS, the auth provider, or the audit log. We're not building a dashboard. We're building infrastructure.",
  },
];

const focus = [
  {
    label: "Now",
    title: "Policy engine + audit ledger, end to end",
    body: "The runtime is the priority. OPA-dialect rules composed with classifier-based risk scoring, sub-50ms p99 evaluation, Merkle-chained evidence. All of it shipped before anything else.",
  },
  {
    label: "Next",
    title: "Identity, SSO, and the approval surface",
    body: "SAML 2.0 SSO, SCIM 2.0 provisioning, RBAC + ABAC at the policy level, step-up MFA, and native approval routing across Slack, Teams, Jira, and PagerDuty.",
  },
  {
    label: "After",
    title: "Self-hosted, BYOK, and regional clusters",
    body: "Helm-chart distribution, bring-your-own-key via KMS, customer-owned audit storage, and EU / UK / APAC clusters for teams that need data pinned outside the US.",
  },
];

export default function CompanyPage() {
  return (
    <main className="bg-[color:var(--color-background)] text-[color:var(--color-foreground)] min-h-screen">
      <AnnouncementBar />
      <SiteHeader />
      <PageHero
        eyebrow="Company"
        title="Building the control plane for AI agents."
        body="Starguard is an early-stage company building the runtime that sits between enterprise agents and the systems they act on. Founder-led. Headquartered in California. Open to design partners."
      />
      <Beliefs />
      <Focus />
      <Founder />
      <SiteFooter />
    </main>
  );
}

function Beliefs() {
  return (
    <section className="section-y-sm">
      <div className="container-page">
        <RevealUp y={20} stagger={0.06} className="mb-12 max-w-[720px] space-y-3">
          <span className="label-mono text-[color:var(--color-foreground)]">Why Starguard</span>
          <h2 className="display-2 text-balance">Three bets we're making.</h2>
        </RevealUp>
        <RevealUp stagger={0.1} y={24} className="grid gap-5 md:grid-cols-3">
          {beliefs.map((b) => {
            const Icon = b.icon;
            return (
              <article key={b.title} className="card flex flex-col gap-4">
                <div className="grid h-11 w-11 place-items-center rounded-[10px] bg-[color:var(--color-icy-soft)] text-[color:var(--color-cobalt-deep)]">
                  <Icon size={20} strokeWidth={1.75} />
                </div>
                <span className="label-mono text-[color:var(--color-foreground)]">{b.label}</span>
                <h3 className="display-3">{b.title}</h3>
                <p className="body-md">{b.body}</p>
              </article>
            );
          })}
        </RevealUp>
      </div>
    </section>
  );
}

function Focus() {
  return (
    <section className="section-y bg-[color:var(--color-background-soft)] border-y border-[color:var(--color-line)]">
      <div className="container-page">
        <RevealUp y={20} stagger={0.06} className="mb-12 max-w-[720px] space-y-3">
          <span className="label-mono text-[color:var(--color-foreground)]">Where we are</span>
          <h2 className="display-2 text-balance">What we're shipping, in order.</h2>
          <p className="body-lg max-w-[560px]">
            Early-stage means narrow focus. The roadmap is public on purpose. And the priorities don't change quietly.
          </p>
        </RevealUp>
        <RevealUp stagger={0.08} y={24} className="grid gap-5 md:grid-cols-3">
          {focus.map((f) => (
            <article key={f.label} className="card flex flex-col gap-3">
              <span className="label-mono text-[color:var(--color-cobalt-deep)]">{f.label}</span>
              <h3 className="display-3 text-[22px]">{f.title}</h3>
              <p className="body-md">{f.body}</p>
            </article>
          ))}
        </RevealUp>
      </div>
    </section>
  );
}

function Founder() {
  return (
    <section className="bg-[color:var(--color-charcoal-2)] text-white">
      <div className="container-page section-y-sm">
        <RevealUp y={24} stagger={0.08} className="flex flex-col items-start gap-6">
          <span className="label-mono text-white/55">Founder</span>
          <h2 className="display-1 text-white text-balance">Silas Wu.</h2>
          <p className="body-lg max-w-[560px] text-white/70">
            Engineer, designer, and operator. Starguard is the company I'm building. Full-time, founder-led, and intentionally narrow until the runtime is right. If you're deploying agents into production and want a control layer, I'd like to hear from you.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Link className="btn-primary" href="mailto:silaswu4@gmail.com?subject=Starguard">
              Email me <ArrowRight size={14} />
            </Link>
            <Link className="btn-ghost-inverse" href="https://silaswu.dev">
              Portfolio <ArrowUpRight size={14} />
            </Link>
          </div>
        </RevealUp>
      </div>
    </section>
  );
}
