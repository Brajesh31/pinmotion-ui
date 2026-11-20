# 🎨 Asset and generation pipeline

## 1. Source asset directories

### Artwork

| Component folder | Current source plates |
| --- | --- |
| `art/toggle/` | `ball.webp`, `toggle-off.webp`, `toggle-on.webp` |
| `art/slider/` | `slider-off.webp`, `slider-on.webp` |
| `art/plunger/` | `bracket.webp`, `rod.webp` |
| `art/stepper/` | `flipper-minus.webp`, `flipper-plus.webp`, `stepper-housing-off.webp`, `stepper-housing-on.webp` |
| `art/targets/` | `drop-target.webp`, `targets-bank-off.webp`, `targets-bank-on.webp` |
| `art/drain/` | `drain-off.webp`, `drain-on.webp` |
| `art/bumper/` | `bumper-off.webp`, `bumper-on.webp` |

The artwork is stored as source WebP plates. The design process and visual iterations are recorded in [making-of/README.md](../making-of/README.md), [making-of/prompts.md](../making-of/prompts.md), and the concepts/plates folders.

### Sound

The `sounds/` directory currently contains these recorded takes:

| Effect family | Source files |
| --- | --- |
| Chime | `chime-0.mp3`, `chime-1.mp3` |
| Clack | `clack-0.mp3` through `clack-3.mp3` |
| Kick | `kick-0.mp3`, `kick-1.mp3` |
| Relay | `relay-0.mp3` through `relay-3.mp3` |
| Rolling loop | `roll-0.wav` |

The shared runtime also has a synthesized voice mode, but recorded takes are the default.

## 2. How a distributed bundle is assembled

The build process is implemented in `tools/build.mjs`.

For every component in its canonical `NAMES` array, the builder:

1. reads the existing component bundle;
2. serializes files from that component's `art/{component}/` folder into base64 data URIs;
3. replaces the marked ART section in the bundle;
4. takes `core.js` and replaces its sounds marker with data URIs generated from `sounds/`;
5. replaces the marked shared-core section in the component bundle;
6. writes the updated standalone bundle when content differs;
7. refreshes `skills/pinball-ui/core.js` with the shared core and embedded sound data.

The supported extension-to-MIME mappings in the builder are WebP, JPEG, PNG, MP3, and WAV. Current artwork plates are WebP files. The sound source directory uses MP3 and WAV.

Each distributed component file therefore contains its own copy of the common runtime, its artwork data, and the sound takes. Loading more than one bundle increases downloaded JavaScript size, but the runtime guard prevents multiple shared clock, WebGL, and sound instances from being initialized on one page.

## 3. Generated documentation pipeline

`tools/docs.mjs` imports `SPEC`, `REPO`, `SITE`, `AUTHOR`, and common limits from `tools/spec.mjs`. It derives file sizes from the generated component bundles and writes the component pages and registry outputs.

The generated files are:
- `toggle/README.md`, `slider/README.md`, `plunger/README.md`, `stepper/README.md`, `targets/README.md`, `drain/README.md`, and `bumper/README.md`;
- the seven component `index.html` demo pages;
- `gallery/index.html`;
- `registry.json`;
- `llms.txt`.

Use `node tools/docs.mjs --check` to detect stale generated outputs without writing them.

## 4. Correct regeneration order

| Change | Required sequence |
| --- | --- |
| Shared core | `npm run build` → `npm run docs` → `npm run check` |
| Artwork or sound file | `npm run build` → `npm run docs` → `npm run check` |
| Component-specific implementation | `npm run build` → `npm run check` |
| Component specification text or examples | `npm run docs` → `npm run check` |

The docs generator reports bundle sizes. Run the build first when embedded assets or core code have changed so those sizes are current.

## 5. Registry output

The root `registry.json` uses the shadcn registry schema and contains one `registry:file` item per bundle. Each item points to its corresponding component JavaScript file and uses a target under `~/public/pinball-ui/`.

The registry is generated from the component specification. If component IDs, descriptions, or install targets change, update the canonical data and regenerate the registry. Validate JSON with `npm run check`.

## 6. Asset and bundle trade-offs

- **Single-file delivery:** each bundle can be copied without a second request for its image or sound assets.
- **No asset CDN requirement:** embedded assets are data URIs in the delivered script.
- **Larger transfer size:** each bundle contains a copy of the runtime and sound data; the component guides publish approximate file sizes.
- **Selective loading:** include only the controls the page uses.
- **Shared execution:** bundles loaded together reuse the page's first initialized PinballKit runtime.

No asset minification, CDN transformation, or compression pipeline is configured in the repository beyond the source image/audio formats and the base64 embedding.
