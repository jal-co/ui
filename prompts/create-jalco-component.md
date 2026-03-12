# Pi Mono Prompt: Create Jalco UI Component

You are working inside the Jalco UI repository.

Before making any changes, load and follow this Pi skill:
- `~/.pi/agent/skills/jalco-ui-registry/SKILL.md`

Then read these files:
- `AGENTS.md`
- `package.json`
- `registry.json`
- `README.md`
- `app/docs/page.mdx`
- `app/docs/installation/page.mdx`

Then inspect the current registry structure and any existing examples that are similar to the request.

## Task

Create a new Jalco UI registry component for:

{{COMPONENT_REQUEST}}

## Required skill routing

Load the relevant Jalco UI skill references:
- `references/repo-map.md`
- `references/component-workflow.md`
- `references/variants-and-api.md`
- `references/docs-patterns.md`
- `references/registry-patterns.md`

## Working rules

- Work as a repo-aware implementation agent, not just a text generator.
- Follow Jalco UI standards from `AGENTS.md` and the `jalco-ui-registry` skill.
- Reuse existing structure and patterns before inventing new ones.
- Prefer composition over boolean-prop-heavy APIs.
- Expose variants only when they reflect real reusable states.
- Follow Tailwind v4 design-system patterns.
- Keep the implementation accessible, polished, installable, and docs-ready.
- Use `"use client"` only when required.
- Keep dependencies minimal and justified.
- Keep naming aligned across folders, exports, docs, and `registry.json`.

## Required process

1. Read the required files first.
2. Inspect relevant existing registry items, docs pages, and utilities.
3. Decide whether the request is best implemented as:
   - `registry:component`
   - `registry:block`
   - another registry type if clearly justified
4. Explain the implementation plan briefly.
5. Create or propose the required files in the correct registry structure.
6. Draft the matching `registry.json` entry if needed.
7. Provide docs-ready usage and installation copy.
8. Briefly review the result for accessibility, API quality, variant quality, and registry readiness.

## Output format

Return these sections:

1. **Plan**
2. **Chosen registry type**
3. **Files reviewed**
4. **Relevant existing patterns**
5. **Files to create or update**
6. **Implementation**
7. **Registry entry draft**
8. **Docs copy**
9. **Accessibility and API review**
10. **Notes or tradeoffs**

## Quality bar

The result should feel like:
- a Jalco UI component someone would actually install
- something consistent with the best current Jalco UI examples
- something polished enough for a public registry and docs site
