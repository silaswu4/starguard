# starguard

control plane for ai agents. inventory what's running, enforce policy before tools execute, route flagged calls to humans, keep a signed audit trail.

live at [starguard.silaswu.dev](https://starguard.silaswu.dev).

a full marketing site sits in front of a working policy runtime. the marketing pages describe the product, the dashboard tree shows the operator surface with realistic mock data, and the policy engine underneath is real with vitest coverage.

## repo layout

- `src/app/` next.js app router routes. marketing at `/`, `/platform`, `/solutions`, `/pricing`, `/security`, `/resources`, `/company`. operator surface at `/dashboard`, `/agents`, `/policies`, `/approvals`, `/activity`, `/playground`, behind a separate shell router.
- `src/lib/` the policy engine, types, scenarios.
- `src/components/brand/` s-mark and logo lockup.
- `src/components/motion/` gsap primitives. `revealup` and `revealtext` for scroll-triggered fades, `parallaxy` for scrub-tied translates, `marquee`, `magnetic`, `sparkles`.
- `src/components/viz/` `growthchart` (canary rollout) and `sparkline` (status uptime), both svg client islands.
- `src/components/hero/` interactive 3d hero. cursor tilt plus ambient `rotationY`.
- `src/components/marketing/` site chrome, page heros, announcement bar, protocol marquee item.
- `src/components/code/` small regex tokenizer for the typescript and rego code blocks.

## stack

- next.js 16, app router, react 19
- tailwind v4 via postcss
- geist sans and geist mono as variable fonts through `next/font/google`
- gsap with scrolltrigger via `@gsap/react`
- lucide for line icons
- zod for typed schemas
- vitest for the policy engine

## run it

```bash
npm install
npm run dev
```

http://localhost:3000.

```bash
npm run build
npm run lint
npm run test
```

## deploy

vercel project linked. push to `main` and it ships. preview urls auto-spin for any other branch.

## notes

- no em dashes anywhere in copy or code. periods and commas only.
- copy lives in the components, not a cms. faster to grep, faster to ship.
- the dashboard ui is mocked. the policy runtime is real.
- the s-mark's viewbox was retraced (`158 92 940 940`) so its content box centers cleanly inside css masks.
- protocol logos resolve through iconify since simple-icons dropped a few brands (openai, aws, azure, slack).

## contact

silas wu. [silaswu.dev](https://silaswu.dev). [@silaswu\_](https://x.com/silaswu_). silaswu4@gmail.com.
