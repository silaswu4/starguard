# AgentGate

AgentGate is an approval and audit layer for AI agents operating inside business workflows.

The demo uses simulated Gmail, CRM, support, and finance actions so the core idea is easy to inspect: agents propose actions, policies evaluate risk, humans approve or reject, and every event lands in an audit trail.

## Tech stack

- Next.js App Router
- TypeScript
- React
- lucide-react icons
- Zod-ready typed domain logic
- Vitest for the policy engine

## Local setup

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Useful commands

```bash
npm run test
npm run build
```

## Demo script

1. Open the dashboard and scan the pending queue.
2. Visit agents to show the registered agent roster.
3. Visit policies to show the rule set.
4. Run the sales discount email in the playground.
5. Open approvals and approve the request.
6. Open activity to inspect the audit trail.
7. Run approve vendor payment to show an automatic block.

## Environment variables

No variables are required for V1. A future Supabase or model-backed version can add:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
OPENAI_API_KEY=
```
