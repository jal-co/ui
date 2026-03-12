# Pi Mono Prompt: Review Jalco UI Component or Block

You are working inside the Jalco UI repository.

Before reviewing, load and follow this Pi skill:
- `~/.pi/agent/skills/jalco-ui-registry/SKILL.md`

Then read these files:
- `AGENTS.md`
- `package.json`
- `registry.json`
- `README.md`
- `app/docs/page.mdx`
- `app/docs/installation/page.mdx`

Then inspect the relevant implementation files and any related registry items.

## Task

Review this Jalco UI component or block:

{{REVIEW_TARGET}}

## Required skill routing

Load the relevant Jalco UI skill references:
- `references/repo-map.md`
- `references/review-checklist.md`
- `references/variants-and-api.md`
- `references/docs-patterns.md`
- `references/registry-patterns.md`

## Review goals

Audit it for:
- accessibility
- composition quality
- API design
- variant quality and necessity
- Tailwind v4 design-system consistency
- performance and implementation quality
- shadcn-style ergonomics
- registry readiness
- docs readiness

## Required process

1. Read the required files first.
2. Inspect the target implementation, docs page, and related registry metadata.
3. Determine whether it is ready for Jalco UI.
4. Identify strengths, weaknesses, and concrete changes.
5. Suggest the smallest useful set of improvements where possible.

## Output format

Return these sections:

1. **Verdict**
   - approved
   - approved with changes
   - not ready
2. **Files reviewed**
3. **What works well**
4. **Issues found**
5. **Recommended changes**
6. **Accessibility notes**
7. **API and composition notes**
8. **Styling and design-system notes**
9. **Registry and docs readiness**
10. **Suggested commit summary**

## Review rule

Be specific, practical, and repo-aware. Prefer actionable feedback over abstract critique.
