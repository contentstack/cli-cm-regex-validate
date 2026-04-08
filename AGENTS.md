# cli-cm-regex-validate – Agent guide

**Universal entry point** for contributors and AI agents. Detailed conventions live in **`skills/*/SKILL.md`**.

## What this repo is

| Field | Detail |
|-------|--------|
| **Name:** | [contentstack/cli-cm-regex-validate](https://github.com/contentstack/cli-cm-regex-validate) (`@contentstack/cli-cm-regex-validate` on npm) |
| **Purpose:** | Contentstack CLI oclif plugin with a single command, **`csdx cm:stacks:validate-regex`**, which scans content types and/or global fields in a stack for regex `format` values that fail the `safe-regex` check, then writes results to CSV and prints a summary table. User-facing copy lives in `messages/index.json`. |
| **Out of scope (if any):** | Not a general-purpose Contentstack SDK — only this plugin’s command, utils, and tests. |

## Tech stack (at a glance)

| Area | Details |
|------|---------|
| Language | TypeScript (`strict`), Node `>=14.0.0` per `package.json` engines |
| Build | npm; `prepack` runs `tsc -b`, oclif manifest, oclif readme — see `package.json` |
| Tests | Jest + ts-jest (`jest.config.ts`), `npm test`; suites under `test/utils/`, fixtures `test/data/*.json` |
| Lint / coverage | ESLint (`.eslintrc`), `npm run posttest` |
| Other | oclif v3, `@contentstack/cli-command`; CI: Node 22.x — [`.github/workflows/unit-tests.yml`](.github/workflows/unit-tests.yml). **CI runs Jest only** (`npm run test`); **ESLint is not run in CI** — run `npm run posttest` locally before merge. |

## Commands (quick reference)

| Command type | Command |
|--------------|---------|
| Build (release prep) | `npm run prepack` — cleans `lib`, compiles, generates oclif manifest and readme |
| Test | `npm test` |
| Lint | `npm run posttest` |

CI runs `npm i` and `npm run test` on pull requests — see [`.github/workflows/unit-tests.yml`](.github/workflows/unit-tests.yml). It does **not** run `npm run posttest` (ESLint); run lint locally before merging.

## Where the documentation lives: skills

| Skill | Path | What it covers |
|-------|------|----------------|
| Development workflow | [`skills/dev-workflow/SKILL.md`](skills/dev-workflow/SKILL.md) | Commands, repo layout, naming, hooks, TDD, before merge |
| Testing | [`skills/testing/SKILL.md`](skills/testing/SKILL.md) | Jest, mocks, fixtures, no live API calls |
| Contentstack CLI | [`skills/contentstack-cli/SKILL.md`](skills/contentstack-cli/SKILL.md) | Command flow, SDK, schema walk, `safe-regex`, CSV/table output |
| Code review | [`skills/code-review/SKILL.md`](skills/code-review/SKILL.md) | PR and release checklist |

An index with “when to use” hints is in [`skills/README.md`](skills/README.md).

## Using Cursor (optional)

If you use **Cursor**, [`.cursor/rules/README.md`](.cursor/rules/README.md) only points to **[`AGENTS.md`](AGENTS.md)** — same docs as everyone else.
