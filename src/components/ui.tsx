import { agents } from "@/lib/data";
import type { ActionRequest, PolicyDecision, RiskLevel } from "@/lib/types";

export function PageHeader({
  kicker,
  title,
  copy,
  action
}: {
  kicker: string;
  title: React.ReactNode;
  copy: string;
  action?: React.ReactNode;
}) {
  return (
    <header className="page-head">
      <div>
        <div className="mast">§ {kicker}</div>
        <h1 className="page-title">{title}</h1>
        <p className="page-copy">{copy}</p>
      </div>
      {action}
    </header>
  );
}

export function Badge({ value }: { value: RiskLevel | PolicyDecision | ActionRequest["status"] }) {
  const label = value
    .replace("_", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
  return <span className={`badge ${value}`}>{label}</span>;
}

export function StatCard({ label, value, meta }: { label: string; value: string | number; meta: string }) {
  return (
    <article className="panel panel-pad">
      <span className="stat-label">{label}</span>
      <strong className="stat-value">{value}</strong>
      <span className="meta">{meta}</span>
    </article>
  );
}

export function agentName(id: string) {
  return agents.find((agent) => agent.id === id)?.name ?? "Unknown agent";
}

export function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit"
  }).format(new Date(value));
}

export function PayloadBlock({ payload }: { payload: Record<string, unknown> }) {
  return <pre className="payload">{JSON.stringify(payload, null, 2)}</pre>;
}
