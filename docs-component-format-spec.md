# Jalco UI Component Docs Format Spec

Canonical format guidance for Jalco UI component and block docs pages.

This is the single source of truth for docs structure. The writing skill (`.pi/skills/jalco-writing-component-docs/SKILL.md`) defers to this spec for page anatomy and section order.

## Goals

Jalco UI docs should be:
- consistent across the site
- easy to scan
- realistic and install-oriented
- aligned with registry metadata
- clear about requirements and constraints
- strong on preview, code, and installation UX

## Core principle

All component docs should follow the same **page framework**, but only include extra sections when they add real value.

Do **not** force every page to have every section.

## Page anatomy

Every public component docs page uses `ComponentDocsPage` from `components/docs/component-docs-page.tsx`, which handles the shared skeleton:

1. **Header** — title, description, AiCopyButton, DependencyBadges
2. **Preview** — live component in a tabbed preview/code container
3. **Installation** — `InstallCommand` with optional `installNote`
4. **Usage** — import snippet, minimal example, runtime notes

After that, pages supply additional sections as children. Include only the sections that are justified:

5. **Playground** — interactive prop editor via `ComponentPlayground`
6. **Examples** — labeled variant/configuration showcases via `VariantGrid`
7. **When to use** *(if needed)* — when a component has multiple exported variants or semantic boundaries
8. **API Reference** *(if needed)* — `ApiRefTable` with props
9. **Notes** *(if needed)* — caveats, limitations, implementation details that affect adoption

## Section guidance

### Header

Handled by `ComponentDocsPage`. Supply:
- `title` — component display name
- `description` — one sentence, capability-first, no "A" or "An" prefix
- `registryName` — wires up DependencyBadges and InstallCommand automatically

### Preview

Supply `sourceFiles` (registry file paths) and `preview` (live component JSX). The `ComponentDocsPage` renders these in a `ComponentPreview` with tabbed preview/code.

### Installation

Automatic from `registryName`. For bundled exports (components shipped inside another registry item), use `installNote` to explain the relationship.

### Usage

Supply as the `usage` prop. Should include:
- import snippet via `CodeLine`
- minimal usage snippet via `CodeLine`
- runtime context when it affects adoption (server component, client requirement, etc.)

Architecture details like "this is a server component" belong here, not in Notes.

### Playground

Every public component docs page should include an interactive playground. Use `ComponentPlayground` from `components/docs/component-playground.tsx`.

Since docs pages are server components and many registry components are async server components, the playground render function must live in a client component. Create a `playground.tsx` file colocated with the docs page:

```
app/docs/components/[name]/
├── page.tsx          # server component — imports playground
└── playground.tsx    # "use client" — imports component + ComponentPlayground
```

The playground file:
- imports the component (or a synchronous client preview replica for async server components)
- defines the `controls` array
- exports a named playground component that the page renders

Use `hideFromCode` to exclude props that are only needed for the preview but not meaningful in consumer code (e.g. pre-fetched data, star counts).

Control types: `boolean` (toggle), `select` (pill group), `number` (stepper), `text` (input).

### Examples

Use `VariantGrid` to show labeled configurations. Group by meaning:
- **Variants** — actual visual style variants
- **Sizes** — size props
- **Languages**, **Command types**, etc. — configuration categories
- Do not call everything a variant

### When to use

Only for components with multiple exported variants where users need guidance choosing between them (e.g. TipJar's six layout variants).

### API Reference

Use `ApiRefTable`. Include when props need explanation beyond type names or when there are compound parts. Skip for tiny components where usage examples already communicate the API.

### Notes

For caveats, limitations, and implementation details that affect adoption. Keep brief.

**What belongs here:**
- Gotchas and limitations
- External service behavior (caching, rate limits)
- Extensibility guidance

**What does NOT belong here:**
- Server/client rendering context → put in Usage
- Feature highlights → put in the description or Examples
- Architecture decisions obvious from the code

## Writing rules

- Start descriptions with a verb or noun phrase, not "A", "An", or "A React component for..."
- Prefer capability-first language
- Avoid subjective adjectives
- Keep descriptions aligned across page metadata, header, and `registry.json`
- Use realistic example content, not placeholders
- Keep all copy concise and skimmable

## Registry alignment

For every public docs page, verify alignment across:
- docs `metadata.title`
- docs `metadata.description`
- `ComponentDocsPage` `title` and `description` props
- `registry.json` item `title` and `description`
- sidebar nav title in `lib/docs.ts`

Misalignment is a docs quality issue.

## Bundled exports

When a docs page documents a component shipped inside another registry item:
- Set `installNote` to explain the relationship
- Set `bundledIn` on the nav item in `lib/docs.ts` for visual grouping in the sidebar
- The install command still uses the parent registry item name

## Code comments and file headers

For original Jalco-authored public registry source files, prefer a compact top-of-file header:

```ts
/**
 * jalco-ui
 * CodeLine
 * by Justin Levine
 * ui.justinlevine.me
 *
 * Compact single-line code snippet with syntax highlighting and an inline copy button.
 *
 * Props:
 * - code: single-line code string to render
 * - language?: shiki language key, defaults to "tsx"
 *
 * Dependencies: shiki, lucide-react
 */
```

Rules:
- Keep headers compact
- Never add decorative separator banners (`/* --- */`, `/* === */`)
- Prefer no comment over an obvious comment
- Do not duplicate the docs page inside a comment

## Review checklist

Before shipping a docs page, confirm:
- [ ] Page uses `ComponentDocsPage` for the shared skeleton
- [ ] Description is concise, capability-first, no "A"/"An" prefix
- [ ] Description matches across metadata, header, and registry.json
- [ ] Preview shows a realistic default state
- [ ] Installation is accurate (including bundled export notes)
- [ ] Usage includes runtime context (server/client) when relevant
- [ ] Playground section with interactive prop controls
- [ ] Playground uses `hideFromCode` for non-consumer props (data, pre-fetched values)
- [ ] Examples are labeled correctly (not everything called a "variant")
- [ ] Notes contains only caveats, not architecture or feature highlights
- [ ] Sidebar nav title and ordering are correct
- [ ] Bundled exports are indented in the sidebar

## Anti-patterns

Avoid:
- Forcing every page to have identical sections
- Calling every example a variant
- Burying setup blockers in Notes
- Maintaining a parallel `pageContent` markdown string manually
- Repeating the same sentence across multiple sections
- Decorative AI-generated comment banners in source files
