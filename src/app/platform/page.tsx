import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Database,
  Eye,
  GitBranch,
  ScrollText,
  Shield,
  Workflow,
} from "lucide-react";
import { AnnouncementBar } from "@/components/marketing/announcement-bar";
import { SiteHeader, SiteFooter, PageHero } from "@/components/marketing/site-chrome";
import { RevealUp } from "@/components/motion/reveal";
import { CodeBlock } from "@/components/code/highlight";

export const metadata: Metadata = {
  title: "Platform. Starguard",
  description:
    "The Starguard runtime: action proposal gateway, deterministic + ML policy engine, approval routing, and tamper-evident audit ledger. Built like security infrastructure.",
};

const capabilities = [
  {
    id: "discovery",
    icon: Eye,
    label: "Discovery & Inventory",
    title: "A live map of every agent",
    body: "Continuous discovery of agents across SDK callers, REST endpoints, model gateways, and identity providers. Each agent carries owner, environment, tool scope, risk class, and lifecycle state.",
    points: [
      "Auto-detect via SDK telemetry, OpenAI Assistants API, AWS Bedrock Agents, Vertex Agent Builder",
      "Owner + accountable team enforced at registration",
      "Lifecycle states: proposed · sandbox · staged · production · paused · deprecated",
      "Risk class inherited from tool scope and data classification",
    ],
  },
  {
    id: "policy",
    icon: Shield,
    label: "Policy Engine",
    title: "Deterministic rules + ML risk, in one decision",
    body: "A composable policy stack: OPA-compatible rules for hard guarantees, fine-tuned classifiers for fuzzy intent, and structured outputs for explainable verdicts. Sub-50ms p99 evaluation.",
    points: [
      "OPA dialect for hard rules: spend caps, tool allowlists, data residency, jurisdiction",
      "Fine-tuned risk classifiers for prompt injection, PII, output toxicity, exfiltration intent",
      "Policy bundles version-controlled, signed, and rolled out by canary",
      "Every verdict carries reasoning trail: rules fired, scores triggered, prior context",
    ],
  },
  {
    id: "approvals",
    icon: Workflow,
    label: "Approval Routes",
    title: "Human-in-the-loop, integrated into your workflow",
    body: "Flagged actions reach the right reviewer in the right surface, with the full context they need to decide in seconds. Escalation chains, SLA timers, and on-call awareness built in.",
    points: [
      "Routing: Slack, Microsoft Teams, Jira, Linear, PagerDuty, email, ServiceNow",
      "SLA timers with escalation chains (1→2→3 reviewers · pager fallback)",
      "Step-up MFA on sensitive approval (WebAuthn, TOTP, push-based)",
      "Reviewer context: payload, policy reasoning, prior decisions, agent track record",
    ],
  },
  {
    id: "audit",
    icon: ScrollText,
    label: "Audit Ledger",
    title: "Tamper-evident evidence by construction",
    body: "Every event lands in an append-only write-ahead log with Merkle hash chaining. Roots are anchored every 5 minutes. Customers can verify integrity independently with the published verifier.",
    points: [
      "Append-only WAL with Merkle root chaining",
      "Anchored checkpoints every 5 min · published cross-customer transparency log",
      "Export: S3, GCS, Azure Blob, customer-owned bucket",
      "Format: JSON, CEF, LEEF, OCSF (Open Cybersecurity Schema Framework)",
    ],
  },
  {
    id: "integrations",
    icon: GitBranch,
    label: "Integrations",
    title: "Connects to the stack you already trust",
    body: "First-party connectors for model providers, agent frameworks, approval surfaces, identity, observability, and warehouse. SDKs for TypeScript, Python, and Go.",
    points: [
      "Models: OpenAI, Anthropic, Bedrock, Vertex, Azure OpenAI, Cohere, Mistral",
      "Frameworks: LangChain, LlamaIndex, CrewAI, OpenAI Assistants, Vercel AI SDK",
      "Identity: Okta, Entra ID, JumpCloud, Google, Auth0, OneLogin, Duo",
      "Observability: Datadog, Splunk, Grafana, New Relic, Sumo Logic, OpenTelemetry",
    ],
  },
  {
    id: "observability",
    icon: Database,
    label: "Observability & Analytics",
    title: "Operational telemetry, by agent and by policy",
    body: "Real-time dashboards over agent health, policy hit rates, approval latency, and reviewer load. OpenTelemetry exports to your existing observability stack. SIEM-ready audit streams.",
    points: [
      "Live dashboards: agents · policies · approvals · risk · reviewer load",
      "OTLP exports to Datadog, Splunk, Grafana, New Relic",
      "SIEM streams in CEF, LEEF, OCSF, JSON",
      "Anomaly detection on agent behavior baselines",
    ],
  },
] as const;

export default function PlatformPage() {
  return (
    <main className="bg-[color:var(--color-background)] text-[color:var(--color-foreground)] min-h-screen">
      <AnnouncementBar />
      <SiteHeader />
      <PageHero
        eyebrow="Platform"
        title="A four-layer runtime, operated like security infrastructure."
        body="Starguard is built on the same posture as your KMS, auth, and audit stack. Every action proposed by an agent flows through ingress, decision, routing, and evidence. Composable primitives, exposed as a clean API."
      />

      <RuntimeDiagram />
      <Capabilities />
      <DeploymentSection />
      <IntegrationsGrid />
      <ApiPreview />
      <PolicyExample />
      <ClosingCTA />
      <SiteFooter />
    </main>
  );
}

const deploymentModels = [
  {
    name: "SaaS",
    audience: "Default · fastest path",
    body: "Multi-tenant control plane with region pinning. Managed updates and active-active topology.",
    points: ["Multi-tenant · region-pinned", "Managed updates", "BYOK via KMS"],
  },
  {
    name: "Dedicated VPC",
    audience: "Regulated workloads",
    body: "Single-tenant compute in a VPC you peer with. Your encryption keys, your audit-log bucket, your region.",
    points: ["Single-tenant compute", "VPC peering · PrivateLink", "Customer-owned audit storage"],
  },
  {
    name: "Self-Hosted",
    audience: "Air-gapped · on-prem",
    body: "Helm chart distribution to your Kubernetes cluster. Signed images, SBOM included, air-gapped registries supported.",
    points: ["Helm chart · K8s 1.27+", "Signed images · SBOM", "Air-gapped install"],
  },
];

const integrationGroups = [
  { group: "Model Providers", items: ["OpenAI", "Anthropic", "AWS Bedrock", "Vertex AI", "Azure OpenAI", "Mistral", "Cohere"] },
  { group: "Agent Frameworks", items: ["LangChain", "LlamaIndex", "CrewAI", "OpenAI Assistants", "Vercel AI SDK", "Anthropic SDK", "AutoGen"] },
  { group: "Approval Surfaces", items: ["Slack", "Microsoft Teams", "Jira", "Linear", "PagerDuty", "ServiceNow", "Email"] },
  { group: "Identity & SSO", items: ["Okta", "Microsoft Entra ID", "JumpCloud", "Google Workspace", "Auth0", "OneLogin"] },
  { group: "Observability", items: ["Datadog", "Splunk", "New Relic", "Grafana Cloud", "Sumo Logic", "OpenTelemetry"] },
  { group: "Data & Warehouse", items: ["Snowflake", "Databricks", "BigQuery", "Redshift", "S3", "Postgres"] },
];

function DeploymentSection() {
  return (
    <section id="deployment" className="section-y bg-[color:var(--color-background-soft)] border-y border-[color:var(--color-line)]">
      <div className="container-page">
        <RevealUp y={20} stagger={0.06} className="mb-10 flex flex-col gap-4">
          <span className="label-mono text-[color:var(--color-foreground)]">Deployment</span>
          <h2 className="display-2 text-balance">Run Starguard where your data already lives.</h2>
          <p className="body-lg max-w-[640px]">
            From a 30-minute SaaS evaluation to an air-gapped self-hosted deployment. The same product, three postures, no code rewrites between tiers.
          </p>
        </RevealUp>
        <RevealUp stagger={0.08} y={24} className="grid gap-6 lg:grid-cols-3">
          {deploymentModels.map((m, idx) => (
            <article key={m.name} className="card flex flex-col gap-5 p-7">
              <div className="flex items-baseline justify-between">
                <span className="label-mono text-[color:var(--color-cobalt-deep)]">{`Model ${String(idx + 1).padStart(2, "0")}`}</span>
                <span className="label-mono-sm text-[color:var(--color-muted-light)]">{m.audience}</span>
              </div>
              <h3 className="display-3">{m.name}</h3>
              <p className="body-md">{m.body}</p>
              <ul className="mt-2 space-y-2 border-t border-[color:var(--color-line)] pt-4">
                {m.points.map((p) => (
                  <li key={p} className="flex items-center gap-2 text-[13px] text-[color:var(--color-foreground-soft)]">
                    <CheckCircle2 size={14} className="text-[color:var(--color-cobalt)]" />
                    {p}
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

function IntegrationsGrid() {
  return (
    <section id="integrations" className="section-y">
      <div className="container-page">
        <RevealUp y={20} stagger={0.06} className="mb-10 flex flex-col gap-4">
          <span className="label-mono text-[color:var(--color-foreground)]">Integrations</span>
          <h2 className="display-2 text-balance">Plugs into the stack you already run.</h2>
          <p className="body-lg max-w-[640px]">
            Model providers, agent frameworks, approval surfaces, identity, observability, and warehouse. First-party connectors for every system enterprise teams already trust.
          </p>
        </RevealUp>
        <RevealUp stagger={0.06} y={20} className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {integrationGroups.map((group) => (
            <article key={group.group} className="card-flat min-h-[180px]">
              <span className="label-mono text-[color:var(--color-foreground)]">{group.group}</span>
              <ul className="mt-5 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-[6px] border border-[color:var(--color-line)] bg-[color:var(--color-background)] px-2.5 py-1 text-[12px] font-medium text-[color:var(--color-foreground-soft)]"
                  >
                    {item}
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

function RuntimeDiagram() {
  const layers = [
    { name: "Ingress", body: "SDK · REST · Webhooks", footer: "TypeScript · Python · Go · OpenAPI 3.1" },
    { name: "Decision", body: "Policy Engine", footer: "OPA rules + classifier · sub-50ms p99" },
    { name: "Routing", body: "Human-in-the-Loop", footer: "Slack · Teams · Jira · PagerDuty" },
    { name: "Evidence", body: "Audit Ledger", footer: "Merkle-chained WAL · SIEM export" },
  ];
  return (
    <section className="section-y-sm">
      <div className="container-page">
        <RevealUp y={28} className="rounded-[14px] border border-[color:var(--color-line)] bg-white p-8">
          <div className="mb-6 flex items-center justify-between">
            <span className="label-mono text-[color:var(--color-foreground)]">Runtime</span>
            <span className="label-mono-sm">Action proposal → verdict → evidence</span>
          </div>
          <div className="grid gap-4 md:grid-cols-4">
            {layers.map((l, idx) => (
              <div key={l.name} className="flex flex-col gap-3 rounded-[10px] border border-[color:var(--color-line)] bg-[color:var(--color-background-soft)] p-5">
                <div className="flex items-center justify-between">
                  <span className="label-mono text-[color:var(--color-cobalt-deep)]">L{String(idx + 1).padStart(2, "0")}</span>
                  <span className="label-mono-sm text-[color:var(--color-muted-light)]">{idx + 1}/4</span>
                </div>
                <span className="text-[14px] font-semibold text-[color:var(--color-foreground)]">{l.name}</span>
                <span className="text-[16px] font-semibold tracking-[-0.025em] text-[color:var(--color-foreground)]">{l.body}</span>
                <p className="text-[12px] text-[color:var(--color-muted)]" style={{ fontFamily: "var(--font-mono-stack)" }}>{l.footer}</p>
              </div>
            ))}
          </div>
        </RevealUp>
      </div>
    </section>
  );
}

function Capabilities() {
  return (
    <section className="section-y">
      <div className="container-page">
        <RevealUp y={20} stagger={0.06} className="mb-10 flex flex-col gap-4">
          <span className="label-mono text-[color:var(--color-foreground)]">Capabilities</span>
          <h2 className="display-2 text-balance">Every primitive, documented and exposed.</h2>
        </RevealUp>
        <RevealUp stagger={0.08} y={28} className="grid gap-6 lg:grid-cols-2">
          {capabilities.map((c) => {
            const Icon = c.icon;
            return (
              <article id={c.id} key={c.id} className="card flex flex-col gap-5 p-7 scroll-mt-24">
                <div className="grid h-11 w-11 place-items-center rounded-[10px] bg-[color:var(--color-icy-soft)] text-[color:var(--color-cobalt-deep)]">
                  <Icon size={20} strokeWidth={1.75} />
                </div>
                <span className="label-mono text-[color:var(--color-foreground)]">{c.label}</span>
                <h3 className="display-3">{c.title}</h3>
                <p className="body-md max-w-[520px]">{c.body}</p>
                <ul className="mt-2 space-y-2 border-t border-[color:var(--color-line)] pt-4">
                  {c.points.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-[13.5px] text-[color:var(--color-foreground-soft)]">
                      <CheckCircle2 size={14} className="mt-0.5 flex-shrink-0 text-[color:var(--color-cobalt)]" />
                      <span>{p}</span>
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

function ApiPreview() {
  return (
    <section className="section-y bg-[color:var(--color-background-soft)] border-y border-[color:var(--color-line)]">
      <div className="container-page">
        <RevealUp y={24} stagger={0.1} className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div>
            <span className="label-mono text-[color:var(--color-foreground)]">SDK</span>
            <h2 className="display-2 mt-4 text-balance">Three lines from agent to governed.</h2>
            <p className="body-lg mt-5">
              The Starguard SDK wraps any tool call. Propose the action, await the verdict, execute on allow. Idempotent, traced, and signed end to end.
            </p>
            <ul className="mt-6 space-y-3 text-[14px] text-[color:var(--color-foreground-soft)]">
              {[
                "TypeScript, Python, Go. First-party",
                "Local circuit breaker · 5ms fail-closed default",
                "Trace headers compatible with OpenTelemetry · W3C Trace Context",
                "Replay-safe via idempotency keys",
              ].map((p) => (
                <li key={p} className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[color:var(--color-cobalt)]" /> {p}
                </li>
              ))}
            </ul>
          </div>
          <CodeBlock
            language="ts"
            filename="starguard.ts"
            caption="TypeScript SDK"
            code={`import { Starguard } from "@starguard/sdk";

const sg = new Starguard({
  agentId: "vendor-research-agent",
  region: "us-east-1",
});

const verdict = await sg.propose({
  tool: "SendEmail",
  payload: { to, subject, body },
  risk: { hasPII: containsPII(body) },
});

if (verdict.decision === "ALLOW") {
  await mailer.send({ to, subject, body });
} else if (verdict.decision === "REVIEW") {
  return verdict.approvalUrl;
} else {
  throw new BlockedActionError(verdict.reasons);
}`}
          />
        </RevealUp>
      </div>
    </section>
  );
}

function PolicyExample() {
  return (
    <section className="section-y">
      <div className="container-page">
        <RevealUp y={24} stagger={0.1} className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <CodeBlock
            language="rego"
            filename="policy.rego"
            caption="OPA dialect"
            code={`package starguard.policy

# Block external email if payload contains
# customer PII fields.
deny["pii_in_external_email"] {
  input.tool == "SendEmail"
  is_external(input.payload.to)
  pii.detect(input.payload.body)
}

# Route any spend over $1,000 to review.
review["spend_threshold"] {
  input.tool == "Procurement.PlaceOrder"
  input.payload.amount_usd > 1000
}

# Allow vendor lookup with cached results.
allow["vendor_lookup"] {
  input.tool == "VendorDB.Lookup"
  input.payload.use_cache == true
}`}
          />
          <div>
            <span className="label-mono text-[color:var(--color-foreground)]">Policy</span>
            <h2 className="display-2 mt-4 text-balance">Policies you can read, version, and test.</h2>
            <p className="body-lg mt-5">
              Rules live in a familiar OPA-compatible dialect. Each bundle is signed, version-controlled, and rolled out by canary. Test against historical action traces before production.
            </p>
            <ul className="mt-6 space-y-3 text-[14px] text-[color:var(--color-foreground-soft)]">
              {[
                "git-native: policies live in your repo, gated by your PR review",
                "Replay against the last 30 days of traffic before promotion",
                "Canary rollouts with automatic rollback on verdict-rate anomaly",
                "Policy templates for OWASP LLM Top 10 and MITRE ATLAS",
              ].map((p) => (
                <li key={p} className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[color:var(--color-cobalt)]" /> {p}
                </li>
              ))}
            </ul>
          </div>
        </RevealUp>
      </div>
    </section>
  );
}

function ClosingCTA() {
  return (
    <section className="bg-[color:var(--color-charcoal-2)] text-white">
      <div className="container-page section-y-sm grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-20">
        <RevealUp y={20} stagger={0.06} className="flex flex-col gap-6">
          <h2 className="display-1 text-white text-balance">Ready to govern your agents?</h2>
          <p className="body-lg max-w-[480px] text-white/70">
            Start free or book a 30-minute architecture walkthrough with a Starguard solutions engineer.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Link className="btn-primary" href="/pricing">
              Book a demo <ArrowRight size={14} />
            </Link>
            <Link className="btn-ghost-inverse" href="/security">
              Trust center
            </Link>
          </div>
        </RevealUp>
        <RevealUp stagger={0.08} y={20} className="grid grid-cols-2 gap-4">
          {[
            { label: "p99 evaluation", value: "< 50ms" },
            { label: "Audit retention", value: "Up to 7 yr" },
            { label: "Regions", value: "4+" },
            { label: "Deployment modes", value: "3" },
          ].map((m) => (
            <div key={m.label} className="flex min-h-[160px] flex-col justify-between rounded-[10px] bg-[color:var(--color-background)] p-5 text-[color:var(--color-foreground)]">
              <span className="label-mono-sm">{m.label}</span>
              <p className="metric-value mt-3 text-[34px]">{m.value}</p>
            </div>
          ))}
        </RevealUp>
      </div>
    </section>
  );
}
