"use client";

import { Check, X } from "lucide-react";
import { useAgentGate } from "@/components/agentgate-provider";
import { PageHeader, Badge, PayloadBlock, agentName, formatDate } from "@/components/ui";

export default function ApprovalsPage() {
  const { actions, approveAction, rejectAction } = useAgentGate();
  const pending = actions.filter((action) => action.status === "pending");
  const history = actions.filter((action) => action.status !== "pending");

  return (
    <>
      <PageHeader
        kicker="04 / Human Review"
        title="The approval inbox is the product moment"
        copy="Review the proposed action, inspect the triggered policies, then approve or reject. Blocked actions stay visible but cannot be approved."
      />
      <section className="stack">
        {pending.map((action) => (
          <article className="panel panel-pad stack" key={action.id}>
            <div className="row">
              <div>
                <span className="caption">{agentName(action.agentId)} / {formatDate(action.createdAt)}</span>
                <h2>{action.title}</h2>
              </div>
              <div>
                <Badge value={action.status} /> <Badge value={action.riskLevel} />
              </div>
            </div>
            <p className="page-copy">{action.evaluationExplanation}</p>
            <div className="grid list-grid">
              {action.triggeredPolicies.map((policy) => (
                <div className="panel panel-pad" key={`${action.id}-${policy.name}`}>
                  <div className="row">
                    <strong>{policy.name}</strong>
                    <Badge value={policy.severity} />
                  </div>
                  <p className="meta">{policy.reason}</p>
                </div>
              ))}
            </div>
            <PayloadBlock payload={action.payload} />
            <div className="row">
              <span className="caption">{action.tool} / {action.recipient ?? action.entityName ?? "internal"}</span>
              <div>
                <button className="button primary" onClick={() => approveAction(action.id)}>
                  <Check size={16} /> Approve
                </button>{" "}
                <button className="button danger" onClick={() => rejectAction(action.id)}>
                  <X size={16} /> Reject
                </button>
              </div>
            </div>
          </article>
        ))}
        {pending.length === 0 ? <div className="empty">No pending approvals. The playground can create more.</div> : null}

        <article className="panel panel-pad">
          <span className="section-kicker">Resolved and Blocked</span>
          <div className="timeline">
            {history.slice(0, 8).map((action) => (
              <div className="timeline-item" key={action.id}>
                <span className="caption">{formatDate(action.updatedAt)}</span>
                <div>
                  <div className="row">
                    <strong>{action.title}</strong>
                    <Badge value={action.status} />
                  </div>
                  <p className="meta">{action.evaluationExplanation}</p>
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>
    </>
  );
}
