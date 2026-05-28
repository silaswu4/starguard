import { describe, expect, it } from "vitest";
import { evaluateAction } from "./policy-engine";
import type { ActionRequestInput } from "./types";

const base: ActionRequestInput = {
  agentId: "agent-sales",
  actionType: "send_email",
  tool: "gmail",
  title: "draft message",
  recipientType: "internal",
  payload: {}
};

describe("evaluateAction", () => {
  it("requires approval for external emails", () => {
    const result = evaluateAction({ ...base, recipientType: "external" });
    expect(result.decision).toBe("requires_approval");
    expect(result.riskLevel).toBe("medium");
  });

  it("requires approval for discount language", () => {
    const result = evaluateAction({ ...base, payload: { body: "offer a discount this week" } });
    expect(result.decision).toBe("requires_approval");
  });

  it("blocks payment approvals", () => {
    const result = evaluateAction({ ...base, actionType: "approve_payment", tool: "finance" });
    expect(result.decision).toBe("blocked");
    expect(result.riskLevel).toBe("critical");
  });

  it("allows internal notes", () => {
    const result = evaluateAction({ ...base, actionType: "create_internal_note", tool: "notion" });
    expect(result.decision).toBe("allowed");
    expect(result.riskLevel).toBe("low");
  });

  it("keeps blocked above approval", () => {
    const result = evaluateAction({
      ...base,
      actionType: "approve_payment",
      tool: "finance",
      recipientType: "external",
      payload: { body: "approve payment terms" }
    });
    expect(result.decision).toBe("blocked");
    expect(result.riskLevel).toBe("critical");
  });
});
