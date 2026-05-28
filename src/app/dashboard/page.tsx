"use client";

import Link from "next/link";
import { ArrowRight, RotateCcw } from "lucide-react";
import { useAgentGate } from "@/components/agentgate-provider";
import { PageHeader, Badge, StatCard, agentName, formatDate, PayloadBlock } from "@/components/ui";
import { agents } from "@/lib/data";

export default function DashboardPage() {
  const { actions, logs, resetDemo } = useAgentGate();
  const pending = actions.filter((action) => action.status === "pending");
  const blocked = actions.filter((action) => action.status === "blocked");
  const highRisk = actions.filter((action) => ["high", "critical"].includes(action.riskLevel));

  return (
    <>
      <PageHeader
        kicker="00 / Control Room"
        title="Agent actions, gated before they touch the business"
        copy="A portfolio-ready MVP for registering agents, evaluating proposed actions, routing risky work to a human, and preserving audit evidence."
        action={
          <button className="button" onClick={resetDemo}>
            <RotateCcw size={16} /> Reset Demo
          </button>
        }
      />

      <section className="grid dashboard-grid">
        <div className="grid">
          <div className="grid stats-grid">
            <StatCard label="Pending approvals" value={pending.length} meta="Waiting on reviewer" />
            <StatCard label="Actions evaluated" value={actions.length} meta="In this local demo" />
            <StatCard label="Blocked actions" value={blocked.length} meta="Stopped by policy" />
            <StatCard label="Active agents" value={agents.length} meta="Registered workflows" />
            <StatCard label="High-risk actions" value={highRisk.length} meta="High or critical" />
            <StatCard label="Audit events" value={logs.length} meta="Stored evidence" />
          </div>

          <article className="panel panel-pad">
            <div className="row">
              <div>
                <span className="section-kicker">Approval Queue</span>
                <h2>Requests that need a human</h2>
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
