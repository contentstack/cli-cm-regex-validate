---
name: testing
description: Jest testing patterns for cli-cm-regex-validate (mocks, fixtures, no live API calls)
---

# Testing – cli-cm-regex-validate

## When to use

- Writing or refactoring unit tests for this plugin
- Adding or changing fixtures under `test/data/`
- Choosing mocks for Management SDK, `fs`, `cli-ux`, or `@contentstack/cli-utilities`

## Instructions

- **Runner:** Jest + ts-jest (`jest.config.ts`). Use `npm test` as the single source of truth.
- **Layout:** Tests in `test/utils/`; fixtures in `test/data/*.json`.
- **Mocks:** `@contentstack/management`, `fs`, `cli-ux`, `@contentstack/cli-utilities` as appropriate; never hit a real stack in unit tests.

When using an agent or IDE that supports folder context, open [`skills/testing/`](.) for test-focused guidance.

## References

- [references/testing-patterns.md](references/testing-patterns.md)
- [Development workflow](../dev-workflow/SKILL.md)
