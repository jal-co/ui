---
name: jalco-ui-registry
description: Create, review, and document jalco ui registry items with shadcn-style ergonomics, strong variants, and docs-to-registry alignment. Use for adding jalco ui components or blocks, updating registry.json, writing component docs, reviewing API and composition quality, or navigating the jalco-ui docs and registry structure. Use proactively when working in /Users/justin/Documents/Github/jalco-ui or when the user asks to create a component, improve variants, write docs, or audit registry readiness.
---

# jal-co/ui Registry

Repo-aware guidance for building polished jalco ui registry items and documentation.

## When to Use

Use this skill when working in:
- `/Users/justin/Documents/Github/jalco-ui`

Use it for:
- creating a new jalco ui component or block
- reviewing a registry item for readiness
- updating `registry.json`
- writing or revising docs pages under `app/docs/components/*`
- deciding whether a component needs variants
- aligning implementation, docs copy, exports, and registry metadata
- navigating the repo's docs and registry structure

## Read First

Start with these repository files:
1. `/Users/justin/Documents/Github/jalco-ui/AGENTS.md`
2. `/Users/justin/Documents/Github/jalco-ui/registry.json`
3. `/Users/justin/Documents/Github/jalco-ui/README.md`
4. `/Users/justin/Documents/Github/jalco-ui/app/docs/page.mdx`
5. `/Users/justin/Documents/Github/jalco-ui/app/docs/installation/page.mdx`

Then route by task:
- Need repo orientation or example files → `references/repo-map.md`
- Creating a new component or block → `references/component-workflow.md`
- Designing variants and public API → `references/variants-and-api.md`
- Writing or revising docs → `references/docs-patterns.md`
- Editing registry metadata → `references/registry-patterns.md`
- Auditing existing work → `references/review-checklist.md`

## Core Rules

- Follow jalco ui's repo conventions before introducing new patterns.
- Reuse existing registry and docs patterns before inventing new structure.
- Keep components installable, readable, and easy to adapt.
- Prefer composability over boolean-prop-heavy APIs.
- Add variants when they represent real reusable visual states, not speculative flexibility.
- Treat docs as part of the feature, not a follow-up.
- Keep naming aligned across folder names, exports, docs titles, slugs, and `registry.json` entries.
- Use `"use client"` only when interactivity actually requires it.
- Prefer realistic examples over placeholder content.
- Follow jalco ui's compact comment style for Jalco-authored public files: useful file headers when appropriate, minimal inline comments, and no decorative AI-style section banners.
- For public component entry files, headers should usually include the component name, a one-sentence description, and key props when helpful.
- Do not mass-retrofit copied, upstream, generated, or template-derived files unless they are being meaningfully rewritten.

## Best Existing Anchors

Use these as primary examples unless a closer match exists:
- Registry implementation:
  - `/Users/justin/Documents/Github/jalco-ui/registry/github-stars-button/github-stars-button.tsx`
  - `/Users/justin/Documents/Github/jalco-ui/registry/github-stars-button/github-button-group.tsx`
  - `/Users/justin/Documents/Github/jalco-ui/registry/waitlist-card/waitlist-card.tsx`
  - `/Users/justin/Documents/Github/jalco-ui/registry/code-line/code-line.tsx`
- Docs pages:
  - `/Users/justin/Documents/Github/jalco-ui/app/docs/components/github-stars-button/page.tsx`
  - `/Users/justin/Documents/Github/jalco-ui/app/docs/components/github-button-group/page.tsx`
  - `/Users/justin/Documents/Github/jalco-ui/app/docs/components/waitlist-card/page.tsx`
  - `/Users/justin/Documents/Github/jalco-ui/app/docs/components/code-line/page.tsx`

## Expected Output

When creating or updating jalco ui work, usually produce or update:
- one or more files under `registry/<item-name>/`
- a matching `registry.json` entry
- a docs page under `app/docs/components/<slug>/page.tsx` when the item is public-facing
- a catalog card preview at `components/docs/previews/<registry-name>.tsx`
- a sidebar nav entry in `lib/docs.ts`
- installation and usage copy aligned with the registry payload URL
- notes about accessibility, API quality, and any tradeoffs

After creating or modifying a card preview file, run `pnpm previews:generate` to update the auto-generated import map.

## Validation

Before considering work done:
- confirm work is on a feature branch (`feat/<name>`), not main
- confirm the item type and file paths are correct
- confirm metadata and docs descriptions align
- confirm dependencies and registryDependencies are justified
- confirm variants are intentional and documented when exposed
- confirm docs include realistic preview, install, and usage guidance
- confirm a catalog card preview exists at `components/docs/previews/<registry-name>.tsx` with key variants
- confirm the sidebar nav entry exists in `lib/docs.ts` with `badge: "New"` and `badgeAdded` date
- confirm screenshots exist at `public/previews/<name>-dark.png` and `<name>-light.png`
- confirm `pnpm registry:build` and `pnpm build` pass
- confirm the component feels shadcn-style: composable, accessible, and easy to own
- open a PR using the component template (`.github/PULL_REQUEST_TEMPLATE/component.md`)
