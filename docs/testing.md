# 🧪 Testing and verification

## 1. Quality gates currently configured

The repository has three GitHub Actions workflows:

| Workflow | Trigger | What it does |
| --- | --- | --- |
| [Validate](../.github/workflows/validate.yml) | Push or pull request targeting `main`, or manual dispatch | Runs `npm ci`, builds bundles, regenerates docs/gallery, runs the component source-to-contract audit, checks generated parity, smoke-tests the static server, and runs the mandatory headless Chrome suite |
| [Deploy to GitHub Pages](../.github/workflows/deploy-pages.yml) | Manual dispatch only | Verifies static files, syntax and registry JSON, then deploys the current committed site |
| [Generate and publish components](../.github/workflows/generate-components.yml) | Push to `main` or manual dispatch | Builds all 29 bundles, generates guides/demos/registry, runs checks, smoke-tests routes and bundles, uploads a per-attempt artifact, and deploys Pages from the triggering commit |

The two workflows are independently triggered by their configured events. The Pages workflow does not declare a dependency on the Validate workflow.

## 2. Main check command

Run:

```sh
npm ci
npm run check
```

`npm run check` executes these read-only checks in sequence:

1. `npm run build:check` ensures the seven PinballKit bundles match embedded core/art and the 22 utility bundles match `tools/extra-core.js` plus `extras-src/`.
2. `npm run docs:check` ensures the generated component docs, demos, gallery, registry, and `llms.txt` match `tools/spec.mjs` and current bundle sizes.
3. `npm run validate` checks required files, 29 component IDs, unique IDs/tags, generated page and registry relationships, package/lockfile metadata, JavaScript syntax, and GitHub Pages action settings. It also runs `tools/audit-components.mjs` to compare source registrations, observed attributes, documented member/event names, component demos/guides, and registry coverage.
4. `npm run integrity` checks bundled source and generated artifact integrity.

The check scripts are intended to detect stale output; use the non-check commands only when you intend to regenerate files.

## 3. Validate workflow details

The Validate workflow:
- checks out the repository;
- sets up Node.js 22;
- runs `npm ci`;
- runs `npm run build && npm run docs && npm run check`;
- starts `tools/serve.mjs` in the background;
- checks the root page, gallery, toggle demo, component script response, and gallery artwork response;
- verifies that a request for `.git/config` is not served.\n- parses the generated inline gallery runtime before browser execution;
- verifies that the generated gallery error monitor and quoted component wire keys exist;
- runs the mandatory headless Chrome suite against the locally served gallery.

The static-server smoke tests exercise HTTP behavior and basic file availability. They do not simulate component user input.

## 4. Mandatory browser interaction suite

Run the local server in one terminal:

```sh
npm run serve
```

Then in a second terminal:

```sh
npm run test:browser
```

The Validate GitHub Actions workflow installs Chrome and runs this suite as a mandatory gate on every push to `main` and every pull request targeting `main`. The script uses Chrome DevTools Protocol against headless Chrome/Chromium. It first checks that the gallery creates all 29 cards, clears its loading state, initializes every card and registers all 30 custom-element tags. It then tests the original seven mechanical controls and functional states across all 22 utility controls. Its test viewport is 390 × 900 CSS pixels with device scale factor 2 and touch emulation enabled. It exercises:
- presence of all eight original mechanical tags and all 22 utility custom elements;
- the 22 utility controls each render their component-specific backglass emblem;
- the full gallery reuses the already-initialized PinballKit shader for the utility chrome-ball marker;
- whether the WebGL output has non-transparent pixels;
- pointer/touch interaction and keyboard behavior;
- the documented event emissions;
- form values for Toggle, Slider, Stepper, and Drop targets;
- Drain delete, undo, and commit lifecycle;
- Bumper and bumper-cluster hit scoring;
- the Plunger short-pull and full-pull behavior;
- disabled-state behavior;
- horizontal overflow at the mobile-width viewport.

The default browser executable is `chromium`. Set `CHROME` to the executable path when needed. The browser suite is run by the Validate CI workflow after the static-server checks. The `npm test` alias still runs the read-only Node validator only; use `npm run test:browser` for the complete browser suite while the local server is running.

## 5. Screenshot and film tooling

`tools/shot.mjs` drives headless Chromium using the DevTools Protocol and writes PNG screenshots. It supports ordinary page capture and timed capture of pages that expose the film stepping hook.

The command shape is:

```sh
node tools/shot.mjs URL OUTPUT_PREFIX WIDTH HEIGHT SCALE [TIME_LIST]
```

Relevant environment variables:
- `CHROME`: Chrome/Chromium executable path;
- `JS`: JavaScript to evaluate before capturing;
- `WAIT`: wait time after the injected JavaScript, in milliseconds;
- `MOBILE=1`: enable mobile metrics;
- `PRINT`: expression to print after the capture.

The npm script forwards arguments:

```sh
npm run screenshots -- http://127.0.0.1:8000/gallery/ artifacts/gallery 1280 900 1
```

## 6. Current verification boundaries

Do not describe the project as cross-browser certified based on the current checks.

- The documented automated browser run is headless Chrome/Chromium. It includes interaction coverage for the original seven mechanical controls and limited visual/runtime assertions for the 22 utility controls; it does not yet exercise every utility control's complete pointer, keyboard, form and validation behavior.
- Safari and Firefox are not documented as tested.
- Real phones and tablets are not documented as tested.
- Screen-reader behavior is not documented as tested.
- Sound playback has not been verified on a physical phone.
- The browser suite is a mandatory Validate workflow step. A passing Chrome run is not evidence of Safari, Firefox, real-device, or screen-reader support.

These gaps are tracked as explicit validation work, not assumed passes.
