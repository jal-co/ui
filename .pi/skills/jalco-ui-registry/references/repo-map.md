# Jalco UI Repo Map

Use this file to orient quickly inside `/Users/justin/Documents/Github/jalco-ui`.

## Primary files

- `/Users/justin/Documents/Github/jalco-ui/AGENTS.md`
  - Canonical repo standards for implementation, docs, composition, and review.
- `/Users/justin/Documents/Github/jalco-ui/README.md`
  - Project intent and public positioning.
- `/Users/justin/Documents/Github/jalco-ui/package.json`
  - Runtime stack and available scripts.
- `/Users/justin/Documents/Github/jalco-ui/components.json`
  - shadcn/ui project configuration.
- `/Users/justin/Documents/Github/jalco-ui/registry.json`
  - Main registry metadata source.
- `/Users/justin/Documents/Github/jalco-ui/public/r/registry.json`
  - Public-facing registry payload mirror.

## Main directories

### `registry/`
Registry item source files.

Common patterns:
- `registry/<item-name>/<item>.tsx`
- `registry/<item-name>/lib/*.ts`
- `registry/<item-name>/hooks/*.ts`
- `registry/ui/*` for local shadcn-style primitives used by registry items

Examples:
- `registry/github-stars-button/`
- `registry/waitlist-card/`
- `registry/code-line/`

### `app/docs/components/`
Docs pages for public components.

Common pattern:
- `app/docs/components/<slug>/page.tsx`

These pages typically include:
- page metadata
- header copy
- preview section
- installation section
- usage section
- examples and/or features
- API reference and notes when justified

### `components/docs/`
Reusable docs-site building blocks.

Examples:
- `code-block.tsx`
- `code-block-command.tsx`
- `dependency-badges.tsx`
- `api-ref-table.tsx`
- `sidebar.tsx`

Use these before inventing new docs-only UI.

### `prompts/`
Repo-aware prompts that already encode useful Jalco UI workflows.

Read when useful:
- `prompts/create-jalco-component.md`
- `prompts/review-jalco-component.md`
- `prompts/ideate-jalco-components.md`

## Best example files

### Registry implementation examples

- `/Users/justin/Documents/Github/jalco-ui/registry/github-stars-button/github-stars-button.tsx`
  - Strong variant API and server-first implementation.
- `/Users/justin/Documents/Github/jalco-ui/registry/github-stars-button/github-button-group.tsx`
  - Good example of a richer API with metrics and segmented interactions.
- `/Users/justin/Documents/Github/jalco-ui/registry/waitlist-card/waitlist-card.tsx`
  - Good example of a client component with focused interactivity.
- `/Users/justin/Documents/Github/jalco-ui/registry/code-line/code-line.tsx`
  - Good example of server component + client subcomponent split.

### Docs page examples

- `/Users/justin/Documents/Github/jalco-ui/app/docs/components/github-stars-button/page.tsx`
- `/Users/justin/Documents/Github/jalco-ui/app/docs/components/github-button-group/page.tsx`
- `/Users/justin/Documents/Github/jalco-ui/app/docs/components/waitlist-card/page.tsx`
- `/Users/justin/Documents/Github/jalco-ui/app/docs/components/code-line/page.tsx`

Use the closest matching page as the starting point for structure and section selection.

## Navigation heuristics

If asked to:
- create a component → inspect `registry/` and the nearest docs page first
- write docs → inspect a matching page under `app/docs/components/`
- change install instructions → inspect docs page + `registry.json`
- change dependencies → inspect both implementation imports and registry metadata
- review registry readiness → inspect implementation, docs page, and `registry.json` together

## Alignment rules

Keep these aligned:
- folder name
- item name in `registry.json`
- export name
- docs title
- docs slug/path
- install URL
- descriptive copy

Misalignment across those surfaces is a Jalco UI quality failure.
