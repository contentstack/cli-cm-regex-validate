---
name: testing
description: Jest testing patterns for cli-cm-regex-validate (mocks, fixtures, no live API calls)
---

# Testing skill

## Quick reference

- Full detail: [references/testing-patterns.md](references/testing-patterns.md)

## Summary

- **Runner:** Jest + ts-jest (`jest.config.ts`). Use `npm test` as the single source of truth.
- **Layout:** Tests in `test/utils/`; fixtures in `test/data/*.json`.
- **Mocks:** `@contentstack/management`, `fs`, `cli-ux`, `@contentstack/cli-utilities` as appropriate; never hit a real stack in unit tests.

## Usage

In Cursor or any agent chat, reference: `@skills/testing` when writing or refactoring tests.
