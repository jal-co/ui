# AGENTS.md

Guidance for humans and AI agents working in `jalco-ui`.

The key words "MUST", "MUST NOT", "SHOULD", "SHOULD NOT", and "MAY" in this document are to be interpreted as described in [RFC 2119](https://www.rfc-editor.org/rfc/rfc2119).

## Project intent

jalco ui is a React component library by Justin Levine. It ships polished, composable components for React and Next.js projects, distributed via a shadcn-compatible registry so users can install with a single command or copy the source directly.

Goals:
- Keep the codebase polished, readable, and consistent.
- Optimize for public/open-source maintainability.
- Prefer simple, composable patterns over clever abstractions.
- Make examples, docs, and components production-quality.
- Use shadcn registry infrastructure for distribution, not as an identity constraint.

## Core principles

- Favor clarity over novelty.
- Keep diffs focused and reviewable.
- Match existing patterns before introducing new ones.
- Make documentation part of the feature, not an afterthought.
- Build for accessibility, composability, and copy-paste ergonomics.
- Avoid unnecessary dependencies.

## Repository standards

### General

- All files MUST use consistent naming across files, exports, components, and docs.
- Folder structure SHOULD be predictable and shallow where possible.
- Small helpers SHOULD be colocated with the feature that uses them.
- TypeScript MUST be used for all source files.
- Committed code MUST NOT contain dead code, commented-out code, or placeholder implementations.

### Components

- Components SHOULD be small and composable.
- Accessible primitives and interactions MUST be the default.
- Prop names MUST be clear with sensible defaults.
- APIs MUST NOT be overengineered before real usage justifies it.
- Registry items MUST be installable, readable, and easy to adapt.
- Public registry code and docs-facing source files MUST follow the comment and file header rules in `docs-component-format-spec.md`.
- When building or refactoring public jalco ui components, agents MUST use `.pi/skills/jalco-component-builder/SKILL.md` as the primary workflow skill.
- Agents SHOULD treat `shadcn-ui`, `.pi/skills/tailwind-design-system/SKILL.md`, `.pi/skills/vercel-composition-patterns/SKILL.md`, `.pi/skills/vercel-react-best-practices/SKILL.md`, and `component-engineering` as supporting references during component work.
- When building or maintaining registry infrastructure or items, agents MUST consult `.pi/skills/jalco-shadcn-registry/SKILL.md`.
- When creating or revising component documentation, agents MUST consult `.pi/skills/jalco-writing-component-docs/SKILL.md`.
- The Vercel React best-practices skill SHOULD be used for performance, rendering, data fetching, and Next.js architecture decisions.
- The Vercel composition patterns skill SHOULD be used for component API design, composition, compound components, and avoiding boolean-prop-heavy interfaces.
- The Tailwind design-system skill SHOULD be used for Tailwind v4 tokens, semantic styling, variant systems, theming, and design-system consistency.
- The Jalco shadcn registry skill SHOULD be used for item typing, `registry.json`, namespacing, authentication planning, MCP compatibility, Open in v0 considerations, and registry structure decisions.

### Component quality bar

Public jalco ui components MUST feel intentional, production-ready, and visually complete in their default state.

When designing or reviewing a component:
- MUST start from a clear use case, not from a styling trick or a variant list
- SHOULD prefer one strong layout idea over stacked decorative treatments
- SHOULD use spacing, typography, grouping, and alignment to create hierarchy before reaching for extra color, borders, shadows, or icons
- MUST keep APIs smaller and more semantic than the first draft
- SHOULD favor fewer, stronger variants over many shallow permutations
- MUST ensure the default example is the most compelling and broadly useful version
- MUST make demos feel like real product UI, not component laboratory output
- MUST NOT ship a public component unless it is visually distinct enough to justify its existence in the registry

A public variant MUST:
- represent a real use case or semantic difference
- have meaningful preview and docs coverage
- remain understandable from its API name alone

MUST NOT include:
- decorative-only variants
- prop-heavy APIs that expose internal styling decisions
- generic card wrappers with little opinion
- demos padded with badges, icons, or fake complexity to compensate for weak structure
- components whose examples look unfinished without consumer customization

### Component creation workflow

When building a new public component, agents MUST NOT jump straight to implementation. Every new component MUST be developed on a feature branch and merged to main via a PR that passes the component checklist.

#### Branch and PR requirements

All work MUST happen on a branch. Branch names MUST follow [Conventional Branch](https://conventional-branch.github.io/) naming:

```text
<type>/<description>
```

Supported types:
- `feat/` — new features and components (e.g. `feat/tooltip`, `feat/stat-card`)
- `fix/` — bug fixes (e.g. `fix/icon-alignment`)
- `chore/` — dependency updates, config, docs-only changes (e.g. `chore/update-deps`)
- `hotfix/` — urgent production fixes (e.g. `hotfix/broken-build`)
- `release/` — release preparation (e.g. `release/v1.0.0`)

Rules:
- Branch names MUST use lowercase letters, numbers, and hyphens only.
- Branch names MUST NOT contain consecutive, leading, or trailing hyphens.
- Descriptions SHOULD be concise and descriptive.
- Agents MUST NOT commit directly to `main`.

For component branches specifically:
- All implementation, docs, previews, and screenshots MUST happen on the branch.
- A PR MUST be opened using the component PR template (`.github/PULL_REQUEST_TEMPLATE/component.md`).
- The PR MUST pass every checklist item before merging.
- Dark and light mode screenshots MUST be included in the PR body.

#### Implementation steps

1. Clarify the component's use case and desired feel.
2. Use the `question` or `questionnaire` tool when requirements, variants, or usage context are unclear.
3. Decide whether the artifact is a primitive, composed component, or block.
4. Prefer a single-file implementation unless multiple files materially improve runtime correctness, reuse, readability, or installability.
5. Reuse established Jalco/shadcn variant language when appropriate, but MUST NOT add variants mechanically.
6. MUST NOT add new dependencies unless they materially improve the component and are justified against copy-paste and registry ergonomics.
7. Implement the component with accessible structure, restrained styling, and realistic demo content.
8. Document the component in the same change, including preview, installation, and usage.
9. Create a card preview file at `components/docs/previews/<registry-name>.tsx` showing the component and its key variants, then run `pnpm previews:generate`.
10. Add the component to the sidebar nav in `lib/docs.ts` with `badge: "New"` and `badgeAdded` set to today's ISO date (e.g. `"2026-03-12"`).
11. Generate screenshots via `/dev/screenshots` — use "Save All → public/previews/" to write both `<name>-dark.png` and `<name>-light.png`.
12. Run `pnpm registry:build` and `pnpm build` to verify everything compiles.
13. Open a PR with the component template and verify every checklist item.

### File boundaries and component structure

Public jalco ui components SHOULD use a single file unless multiple files materially improve readability, reuse, runtime correctness, or installability.

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

MUST NOT:
- create `types.ts`, `constants.ts`, or `utils.ts` files for tiny component-local code
- split purely to simulate architecture
- make copy-paste adoption worse with unnecessary indirection

For public registry items, file structure MUST be optimized for readability and adaptation before abstraction.

### Dependency judgment

Agents MUST prefer existing dependencies, browser APIs, CSS, and current repo primitives before adding new packages.

Before adding a dependency, agents MUST evaluate:
- whether the behavior can be achieved with current repo dependencies or native CSS/browser APIs
- whether the dependency materially improves the public component
- whether it increases adoption or registry friction
- whether a consumer would reasonably expect that dependency for this kind of component

No new dependency SHOULD be added unless the payoff is clear.

### Showcasing components and variants

When adding a new component or docs component to the site, agents MUST follow the established showcase pattern from `app/page.tsx`:

- **Section wrapper:** Each component gets its own `<section>` with `rounded-xl border p-4 sm:p-5` and a `flex flex-col gap-4` layout.
- **Section header:** A title (`text-lg font-semibold tracking-tight`) and a short description (`text-sm text-muted-foreground`). For registry items, include an `<OpenInV0Button>` aligned to the right on larger screens.
- **Variant showcase:** When a component has multiple variants, props, or visual states, each one MUST be shown as a labeled sub-section:
  - Group all variants in a `<div className="flex flex-col gap-6">`.
  - Each variant gets a `<div className="flex flex-col gap-2">` containing:
    - A label: `<p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Variant Name</p>`
    - The component rendered with that variant's props.
  - Labels MUST be descriptive and concise (e.g., "Default", "Scrollable", "Muted + Collapsible", "Colored Icons").
- **Single-variant components:** If a component only has one visual state, render it directly inside the section without variant labels.
- **Realistic content:** Examples MUST use realistic, polished content — not lorem ipsum or bare-minimum placeholders.

### Styling

- Styling patterns MUST be uniform across components and docs.
- Existing utility/classname conventions MUST be preferred over inventing new ones.
- Visual consistency between preview examples, code blocks, and docs pages MUST be maintained.
- One-off styling MUST NOT be used unless there is a documented reason.

### Comments and file headers

- Jalco ui file headers and comment style MUST be applied to original Jalco-authored public registry items and docs-facing source files.
- Copied, upstream, generated, or template-derived files MUST NOT be mass-retrofitted unless they are being meaningfully rewritten.
- Public jalco ui registry files SHOULD use a consistent top-of-file header comment when appropriate.
- For public Jalco-authored component entry files, the header SHOULD include:
  - `jalco-ui`
  - component name
  - `by Justin Levine`
  - `ui.justinlevine.me`
  - one-sentence description
  - key public props when useful
  - dependencies, only when the file has noteworthy external or registry requirements
  - inspiration / attribution, only when there is real upstream inspiration worth crediting
  - notes only when runtime behavior materially affects usage
- For smaller supporting files, a lighter header or no header MAY be used if the file is already obvious.
- File headers MUST be compact and human-written in tone.
- File headers MUST NOT duplicate the full docs page inside a source comment.
- **Decorative separator banners MUST NOT appear in source code.** This includes `/* --- */`, `/* === */`, `/* Section Name */` surrounded by dashes, or any padded block-comment dividers. These are AI slop. Use whitespace to separate sections. If a label is genuinely needed, use a single plain `// Label` comment — no box, no dashes, no padding.
- Inline comments MUST be minimal and useful.
- No comment is preferred over obvious commentary.
- Comments SHOULD explain non-obvious decisions, constraints, attribution, or important integration context.
- Comments MUST NOT narrate straightforward code or restate what the code already makes obvious.

### Documentation

- Every meaningful feature MUST include or update docs.
- Documentation MUST be concise and skimmable.
- Examples SHOULD reflect real usage.
- Installation instructions MUST be accurate for multiple package managers when relevant.
- If a component or block has constraints, they MUST be called out explicitly.

### Catalog card previews

Every public registry component MUST have a card preview file so it appears on the `/docs` catalog page and the `/dev/screenshots` utility page.

- A file MUST be created at `components/docs/previews/<registry-name>.tsx` for each component.
- The file MUST default-export an async server component that renders a miniature version of the component with realistic sample data.
- Previews SHOULD be small and self-contained — just enough to visually represent the component in a card thumbnail.
- When a component has meaningful variants, sizes, icon styles, or layout exports, they SHOULD be shown in the preview file using a vertical or wrapped flex layout.
- These files are docs-site only — they MUST NOT be part of the installable registry item.
- After creating or removing a preview file, `pnpm previews:generate` MUST be run to regenerate the import map.
- The generated import map lives in `components/docs/__generated__/preview-imports.ts` and is gitignored.
- The codegen runs automatically on `pnpm dev` and `pnpm build`.

### Screenshot utility page

A dev-only page at `/dev/screenshots` renders every component preview at full size inside a fixed 1280×640 frame for capturing PNGs (Product Hunt, social cards, marketing).

- The page auto-discovers previews from the same generated import map — no extra wiring needed.
- Each component has a per-component scale slider (40%–150%) and a download button.
- A global pixel ratio selector (1x, 2x, 3x) controls export resolution.
- "Download All" batch-saves every component as a PNG.
- The page is excluded from robots.txt and marked `noindex`.
- When adding a new component, the preview file automatically appears on this page after running `pnpm previews:generate`.

### Writing component docs

- `docs-component-format-spec.md` MUST be followed as the canonical docs format guide for public component and block pages.
- Component doc descriptions MUST start with a concise one-sentence summary of what the component does.
- Descriptions MUST NOT start with "A", "An", or "A React component for...".
- Descriptions MUST NOT contain implementation details, subjective adjectives, or unnecessary jargon.
- For registry-backed components, descriptions MUST be aligned between docs frontmatter and registry metadata.
- `## Features` SHOULD only be used when a component has non-obvious capabilities, interaction patterns, or constraints.
- Features sections SHOULD be limited to 2-4 short bullets written in capability-first language.
- Component docs MUST support the site's preview, code, install, and usage flow using the shared docs anatomy: Metadata, Header, Preview, Installation, Usage, then only justified optional sections.
- Not every example is a variant; Variants, Sizes, Examples, Configurations, and bundled export labels MUST be used intentionally.
- Important setup requirements MUST be surfaced before Examples; adoption blockers MUST NOT be buried in Notes.
- API, variants, examples, requirements, or notes sections SHOULD only be added when they provide meaningful value.
- Naming MUST be aligned across component titles, slugs, registry items, preview names, and exports.
- Examples SHOULD use realistic, polished content over placeholder content.
- When changing a public component's API, variants, states, or installation surface, all affected docs MUST be updated in the same change.
- For public component changes, agents MUST check related docs pages, preview/demo files, homepage or showcase examples, usage snippets, and registry metadata.
- Public variants MUST NOT be added or removed without verifying that labels, examples, and preview coverage still match the shipped component.

## Commit standards

This repository MUST use [Conventional Commits](https://www.conventionalcommits.org/).

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

`feat`, `fix`, `docs`, `refactor`, `style`, `test`, `chore`, `build`, `ci`, `perf`, `revert`

### Commit rules

- Commits MUST use the imperative mood.
- Subject lines MUST be concise.
- Subject lines MUST NOT end with a period.
- Each commit MUST be focused to one logical change.
- Formatting-only changes MUST NOT be mixed with feature work unless necessary.
- Small commits SHOULD be preferred over large mixed commits.
- Secrets, tokens, or local environment files MUST NOT be committed.

## Pull request standards

PRs SHOULD be small, clear, and easy to review.

### PR templates

Two PR templates are available:
- **Default** (`.github/pull_request_template.md`) — for general changes (fixes, docs, refactors, infra).
- **Component** (`.github/PULL_REQUEST_TEMPLATE/component.md`) — for new public components. Includes the full component shipping checklist.

When opening a component PR on GitHub, the component template MUST be selected from the template dropdown, or `?template=component.md` appended to the PR URL.

### General PR checklist

- What changed MUST be summarized.
- Why the change was made MUST be explained.
- Design or API decisions SHOULD be noted.
- Screenshots/GIFs SHOULD be included for UI changes.
- Docs MUST be updated if behavior, installation, or usage changed.
- Relevant commands/builds/tests MUST be verified before opening or merging.

### Component PR checklist

Every new public component PR MUST pass these before merging:
- Component source in `registry/<name>/` with registry.json entry
- Sidebar nav entry in `lib/docs.ts` with `badge: "New"` and `badgeAdded` set to today's date
- Docs page at `app/docs/components/<name>/page.tsx` with matching description
- Card preview at `components/docs/previews/<name>.tsx` with key variants
- `pnpm previews:generate` run
- Screenshots at `public/previews/<name>-dark.png` and `<name>-light.png` (1280×640 @ 2x)
- `pnpm registry:build` and `pnpm build` pass
- Dark and light screenshots attached to the PR

### PR title

PR titles MUST use Conventional Commit style.

Examples:
- `feat(registry): add tooltip component`
- `fix(registry): resolve invalid item path`
- `docs(stepper): add usage examples`

## Agent workflow expectations

When working in this repository, agents:
- MUST read existing files before editing them.
- MUST reuse established patterns and structure.
- MUST NOT perform broad rewrites unless explicitly requested.
- SHOULD call out tradeoffs when introducing new patterns.
- MUST prefer surgical edits with minimal blast radius.
- SHOULD keep generated output and formatting noise to a minimum.
- MUST document new conventions in this file or the relevant docs.

### Prompt and slash-command workflow

For component-focused work, agents MUST prefer the shared jalco ui prompts and workflow files:
- `.pi/prompts/component-create.md` for creating a new component, block, or docs-facing UI artifact
- `.pi/prompts/component-review.md` for auditing an existing component, preview, or public API
- `.pi/skills/jalco-component-builder/SKILL.md` as the primary workflow skill behind both flows

When a user asks to create or review a component, agents MUST NOT jump straight to implementation. Start from the Jalco component-builder workflow, clarify requirements when needed, then implement and document the result.

## Consistency rules

- One naming convention per concern MUST be used and kept consistent.
- Public APIs MUST be stable and intentional.
- Example data MUST be realistic and tidy.
- Docs copy, component names, and registry item names MUST be aligned.
- If introducing a new pattern, it MUST be applied consistently or documented as exceptional.

## Open-source readiness

Because this code is public:
- Code and docs MUST be written as if others will learn from them.
- Private/internal shorthand MUST NOT appear in committed code.
- Descriptive names MUST be preferred over personal abbreviations.
- Onboarding friction MUST be kept low for contributors and users.
- Installation and usage paths MUST be obvious.

## When unsure

If a decision is unclear, prefer:
1. readability
2. accessibility
3. consistency
4. maintainability
5. extensibility

## Initial conventions for jal-co/ui

Until the project evolves further, default to:
- clean documentation-first structure
- shadcn-aligned ergonomics
- strong preview/code/install UX
- multi-package-manager install examples where relevant
- polished, production-quality examples over quantity
