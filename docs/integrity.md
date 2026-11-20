# 🔒 Build and repository integrity

The project now has four complementary quality gates. They are intentionally read-only during validation and run before release work.

## 1. The four gates

| Command | Responsibility | What it catches |
| --- | --- | --- |
| `npm run build:check` | Embedded and generated bundle parity | Stale artwork, sound or PinballKit core inside the original seven; utility bundle drift from `tools/extra-core.js` or `extras-src/` |
| `npm run docs:check` | Documentation generation parity | Stale component guides, demo pages, gallery, registry and `llms.txt` |
| `npm run validate` | Repository structure and syntax | Missing files, component/tag counts, API shape, npm metadata, MIT ownership, JavaScript syntax and Pages workflow settings |
| `npm run integrity` | Cross-file relationship and repository integrity | Runtime family boundaries, source-to-bundle registration, guide/demo/registry alignment, local Markdown links and accessible visual assets |

Run all four with:

```sh
npm ci
npm run check
```

## 2. Runtime family boundary

The integrity gate verifies that each of the original seven component bundles includes PinballKit and does not accidentally contain the lightweight base. It verifies that each utility bundle includes PinmotionExtras and does not accidentally import PinballKit. It also checks that the expected custom-element registration is present in the correct bundle.

This matters for bundle size and runtime correctness. A utility control should not silently pull in the WebGL renderer and recorded audio payloads.

## 3. Catalogue and registry relationships

For every catalogue entry, the gate checks that:
- the standalone bundle, README and demo page exist;
- the demo page loads the matching local script;
- the gallery loads the script and lists the component;
- the API guide includes every tag registered by that bundle;
- the registry has one unique `registry:file` entry with the matching source path and install target.

The catalogue count is 29 bundles and 30 custom-element tags because the original bumper bundle registers both its single and cluster elements.

## 4. Documentation links and visual asset metadata

The integrity checker walks Markdown and MDX files in the repository, resolves each local relative link from its source file, and reports missing or out-of-repository targets. External URLs and in-page anchors are excluded.

It also checks the design system page and the family/token SVGs. Each SVG must include a role, title and description so the visual itself has an accessible name and explanation.

## 5. License and release boundary

The gate confirms that:
- the root `LICENSE` includes the MIT copyright line for Brajesh Kumar;
- `package.json` and the lockfile both identify MIT;
- the npm package remains private;
- no third-party package dependencies have been introduced.

The MIT repository license does not mean a public npm package has been released. Distribution, versioning and package publication remain separate later phases.

## 6. Continuous integration

The standard Validate workflow runs `npm run check` on pushes and pull requests. The Generate and publish workflow also runs the same full check after regenerating the 29 bundles, 29 API pages, 29 demos, gallery, registry and LLM guide, then smoke-tests all routes before deploying Pages.
