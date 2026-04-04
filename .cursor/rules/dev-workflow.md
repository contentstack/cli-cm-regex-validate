---
description: "Core development workflow for cli-cm-regex-validate - always applied"
globs: ["**/*.ts", "**/*.js", "**/*.json"]
alwaysApply: true
---

# Development workflow

## Quick reference

Detailed patterns live in project skills:

- `@skills/testing` — Jest tests, mocks, fixtures under `test/data/`
- `@skills/contentstack-cli` — Command flow, Management SDK, `safe-regex`, CSV output
- `@skills/code-review` — PR and release checklist

## Validation commands

- `npm test` — Jest (`jest.config.ts`, ts-jest). This is the canonical test runner; CI uses it in `.github/workflows/unit-tests.yml`.
- `npm run posttest` — ESLint on `.ts` files (same as running eslint after tests).

## Local hooks

If Husky is installed, pre-commit may run Talisman (secrets) and Snyk. Use `SKIP_HOOK=1` only when you understand the bypass.

## TDD (recommended)

1. **Red** — Add or change a failing test in `test/utils/` (or add a fixture in `test/data/`).
2. **Green** — Minimal change in `src/` to pass.
3. **Refactor** — Keep tests green; avoid drive-by refactors outside the task.

## Repository layout

- `src/commands/` — oclif commands (this plugin: `cm/stacks/validate-regex`)
- `src/utils/` — Shared logic (connect stack, process stack, safe-regex, output, prompts)
- `messages/index.json` — User-facing strings for the command
- `test/utils/` — Jest suites mirroring utils
- `test/data/` — JSON fixtures for schema and expected outputs

## Before merging

- Tests pass (`npm test`).
- Lint clean (`npm run posttest` or eslint as configured in `package.json`).
