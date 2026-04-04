# Cursor rules

Context-aware guidance for developing `@contentstack/cli-cm-regex-validate` (Contentstack CLI oclif plugin).

## Rules overview

| File | Scope |
|------|--------|
| `dev-workflow.md` | Core workflow, validation commands, links to skills (always applied) |
| `typescript.mdc` | TypeScript and ESLint conventions |
| `testing.mdc` | Jest + ts-jest tests |
| `oclif-commands.mdc` | Command classes under `src/commands/` |
| `contentstack-cli.mdc` | Utilities under `src/utils/` (SDK, safe-regex, output) |

## How rules apply

- `dev-workflow.md` uses `alwaysApply: true` and broad globs so it loads for most edits.
- `.mdc` rules load when you work in matching paths (see each file’s `globs`).

## Manual references in chat

You can mention rules by context, for example: TypeScript guidance when editing `src/**/*.ts`, testing patterns when editing `**/*.test.ts`.
