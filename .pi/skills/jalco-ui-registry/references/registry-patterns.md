# Registry Patterns

Use this file when editing Jalco UI registry metadata.

## Main file

Primary source:
- `/Users/justin/Documents/Github/jalco-ui/registry.json`

Public mirror currently exists at:
- `/Users/justin/Documents/Github/jalco-ui/public/r/registry.json`

Treat metadata accuracy as part of the feature.

## Required alignment

For each item, align:
- `name`
- folder name under `registry/`
- install URL payload name
- docs page slug
- exported component naming
- title and description

## Common fields

### `name`
Lowercase kebab-case item identifier.

### `type`
Use the correct registry file type:
- `registry:component`
- `registry:block`
- `registry:page`
- `registry:lib`
- `registry:hook`

Choose the smallest correct type; do not mislabel files for convenience.

### `title`
Human-facing name shown in docs or discovery contexts.

### `description`
Short, polished summary aligned with docs copy.

Good descriptions are:
- concise
- capability-first
- easy to scan
- free of implementation noise unless that behavior is core

### `dependencies`
Use for npm package dependencies the installed artifact truly requires.

Examples already in repo:
- `zod`
- `shiki`
- `lucide-react`

Do not add dependencies that are already covered by registry dependencies or are not actually required by the shipped item.

### `registryDependencies`
Use for upstream shadcn registry items the installation depends on.

Examples already in repo:
- `button`
- `card`
- `input`
- `label`
- `textarea`

### `categories`
Use categories when they improve browsing and organization.
Keep them meaningful and sparse.

### `files`
Each file must include:
- accurate `path`
- accurate `type`
- `target` only when needed

## Multi-file item pattern

A richer item may include:
- main component files
- `lib/*.ts`
- `hooks/*.ts`
- subcomponents

See `github-stars-button` and `complex-component` for current patterns.

## Description quality bar

Registry descriptions should read like polished docs summaries, not placeholders.

Better:
- `Compact single-line code snippet with syntax highlighting and an inline copy button.`

Worse:
- `A component for showing code lines in React apps with copy functionality.`

## Editing rules

When updating `registry.json`:
- inspect actual imports and file paths first
- verify types and dependency declarations
- check whether docs page copy needs to change too
- avoid adding metadata fields without a clear reason

## Readiness checklist

Before finishing metadata changes, verify:
- every listed file exists
- every type is correct
- dependency lists are justified
- title and description match the implementation
- install URL expectations are clear from the item name
