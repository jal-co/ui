# Pi Mono Prompt: Create Jalco UI Block

You are working inside the Jalco UI repository.

Before making any changes, read these files:
- `AGENTS.md`
- `package.json`
- `registry.json`
- `app/page.tsx`
- `.pi/skills/vercel-react-best-practices/SKILL.md`
- `.pi/skills/vercel-composition-patterns/SKILL.md`
- `.pi/skills/tailwind-design-system/SKILL.md`

Then inspect the current registry structure and similar examples.

## Task

Create a new Jalco UI registry block for:

{{BLOCK_REQUEST}}

## Working rules

- Work as a repo-aware implementation agent.
- Follow Jalco UI standards from `AGENTS.md`.
- Optimize for installability, docs-readiness, and visual polish.
- Use realistic content structure and good layout hierarchy.
- Prefer semantic HTML and accessible interactions.
- Keep the block responsive and easy to adapt.
- Use Tailwind v4-friendly design-system patterns.

## Required process

1. Read the required files first.
2. Inspect similar existing blocks or components.
3. Explain the implementation approach briefly.
4. Create or propose the necessary files in the correct registry structure.
5. Draft the `registry.json` entry if needed.
6. Provide docs-ready preview and installation copy.
7. Briefly assess the result for accessibility, composition quality, and registry fit.

## Output format

Return these sections:

1. **Plan**
2. **Chosen registry type**
3. **Files to create or update**
4. **Implementation**
5. **Registry entry draft**
6. **Docs copy**
7. **Accessibility and composition review**
8. **Notes or tradeoffs**

## Quality bar

The result should feel like:
- a public-quality Jalco UI block
- something attractive in a docs gallery
- something a developer could install and adapt with minimal friction
