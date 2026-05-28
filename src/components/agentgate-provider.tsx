"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { agents } from "@/lib/data";
import { evaluateAction } from "@/lib/policy-engine";
import { scenarios } from "@/lib/scenarios";
import type { ActionRequest, ActionStatus, AuditLog, Scenario } from "@/lib/types";

type AgentGateContextValue = {
  actions: ActionRequest[];
  logs: AuditLog[];
  runScenario: (scenarioId: string) => ActionRequest;
  approveAction: (id: string) => void;
  rejectAction: (id: string) => void;
  resetDemo: () => void;
};

const AgentGateContext = createContext<AgentGateContextValue | undefined>(undefined);
const actionKey = "agentgate.actions.v3";
const logKey = "agentgate.logs.v3";

const seedTime = new Date("2026-05-27T19:20:00.000Z").toISOString();

function id(prefix: string) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

function statusForDecision(decision: ActionRequest["decision"]): ActionStatus {
  if (decision === "blocked") return "blocked";
  if (decision === "allowed") return "completed";
  return "pending";
}

function createActionFromScenario(scenario: Scenario, createdAt = new Date().toISOString()): ActionRequest {
  const agent = agents.find((item) => item.name === scenario.agentName) ?? agents[0];
  const input = { ...scenario.action, agentId: agent.id };
  const evaluation = evaluateAction(input);

  return {
    ...input,
    id: id("act"),
    riskLevel: evaluation.riskLevel,
    decision: evaluation.decision,
    status: statusForDecision(evaluation.decision),
    triggeredPolicies: evaluation.triggeredPolicies,
    evaluationExplanation: evaluation.explanation,
    createdAt,
    updatedAt: createdAt
  };
}

function logsForAction(action: ActionRequest, createdAt = action.createdAt): AuditLog[] {
  const logs: AuditLog[] = [
    {
      id: id("log"),
      actionRequestId: action.id,
      agentId: action.agentId,
      eventType: "action_created",
      message: `${action.title} was proposed by ${agents.find((agent) => agent.id === action.agentId)?.name}.`,
      metadata: { tool: action.tool, actionType: action.actionType },
      createdAt
    },
    {
      id: id("log"),
      actionRequestId: action.id,
      agentId: action.agentId,
      eventType: "policy_evaluated",
      message: action.evaluationExplanation,
      metadata: { decision: action.decision, riskLevel: action.riskLevel },
      createdAt
    }
  ];

  if (action.status === "pending") {
    logs.push({
      id: id("log"),
      actionRequestId: action.id,
      agentId: action.agentId,
      eventType: "approval_requested",
      message: `${action.title} entered the human approval queue.`,
      metadata: { triggeredPolicies: action.triggeredPolicies.map((policy) => policy.name) },
      createdAt
    });
  }

  if (action.status === "blocked") {
    logs.push({
      id: id("log"),
      actionRequestId: action.id,
      agentId: action.agentId,
      eventType: "blocked",
      message: `${action.title} was blocked before execution.`,
      metadata: { triggeredPolicies: action.triggeredPolicies.map((policy) => policy.name) },
      createdAt
    });
  }

  if (action.status === "completed") {
    logs.push({
      id: id("log"),
      actionRequestId: action.id,
      agentId: action.agentId,
      eventType: "completed",
      message: `${action.title} completed automatically.`,
      metadata: { decision: action.decision },
      createdAt
    });
  }

  return logs;
}

function initialActions() {
  return [
    createActionFromScenario(scenarios[0], seedTime),
    createActionFromScenario(scenarios[2], new Date("2026-05-27T19:26:00.000Z").toISOString()),
    createActionFromScenario(scenarios[3], new Date("2026-05-27T19:31:00.000Z").toISOString()),
    createActionFromScenario(scenarios[1], new Date("2026-05-27T19:35:00.000Z").toISOString())
  ];
}

function loadStored<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  const raw = window.localStorage.getItem(key);
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function AgentGateProvider({ children }: { children: React.ReactNode }) {
  const [actions, setActions] = useState<ActionRequest[]>([]);
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const seeded = initialActions();
    setActions(loadStored(actionKey, seeded));
    setLogs(loadStored(logKey, seeded.flatMap((action) => logsForAction(action))));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(actionKey, JSON.stringify(actions));
  }, [actions, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(logKey, JSON.stringify(logs));
  }, [logs, hydrated]);

  const value = useMemo<AgentGateContextValue>(() => {
    return {
      actions,
      logs,
      runScenario: (scenarioId: string) => {
        const scenario = scenarios.find((item) => item.id === scenarioId) ?? scenarios[0];
        const action = createActionFromScenario(scenario);
        setActions((current) => [action, ...current]);
        setLogs((current) => [...logsForAction(action), ...current]);
        return action;
      },
      approveAction: (actionId: string) => {
        const now = new Date().toISOString();
        setActions((current) =>
          current.map((action) =>
            action.id === actionId ? { ...action, status: "approved", updatedAt: now } : action
          )
        );
        const action = actions.find((item) => item.id === actionId);
        if (!action) return;
        setLogs((current) => [
          {
            id: id("log"),
            actionRequestId: action.id,
            agentId: action.agentId,
            eventType: "approved",
            message: `${action.title} was approved by a reviewer.`,
            metadata: { reviewer: "Demo Reviewer" },
            createdAt: now
          },
          ...current
        ]);
      },
      rejectAction: (actionId: string) => {
        const now = new Date().toISOString();
        setActions((current) =>
          current.map((action) =>
            action.id === actionId ? { ...action, status: "rejected", updatedAt: now } : action
          )
        );
        const action = actions.find((item) => item.id === actionId);
        if (!action) return;
        setLogs((current) => [
          {
            id: id("log"),
            actionRequestId: action.id,
            agentId: action.agentId,
            eventType: "rejected",
            message: `${action.title} was rejected by a reviewer.`,
            metadata: { reviewer: "Demo Reviewer" },
            createdAt: now
          },
          ...current
        ]);
      },
      resetDemo: () => {
        const seeded = initialActions();
        setActions(seeded);
        setLogs(seeded.flatMap((action) => logsForAction(action)));
      }
    };
  }, [actions, logs]);

  return <AgentGateContext.Provider value={value}>{children}</AgentGateContext.Provider>;
}

export function useAgentGate() {
  const value = useContext(AgentGateContext);
  if (!value) throw new Error("useAgentGate must be used inside AgentGateProvider");
  return value;
}
