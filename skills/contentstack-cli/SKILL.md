---
name: contentstack-cli
description: Contentstack CLI plugin patterns for cm:stacks:validate-regex (SDK, schema, safe-regex, output)
---

# Contentstack CLI – cli-cm-regex-validate

## When to use

- Changing the `csdx cm:stacks:validate-regex` command or flags
- Editing utils under `src/utils/` or user-facing strings in `messages/index.json`
- Adjusting Management SDK usage, schema walking, `safe-regex`, or CSV/table output

## Instructions

- **Command:** `csdx cm:stacks:validate-regex` — validates regex `format` fields on content types and/or global fields using `safe-regex`.
- **Flow:** alias / flags → token → Management client → stack → fetch CT/GF → walk schema → CSV + table output.

Open [`skills/contentstack-cli/`](.) when changing commands, utils, or `messages/index.json` (or point your agent at this folder if supported).

## Patterns (regex validation plugin)

### Plugin identity

- Package: `@contentstack/cli-cm-regex-validate`
- Command id: `cm:stacks:validate-regex` (short name `RGXVLD` in `package.json` `csdxConfig` when present)
- Entry: `src/commands/cm/stacks/validate-regex.ts`

### End-to-end flow

1. **Parse** — `this.parse(ValidateRegex)`; flags: `alias`, `contentType`, `globalField`, `filePath`, `help`.
2. **Prompts** — If alias or module flags are missing, `inquireAlias` / `inquireModule` (`src/utils/interactive.ts`, Inquirer).
3. **Token** — `this.getToken(alias)` from Contentstack CLI; errors use `messages.validateRegex.errors.tokenNotFound` and `ref` to docs.
4. **Connect** — `connect-stack.ts`: `contentstackSdk.client({ host })`, optional `early_access` headers, `client.stack({ api_key, management_token })`.
5. **Process** — `process-stack.ts`: for each selected module, `stack.contentType()` / `stack.globalField()` → `.query({}).find()`, then `safe-regex.ts` on each item.
6. **Output** — `generate-output.ts`: `results.csv` via `jsonexport`, table via `cli-table3`, paths via `sanitizePath`; user copy from `messages/index.json`.

### Schema traversal

- Recurse into `schema` for `group` and `global_field`.
- For `blocks`, iterate `blocks` and each block’s `schema`.
- For each field with `format`, call `safe-regex`; collect module, title, UID, field metadata, and pattern for invalid rows.

### User-facing strings

- All strings live under `messages/index.json` → `validateRegex` (command, interactive, cliAction, errors, output).
- Docs link in output points to Contentstack guidance on catastrophic backtracking / validation regex.

### Related packages

- `@contentstack/cli-command`, `@contentstack/cli-utilities`, `@contentstack/management`
- `cli-ux` (spinner), `inquirer` (prompts), `safe-regex`, `jsonexport`, `cli-table3`

## References

- [Development workflow](../dev-workflow/SKILL.md)
- [Testing](../testing/SKILL.md)
