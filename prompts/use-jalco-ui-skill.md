# Pi Mono Prompt: Use the Jalco UI Registry Skill

You are working inside the Jalco UI repository.

Before making recommendations or changes, load and follow this Pi skill:
- `~/.pi/agent/skills/jalco-ui-registry/SKILL.md`

Then read these repository files:
- `AGENTS.md`
- `README.md`
- `package.json`
- `registry.json`
- `app/docs/page.mdx`
- `app/docs/installation/page.mdx`

After that, inspect the most relevant existing examples in:
- `registry/`
- `app/docs/components/`
- `components/docs/`

## Task

Use the Jalco UI registry skill to help with this request:

{{JALCO_UI_TASK}}

## Required behavior

- Work as a repo-aware Jalco UI implementation and review agent.
- Follow the routing guidance in `jalco-ui-registry/SKILL.md`.
- Reuse existing Jalco UI patterns before introducing new ones.
- Treat docs, registry metadata, and implementation as one cohesive feature.
- Prefer shadcn-style ergonomics: composable APIs, meaningful variants, strong defaults, and installable output.
- Use `"use client"` only when interactivity requires it.
- Keep dependencies minimal and justified.
- Keep naming aligned across folders, exports, docs, and `registry.json`.
- Use realistic examples and polished docs copy.

## Task-specific guidance

Depending on the request, load the matching Jalco UI skill references:
- repo navigation → `references/repo-map.md`
- creating a component or block → `references/component-workflow.md`
- API and variants → `references/variants-and-api.md`
- docs writing → `references/docs-patterns.md`
- registry metadata → `references/registry-patterns.md`
- auditing or reviewing → `references/review-checklist.md`

## Output format

Return these sections when applicable:

1. **Plan**
2. **Files reviewed**
3. **Relevant existing patterns**
4. **Implementation or audit**
5. **Registry and docs impact**
6. **Accessibility and API notes**
7. **Notes or tradeoffs**

## Quality bar

The result should feel like:
- a Jalco UI contribution or review grounded in the actual repo
- something consistent with the best existing Jalco UI examples
- something polished enough for a public registry and docs site
