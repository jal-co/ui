# Docs Patterns

Use this file when creating or revising Jalco UI docs pages.

## Canonical spec

The canonical docs format guide lives at:
- `/Users/justin/Documents/Github/jalco-ui/docs-component-format-spec.md`

Read that file when making docs structure decisions.

## Primary goal

A Jalco UI docs page should help someone:
- understand what the component is
- install it quickly
- see what it looks like
- copy a working usage example
- understand meaningful customization points

## Required framework

Public component docs should follow the shared page framework:
1. Metadata
2. Header
3. Preview
4. Installation
5. Usage

After that, only include justified optional sections such as:
- Requirements
- When to use
- Examples
- Features
- API Reference
- Customization
- Notes

## Key structural rules

- Use the standard section order from `docs-component-format-spec.md`.
- Keep docs consistent across the site without forcing every page to have identical sections.
- Treat setup blockers as Requirements or Usage guidance, not buried Notes.
- Do not call every example a variant.
- Keep examples labeled by meaning: Variants, Sizes, Examples, Configurations, or bundled exports.

## Copy rules

Follow repo guidance from `AGENTS.md` and the docs format spec:
- start descriptions with a concise sentence
- do not start with "A", "An", or "A React component for..."
- avoid implementation-detail-first descriptions
- avoid fluff and subjective marketing copy in technical summaries
- keep docs description aligned with `registry.json`

## Installation and requirements

For public items, include the shadcn CLI command using the Jalco registry URL pattern:

```bash
npx shadcn@latest add https://ui.justinlevine.me/r/<item-name>.json
```

If a secondary exported component is bundled inside another item, say so clearly instead of pretending it has its own payload.

If supporting setup materially affects adoption, explain it before Examples.

## Usage and examples

Usage should usually include:
- import example
- simplest meaningful render example
- an important runtime note if relevant

Examples should be:
- realistic
- labeled clearly
- grouped by meaning rather than by arbitrary prop existence

## API and notes

Use an API section when the public props are meaningful enough to deserve a formal reference.

Use Notes for secondary behavior details like cache behavior, fallback behavior, or implementation nuance.
Do not use Notes as a dumping ground for setup blockers or primary usage constraints.

## Alignment rules

Ensure these agree:
- page metadata description
- header description
- `registry.json` description
- actual implementation behavior

If those drift, fix them together.

## Good docs heuristics

A good Jalco UI docs page is:
- skimmable
- honest about constraints
- visually polished
- technically precise
- built from realistic examples
- minimal without feeling incomplete
