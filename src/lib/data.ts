import type { Agent, Policy } from "./types";

const stamp = "2026-05-27T18:14:00.000Z";

export const agents: Agent[] = [
  {
    id: "agent-sales",
    name: "Sales Follow-Up Agent",
    description: "Drafts lead follow-up emails and proposes CRM updates.",
    ownerName: "Revenue",
    purpose: "Move qualified leads forward without sending anything unreviewed.",
    riskLevel: "medium",
    status: "active",
    allowedTools: ["Gmail", "CRM"],
    allowedActions: ["send_email", "update_crm", "create_internal_note"],
    createdAt: stamp,
    updatedAt: stamp
  },
  {
    id: "agent-support",
    name: "Support Reply Agent",
    description: "Drafts customer replies and ticket notes.",
    ownerName: "Support",
    purpose: "Reduce response time while keeping refunds and promises reviewed.",
    riskLevel: "medium",
    status: "active",
    allowedTools: ["Helpdesk", "Gmail"],
    allowedActions: ["send_email", "issue_refund", "create_internal_note"],
    createdAt: stamp,
    updatedAt: stamp
  },
  {
    id: "agent-finance",
    name: "Finance Review Agent",
    description: "Reviews invoices, flags issues, and proposes payment reminders.",
    ownerName: "Finance",
    purpose: "Assist finance operations without touching money movement.",
    riskLevel: "high",
    status: "active",
    allowedTools: ["Finance", "Email"],
    allowedActions: ["send_email", "approve_payment", "change_vendor_bank_info"],
    createdAt: stamp,
    updatedAt: stamp
  }
];

export const policies: Policy[] = [
  {
    id: "policy-external-email",
    name: "External emails require approval",
    description: "Customer-facing or vendor-facing email cannot be sent without review.",
    conditionType: "recipient_type",
    targetActionType: "send_email",
    decision: "requires_approval",
    severity: "medium",
    enabled: true
  },
  {
    id: "policy-commercial-language",
    name: "Sensitive commercial language requires approval",
    description: "Pricing, discount, refund, contract, legal, and payment terms are reviewed.",
    conditionType: "content_scan",
    decision: "requires_approval",
    severity: "medium",
    enabled: true
  },
  {
    id: "policy-refund",
    name: "Refunds over $50 require approval",
    description: "Refund amounts above threshold route to a human.",
    conditionType: "amount_threshold",
    targetActionType: "issue_refund",
    decision: "requires_approval",
    severity: "high",
    enabled: true
  },
  {
    id: "policy-payment",
    name: "Payment approvals are blocked",
    description: "Agents may review payments but cannot approve money movement.",
    conditionType: "action_type",
    targetActionType: "approve_payment",
    decision: "blocked",
    severity: "critical",
    enabled: true
  },
  {
    id: "policy-bank",
    name: "Vendor bank changes are blocked",
    description: "Banking details require a separate verified workflow.",
    conditionType: "action_type",
    targetActionType: "change_vendor_bank_info",
    decision: "blocked",
    severity: "critical",
    enabled: true
  },
  {
    id: "policy-crm",
    name: "CRM deal amount changes require approval",
    description: "Revenue fields cannot be changed without review.",
    conditionType: "payload_field",
    targetActionType: "update_crm",
    decision: "requires_approval",
    severity: "high",
    enabled: true
  },
  {
    id: "policy-note",
    name: "Internal notes are allowed",
    description: "Internal summaries and non-customer notes can complete automatically.",
    conditionType: "action_type",
    targetActionType: "create_internal_note",
    decision: "allowed",
    severity: "low",
    enabled: true
  }
];
