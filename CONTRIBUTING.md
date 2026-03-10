# Contributing to Jalco UI

Thanks for your interest in contributing to Jalco UI.

This repository is being set up with public/open-source quality in mind from the start. Even while the project is early, contributions should aim for clarity, consistency, and maintainability.

## Before contributing

Please read:
- [`AGENTS.md`](./AGENTS.md) for repository-wide working standards
- [`README.md`](./README.md) for project goals and scope

## Development expectations

Contributors should:
- keep changes focused and easy to review
- follow existing naming and structural conventions
- update documentation when behavior or usage changes
- prefer composable, accessible solutions
- avoid unrelated cleanup in feature PRs

## Commit style

This project uses Conventional Commits.

Format:

```text
<type>(<scope>): <description>
```

Examples:
- `feat(docs): add installation tabs`
- `fix(ui): correct code block overflow`
- `docs(readme): expand project overview`
- `chore(repo): add contributing guide`

### Recommended commit types
- `feat`
- `fix`
- `docs`
- `refactor`
- `style`
- `test`
- `chore`
- `build`
- `ci`
- `perf`
- `revert`

## Pull requests

When opening a PR, please:
- explain what changed
- explain why it changed
- keep the scope narrow
- include screenshots for UI changes when useful
- note any follow-up work if the change is incomplete
- ensure docs stay in sync with the code

## Code quality

Aim for:
- readable code
- consistent APIs
- clear component boundaries
- minimal abstraction unless justified
- accessible UI behavior by default

## Documentation quality

Docs are part of the product.

Please keep documentation:
- accurate
- concise
- skimmable
- aligned with actual implementation
- useful for someone seeing the project for the first time

## Security and privacy

Do not commit:
- secrets
- access tokens
- API keys
- private environment values
- machine-specific credentials

## Questions and proposals

If introducing a new pattern, convention, or structural change, explain the reasoning clearly in the PR so it can be evaluated for long-term consistency.

## Project maturity

Jalco UI is still in early development, so conventions may evolve. When in doubt, optimize for:
1. readability
2. consistency
3. accessibility
4. maintainability
5. contributor friendliness
