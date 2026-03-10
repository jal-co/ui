---
name: jalco-shadcn-registry
description: Build and maintain the Jalco UI shadcn-compatible registry. Use when creating or reviewing registry items, editing registry.json, choosing registry item types, configuring namespaced registries, planning authentication, adding docs metadata, or ensuring MCP/open-in-v0 compatibility.
---

# Jalco UI shadcn Registry Skill

Use this skill when working on Jalco UI registry infrastructure, registry items, or registry-related docs.

## Required reading before changes

Before implementing registry work, read:
- `AGENTS.md`
- `registry.json`
- `package.json`
- `.pi/skills/vercel-react-best-practices/SKILL.md`
- `.pi/skills/vercel-composition-patterns/SKILL.md`
- `.pi/skills/tailwind-design-system/SKILL.md`

When needed, also inspect:
- `components.json`
- `public/r`
- `registry/`
- `components/open-in-v0-button.tsx`
- `app/page.tsx`

## What this skill covers

Use this skill for:
- creating new registry items
- choosing the correct registry item type
- updating `registry.json`
- validating `files`, `target`, `dependencies`, and `registryDependencies`
- organizing items under `registry/[style]/...`
- planning namespaced registries
- preparing for MCP compatibility
- planning Open in v0 compatibility
- documenting installation and usage
- evaluating whether an item should be `registry:component`, `registry:block`, `registry:ui`, `registry:lib`, `registry:hook`, `registry:style`, `registry:theme`, `registry:base`, or `registry:item`

## Core rules from shadcn registry docs

### Registry basics
- The registry must expose a root `registry.json` payload.
- Jalco UI should keep `registry.json` valid against `https://ui.shadcn.com/schema/registry.json`.
- Registry items must conform to `https://ui.shadcn.com/schema/registry-item.json`.
- The `shadcn build` command generates item payloads under `public/r` by default.
- Jalco UI should preserve a clean, public-quality registry index with useful titles and descriptions.

### File organization
- Prefer placing source files under `registry/[style]/[item-name]/...`.
- For grouped items, prefer internal folders like `components/`, `hooks/`, and `lib/`.
- Imports inside registry source should use the `@/registry/...` path when referencing registry-local files.
- Keep file structure intentional and installable.

### Choosing item types
Use the smallest correct type:
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
- Every file entry must include `path` and `type`.
- `target` is required for `registry:page` and `registry:file`.
- Use explicit targets for universal items.
- Keep target paths clear, intentional, and safe.

### Dependencies
- Use `dependencies` for npm packages.
- Use `devDependencies` only for development-only packages.
- Use `registryDependencies` for shadcn items, namespaced items, or remote registry item URLs.
- Make dependencies complete and accurate.
- Prefer minimal dependency sets.

### Metadata quality
- Always provide useful `title` and `description` values.
- Prefer meaningful `categories` and `meta` when they improve discoverability.
- Use `docs` to show extra installation/setup guidance when needed.
- Prefer descriptions that help both humans and MCP/AI systems understand the item quickly.

## Namespaces

Jalco UI should plan for namespace support early.

### Namespace rules
- Namespace names must start with `@`.
- Use `@namespace/resource-name` format.
- Namespace config belongs in `components.json` under `registries`.
- Support `{name}` in registry URLs.
- Support `{style}` when serving style-specific variants is useful.

### Suggested Jalco UI approach
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
- prefer HTTPS always
- prefer environment-variable-backed credentials
- support Bearer token or API key auth for CLI consumers
- use query parameter auth only when needed for Open in v0 compatibility
- never commit tokens or real credentials

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
- keep `registry.json` valid and discoverable
- make item names consistent and kebab-case
- provide good descriptions
- declare dependencies accurately
- preserve clear relationships in `registryDependencies`
- ensure a registry index item is available at the expected root registry endpoint

## Open-source registry index

If Jalco UI is submitted to the shadcn open-source registry index later:
- the registry must be publicly accessible
- the registry should be flat at the public endpoint
- item payloads should be root-addressable
- do not rely on embedded `content` in the public registry index listing
- validate the final hosted shape against shadcn requirements before submission

## Jalco UI standards for registry work

Every registry item should be:
- installable
- readable
- accessible
- polished
- documentation-ready
- consistent with Jalco UI naming and design standards

Prefer:
- strong preview value
- practical examples
- accurate install guidance
- minimal surprises for consumers

Avoid:
- vague descriptions
- bloated dependency lists
- unclear file targets
- overly clever item structures
- inconsistent item types
- undocumented environment variable requirements

## Recommended workflow

1. Read `AGENTS.md` and relevant local skills.
2. Inspect similar registry items already in the repo.
3. Choose the correct item type.
4. Create files under the correct `registry/[style]/...` location.
5. Update `registry.json` with accurate metadata.
6. Verify dependencies and registry dependencies.
7. Run `pnpm registry:build`.
8. Test the local endpoint in `public/r` or via the dev server.
9. Confirm docs/install copy is accurate.
10. If relevant, verify MCP and Open in v0 implications.

## Useful commands

```bash
pnpm install
pnpm dev
pnpm registry:build
pnpm dlx shadcn@latest view http://localhost:3000/r/<item-name>.json
pnpm dlx shadcn@latest add http://localhost:3000/r/<item-name>.json
```

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
