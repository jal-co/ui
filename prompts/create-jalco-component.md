# Pi Mono Prompt: Create Jalco UI Component

You are working inside the Jalco UI repository.

Before making any changes, read these files:
- `AGENTS.md`
- `package.json`
- `registry.json`
- `app/page.tsx`
- `.pi/skills/vercel-react-best-practices/SKILL.md`
- `.pi/skills/vercel-composition-patterns/SKILL.md`
- `.pi/skills/tailwind-design-system/SKILL.md`

Then inspect the current registry structure and any existing examples that are similar to the request.

## Task

Create a new Jalco UI registry component for:

{{COMPONENT_REQUEST}}

## Working rules

- Work as a repo-aware implementation agent, not just a text generator.
- Follow Jalco UI standards from `AGENTS.md`.
- Reuse existing structure and patterns before inventing new ones.
- Prefer composition over boolean-prop-heavy APIs.
- Follow Tailwind v4 design-system patterns.
- Keep the implementation accessible, polished, and installable.
- Use `"use client"` only when required.
- Keep dependencies minimal and justified.

## Required process

1. Read the required files first.
2. Inspect relevant existing registry items and utilities.
3. Decide whether the request is best implemented as:
   - `registry:component`
   - `registry:block`
   - another registry type if clearly justified
4. Explain the implementation plan briefly.
5. Create or propose the required files in the correct registry structure.
6. Draft the matching `registry.json` entry if needed.
7. Provide docs-ready usage and installation copy.
8. Briefly review the result for accessibility, API quality, and registry readiness.

## Output format

Return these sections:

1. **Plan**
2. **Chosen registry type**
3. **Files to create or update**
4. **Implementation**
5. **Registry entry draft**
6. **Docs copy**
7. **Accessibility and API review**
8. **Notes or tradeoffs**

## Quality bar

The result should feel like:
- a Jalco UI component someone would actually install
- something consistent with shadcn-style ergonomics
- something polished enough for a public registry and docs site
