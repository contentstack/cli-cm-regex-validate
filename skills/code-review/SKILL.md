---
name: code-review
description: PR and release checklist for cli-cm-regex-validate (security, packaging, CI, messages)
---

# Code review – cli-cm-regex-validate

## When to use

- Reviewing a pull request for this repo
- Preparing a release or verifying packaging and CI alignment

## Instructions

- Confirm tests and lint pass locally (CI runs `npm test` only; see [`AGENTS.md`](../../AGENTS.md)); no secrets in commits; plugin `files` and `prepack` remain consistent; workflows aligned with Node version used in CI.

Open [`skills/code-review/`](.) when reviewing PRs or before release (or point your agent at this folder if supported).

## Checklist

### Correctness and safety

- [ ] Changes match the intended behavior for `cm:stacks:validate-regex` (flags, prompts, stack connection, CT/GF selection).
- [ ] No API keys, management tokens, or secrets in code or tests; Talisman/Snyk hooks still make sense for local workflow.
- [ ] New user-visible strings added to `messages/index.json` under `validateRegex` (avoid hard-coded copy in production paths).

### Tests

- [ ] `npm test` passes locally.
- [ ] New behavior covered by `test/utils/` tests and/or `test/data/` fixtures where appropriate.
- [ ] Mocks used for Management SDK and filesystem; no accidental live stack calls in unit tests.

### Lint and types

- [ ] ESLint passes (`posttest` or project eslint script). **Note:** CI does not run ESLint — only `npm test` in [`.github/workflows/unit-tests.yml`](../../.github/workflows/unit-tests.yml); lint must pass locally before merge.
- [ ] TypeScript changes respect `strict` and project conventions (see `tsconfig.json`, `.eslintrc`, and [`AGENTS.md`](../../AGENTS.md)).

### Packaging and release

- [ ] `package.json` `files` includes what ships (`lib`, `bin`, `oclif.manifest.json`, `messages`, etc.).
- [ ] `prepack` still runs `tsc`, `oclif manifest`, and `oclif readme` as needed for the plugin.
- [ ] Version bumps follow team process; release workflow (e.g. push to `main`) matches `.github/workflows/release.yml` expectations.

### CI / security workflows

- [ ] Unit test workflow exercises `npm test` on a supported Node version (see `.github/workflows/unit-tests.yml`). Expect Jest only there — not `posttest`/ESLint unless you add a separate workflow.
- [ ] SCA / policy workflows unchanged or intentionally updated; no silent downgrade of security checks.

### Documentation

- [ ] README or command examples updated if flags or behavior changed.

## References

- [Development workflow](../dev-workflow/SKILL.md)
