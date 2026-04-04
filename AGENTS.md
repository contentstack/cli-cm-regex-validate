# cli-cm-regex-validate

`@contentstack/cli-cm-regex-validate` is a **Contentstack CLI** oclif plugin with a single command, **`csdx cm:stacks:validate-regex`**, which scans content types and/or global fields in a stack for regex `format` values that fail the `safe-regex` check, then writes results to CSV and prints a summary table. User-facing copy lives in `messages/index.json`.

## Layout

| Area | Path |
|------|------|
| Command | `src/commands/cm/stacks/validate-regex.ts` |
| Utils | `src/utils/` (`connect-stack`, `process-stack`, `safe-regex`, `generate-output`, `interactive`) |
| Messages | `messages/index.json` |
| Tests | `test/utils/*.test.ts` |
| Fixtures | `test/data/*.json` |

## Workflow

- Run **`npm test`** (Jest + ts-jest) before pushing; CI uses the same in `.github/workflows/unit-tests.yml`.
- Run ESLint after tests via **`npm run posttest`** (or your team’s eslint invocation from `package.json`).

## Naming

- Source files: kebab-case.
- Tests: describe behavior clearly (what should happen under which condition).

## Universal skills (any agent)

- `@skills/testing` — Jest mocks, fixtures, no live API calls
- `@skills/contentstack-cli` — SDK flow, schema recursion, `safe-regex`, output
- `@skills/code-review` — PR checklist (security, packaging, CI, messages)

## Cursor rules (IDE)

For file-scoped guidance, Cursor loads rules under `.cursor/rules/`. You can reference them in chat by intent, for example:

- TypeScript and ESLint conventions — `typescript.mdc`
- Jest tests — `testing.mdc`
- Command class — `oclif-commands.mdc`
- Utils (SDK, safe-regex, output) — `contentstack-cli.mdc`
- Dev workflow — `dev-workflow.md` (always applied)

See `.cursor/rules/README.md` for the full index.
