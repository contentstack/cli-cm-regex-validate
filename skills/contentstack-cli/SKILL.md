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

## References

- [references/contentstack-patterns.md](references/contentstack-patterns.md)
- [Development workflow](../dev-workflow/SKILL.md)
- [Testing](../testing/SKILL.md)
