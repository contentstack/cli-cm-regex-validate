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

## References

- [references/code-review-checklist.md](references/code-review-checklist.md)
- [Development workflow](../dev-workflow/SKILL.md)
