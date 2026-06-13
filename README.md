# starguard

control plane for ai agents. inventory what's running, evaluate every tool call against policy before it executes, route the risky ones to a human, and keep an append-only audit trail of every decision.

live at [starguard.silaswu.dev](https://starguard.silaswu.dev).

## what this is

agents are starting to take real actions: sending email, issuing refunds, updating crm records, moving money. most of them do it with no gate in between the model deciding and the tool firing. starguard is the gate.

the model is simple and borrowed from how human approvals already work in finance and ops. every action an agent wants to take is a **proposal**, not an execution. a deterministic **policy engine** scores the proposal, decides whether it's allowed, blocked, or needs a person, and routes accordingly. a human clears the queue. everything that happened gets written to an **audit trail** that you can search after the fact.

```
agent proposes  ──►  policy evaluates  ──►  decision
   action              (deterministic)         │
                                               ├─ allowed         ──►  executes, logged
                                               ├─ requires_approval ──►  human queue  ──►  approve / reject
                                               └─ blocked         ──►  refused, logged
```

this repo is a full product surface: a marketing site that explains the idea, an operator dashboard that shows the workflow with realistic data, and a **real policy runtime** underneath both. the dashboard data is mocked and persisted to localStorage so the demo is stateful without a backend. the policy engine is real code with test coverage. that line is drawn on purpose, and called out again in the notes below.

## how a decision works

the lifecycle lives in [`src/components/agentgate-provider.tsx`](src/components/agentgate-provider.tsx), a react context that owns all action and audit state. a proposal comes in as an `ActionRequestInput` (which agent, what tool, what action type, the payload, recipient, etc). from there:

1. **evaluate.** the proposal is handed to `evaluateAction()` in [`src/lib/policy-engine.ts`](src/lib/policy-engine.ts). the engine returns a decision, a risk level, the list of policies that fired, and a plain-english explanation.
2. **route on decision.** the result maps straight to a status:
   - `blocked` becomes `status: "blocked"`, refused on the spot.
   - `allowed` becomes `status: "completed"`, executed immediately.
   - `requires_approval` becomes `status: "pending"` and lands in the human queue.
3. **human clears it.** a reviewer calls `approveAction()` or `rejectAction()` from the approvals screen, moving the status to `approved` or `rejected`.
4. **log everything.** every step writes one or more audit entries (see the event taxonomy below).

an `ActionRequest` carries its whole history with it: the input, the `decision` and `riskLevel` the engine assigned, the `triggeredPolicies`, the evaluation explanation, the current `status`, and created / updated timestamps. types live in [`src/lib/types.ts`](src/lib/types.ts).

## the policy engine

`evaluateAction()` is deterministic and dependency-free. given a proposal it walks a set of rules and merges their verdicts using two orderings:

- **decision strength:** `blocked` > `requires_approval` > `allowed`. if any rule blocks, the action is blocked.
- **risk level:** `critical` > `high` > `medium` > `low`. the highest triggered risk wins.

the rules it enforces today:

| rule | decision | risk |
|------|----------|------|
| `approve_payment`, `change_vendor_bank_info`, `delete_record` | blocked | critical |
| `issue_refund` over $50 | requires approval | high |
| `send_email` to an external recipient | requires approval | medium |
| payload mentions commercial terms (pricing, discount, refund, contract, legal, payment terms) | requires approval | medium |
| `update_crm` where the field is `deal_amount` | requires approval | medium |
| `create_internal_note` and nothing else fired | allowed | low |

amount thresholds are pulled out of the payload with a numeric extractor, and the commercial-language check runs a regex over a flattened view of the proposal (title, description, recipient, entity, payload json). the engine returns `triggeredPolicies` with a reason on each one, so the ui can show exactly why something was gated rather than just a yes/no.

## data model

the domain types in [`src/lib/types.ts`](src/lib/types.ts):

- `RiskLevel`, `low | medium | high | critical`
- `PolicyDecision`, `allowed | requires_approval | blocked`
- `ActionStatus`, `pending | approved | rejected | blocked | completed`
- `AuditEventType`, `action_created | policy_evaluated | approval_requested | approved | rejected | blocked | completed | edited_before_approval`
- `Agent`, registry entry: owner, purpose, risk level, and the `allowedTools` / `allowedActions` that scope what it's permitted to attempt
- `Policy`, a declarative rule definition (name, condition type, target action, decision, severity)
- `ActionRequest`, a full proposal record, described above
- `AuditLog`, one event in the trail: event type, agent, message, freeform metadata, timestamp
- `Scenario`, a canned test case for the playground

## the audit trail

every action produces a chain of `AuditLog` entries, built by `logsForAction()`. the event taxonomy:

`action_created` → `policy_evaluated` → then one of `approval_requested` / `blocked` / `completed`, and if a human weighs in, `approved` or `rejected`. each entry carries structured metadata so the activity view can render the raw evidence (decision, risk, which policies fired) under each event. the `/activity` screen is a searchable timeline over all of it. try searching `blocked`, `refund`, or `approved`.

## operator surface

the dashboard routes, gated behind a client-side shell router so the marketing chrome doesn't wrap them:

- `/dashboard`, overview: live stats, the pending-approval queue, recent audit timeline
- `/agents`, the registry: each agent's owner, risk level, and allowed tools / actions
- `/policies`, the ruleset, rendered from the seed policies
- `/playground`, scenario simulator. run six prebuilt proposals through the live engine and watch the decision and audit entries appear
- `/approvals`, the human review queue: pending items plus resolved history
- `/activity`, the searchable audit log

the six playground scenarios in [`src/lib/scenarios.ts`](src/lib/scenarios.ts) each exercise a different path: an external discount email (approval), an internal summary note (allowed), an $84 refund (approval on amount), a vendor payment approval (blocked), a crm deal-amount update (approval), and a vendor bank-info change (blocked). three seed agents (sales follow-up, support reply, finance review) come from [`src/lib/data.ts`](src/lib/data.ts).

## persistence

there is no database. `AgentGateProvider` seeds an initial set of actions and logs, then hydrates from and writes back to localStorage under `starguard.actions.v1` and `starguard.logs.v1`. `resetDemo()` wipes it back to the seed state. this keeps the demo stateful across reloads without standing up a backend, which is the right tradeoff for a runtime that's meant to be read, run, and understood from the source.

## stack

- next.js 16, app router, react 19
- tailwind v4 via postcss, with design tokens (cobalt accent, success / warning / danger / critical) defined in `globals.css`
- geist sans and geist mono as variable fonts through `next/font/google`
- gsap with scrolltrigger via `@gsap/react` for scroll-triggered reveals, the protocol marquee, parallax, and the magnetic / sparkle micro-interactions
- lucide for line icons
- zod is wired in as a dependency for schema validation at the proposal boundary
- vitest for the policy engine

## repo layout

- `src/app/` next.js app router routes. marketing at `/`, `/platform`, `/solutions`, `/pricing`, `/security`, `/resources`, `/company`. operator surface at `/dashboard`, `/agents`, `/policies`, `/approvals`, `/activity`, `/playground`, behind a separate shell router.
- `src/lib/` the policy engine, domain types, seed data, scenarios, and the engine's vitest suite.
- `src/components/agentgate-provider.tsx` the state machine: evaluation, routing, approvals, audit logging, persistence.
- `src/components/brand/` s-mark and logo lockup.
- `src/components/motion/` gsap primitives. `revealup` and `revealtext` for scroll-triggered fades, `parallaxy` for scrub-tied translates, `marquee`, `magnetic`, `sparkles`.
- `src/components/viz/` `growthchart` (canary rollout) and `sparkline` (status uptime), both svg client islands.
- `src/components/hero/` interactive 3d hero. cursor tilt plus ambient `rotationY`.
- `src/components/marketing/` site chrome, page heros, announcement bar, protocol marquee item.
- `src/components/code/` small regex tokenizer for the typescript and rego code blocks.

## run it

```bash
npm install
npm run dev
```

http://localhost:3000.

```bash
npm run build   # production build
npm run lint    # tsc --noEmit
npm run test    # vitest run, covers the policy engine
```

the test suite in `src/lib/policy-engine.test.ts` pins the engine's behavior: external emails and discount language gate to approval, payment approvals block at critical, internal notes pass at low risk, and a proposal that trips multiple rules resolves to the strongest decision.

## deploy

vercel project linked. push to `main` and it ships. preview urls auto-spin for any other branch.

## notes

- no em dashes anywhere in copy or code. periods and commas only.
- copy lives in the components, not a cms. faster to grep, faster to ship.
- the dashboard ui is mocked and persisted to localStorage. the policy runtime is real and tested.
- the s-mark's viewbox was retraced (`158 92 940 940`) so its content box centers cleanly inside css masks.
- protocol logos resolve through iconify since simple-icons dropped a few brands (openai, aws, azure, slack).

## contact

silas wu. [silaswu.dev](https://silaswu.dev). [@silaswu\_](https://x.com/silaswu_). silaswu4@gmail.com.
