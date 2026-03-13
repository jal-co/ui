---
name: jalco-component-builder
description: "Build jalco ui components through a deliberate workflow: clarify requirements, judge scope and file boundaries, prefer strong default states and restrained variants, implement with shadcn-style ergonomics, and ship aligned docs. Use when the user asks to create a component, build a component, make a new UI component, add a registry component, create a docs component, add variants, refactor a component, or review public components, demos, or docs-facing UI."
---

# jal-co/ui Component Builder

Use this skill when creating, refining, or reviewing a jalco ui component, block, demo, or docs-facing UI.

Common triggers include requests like:
- create a component
- build a component
- make a new UI component
- add a registry component
- create a docs component
- add variants to this component
- refactor this component
- review this component

This is the primary workflow skill for public component work in jalco ui. It should guide the sequence of decisions before implementation, while treating other skills as supporting references rather than equal peers.

## Required reading before changes

Before implementing a public component, read:
- `AGENTS.md`
- `docs-component-format-spec.md`
- `.pi/skills/jalco-shadcn-registry/SKILL.md` for registry-backed work
- `.pi/skills/jalco-writing-component-docs/SKILL.md` for docs work

Also inspect:
- similar components already in the repo
- related demo or preview files
- related docs pages
- `app/page.tsx` when adding homepage-style showcases

## Supporting references

Use these as references during implementation, not as separate workflow owners:
- `shadcn-ui` for baseline shadcn component ergonomics, accessibility patterns, and common primitive composition
- `.pi/skills/tailwind-design-system/SKILL.md` for semantic tokens, Tailwind v4 patterns, and variant consistency
- `.pi/skills/vercel-composition-patterns/SKILL.md` for variant discipline, composition, and avoiding boolean-prop-heavy APIs
- `.pi/skills/vercel-react-best-practices/SKILL.md` for React and Next.js implementation quality
- `component-engineering` as a reference for semantics, accessibility, and prop/API discipline when needed

## Core goal

Build components that feel intentional, production-ready, readable, and easy to adapt.

jalco ui components should not merely be valid. They should:
- have a clear reason to exist
- look strong in their default state
- use restrained, consistent styling
- prefer one strong layout idea over decorative layering
- be easy to scan, copy, and modify
- ship with aligned docs, preview, and registry metadata when public

## Preferred workflow

### 1. Clarify before coding

Do not jump straight into implementation when the request is underspecified.

Use the `question` or `questionnaire` tool to clarify what should be built when needed.

Key questions to answer:
- What problem does this component solve?
- Is this a primitive, composed component, or a block?
- Is it meant for the public registry, docs site only, or both?
- What should the default state optimize for?
- What surrounding UI context should the preview suggest?
- Which variants are truly meaningful?
- Should icons be muted, colored, or omitted?
- Does motion materially improve the component or is static styling enough?
- Should this stay in one file?
- Is a new dependency truly justified?

Use concise, Socratic questioning. Narrow the problem. Do not ask endless open-ended questions if a small number of targeted choices will do.

### 2. Define the component before implementation

Before writing code, be able to state:
1. the core use case in one sentence
2. the primary visual idea
3. the minimum public API
4. the justified variants, if any
5. whether it should be one file or multi-file
6. whether any dependency is required
7. what the default preview should demonstrate

If those decisions are fuzzy, do not start coding yet.

### 3. Prefer one file by default

For public jalco ui components, prefer a single file unless multiple files materially improve:
- readability
- runtime correctness
- reuse across multiple items
- installability
- registry packaging clarity

Keep local helpers, CVA variants, and small subcomponents inline when they are only meaningful inside the component.

Use multiple files only when:
- runtime boundaries differ (`use client`, server-only logic, dynamic loading)
- a hook or utility is genuinely reused outside the component
- the item is a true multi-part block
- a single file becomes harder to understand than the separated version

Avoid unnecessary files like:
- `types.ts` for one local interface
- `constants.ts` for tiny local data
- `utils.ts` for one component-local helper
- internal file splitting that makes copy-paste adoption worse

### 4. Prefer stronger defaults over more variants

A component should be compelling in its default state.

Variants must earn their existence.

Use public variants only when they represent real differences in:
- use case
- semantics
- structure
- emphasis
- layout behavior

Avoid decorative-only variants or tiny visual permutations.

Consistency matters, but do not mechanically copy another component's variant list.

Examples of acceptable variant language when appropriate:
- `default`, `primary`, `secondary`, `outline`, `ghost`
- `muted` and `colored` for icon treatments when those are meaningful and already established

If a component needs substantially different structure across modes, prefer:
- explicit exports
- compound composition
- separate components

rather than one overloaded variant API.

### 5. Keep styling restrained and product-like

Prefer:
- strong spacing and hierarchy
- clear typography
- semantic color usage
- realistic layout rhythm
- calm defaults

Avoid:
- layering border + tint + shadow + glow + gradient without purpose
- adding icons just to make a demo look more interesting
- overusing nested rounded containers
- generic card wrappers with no clear opinion
- demos that only work because they are over-decorated

If the component only looks good in its fanciest state, the base design is too weak.

### 6. Judge dependencies explicitly

Do not add a dependency casually.

Before adding one, ask:
- Can this be done with existing repo dependencies?
- Can this be done with CSS, Radix, or browser APIs?
- Does the dependency materially improve the public component?
- Does it make the registry item heavier or harder to adopt?
- Would consumers reasonably expect this dependency?

Default to no new dependency.

Add one only when the benefit is clear. If using a dependency like Motion or another animation package, the implementation and docs should make that choice feel justified.

### 7. Implement with jalco ui conventions

Implementation should:
- match existing naming and styling conventions
- use semantic tokens and repo utility patterns
- avoid boolean-prop-heavy APIs
- favor readable component code over architectural indirection
- preserve accessibility and copy-paste ergonomics

For public entry files:
- use the Jalco-style compact file header when appropriate
- do not add decorative separator comments
- keep comments minimal and useful

### 8. Ship docs and catalog preview as part of the component

Public component work is not done until docs and the catalog card preview are updated.

When applicable, update or create:
- component docs page
- preview/demo source
- install instructions
- usage examples
- relevant homepage/showcase examples
- registry metadata
- sidebar nav entry in `lib/docs.ts`
- catalog card preview at `components/docs/previews/<registry-name>.tsx`

After creating or modifying a card preview file, run `pnpm previews:generate` to regenerate the import map. The codegen also runs automatically on `pnpm dev` and `pnpm build`.

Card preview files:
- default-export an async server component
- render a miniature version of the component with realistic sample data
- show key variants, sizes, or layout exports when the component has them
- are docs-site only, not part of the installable registry item
- live in `components/docs/previews/`, not inside `registry/`
- also appear on the `/dev/screenshots` utility page for PNG export

Descriptions, names, and preview coverage should stay aligned across all surfaces.

## File boundary checklist

Before splitting a component into multiple files, ask:
1. Does the user benefit from opening more than one file?
2. Are these parts reused outside this component family today?
3. Do runtime boundaries require the split?
4. Does the split improve installability or registry clarity?
5. Would a single file still be easier to scan and adapt?
6. Am I splitting because the design truly needs it, or because it feels more architectural?

If most answers are no, keep it in one file.

## Dependency checklist

Before adding a new package, ask:
1. Is there an existing repo dependency that already solves this?
2. Can native CSS, Tailwind, or browser APIs handle it?
3. Does this make the component meaningfully better for users?
4. Will this complicate registry install or public adoption?
5. Would I still choose this dependency if the component were being copied into a production app today?

If the answer is uncertain, do not add it.

## Component quality checklist

Before shipping a public component, verify:
1. The default example looks production-ready.
2. The use case is clear and specific.
3. The component is visually coherent without decorative extras.
4. The public API is smaller and more semantic than the first draft.
5. Variants map to real use cases.
6. The file structure is simpler than the first draft.
7. The preview content feels believable.
8. The component is distinct enough to justify public inclusion.
9. Docs, preview, and registry copy all describe the same artifact.
10. A user could realistically copy the default version into a real app with minimal cleanup.
11. A card preview file exists at `components/docs/previews/<registry-name>.tsx`.
12. The sidebar nav entry exists in `lib/docs.ts`.

## Recommended questioning patterns

When requirements are underspecified, prefer questions like:
- Which of these is closest: primitive, composed component, or block?
- Should the default feel neutral, branded, dense, or editorial?
- Is the main value layout, interaction, or presentation?
- Do you want one strong default, or a small set of meaningful variants?
- Should this optimize for docs-site display, public reuse, or both?
- Would you expect this to install as a single file?

Prefer multiple-choice clarification when possible.

## Anti-patterns

Avoid:
- jumping to code before clarifying the use case
- splitting modest components into many files
- creating variants for completeness rather than usefulness
- using icons, badges, or gradients to hide weak structure
- over-abstracting local helpers
- adding dependencies without a clear payoff
- shipping public components without aligned docs
- treating preview coverage as separate from design quality

## Recommended workflow summary

1. Create a feature branch: `feat/<component-name>`.
2. Clarify the request.
3. Inspect related repo patterns.
4. Define use case, API, variants, file structure, and dependency needs.
5. Implement the component with a one-file bias.
6. Create or update previews and demos with realistic content.
7. Create a catalog card preview at `components/docs/previews/<registry-name>.tsx` with key variants.
8. Add the sidebar nav entry in `lib/docs.ts` with `badge: "New"` and `badgeAdded` set to today's ISO date.
9. Update docs and registry metadata when public.
10. Run `pnpm previews:generate` to update the import map.
11. Generate screenshots via `/dev/screenshots` — save both dark and light PNGs to `public/previews/`.
12. Run `pnpm registry:build` and `pnpm build` to verify.
13. Open a PR using the component template (`.github/PULL_REQUEST_TEMPLATE/component.md`).
14. Attach dark and light screenshots to the PR body.
15. Review against the quality, file-boundary, and dependency checklists.
