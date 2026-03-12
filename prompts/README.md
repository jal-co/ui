# Jalco UI Prompts

Repo-aware Pi Mono prompts for creating, reviewing, and ideating Jalco UI registry content.

## Files

- `create-jalco-component.md` — create a Jalco UI registry component as a repo-aware implementation task
- `create-jalco-block.md` — create a Jalco UI registry block as a repo-aware implementation task
- `review-jalco-component.md` — review a Jalco UI component or block against repository standards
- `ideate-jalco-components.md` — ideate new additions based on the current repo state
- `use-jalco-ui-skill.md` — route Jalco UI work through the dedicated `jalco-ui-registry` Pi skill

## Notes

These prompts are intended to make Pi Mono:
- read the repo first
- consult Jalco UI standards and local skills
- inspect existing patterns before generating output
- act like an implementation/review partner, not a generic text generator

They reinforce:
- `AGENTS.md`
- `.pi/skills/vercel-react-best-practices/SKILL.md`
- `.pi/skills/vercel-composition-patterns/SKILL.md`
- `.pi/skills/tailwind-design-system/SKILL.md`

Replace placeholder variables like `{{COMPONENT_REQUEST}}` before use.
