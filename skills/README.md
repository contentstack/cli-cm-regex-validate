# Skills

Portable AI guidance for **cli-cm-regex-validate** (`@contentstack/cli-cm-regex-validate`): the Contentstack CLI plugin that runs `csdx cm:stacks:validate-regex` and checks regex `format` fields on content types and global fields.

## Quick reference

In Cursor or any agent chat, reference a folder: `@skills/testing`, `@skills/contentstack-cli`, or `@skills/code-review`:

| Skill | Purpose |
|-------|---------|
| **testing** | Jest + ts-jest, mocks, fixtures under `test/data/` |
| **contentstack-cli** | Command flow, Management SDK, schema walk, `safe-regex`, CSV/table output |
| **code-review** | PR checklist: security, packaging, CI, messages |

## Technology stack

- **Language:** TypeScript (`strict`), CommonJS emit
- **CLI:** oclif v3, `@contentstack/cli-command`
- **Tests:** Jest + ts-jest (run with `npm test`)
- **Lint:** ESLint (oclif-typescript config)
- **CI:** Node.js 22.x (see `.github/workflows/unit-tests.yml`, `node-version: '22.x'`)

## Architecture

- **Commands:** `src/commands/` (this repo: single command under `cm/stacks/`)
- **Utils:** `src/utils/` (connect stack, process stack, safe-regex, output, interactive prompts)
- **Messages:** `messages/index.json`
- **Tests:** `test/utils/`; **fixtures:** `test/data/`

## Usage examples

```
Follow @skills/contentstack-cli when changing connect-stack or safe-regex.

Write tests using @skills/testing.

Review this PR with @skills/code-review.
```
