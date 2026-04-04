# Code review checklist

## Correctness and safety

- [ ] Changes match the intended behavior for `cm:stacks:validate-regex` (flags, prompts, stack connection, CT/GF selection).
- [ ] No API keys, management tokens, or secrets in code or tests; Talisman/Snyk hooks still make sense for local workflow.
- [ ] New user-visible strings added to `messages/index.json` under `validateRegex` (avoid hard-coded copy in production paths).

## Tests

- [ ] `npm test` passes locally.
- [ ] New behavior covered by `test/utils/` tests and/or `test/data/` fixtures where appropriate.
- [ ] Mocks used for Management SDK and filesystem; no accidental live stack calls in unit tests.

## Lint and types

- [ ] ESLint passes (`posttest` or project eslint script).
- [ ] TypeScript changes respect `strict` and project conventions (see `.cursor/rules/typescript.mdc`).

## Packaging and release

- [ ] `package.json` `files` includes what ships (`lib`, `bin`, `oclif.manifest.json`, `messages`, etc.).
- [ ] `prepack` still runs `tsc`, `oclif manifest`, and `oclif readme` as needed for the plugin.
- [ ] Version bumps follow team process; release workflow (e.g. push to `main`) matches `.github/workflows/release.yml` expectations.

## CI / security workflows

- [ ] Unit test workflow exercises `npm test` on a supported Node version (see `.github/workflows/unit-tests.yml`).
- [ ] SCA / policy workflows unchanged or intentionally updated; no silent downgrade of security checks.

## Documentation

- [ ] README or command examples updated if flags or behavior changed.
