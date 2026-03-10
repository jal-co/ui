# Pi Mono Prompt: Review Jalco UI Component or Block

You are working inside the Jalco UI repository.

Before reviewing, read these files:
- `AGENTS.md`
- `package.json`
- `registry.json`
- `.pi/skills/vercel-react-best-practices/SKILL.md`
- `.pi/skills/vercel-composition-patterns/SKILL.md`
- `.pi/skills/tailwind-design-system/SKILL.md`

Then inspect the relevant implementation files and any related registry items.

## Task

Review this Jalco UI component or block:

{{REVIEW_TARGET}}

## Review goals

Audit it for:
- accessibility
- composition quality
- API design
- Tailwind v4 design-system consistency
- performance and implementation quality
- shadcn-style ergonomics
- registry readiness
- docs readiness

## Required process

1. Read the required files first.
2. Inspect the target implementation and related files.
3. Determine whether it is ready for Jalco UI.
4. Identify strengths, weaknesses, and concrete changes.
5. Suggest the smallest useful set of improvements where possible.

## Output format

Return these sections:

1. **Verdict**
   - approved
   - approved with changes
   - not ready
2. **What works well**
3. **Issues found**
4. **Recommended changes**
5. **Accessibility notes**
6. **API and composition notes**
7. **Styling and design-system notes**
8. **Registry and docs readiness**
9. **Suggested commit summary**

## Review rule

Be specific, practical, and repo-aware. Prefer actionable feedback over abstract critique.
