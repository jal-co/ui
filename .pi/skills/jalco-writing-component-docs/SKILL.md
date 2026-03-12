---
name: jalco-writing-component-docs
description: Write and review Jalco UI component documentation with consistent structure, concise descriptions, realistic examples, and registry-aligned metadata. Use when creating new component docs, updating existing docs, reviewing doc quality, or syncing registry-backed component copy.
---

# Jalco UI Component Docs Skill

Use this skill when creating, editing, or reviewing component documentation in Jalco UI.

## Canonical reference

The single source of truth for docs page structure, section order, and formatting rules is:

**`docs-component-format-spec.md`** (project root)

Read it before writing or updating any component docs. This skill provides workflow guidance and review steps, not a parallel format definition.

## Required reading before changes

1. `docs-component-format-spec.md` — page anatomy, section order, writing rules
2. `AGENTS.md` — project conventions, quality bar, comment style
3. `.pi/skills/jalco-shadcn-registry/SKILL.md` — for registry-backed items

Also inspect:
- similar component docs already in the repo
- the source component and its example/demo files
- any related registry metadata

## What this skill covers

- writing new component docs
- revising existing component docs
- reviewing docs for clarity and consistency
- writing or refining descriptions
- keeping registry-backed descriptions in sync

## Workflow

1. Read `docs-component-format-spec.md` and this skill.
2. Inspect similar docs pages in `app/docs/components/`.
3. Review the component source, public API, and demo files.
4. Create or update the page using `ComponentDocsPage` from `components/docs/component-docs-page.tsx`.
5. Supply: `title`, `description`, `registryName`, `sourceFiles`, `preview`, `usage`.
6. Add Examples, API Reference, Notes, or When to use sections as children — only when justified.
7. Sync description and naming with `registry.json` and `lib/docs.ts`.
8. Review using the checklist in `docs-component-format-spec.md`.

## Quick rules

These are the rules most frequently needed during docs work. For full details, see the format spec.

### Descriptions
- One sentence, capability-first
- No "A", "An", or "A React component for..." prefix
- No subjective adjectives
- Must match across: page metadata, ComponentDocsPage props, registry.json

### Usage section
- Include import and minimal usage snippets via `CodeLine`
- Put server/client rendering context here, not in Notes
- Keep the first example minimal — layer complexity in Examples

### Examples
- Use `VariantGrid` with labeled items
- Group by meaning: Variants, Sizes, Languages, etc.
- Do not call everything a variant
- Use realistic content

### Notes
- Caveats, limitations, and external service behavior only
- Not for architecture decisions, feature highlights, or rendering context
- Keep brief

### Bundled exports
- Use `installNote` to explain the relationship
- Set `bundledIn` on the nav item in `lib/docs.ts`

## Review checklist

Use the checklist in `docs-component-format-spec.md` before shipping any docs page.

Key things to verify:
1. Page uses `ComponentDocsPage`
2. Description matches across all surfaces
3. Preview is realistic
4. Usage includes runtime context
5. Examples are labeled correctly
6. Notes contains only caveats
7. Sidebar entry is correct (title, order, bundledIn)
