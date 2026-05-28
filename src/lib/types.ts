export type RiskLevel = "low" | "medium" | "high" | "critical";
export type PolicyDecision = "allowed" | "requires_approval" | "blocked";
export type ActionStatus = "pending" | "approved" | "rejected" | "blocked" | "completed";
export type RecipientType = "internal" | "external" | "unknown";

export type Agent = {
  id: string;
  name: string;
  description: string;
  ownerName: string;
  purpose: string;
  riskLevel: RiskLevel;
  status: "active" | "paused" | "disabled";
  allowedTools: string[];
  allowedActions: string[];
  createdAt: string;
  updatedAt: string;
};

export type Policy = {
  id: string;
  name: string;
  description: string;
  conditionType: string;
  targetActionType?: string;
  decision: PolicyDecision;
  severity: RiskLevel;
  enabled: boolean;
};

export type ActionRequestInput = {
  agentId: string;
  actionType: string;
  tool: string;
  title: string;
  description?: string;
  recipient?: string;
  recipientType?: RecipientType;
  entityName?: string;
  payload: Record<string, unknown>;
};

export type TriggeredPolicy = {
  name: string;
  severity: RiskLevel;
  reason: string;
};

export type PolicyEvaluationResult = {
  decision: PolicyDecision;
  riskLevel: RiskLevel;
  triggeredPolicies: TriggeredPolicy[];
  explanation: string;
};

export type ActionRequest = ActionRequestInput & {
  id: string;
  riskLevel: RiskLevel;
  decision: PolicyDecision;
  status: ActionStatus;
  triggeredPolicies: TriggeredPolicy[];
  evaluationExplanation: string;
  createdAt: string;
  updatedAt: string;
};

export type AuditEventType =
  | "action_created"
  | "policy_evaluated"
  | "approval_requested"
  | "approved"
  | "rejected"
  | "blocked"
  | "completed"
  | "edited_before_approval";

export type AuditLog = {
  id: string;
  actionRequestId: string;
  agentId: string;
  eventType: AuditEventType;
  message: string;
  metadata: Record<string, unknown>;
  createdAt: string;
};

export type Scenario = {
  id: string;
  name: string;
  agentName: string;
  inputGoal: string;
  signal: string;
  action: Omit<ActionRequestInput, "agentId">;
};
