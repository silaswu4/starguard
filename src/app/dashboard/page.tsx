"use client";

import Link from "next/link";
import { ArrowRight, RotateCcw } from "lucide-react";
import { useAgentGate } from "@/components/agentgate-provider";
import { PageHeader, Badge, StatCard, agentName, formatDate, PayloadBlock } from "@/components/ui";
import { agents, policies } from "@/lib/data";

export default function DashboardPage() {
  const { actions, logs, resetDemo } = useAgentGate();
  const pending = actions.filter((action) => action.status === "pending");
  const blocked = actions.filter((action) => action.status === "blocked");
  const highRisk = actions.filter((action) => ["high", "critical"].includes(action.riskLevel));
  const completed = actions.filter((action) => action.status === "completed" || action.status === "approved");

  return (
    <>
      <PageHeader
        kicker="Governed Autonomy"
        title={<>Govern<br />the agents<br />running your<br />business.</>}
        copy="Policy, approvals, audit trails, and observability for enterprise agent systems."
        action={
          <button className="button primary" onClick={resetDemo}>
            <RotateCcw size={16} /> Reset Demo
          </button>
        }
      />

      <section className="grid dashboard-grid">
        <div className="grid">
          <div className="grid stats-grid">
            <StatCard label="Total agents" value={agents.length} meta="Registered systems" />
            <StatCard label="Active policies" value={policies.length} meta="Enforcement rules" />
            <StatCard label="Pending approvals" value={pending.length} meta="Awaiting review" />
            <StatCard label="Policy violations" value={blocked.length} meta="Blocked actions" />
          </div>

          <article className="panel panel-pad">
            <div className="row">
              <div>
                <span className="section-kicker">Approval Route</span>
                <h2>Requests awaiting authorization</h2>
              </div>
              <Link className="button" href="/approvals">
                Review <ArrowRight size={16} />
              </Link>
            </div>
            <div className="stack" style={{ marginTop: 18 }}>
              {pending.slice(0, 2).map((action) => (
                <div className="panel panel-pad" key={action.id}>
                  <div className="row">
                    <strong>{action.title}</strong>
                    <Badge value={action.riskLevel} />
                  </div>
                  <p className="page-copy">{action.evaluationExplanation}</p>
                  <PayloadBlock payload={action.payload} />
                </div>
              ))}
              {pending.length === 0 ? <div className="empty">No pending approvals. Run a scenario to refill the queue.</div> : null}
            </div>
          </article>
        </div>

        <aside className="panel panel-pad">
          <div className="row">
            <span className="section-kicker">System Coverage</span>
            <Badge value={highRisk.length > 0 ? "requires_approval" : "allowed"} />
          </div>
          <div style={{ margin: "22px 0 26px" }}>
            <span className="stat-value">{Math.round((completed.length / Math.max(actions.length, 1)) * 100)}%</span>
            <p className="meta">Actions contained by policy, approval, or audit record.</p>
          </div>
          <span className="section-kicker">Recent Audit</span>
          <div className="timeline">
            {logs.slice(0, 8).map((log) => (
              <div className="timeline-item" key={log.id}>
                <span className="caption">{formatDate(log.createdAt)}</span>
                <div>
                  <div className="row">
                    <strong>{log.eventType.replace("_", " ").replace(/\b\w/g, (letter) => letter.toUpperCase())}</strong>
                    <span className="caption">{agentName(log.agentId)}</span>
                  </div>
                  <p className="meta">{log.message}</p>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </section>
    </>
  );
}
