# 🛠️ Development workflow

## 1. Environment

The root tooling manifest specifies:

- Node.js **22 or newer**;
- npm **10 or newer**;
- no third-party npm runtime or development dependencies.

Use npm. The repository has a package lockfile and the CI workflow installs from it with `npm ci`. The package is deliberately marked private while distribution decisions remain open. The repository is licensed under MIT, Copyright (c) 2026 Brajesh Kumar.

## 2. Start locally

From the repository root:

```sh
npm ci
npm run serve
```

Open:

- Gallery: `http://127.0.0.1:8000/gallery/`
- Root redirect: `http://127.0.0.1:8000/`
- Example control: `http://127.0.0.1:8000/toggle/`

The local server binds to `127.0.0.1` by default. Set `HOST` or `PORT`, or use `--port`, to override the defaults. It supports GET and HEAD only, maps common site asset MIME types, resolves directory index pages, and blocks hidden path segments and paths outside the repository root.

## 3. npm commands

| Command | Implementation | Purpose |
| --- | --- | --- |
| `npm run serve` | `tools/serve.mjs` | Start the local static server |
| `npm run build` | `tools/build.mjs` | Embed current core, sound data, and component artwork into bundles |
| `npm run build:check` | `tools/build.mjs --check` | Check embedded output without writing it |
| `npm run docs` | `tools/docs.mjs` | Generate component docs, demo pages, gallery, registry, and LLM guide |
| `npm run docs:check` | `tools/docs.mjs --check` | Check generated documentation parity |
| `npm run validate` | `tools/validate.mjs` | Run read-only structural, metadata, and JavaScript syntax checks |
| `npm run integrity` | `tools/integrity.mjs` | Verify runtime-family boundaries, bundle/API/registry alignment, links and visual asset integrity |
| `npm test` | `npm run validate` | Alias for the structural validator; not the Chrome interaction suite |
| `npm run check` | build check + docs check + validate + integrity | Main local quality gate |
| `npm run test:browser` | `tools/test.mjs` | Optional real-input test in headless Chrome/Chromium |
| `npm run screenshots -- ...` | `tools/shot.mjs` | Capture a page or a timed film sequence |

## 4. Where to make changes

| Change | Edit these sources | Then run |
| --- | --- | --- |
| Shared PinballKit runtime behavior | `core.js` | `npm run build`, then `npm run docs`, then `npm run check` |
| Artwork plate | `art/{component}/` | `npm run build`, then `npm run docs`, then `npm run check` |
| Recorded sound take | `sounds/` | `npm run build`, then `npm run docs`, then `npm run check` |
| Component-specific behavior | The relevant `{component}/{component}.js` file, outside the marked embedded sections | `npm run build` to refresh its embedded core/art, then `npm run check` |
| Original component metadata | `tools/spec.mjs` | `npm run docs`, then `npm run check` |
| Lightweight component metadata | `tools/extras-spec.mjs` | `npm run docs`, then `npm run check` |
| Build or documentation generation logic | `tools/build.mjs` or `tools/docs.mjs` | Run the affected generator, then `npm run check` |
| Tests or local server | `tools/test.mjs`, `tools/validate.mjs`, or `tools/serve.mjs` | `npm run check` and relevant manual test |
| GitHub automation | `.github/workflows/` | Inspect workflow YAML and run the GitHub Actions checks |

## 5. Embedded marker boundaries

The build script replaces marked sections:

- `// >>> sounds` … `// <<< sounds` in the shared core source;
- `// >>> pinball core` … `// <<< pinball core` in a component bundle;
- `// >>> art` … `// <<< art` in a component bundle.

Do not put component-specific behavior inside a section that the generator replaces. Keep control logic outside the embedded markers. The builder also refreshes `skills/pinball-ui/core.js`.

## 6. Documentation generation and source of truth

`tools/spec.mjs` holds the canonical component catalogue used by `tools/docs.mjs`. It describes component names, custom element tags, categories, default sizing, example markup, usage snippets, attributes, notes, and event behavior.

The documentation generator creates:
- each component's `README.md`;
- each component's `index.html`;
- `gallery/index.html`;
- `registry.json`;
- `llms.txt`.

Do not hand-edit those generated outputs to make a change that belongs in `tools/spec.mjs`. Technical pages in `docs/` and the root README are maintained separately.

## 7. Recommended change sequence

1. Read the relevant component guide and inspect its current implementation.
2. Identify whether the change belongs to component behavior, shared runtime, art/audio, or generated documentation.
3. Change only the relevant source file(s); preserve the existing control behavior outside the requested scope.
4. Regenerate embedded bundle sections and/or generated docs when their source changes.
5. Run `npm run check`.
6. Start the local server and inspect affected routes.
7. Run the optional browser suite for interaction changes when Chromium is available.
8. Review the diff for unintended generated or application changes before committing.

## 8. Distribution boundary

The current `package.json` is private and has no `main`, `exports`, or package publication contract. The supported consumption routes documented today are standalone script files and the checked-in shadcn registry. Do not describe the project as an installable npm package until a separate distribution phase establishes and tests that contract.
