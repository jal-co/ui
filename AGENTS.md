# AGENTS.md

Guidance for humans and AI agents working in `jalco-ui`.

## Project intent

Jalco UI is a curated shadcn-style registry and documentation site by Justin Levine.

Goals:
- Keep the codebase polished, readable, and consistent.
- Optimize for public/open-source maintainability.
- Prefer simple, composable patterns over clever abstractions.
- Make examples, docs, and registry items production-quality.

## Core principles

- Favor clarity over novelty.
- Keep diffs focused and reviewable.
- Match existing patterns before introducing new ones.
- Make documentation part of the feature, not an afterthought.
- Build for accessibility, composability, and copy-paste ergonomics.
- Avoid unnecessary dependencies.

## Repository standards

### General
- Use consistent naming across files, exports, components, and docs.
- Keep folder structure predictable and shallow where possible.
- Prefer colocating small helpers with the feature that uses them.
- Use TypeScript where applicable.
- Avoid dead code, commented-out code, and placeholder implementations in committed work.

### Components
- Prefer small, composable components.
- Build accessible primitives and interactions by default.
- Use clear prop names and sensible defaults.
- Avoid overengineering APIs before real usage justifies it.
- When creating registry items, ensure they are installable, readable, and easy to adapt.
- Follow the comment and file header rules in `docs-component-format-spec.md` for public registry code and supporting docs-site code.
- When building or refactoring public Jalco UI components, use `.pi/skills/jalco-component-builder/SKILL.md` as the primary workflow skill.
- Treat `shadcn-ui`, `.pi/skills/tailwind-design-system/SKILL.md`, `.pi/skills/vercel-composition-patterns/SKILL.md`, `.pi/skills/vercel-react-best-practices/SKILL.md`, and `component-engineering` as supporting references during component work.
- When building or maintaining Jalco UI registry infrastructure or registry items, consult:
  - `.pi/skills/jalco-shadcn-registry/SKILL.md`
- When creating or revising component documentation, consult:
  - `.pi/skills/jalco-writing-component-docs/SKILL.md`
- Use the Vercel React best-practices skill for performance, rendering, data fetching, and Next.js architecture decisions.
- Use the Vercel composition patterns skill for component API design, composition, compound components, and avoiding boolean-prop-heavy interfaces.
- Use the Tailwind design-system skill for Tailwind v4 tokens, semantic styling, variant systems, theming, and design-system consistency.
- Use the Jalco shadcn registry skill for item typing, `registry.json`, namespacing, authentication planning, MCP compatibility, Open in v0 considerations, and registry structure decisions.

### Component quality bar

Public Jalco UI components should feel intentional, production-ready, and visually complete in their default state.

When designing or reviewing a component:
- start from a clear use case, not from a styling trick or a variant list
- prefer one strong layout idea over stacked decorative treatments
- use spacing, typography, grouping, and alignment to create hierarchy before reaching for extra color, borders, shadows, or icons
- keep APIs smaller and more semantic than the first draft
- favor fewer, stronger variants over many shallow permutations
- ensure the default example is the most compelling and broadly useful version
- make demos feel like real product UI, not component laboratory output
- do not ship a public component unless it is visually distinct enough to justify its existence in the registry

A public variant should:
- represent a real use case or semantic difference
- have meaningful preview and docs coverage
- remain understandable from its API name alone

Avoid:
- decorative-only variants
- prop-heavy APIs that expose internal styling decisions
- generic card wrappers with little opinion
- demos padded with badges, icons, or fake complexity to compensate for weak structure
- components whose examples look unfinished without consumer customization

### Component creation workflow

When building a new public component, do not jump straight to implementation.

Preferred workflow:
1. Clarify the component's use case and desired feel.
2. Use the `question` or `questionnaire` tool when requirements, variants, or usage context are unclear.
3. Decide whether the artifact is a primitive, composed component, or block.
4. Prefer a single-file implementation unless multiple files materially improve runtime correctness, reuse, readability, or installability.
5. Reuse established Jalco/shadcn variant language when appropriate, but do not add variants mechanically.
6. Avoid new dependencies unless they materially improve the component and are justified against copy-paste and registry ergonomics.
7. Implement the component with accessible structure, restrained styling, and realistic demo content.
8. Document the component in the same change, including preview, installation, and usage.

### File boundaries and component structure

Prefer a single file for public Jalco UI components unless multiple files materially improve readability, reuse, runtime correctness, or installability.

Use one file when:
- the component is one conceptual unit
- helpers are local to the component
- subcomponents are primarily meaningful together
- the main adoption path benefits from opening and editing one file
- the file remains easy to scan and review

Split into multiple files when:
- parts are meaningfully reusable outside the component
- runtime boundaries differ (`use client`, server-only code, dynamic loading, etc.)
- the component is a true multi-part block rather than a single UI primitive
- registry packaging or install targets become clearer
- a single file becomes harder to understand than the separated version

Avoid:
- `types.ts`, `constants.ts`, or `utils.ts` files for tiny component-local code
- splitting purely to simulate architecture
- making copy-paste adoption worse with unnecessary indirection

For public registry items, optimize file structure for readability and adaptation before abstraction.

### Dependency judgment

Prefer existing dependencies, browser APIs, CSS, and current repo primitives before adding new packages.

Before adding a dependency, ask:
- whether the behavior can be achieved with current repo dependencies or native CSS/browser APIs
- whether the dependency materially improves the public component
- whether it increases adoption or registry friction
- whether a consumer would reasonably expect that dependency for this kind of component

Default to no new dependency unless the payoff is clear.

### Showcasing components and variants

When adding a new component or docs component to the site, follow the established showcase pattern from `app/page.tsx`:

- **Section wrapper:** Each component gets its own `<section>` with `rounded-xl border p-4 sm:p-5` and a `flex flex-col gap-4` layout.
- **Section header:** A title (`text-lg font-semibold tracking-tight`) and a short description (`text-sm text-muted-foreground`). For registry items, include an `<OpenInV0Button>` aligned to the right on larger screens.
- **Variant showcase:** When a component has multiple variants, props, or visual states, show each one as a labeled sub-section:
  - Group all variants in a `<div className="flex flex-col gap-6">`.
  - Each variant gets a `<div className="flex flex-col gap-2">` containing:
    - A label: `<p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Variant Name</p>`
    - The component rendered with that variant's props.
  - Use descriptive, concise labels (e.g., "Default", "Scrollable", "Muted + Collapsible", "Colored Icons").
- **Single-variant components:** If a component only has one visual state, render it directly inside the section without variant labels.
- **Realistic content:** Populate examples with realistic, polished content — not lorem ipsum or bare-minimum placeholders.

This pattern keeps the page scannable: every component section reads as title → description → labeled visual examples.

### Styling
- Keep styling patterns uniform across components and docs.
- Prefer existing utility/classname conventions over inventing new ones.
- Maintain visual consistency between preview examples, code blocks, and docs pages.
- Avoid one-off styling unless there is a documented reason.

### Comments and file headers
- Apply Jalco UI file headers and comment style to original Jalco-authored public registry items and docs-facing source files.
- Do not mass-retrofit copied, upstream, generated, or template-derived files unless they are being meaningfully rewritten.
- Public Jalco UI registry files should use a consistent top-of-file header comment when appropriate.
- For public Jalco-authored component entry files, prefer a compact header that includes:
  - `jalco-ui`
  - component name
  - `by Justin Levine`
  - `ui.justinlevine.me`
  - one-sentence description
  - key public props when useful
  - dependencies, only when the file has noteworthy external or registry requirements
  - inspiration / attribution, only when there is real upstream inspiration worth crediting
  - notes only when runtime behavior materially affects usage
- For smaller supporting files, use a lighter header or no header if the file is already obvious.
- Keep file headers compact and human-written in tone.
- Do not duplicate the full docs page inside a source comment.
- **Never add decorative separator banners in source code.** This includes `/* --- */`, `/* === */`, `/* Section Name */` surrounded by dashes, or any padded block-comment dividers. These are AI slop. Use whitespace to separate sections. If a label is genuinely needed, use a single plain `// Label` comment — no box, no dashes, no padding.
- Keep inline comments minimal and useful.
- Prefer no comment over obvious commentary.
- Use comments to explain non-obvious decisions, constraints, attribution, or important integration context.
- Do not narrate straightforward code or restate what the code already makes obvious.

### Documentation
- Every meaningful feature should include or update docs.
- Write concise, skimmable documentation.
- Prefer examples that reflect real usage.
- Keep installation instructions accurate for multiple package managers when relevant.
- If a component or block has constraints, call them out explicitly.

### Writing component docs
- Follow `docs-component-format-spec.md` as the canonical docs format guide for public component and block pages.
- Start component doc descriptions with a concise one-sentence summary of what the component does.
- Do not start descriptions with "A", "An", or "A React component for...".
- Avoid implementation details, subjective adjectives, and unnecessary jargon in descriptions.
- For registry-backed components, keep descriptions aligned between docs frontmatter and registry metadata.
- Use `## Features` only when a component has non-obvious capabilities, interaction patterns, or constraints.
- Keep Features sections to 2-4 short bullets written in capability-first language.
- Structure component docs to support the site's preview, code, install, and usage flow.
- Use the shared docs anatomy consistently: Metadata, Header, Preview, Installation, Usage, then only justified optional sections.
- Do not call every example a variant; use Variants, Sizes, Examples, Configurations, and bundled export labels intentionally.
- Surface important setup requirements before Examples; do not bury adoption blockers in Notes.
- Add API, variants, examples, requirements, or notes sections only when they add meaningful value.
- Align naming across component titles, slugs, registry items, preview names, and exports.
- Prefer realistic, polished examples over placeholder content.
- When changing a public component's API, variants, states, or installation surface, update all affected docs in the same change.
- For public component changes, check related docs pages, preview/demo files, homepage or showcase examples, usage snippets, and registry metadata when relevant.
- Do not add or remove public variants without verifying that labels, examples, and preview coverage still match the shipped component.

## Commit standards

This repository uses Conventional Commits.

Format:

```text
<type>(<scope>): <description>
```

Examples:
- `feat(registry): add initial component schema`
- `fix(docs): correct pnpm install command`
- `docs(intro): add registry overview page`
- `refactor(ui): simplify code block tabs`
- `chore(repo): add AGENTS.md guidance`

### Allowed types
- `feat`
- `fix`
- `docs`
- `refactor`
- `style`
- `test`
- `chore`
- `build`
- `ci`
- `perf`
- `revert`

### Commit rules
- Use the imperative mood.
- Keep the subject line concise.
- Do not end the subject line with a period.
- Keep commits focused to one logical change.
- Do not mix formatting-only changes with feature work unless necessary.
- Prefer small commits over large mixed commits.
- Never commit secrets, tokens, or local environment files.

## Pull request standards

PRs should be small, clear, and easy to review.

### PR checklist
- Summarize what changed.
- Explain why the change was made.
- Note any design or API decisions.
- Include screenshots/GIFs for UI changes when useful.
- Update docs if behavior, installation, or usage changed.
- Verify relevant commands/builds/tests before opening or merging.

### PR title
Use Conventional Commit style when possible.

Examples:
- `feat(docs): add component preview and code tabs`
- `fix(registry): resolve invalid item path`

## Agent workflow expectations

When working in this repository, agents should:
- Read existing files before editing them.
- Reuse established patterns and structure.
- Avoid broad rewrites unless explicitly requested.
- Call out tradeoffs when introducing new patterns.
- Prefer surgical edits with minimal blast radius.
- Keep generated output and formatting noise to a minimum.
- Document new conventions in this file or the relevant docs.

### Prompt and slash-command workflow

For component-focused work, prefer the shared Jalco UI prompts and workflow files:
- `.pi/prompts/component-create.md` for creating a new component, block, or docs-facing UI artifact
- `.pi/prompts/component-review.md` for auditing an existing component, preview, or public API
- `.pi/skills/jalco-component-builder/SKILL.md` as the primary workflow skill behind both flows

When a user asks to create or review a component, do not jump straight to implementation. Start from the Jalco component-builder workflow, clarify requirements when needed, then implement and document the result.

## Consistency rules

- Use one naming convention per concern and stick to it.
- Keep public APIs stable and intentional.
- Keep example data realistic and tidy.
- Align docs copy, component names, and registry item names.
- If introducing a new pattern, apply it consistently or document why it is exceptional.

## Open-source readiness

Because this code may be public:
- Write code and docs as if others will learn from them.
- Avoid private/internal shorthand in committed code.
- Prefer descriptive names over personal abbreviations.
- Keep onboarding friction low for contributors and users.
- Make installation and usage paths obvious.

## When unsure

If a decision is unclear, prefer:
1. readability
2. accessibility
3. consistency
4. maintainability
5. extensibility

## Initial conventions for Jalco UI

Until the project evolves further, default to:
- clean documentation-first structure
- shadcn-aligned ergonomics
- strong preview/code/install UX
- multi-package-manager install examples where relevant
- polished, production-quality examples over quantity
