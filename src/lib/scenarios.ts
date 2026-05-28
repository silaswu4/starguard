import type { Scenario } from "./types";

export const scenarios: Scenario[] = [
  {
    id: "sales-discount-email",
    name: "Sales agent offers discount",
    agentName: "Sales Follow-Up Agent",
    inputGoal: "Follow up with a warm lead and offer a 15% discount.",
    signal: "External email, commercial language",
    action: {
      actionType: "send_email",
      tool: "Gmail",
      title: "Send discount follow-up email",
      description: "The agent wants to send a pricing follow-up to an external sales lead.",
      recipient: "maya@northstar.tools",
      recipientType: "external",
      entityName: "Northstar Tools",
      payload: {
        subject: "Following up on pricing",
        body: "Hi Maya, I can offer a 15% discount if you move forward this week."
      }
    }
  },
  {
    id: "internal-summary",
    name: "Internal meeting summary",
    agentName: "Sales Follow-Up Agent",
    inputGoal: "Summarize the discovery call for the internal team.",
    signal: "Low-risk note",
    action: {
      actionType: "create_internal_note",
      tool: "CRM",
      title: "Create internal account summary",
      description: "The agent wants to add a private call summary to the account timeline.",
      recipientType: "internal",
      entityName: "Northstar Tools",
      payload: {
        body: "Maya is evaluating three vendors and asked for security documentation by Friday."
      }
    }
  },
  {
    id: "refund-over-threshold",
    name: "Customer refund over threshold",
    agentName: "Support Reply Agent",
    inputGoal: "Reply to a customer asking for a refund after duplicate billing.",
    signal: "Refund amount",
    action: {
      actionType: "issue_refund",
      tool: "Helpdesk",
      title: "Issue customer refund",
      description: "The agent proposes a refund for duplicate billing.",
      recipient: "renee@fieldkit.co",
      recipientType: "external",
      entityName: "Fieldkit",
      payload: {
        amount: 84,
        reason: "Duplicate billing on annual plan."
      }
    }
  },
  {
    id: "approve-vendor-payment",
    name: "Approve vendor payment",
    agentName: "Finance Review Agent",
    inputGoal: "Review an invoice and approve payment for a contractor.",
    signal: "Money movement",
    action: {
      actionType: "approve_payment",
      tool: "Finance",
      title: "Approve vendor invoice payment",
      description: "The agent wants to approve a payment after invoice review.",
      recipient: "accounts@brightledger.io",
      recipientType: "external",
      entityName: "BrightLedger",
      payload: {
        amount: 2400,
        invoice: "bl-2841",
        memo: "Approve payment for implementation support."
      }
    }
  },
  {
    id: "crm-deal-amount",
    name: "Change CRM deal amount",
    agentName: "Sales Follow-Up Agent",
    inputGoal: "Update a deal after a sales call.",
    signal: "Revenue field",
    action: {
      actionType: "update_crm",
      tool: "CRM",
      title: "Update CRM deal amount",
      description: "The agent wants to update a forecasted contract value.",
      recipientType: "internal",
      entityName: "Northstar Tools",
      payload: {
        field: "deal_amount",
        from: 12000,
        to: 18000
      }
    }
  },
  {
    id: "vendor-bank-change",
    name: "Change vendor bank info",
    agentName: "Finance Review Agent",
    inputGoal: "Update vendor routing details from an email.",
    signal: "Banking data",
    action: {
      actionType: "change_vendor_bank_info",
      tool: "Finance",
      title: "Change vendor bank information",
      description: "The agent wants to update vendor bank routing details.",
      recipientType: "external",
      entityName: "BrightLedger",
      payload: {
        routingLast4: "3910",
        accountLast4: "8821"
      }
    }
  }
];
