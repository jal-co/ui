---
name: jalco-shadcn-registry
description: Build and maintain the jalco ui shadcn-compatible registry. Use when creating or reviewing registry items, editing registry.json, choosing registry item types, configuring namespaced registries, planning authentication, adding docs metadata, or ensuring MCP/open-in-v0 compatibility.
---

<overview>

# jal-co/ui shadcn Registry Skill

Use this skill when working on jalco ui registry infrastructure, registry items, or registry-related docs.

</overview>

<context>

## Required reading before changes

Before implementing registry work, the agent MUST read:
- `AGENTS.md`
- `registry.json`
- `package.json`
- `.pi/skills/vercel-react-best-practices/SKILL.md`
- `.pi/skills/vercel-composition-patterns/SKILL.md`
- `.pi/skills/tailwind-design-system/SKILL.md`

When needed, the agent SHOULD also inspect:
- `components.json`
- `public/r`
- `registry/`
- `components/open-in-v0-button.tsx`
- `app/page.tsx`

## What this skill covers

- creating new registry items
- choosing the correct registry item type
- updating `registry.json`
- validating `files`, `target`, `dependencies`, and `registryDependencies`
- organizing items under `registry/[style]/...`
- planning namespaced registries
- preparing for MCP compatibility
- planning Open in v0 compatibility
- documenting installation and usage
- evaluating item types: `registry:component`, `registry:block`, `registry:ui`, `registry:lib`, `registry:hook`, `registry:style`, `registry:theme`, `registry:base`, or `registry:item`

</context>

<rules>

## Core rules from shadcn registry docs

### Registry basics

- The registry MUST expose a root `registry.json` payload.
- `registry.json` MUST validate against `https://ui.shadcn.com/schema/registry.json`.
- Registry items MUST conform to `https://ui.shadcn.com/schema/registry-item.json`.
- The `shadcn build` command generates item payloads under `public/r` by default.
- The registry index SHOULD maintain useful titles and descriptions.

### File organization

- Source files SHOULD be placed under `registry/[style]/[item-name]/...`.
- For grouped items, internal folders like `components/`, `hooks/`, and `lib/` SHOULD be used.
- Imports inside registry source MUST use the `@/registry/...` path when referencing registry-local files.
- File structure MUST be intentional and installable.

### Choosing item types

The agent MUST use the smallest correct type:
- `registry:component` for simple components
- `registry:ui` for reusable UI primitives and single-file primitives
- `registry:block` for multi-file installable blocks and richer examples
- `registry:hook` for hooks
- `registry:lib` for utilities and non-component code
- `registry:page` for route/page files
- `registry:file` for miscellaneous targeted files
- `registry:theme` for theme tokens
- `registry:style` for styles
- `registry:base` for full design-system base configuration
- `registry:item` for universal or framework-agnostic items

### files and targets

- Every file entry MUST include `path` and `type`.
- `target` is REQUIRED for `registry:page` and `registry:file`.
- Explicit targets SHOULD be used for universal items.
- Target paths MUST be clear, intentional, and safe.

### Dependencies

- `dependencies` MUST be used for npm packages.
- `devDependencies` MUST only be used for development-only packages.
- `registryDependencies` MUST be used for shadcn items, namespaced items, or remote registry item URLs.
- Dependencies MUST be complete and accurate.
- Dependency sets SHOULD be minimal.

### Metadata quality

- `title` and `description` MUST have useful values.
- Meaningful `categories` and `meta` SHOULD be provided when they improve discoverability.
- `docs` SHOULD be used to show extra installation/setup guidance when needed.
- Descriptions SHOULD help both humans and MCP/AI systems understand the item quickly.

</rules>

<guidelines>

## Namespaces

Namespace support SHOULD be planned early.

### Namespace rules

- Namespace names MUST start with `@`.
- Format MUST be `@namespace/resource-name`.
- Namespace config belongs in `components.json` under `registries`.
- `{name}` in registry URLs MUST be supported.
- `{style}` SHOULD be supported when serving style-specific variants.

### Suggested jalco ui approach

Start simple, then expand.

Good initial public namespace options:
- `@jalco` for primary public items
- `@jalco-blocks` for blocks if separation becomes useful
- `@jalco-experimental` for unstable items later

Default recommendation:
- keep the source registry simple first
- design item naming and docs so a namespace strategy can be layered on cleanly later

## Authentication

For private registries or future premium/internal variants:
- MUST use HTTPS
- SHOULD use environment-variable-backed credentials
- SHOULD support Bearer token or API key auth for CLI consumers
- MAY use query parameter auth when needed for Open in v0 compatibility
- MUST NOT commit tokens or real credentials

### Open in v0 limitation

Open in v0 does not support:
- namespaced registries
- cssVars
- css
- envVars
- advanced header-based authentication

If Open in v0 support is required, prefer a public item URL or query-parameter-based auth.

## MCP compatibility

The shadcn MCP server works with shadcn-compatible registries without special custom server work.

To stay MCP-friendly:
- `registry.json` MUST be valid and discoverable
- Item names MUST be consistent and kebab-case
- Descriptions SHOULD be informative
- Dependencies MUST be declared accurately
- `registryDependencies` MUST preserve clear relationships
- A registry index item MUST be available at the expected root registry endpoint

## Open-source registry index

If jalco ui is submitted to the shadcn open-source registry index later:
- the registry MUST be publicly accessible
- the registry SHOULD be flat at the public endpoint
- item payloads MUST be root-addressable
- MUST NOT rely on embedded `content` in the public registry index listing
- the final hosted shape MUST be validated against shadcn requirements before submission

</guidelines>

<constraints>

## jal-co/ui standards for registry work

Every registry item MUST be:
- installable
- readable
- accessible
- polished
- documentation-ready
- consistent with jalco ui naming and design standards

SHOULD prefer:
- strong preview value
- practical examples
- accurate install guidance
- minimal surprises for consumers

MUST NOT include:
- vague descriptions
- bloated dependency lists
- unclear file targets
- overly clever item structures
- inconsistent item types
- undocumented environment variable requirements

</constraints>

<workflow>

## Recommended workflow

1. Create a feature branch: `feat/<item-name>`.
2. Read `AGENTS.md` and relevant local skills.
3. Inspect similar registry items already in the repo.
4. Choose the correct item type.
5. Create files under the correct `registry/[style]/...` location.
6. Update `registry.json` with accurate metadata.
7. Verify dependencies and registry dependencies.
8. Create a catalog card preview at `components/docs/previews/<registry-name>.tsx` with key variants.
9. Add the sidebar nav entry in `lib/docs.ts` with `badge: "New"` and `badgeAdded` set to today's ISO date.
10. Run `pnpm previews:generate` to update the catalog import map.
11. Generate screenshots via `/dev/screenshots` — save dark and light PNGs to `public/previews/`.
12. Run `pnpm registry:build`.
13. Run `pnpm build` to verify full compilation.
14. Test the local endpoint in `public/r` or via the dev server.
15. Confirm docs/install copy is accurate.
16. Open a PR using the component template (`.github/PULL_REQUEST_TEMPLATE/component.md`).
17. If relevant, verify MCP and Open in v0 implications.

## Useful commands

```bash
pnpm install
pnpm dev
pnpm registry:build
pnpm dlx shadcn@latest view http://localhost:3000/r/<item-name>.json
pnpm dlx shadcn@latest add http://localhost:3000/r/<item-name>.json
```

</workflow>

<quality-checklist>

## When reviewing registry work

Check for:
- valid item type selection
- correct `files` and `target` usage
- complete dependency declarations
- good descriptions and categories
- installability
- consistent registry paths
- realistic docs guidance
- namespace/auth/MCP/open-in-v0 implications when relevant

</quality-checklist>
