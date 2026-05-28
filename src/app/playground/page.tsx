"use client";

import { useMemo, useState } from "react";
import { Play, Terminal } from "lucide-react";
import { useAgentGate } from "@/components/agentgate-provider";
import { PageHeader, Badge, PayloadBlock } from "@/components/ui";
import { scenarios } from "@/lib/scenarios";
import type { ActionRequest } from "@/lib/types";

export default function PlaygroundPage() {
  const { runScenario } = useAgentGate();
  const [selected, setSelected] = useState(scenarios[0].id);
  const [latest, setLatest] = useState<ActionRequest | null>(null);
  const scenario = useMemo(() => scenarios.find((item) => item.id === selected) ?? scenarios[0], [selected]);

  return (
    <>
      <PageHeader
        kicker="03 / Simulation"
        title="Run agent actions through the gate"
        copy="Choose a scenario, create an action request, and watch the deterministic policy engine decide whether it is allowed, blocked, or routed to approvals."
      />
      <section className="split">
        <div className="stack">
          {scenarios.map((item) => (
            <button
              className={`button scenario-button ${item.id === selected ? "active" : ""}`}
              key={item.id}
              onClick={() => setSelected(item.id)}
            >
              <span>
                <strong>{item.name}</strong>
                <br />
                <span className="caption">{item.signal}</span>
              </span>
              <Play size={16} />
            </button>
          ))}
        </div>

        <article className="panel panel-pad stack">
          <div className="row">
            <div>
              <span className="section-kicker">Selected Scenario</span>
              <h2>{scenario.name}</h2>
            </div>
            <button className="button primary" onClick={() => setLatest(runScenario(selected))}>
              <Terminal size={16} /> Run
            </button>
          </div>
          <p className="page-copy">{scenario.inputGoal}</p>
          <PayloadBlock payload={scenario.action.payload} />

          {latest ? (
            <div className="panel panel-pad stack">
              <div className="row">
                <strong>Evaluation Result</strong>
                <div>
                  <Badge value={latest.decision} /> <Badge value={latest.riskLevel} />
                </div>
              </div>
              <p className="page-copy">{latest.evaluationExplanation}</p>
              <div className="stack">
                {latest.triggeredPolicies.map((policy) => (
                  <div className="row" key={`${latest.id}-${policy.name}`}>
                    <span>{policy.name}</span>
                    <Badge value={policy.severity} />
                  </div>
                ))}
                {latest.triggeredPolicies.length === 0 ? <span className="caption">No policies triggered</span> : null}
              </div>
            </div>
          ) : (
            <div className="empty">Run the scenario to generate an action request.</div>
          )}
        </article>
      </section>
    </>
  );
}
