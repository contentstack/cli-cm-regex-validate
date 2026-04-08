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

## Patterns (Jest)

This project uses **Jest** and **ts-jest**. **`npm test`** (Jest) is the canonical test command; CI runs `npm test` from `.github/workflows/unit-tests.yml`. The `mocha` script in `package.json` is **not** what CI runs—do not use `npm run mocha` as the project test entry point.

### File layout

| Area | Path |
|------|------|
| Tests | `test/utils/*.test.ts` |
| Fixtures | `test/data/*.json` |

Mirror utility names where it helps (`connect-stack.test.ts` vs `connect-stack.ts`).

### Commands

- `npm test` — runs Jest with `jest.config.ts` (roots, `testMatch`, ts-jest transform, coverage).

### Mocking

- **Management SDK:** `jest.mock('@contentstack/management')` and stub `client`, `stack`, and query chains as in `connect-stack.test.ts`.
- **Filesystem:** `jest.mock('fs')` when testing CSV path creation and `writeFileSync` / `mkdirSync`.
- **cli-ux:** mock `cli.action.start` / `stop` when asserting spinner behavior; avoid reassigning imported bindings with `@ts-ignore`—prefer `jest.mock('cli-ux', () => ({ ... }))` when needed.
- **cli-utilities:** mock `cliux.print` and `sanitizePath` in output tests when asserting printed messages and paths.

### Fixtures

- Load JSON with `require('../data/...')` for content type / global field documents and expected invalid-regex rows.
- Keeps tests readable and matches real API shape (schema, `data_type`, `format`, nested `group` / `blocks`).

### Assertions

- Use `toHaveBeenCalled`, `toHaveBeenCalledWith`, `toStrictEqual` for objects and arrays.
- Avoid deprecated matchers removed in newer Jest (e.g. prefer `toHaveBeenCalled` over legacy aliases).

### Async tests

- Use `async`/`await` for utilities that return promises; await `inquireAlias` / `inquireModule` when testing interactive flows with mocked `inquirer`.

### Note on `package.json`

- This repo lists **`jest`** under **`dependencies`** in `package.json`. Run tests via **`npm test`** and describe the framework as Jest in documentation and for agents.

## References

- [Development workflow](../dev-workflow/SKILL.md)
