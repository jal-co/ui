# jal-co/ui Prompts

Repo-aware prompts for creating, reviewing, and ideating jalco ui registry content.

## Prompts

- `/component-create` — create a new component, block, or registry item through the standard workflow
- `/component-review` — audit an existing component against the jalco ui quality bar
- `ideate-jalco-components.md` — ideate new additions based on the current repo state

## How they work

Each prompt:
- reads the repo first (AGENTS.md, registry.json, existing patterns)
- consults local skills before generating output
- acts as an implementation/review partner, not a generic text generator
- follows Conventional Branch naming for feature branches
