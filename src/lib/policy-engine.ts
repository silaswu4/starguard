import type {
  ActionRequestInput,
  PolicyDecision,
  PolicyEvaluationResult,
  RiskLevel,
  TriggeredPolicy
} from "./types";

const riskRank: Record<RiskLevel, number> = {
  low: 0,
  medium: 1,
  high: 2,
  critical: 3
};

const decisionRank: Record<PolicyDecision, number> = {
  allowed: 0,
  requires_approval: 1,
  blocked: 2
};

function highestRisk(a: RiskLevel, b: RiskLevel): RiskLevel {
  return riskRank[a] >= riskRank[b] ? a : b;
}

function strongestDecision(a: PolicyDecision, b: PolicyDecision): PolicyDecision {
  return decisionRank[a] >= decisionRank[b] ? a : b;
}

function payloadText(input: ActionRequestInput): string {
  const raw = [
    input.title,
    input.description,
    input.recipient,
    input.entityName,
    JSON.stringify(input.payload)
  ];

  return raw.filter(Boolean).join(" ").toLowerCase();
}

function numericPayloadValue(input: ActionRequestInput, key: string): number | undefined {
  const value = input.payload[key];
  if (typeof value === "number") return value;
  if (typeof value === "string") {
    const parsed = Number.parseFloat(value.replace(/[^0-9.]/g, ""));
    return Number.isNaN(parsed) ? undefined : parsed;
  }
  return undefined;
}

export function evaluateAction(input: ActionRequestInput): PolicyEvaluationResult {
  const result: { decision: PolicyDecision; riskLevel: RiskLevel } = {
    decision: "allowed",
    riskLevel: "low"
  };
  const triggeredPolicies: TriggeredPolicy[] = [];

  const trigger = (
    nextDecision: PolicyDecision,
    nextRisk: RiskLevel,
    name: string,
    reason: string
  ) => {
    result.decision = strongestDecision(result.decision, nextDecision);
    result.riskLevel = highestRisk(result.riskLevel, nextRisk);
    triggeredPolicies.push({ name, severity: nextRisk, reason });
  };

  if (input.actionType === "approve_payment") {
    trigger("blocked", "critical", "Payment approvals are blocked", "Agents cannot approve payment movement.");
  }

  if (input.actionType === "change_vendor_bank_info") {
    trigger("blocked", "critical", "Vendor bank changes are blocked", "Banking details must stay outside autonomous scope.");
  }

  if (input.actionType === "delete_record") {
    trigger("blocked", "high", "Record deletion is blocked", "Destructive data changes require a separate control path.");
  }

  if (input.actionType === "issue_refund" && (numericPayloadValue(input, "amount") ?? 0) > 50) {
    trigger("requires_approval", "high", "Refunds over $50 require approval", "Refund amount exceeds the review threshold.");
  }

  if (input.actionType === "send_email" && input.recipientType === "external") {
    trigger("requires_approval", "medium", "External emails require approval", "Customer-facing communication needs human review.");
  }

  const sensitiveTerms = ["pricing", "discount", "refund", "contract", "legal", "payment terms"];
  const matchedTerm = sensitiveTerms.find((term) => payloadText(input).includes(term));
  if (matchedTerm) {
    trigger("requires_approval", "medium", "Sensitive commercial language requires approval", `Content includes "${matchedTerm}".`);
  }

  if (input.actionType === "update_crm" && input.payload.field === "deal_amount") {
    trigger("requires_approval", "high", "CRM deal amount changes require approval", "Revenue fields need human confirmation.");
  }

  if (input.actionType === "create_internal_note" && triggeredPolicies.length === 0) {
    return {
      decision: "allowed",
      riskLevel: "low",
      triggeredPolicies: [],
      explanation: "Internal note creation is inside the agent's allowed scope."
    };
  }

  if (triggeredPolicies.length === 0) {
    return {
      decision: "allowed",
      riskLevel: "low",
      triggeredPolicies: [],
      explanation: "No blocking or approval policies matched this proposed action."
    };
  }

  const blocked = result.decision === "blocked";
  const names = triggeredPolicies.map((policy) => policy.name).join(", ");

  return {
    decision: result.decision,
    riskLevel: result.riskLevel,
    triggeredPolicies,
    explanation: blocked ? `Blocked by policy: ${names}.` : `Approval required by policy: ${names}.`
  };
}
