import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Database,
  FileSearch,
  Globe2,
  KeyRound,
  Lock,
  Network,
  ShieldCheck,
} from "lucide-react";
import { AnnouncementBar } from "@/components/marketing/announcement-bar";
import { SiteHeader, SiteFooter, PageHero } from "@/components/marketing/site-chrome";
import { RevealUp } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Trust. Starguard",
  description:
    "How Starguard is designed to handle security review. The controls, frameworks, and primitives the runtime is architected around.",
};

const frameworks = [
  { name: "SOC 2 Type II", body: "Controls and evidence flow modeled against AICPA Trust Service Principles. Change management, least privilege, audit trail, incident response." },
  { name: "ISO 27001 / 27701", body: "Information security and privacy management primitives wired through the runtime, ready for ISMS coverage." },
  { name: "GDPR", body: "Data minimization, region pinning, controller/processor boundaries, and subject-access workflows are first-class concepts." },
  { name: "NIST AI RMF 1.0", body: "Policy templates and audit categories map to the Govern, Map, Measure, Manage functions of the NIST AI risk framework." },
  { name: "MITRE ATLAS", body: "Threat coverage templates aligned to the ATLAS tactic and technique taxonomy for adversarial ML." },
  { name: "OWASP LLM Top 10", body: "Default policy bundles cover each of the OWASP LLM application security risks, from prompt injection through training-data leakage." },
];

const pillars = [
  {
    icon: KeyRound,
    label: "Encryption",
    title: "AES-256-GCM at rest · TLS 1.3 in transit",
    points: [
      "Bring-your-own-key via AWS KMS, GCP Cloud KMS, or Azure Key Vault",
      "Hold-your-own-key path via FIPS 140-3 Level 3 HSM (architectural)",
      "Field-level redaction before policy evaluation",
      "TLS 1.3 with modern cipher suites · HSTS preload eligible",
    ],
  },
  {
    icon: Lock,
    label: "Identity & Access",
    title: "SAML · OIDC · SCIM · RBAC + ABAC",
    points: [
      "SAML 2.0 SSO with any conforming IdP",
      "SCIM 2.0 provisioning · automated offboarding",
      "Role-based at workspace · attribute-based on policies and queues",
      "Step-up MFA on sensitive approvals (WebAuthn, TOTP, push)",
    ],
  },
  {
    icon: Globe2,
    label: "Data Residency",
    title: "Region pinning across four continents",
    points: [
      "US, EU, UK, and APAC architectural regions",
      "Sub-processor list designed for quarterly publication",
      "No cross-region replication unless explicitly enabled",
      "EU Data Act and GDPR mapping included",
    ],
  },
  {
    icon: Network,
    label: "Network",
    title: "VPC peering · PrivateLink · dual stack",
    points: [
      "VPC peering or PrivateLink endpoints for self-hosted deployments",
      "Documented outbound allowlist for SaaS",
      "IPv6-ready, IPv4-native, dual-stack capable",
      "Private DNS resolution via Route 53 Resolver or equivalent",
    ],
  },
  {
    icon: Database,
    label: "Privacy",
    title: "Zero-retention mode · tokenization",
    points: [
      "Zero-retention mode: evaluate without persisting payloads",
      "Tokenize PII, PHI, and PCI fields before evaluation",
      "Differential privacy for aggregate analytics",
      "Customer-owned audit storage (S3, GCS, Azure Blob)",
    ],
  },
  {
    icon: FileSearch,
    label: "Audit & Evidence",
    title: "Tamper-evident by construction",
    points: [
      "Append-only Merkle-chained write-ahead log",
      "Anchored checkpoints on a regular cadence",
      "Export formats: JSON, CEF, LEEF, OCSF",
      "SIEM streams to Splunk, Datadog, Sumo Logic, Grafana, Sentinel",
    ],
  },
];

const operatingPractices = [
  {
    title: "Secure SDLC",
    body: "PR review enforced, signed commits, SLSA-style supply-chain posture, dependency scanning, container image scanning on every build, SBOM emitted per release.",
  },
  {
    title: "Vulnerability management",
    body: "Architectural support for independent penetration testing on a regular cadence. Coordinated-disclosure workflow with safe-harbor terms.",
  },
  {
    title: "Incident response",
    body: "On-call runbooks, PagerDuty-driven escalation, target RPO ≤ 5 minutes and RTO ≤ 1 hour. Customer notification path designed for 24-hour acknowledgement on confirmed incidents.",
  },
  {
    title: "Personnel",
    body: "Background checks at hire. Annual security and privacy training. Production access gated by least-privilege RBAC, just-in-time elevation, and session recording.",
  },
  {
    title: "Business continuity",
    body: "Active-active across three availability zones per region. Quarterly DR exercise cadence. Annual third-party BCP review path included in the architecture.",
  },
  {
    title: "Sub-processors",
    body: "Public sub-processor list with purpose and region. 30-day notice on additions. Standard Contractual Clauses with EU sub-processors.",
  },
];

export default function SecurityPage() {
  return (
    <main className="bg-[color:var(--color-background)] text-[color:var(--color-foreground)] min-h-screen">
      <AnnouncementBar />
      <SiteHeader />
      <PageHero
        eyebrow="Trust"
        title="Designed to pass the review, not just sound like it."
        body="Starguard is architected around the controls security and compliance teams actually look for. Identity-first, encrypted by default, region-pinned, and tamper-evident at the audit layer."
      />
      <FrameworksRow />
      <Pillars />
      <Operating />
      <RequestPack />
      <SiteFooter />
    </main>
  );
}

function FrameworksRow() {
  return (
    <section className="section-y-sm">
      <div className="container-page">
        <RevealUp y={20} stagger={0.06} className="mb-10 max-w-[720px] space-y-3">
          <span className="label-mono text-[color:var(--color-foreground)]">Frameworks</span>
          <h2 className="display-2 text-balance">Modeled on the frameworks your team already uses.</h2>
        </RevealUp>
        <RevealUp y={20} className="overflow-hidden rounded-[14px] border border-[color:var(--color-line)]">
          <div className="grid gap-px bg-[color:var(--color-line)] md:grid-cols-2 lg:grid-cols-3">
            {frameworks.map((c) => (
              <article key={c.name} className="flex flex-col gap-3 bg-white p-6">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={16} className="text-[color:var(--color-cobalt)]" />
                  <span className="label-mono text-[color:var(--color-foreground)]">{c.name}</span>
                </div>
                <p className="body-md">{c.body}</p>
              </article>
            ))}
          </div>
        </RevealUp>
      </div>
    </section>
  );
}

function Pillars() {
  return (
    <section className="section-y bg-[color:var(--color-background-soft)] border-y border-[color:var(--color-line)]">
      <div className="container-page">
        <RevealUp y={20} stagger={0.06} className="mb-12 max-w-[720px] space-y-3">
          <span className="label-mono text-[color:var(--color-foreground)]">Security pillars</span>
          <h2 className="display-2 text-balance">How Starguard protects data and reviewers.</h2>
        </RevealUp>
        <RevealUp stagger={0.08} y={24} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <article key={p.title} className="card flex flex-col gap-4">
                <div className="grid h-11 w-11 place-items-center rounded-[10px] bg-[color:var(--color-icy-soft)] text-[color:var(--color-cobalt-deep)]">
                  <Icon size={20} strokeWidth={1.75} />
                </div>
                <span className="label-mono text-[color:var(--color-foreground)]">{p.label}</span>
                <h3 className="display-3 text-[20px]">{p.title}</h3>
                <ul className="space-y-2 border-t border-[color:var(--color-line)] pt-3">
                  {p.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2 text-[13px] text-[color:var(--color-foreground-soft)]">
                      <CheckCircle2 size={13} className="mt-0.5 flex-shrink-0 text-[color:var(--color-cobalt)]" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </RevealUp>
      </div>
    </section>
  );
}

function Operating() {
  return (
    <section className="section-y">
      <div className="container-page">
        <RevealUp y={20} stagger={0.06} className="mb-12 max-w-[720px] space-y-3">
          <span className="label-mono text-[color:var(--color-foreground)]">Operations</span>
          <h2 className="display-2 text-balance">How the system would be operated, day to day.</h2>
        </RevealUp>
        <RevealUp y={20} className="overflow-hidden rounded-[14px] border border-[color:var(--color-line)] bg-white">
          {operatingPractices.map((p, i) => (
            <div
              key={p.title}
              className={`grid gap-3 px-6 py-5 md:grid-cols-[260px_1fr] md:gap-10 md:px-8 ${
                i !== operatingPractices.length - 1 ? "border-b border-[color:var(--color-line)]" : ""
              }`}
            >
              <div className="flex items-baseline gap-3">
                <span className="label-mono-sm text-[color:var(--color-cobalt-deep)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-[16px] font-semibold tracking-[-0.02em] text-[color:var(--color-foreground)]">
                  {p.title}
                </h3>
              </div>
              <p className="text-[14.5px] leading-[1.55] text-[color:var(--color-muted)]">{p.body}</p>
            </div>
          ))}
        </RevealUp>
      </div>
    </section>
  );
}

function RequestPack() {
  return (
    <section className="bg-[color:var(--color-charcoal-2)] text-white">
      <div className="container-page section-y-sm">
        <RevealUp y={24} stagger={0.08} className="flex flex-col items-start gap-6">
          <h2 className="display-1 text-white text-balance">Have a security question?</h2>
          <p className="body-lg max-w-[480px] text-white/70">
            Bring your toughest review question. About identity, key custody, audit format, or residency. Happy to dig in.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Link className="btn-primary" href="mailto:hello@starguard.ai?subject=Security%20question">
              Email me <ArrowRight size={14} />
            </Link>
            <Link className="btn-ghost-inverse" href="/platform">
              Read the platform overview
            </Link>
          </div>
        </RevealUp>
      </div>
    </section>
  );
}
