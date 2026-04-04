---
name: contentstack-cli
description: Contentstack CLI plugin patterns for cm:stacks:validate-regex (SDK, schema, safe-regex, output)
---

# Contentstack CLI skill

## Quick reference

- Full detail: [references/contentstack-patterns.md](references/contentstack-patterns.md)

## Summary

- **Command:** `csdx cm:stacks:validate-regex` — validates regex `format` fields on content types and/or global fields using `safe-regex`.
- **Flow:** alias / flags → token → Management client → stack → fetch CT/GF → walk schema → CSV + table output.

## Usage

Reference: `@skills/contentstack-cli` when changing commands, utils, or `messages/index.json`.
