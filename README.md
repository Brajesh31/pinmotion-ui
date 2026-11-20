# Pinball UI

> 🚦 **Release status: NO-GO · Not released.** The stable release is locked until every mandatory phase and item in the [release plan](docs/RELEASE-PLAN.md) and [release checklist](docs/RELEASE-CHECKLIST.md) passes. The GitHub Pages site is a development preview, not a stable release.

Twenty-nine standalone interface bundles: seven original controls rebuilt as pinball-machine mechanisms, plus 22 lightweight utility components. Each bundle registers custom elements and has no external runtime package dependencies.

![Pinball UI control collection](gallery/title.jpg)

[![Validate](https://github.com/Brajesh31/pinmotion-ui/actions/workflows/validate.yml/badge.svg?branch=main)](https://github.com/Brajesh31/pinmotion-ui/actions/workflows/validate.yml)
[![Deploy to GitHub Pages](https://github.com/Brajesh31/pinmotion-ui/actions/workflows/deploy-pages.yml/badge.svg?branch=main)](https://github.com/Brajesh31/pinmotion-ui/actions/workflows/deploy-pages.yml)
[![GitHub stars](https://img.shields.io/github/stars/Brajesh31/pinmotion-ui?style=flat)](https://github.com/Brajesh31/pinmotion-ui/stargazers)

**[Open the live gallery](https://brajesh31.github.io/pinmotion-ui/gallery/)** · [Release plan](docs/RELEASE-PLAN.md) · [Release checklist](docs/RELEASE-CHECKLIST.md) · [Component inventory](docs/component-inventory.md) · [Source code](https://github.com/Brajesh31/pinmotion-ui) · [Component registry](registry.json) · [LLM guide](llms.txt) · [MIT License](LICENSE)

## 🎮 What is included

Pinball UI turns familiar interface patterns into tactile pinball mechanisms: a chrome ball rolls through a switch lane, lamps mark a slider's value, a shooter rod sends, score reels count, targets drop, an outhole provides undo, and pop bumpers score hits.

- **29 standalone JavaScript bundles** with no runtime package dependencies.
- **30 custom element tags**, because the bumper bundle defines both a single bumper and a three-bumper cluster.
- **Web Components** that can be used from plain HTML and JavaScript without a framework.
- **Keyboard and form support** for the value controls that expose form values.
- **Two runtime families:** seven original WebGL/audio bundles and 22 lightweight CSS/native bundles, which can reuse the original chrome-ball shader when PinballKit is already loaded.

## 🧩 Components

| Control | Custom element(s) | Interaction | Live demo | Source and API docs |
| --- | --- | --- | --- | --- |
| Toggle | `<pinball-toggle>` | Switch with a rolling chrome-ball knob | [Demo](https://brajesh31.github.io/pinmotion-ui/toggle/) | [Source](toggle/toggle.js) · [Docs](toggle/README.md) |
| Slider | `<pinball-slider>` | Range slider with ten illuminated lamps | [Demo](https://brajesh31.github.io/pinmotion-ui/slider/) | [Source](slider/slider.js) · [Docs](slider/README.md) |
| Plunger | `<pinball-plunger>` | Pull-to-send button with a spring-loaded shooter | [Demo](https://brajesh31.github.io/pinmotion-ui/plunger/) | [Source](plunger/plunger.js) · [Docs](plunger/README.md) |
| Stepper | `<pinball-stepper>` | Number stepper with flippers and score reels | [Demo](https://brajesh31.github.io/pinmotion-ui/stepper/) | [Source](stepper/stepper.js) · [Docs](stepper/README.md) |
| Drop targets | `<pinball-targets>` | Checkbox group with up to four falling targets | [Demo](https://brajesh31.github.io/pinmotion-ui/targets/) | [Source](targets/targets.js) · [Docs](targets/README.md) |
| Drain | `<pinball-drain>` | Delete action with a timed undo window | [Demo](https://brajesh31.github.io/pinmotion-ui/drain/) | [Source](drain/drain.js) · [Docs](drain/README.md) |
| Pop bumpers | `<pinball-bumper>`, `<pinball-bumpers>` | Single hit button and a three-bumper scoring cluster | [Demo](https://brajesh31.github.io/pinmotion-ui/bumper/) | [Source](bumper/bumper.js) · [Docs](bumper/README.md) |

### Additional utility components

These controls use the lightweight `PinmotionExtras` helper and native browser semantics. They do not load the PinballKit WebGL renderer or recorded audio.

| Control | Custom element(s) | Pattern | Live demo | Source and API docs |
| --- | --- | --- | --- | --- |
| Checkbox | `<pinball-checkbox>` | binary selection | [Demo](https://brajesh31.github.io/pinmotion-ui/checkbox/) | [Source](checkbox/checkbox.js) · [Docs](checkbox/README.md) |
| Radio Group | `<pinball-radio-group>` | single-choice group | [Demo](https://brajesh31.github.io/pinmotion-ui/radio-group/) | [Source](radio-group/radio-group.js) · [Docs](radio-group/README.md) |
| Segmented Control | `<pinball-segmented>` | compact single-choice selector | [Demo](https://brajesh31.github.io/pinmotion-ui/segmented/) | [Source](segmented/segmented.js) · [Docs](segmented/README.md) |
| Progress | `<pinball-progress>` | progress indicator | [Demo](https://brajesh31.github.io/pinmotion-ui/progress/) | [Source](progress/progress.js) · [Docs](progress/README.md) |
| Meter | `<pinball-meter>` | scalar measurement | [Demo](https://brajesh31.github.io/pinmotion-ui/meter/) | [Source](meter/meter.js) · [Docs](meter/README.md) |
| Rating | `<pinball-rating>` | rating input | [Demo](https://brajesh31.github.io/pinmotion-ui/rating/) | [Source](rating/rating.js) · [Docs](rating/README.md) |
| Tabs | `<pinball-tabs>` | tab navigation | [Demo](https://brajesh31.github.io/pinmotion-ui/tabs/) | [Source](tabs/tabs.js) · [Docs](tabs/README.md) |
| Accordion | `<pinball-accordion>` | expandable sections | [Demo](https://brajesh31.github.io/pinmotion-ui/accordion/) | [Source](accordion/accordion.js) · [Docs](accordion/README.md) |
| Disclosure | `<pinball-disclosure>` | single disclosure | [Demo](https://brajesh31.github.io/pinmotion-ui/disclosure/) | [Source](disclosure/disclosure.js) · [Docs](disclosure/README.md) |
| Tooltip | `<pinball-tooltip>` | contextual hint | [Demo](https://brajesh31.github.io/pinmotion-ui/tooltip/) | [Source](tooltip/tooltip.js) · [Docs](tooltip/README.md) |
| Dialog | `<pinball-dialog>` | modal dialog | [Demo](https://brajesh31.github.io/pinmotion-ui/dialog/) | [Source](dialog/dialog.js) · [Docs](dialog/README.md) |
| Toast | `<pinball-toast>` | notification feedback | [Demo](https://brajesh31.github.io/pinmotion-ui/toast/) | [Source](toast/toast.js) · [Docs](toast/README.md) |
| Breadcrumbs | `<pinball-breadcrumbs>` | navigation trail | [Demo](https://brajesh31.github.io/pinmotion-ui/breadcrumbs/) | [Source](breadcrumbs/breadcrumbs.js) · [Docs](breadcrumbs/README.md) |
| Pagination | `<pinball-pagination>` | page navigation | [Demo](https://brajesh31.github.io/pinmotion-ui/pagination/) | [Source](pagination/pagination.js) · [Docs](pagination/README.md) |
| Search | `<pinball-search>` | search input | [Demo](https://brajesh31.github.io/pinmotion-ui/search/) | [Source](search/search.js) · [Docs](search/README.md) |
| Text Field | `<pinball-text-field>` | single-line text input | [Demo](https://brajesh31.github.io/pinmotion-ui/text-field/) | [Source](text-field/text-field.js) · [Docs](text-field/README.md) |
| Text Area | `<pinball-text-area>` | multi-line text input | [Demo](https://brajesh31.github.io/pinmotion-ui/text-area/) | [Source](text-area/text-area.js) · [Docs](text-area/README.md) |
| Select | `<pinball-select>` | single-choice dropdown | [Demo](https://brajesh31.github.io/pinmotion-ui/select/) | [Source](select/select.js) · [Docs](select/README.md) |
| Combobox | `<pinball-combobox>` | editable choice | [Demo](https://brajesh31.github.io/pinmotion-ui/combobox/) | [Source](combobox/combobox.js) · [Docs](combobox/README.md) |
| File Drop | `<pinball-file-drop>` | file selection and dropzone | [Demo](https://brajesh31.github.io/pinmotion-ui/file-drop/) | [Source](file-drop/file-drop.js) · [Docs](file-drop/README.md) |
| Date Picker | `<pinball-date-picker>` | date input | [Demo](https://brajesh31.github.io/pinmotion-ui/date-picker/) | [Source](date-picker/date-picker.js) · [Docs](date-picker/README.md) |
| Color Picker | `<pinball-color-picker>` | color input | [Demo](https://brajesh31.github.io/pinmotion-ui/color-picker/) | [Source](color-picker/color-picker.js) · [Docs](color-picker/README.md) |

## 🚀 Add a control to your project

Choose only the control bundles your page needs. The files are deliberately distributed as plain scripts, not ES modules. Do not split a bundle: its photographs, sounds, and shared runtime data are embedded in the file.

### Option 1: Copy the standalone script

Copy the selected file into a folder served by your app. For example, copy `toggle/toggle.js` to `public/pinball-ui/toggle.js`, then load it from your page:

```html
<script defer src="/pinball-ui/toggle.js"></script>

<pinball-toggle name="notifications" label="Push alerts"></pinball-toggle>
```

Read the value and listen for changes:

```js
const toggle = document.querySelector('pinball-toggle');

toggle.addEventListener('change', (event) => {
  console.log('Push alerts enabled:', event.detail.checked);
});
```

### Option 2: Use the shadcn registry

The repository includes a `registry.json` with one file item for each bundle. In a project already configured for the shadcn CLI, add a component directly from this public GitHub registry:

```sh
npx shadcn@latest add Brajesh31/pinmotion-ui/toggle
```

Replace `toggle` with any of the other 28 bundle IDs listed above. The registry targets files under `public/pinball-ui/`. Review the CLI output and generated file path in your own project before committing the change.

See the [shadcn CLI documentation](https://ui.shadcn.com/docs/cli) and the repository's [registry definition](registry.json).

### Important: this is not an npm package

The root `package.json` is a private developer-tooling manifest (`private: true`). There is no published `pinmotion-ui` npm package or supported `npm install pinmotion-ui` command at this stage. Use the standalone files or the registry route above.

## ⚙️ Styling by runtime family

### Original mechanical controls: size and page reflections

Set `--pb-size` to control a component's height. The live chrome ball uses `--pb-page` to match the page background; use a hex colour. The default page colour is the project's warm cream (`#f3efe5`).

```css
pinball-toggle {
  --pb-size: 42px;
  --pb-page: #f3efe5;
}
```

Each control has its own default dimensions. Check the individual component guide before overriding its size.

### Original mechanical controls: sound

The seven original mechanical controls start sound after the first user interaction, as browsers require. Add the `silent` attribute to mute one instance, or set the PinballKit switch to mute the original mechanical set:

```html
<pinball-slider silent value="40" label="Volume"></pinball-slider>
```

```js
window.PinballKit.sound = false;
```

When several original mechanical bundles are loaded on the same page, the first establishes `window.PinballKit`; later mechanical bundles reuse the shared clock and WebGL context. The 22 utility components use a separate lightweight helper.

### Original mechanical controls: reduced motion and rendering requirements

- Most controls respect `prefers-reduced-motion` by skipping travel animations while keeping the final state and lamp feedback. **The Plunger is currently the exception**: its pull and shot animation still play.
- WebGL is required to draw the live chrome ball and lamps. Without WebGL, the controls remain focusable and usable, but those visual effects are not drawn.
- The photographed bodies keep a fixed shape rather than reflowing. They scale through `--pb-size` and remain sharp to roughly three times their default size.
- The original mechanical bundles are relatively large because each contains its own artwork and sound data. Load only the controls a page actually uses.

### Lightweight utility controls

The 22 utility controls use native HTML inputs, buttons, lists and CSS rendering inside pinball-inspired metal decks. Each has its own vector backglass emblem, pilot lamps, brass action surfaces and CSS chrome-ball fallback. They do not require WebGL, PinballKit or embedded audio. When the original runtime is already loaded, their backglass marker can reuse its live chrome-ball shader and their user interactions can reuse its mechanical sound effects. Their API guides document exact native semantics and browser-dependent behaviors.

## 🔌 Events and form integration

Use the element's properties and the documented events rather than reaching into its shadow DOM.

| Bundle | Main events | Event detail / value |
| --- | --- | --- |
| Toggle | `input`, `change` | `checked` boolean |
| Slider | `input`, `change` | `value` number |
| Plunger | `send` | `power` from `0` to `1` |
| Stepper | `input`, `change` | `value` number |
| Drop targets | `change`, `bonus` | Changed item, checked state, selected items, and all-checked state |
| Drain | `delete`, `undo`, `commit` | Delete lifecycle; `commit` means the undo window expired |
| Pop bumpers | `hit` | Hit index, points, count, score, and combo |

Toggle, Slider, Stepper, and Drop targets can participate in form submission when given a `name` attribute. Their keyboard behavior, attributes, properties, and methods are described in their individual guides.

### Utility component events

| Control | Events |
| --- | --- |
| Checkbox | `change` |
| Radio Group | `change` |
| Segmented Control | `change` |
| Progress | None; display-only or native browser behavior |
| Meter | None; display-only or native browser behavior |
| Rating | `change` |
| Tabs | `change` |
| Accordion | `change` |
| Disclosure | `toggle` |
| Tooltip | None; display-only or native browser behavior |
| Dialog | `open`, `cancel`, `close` |
| Toast | `show`, `dismiss` |
| Breadcrumbs | None; display-only or native browser behavior |
| Pagination | `change` |
| Search | `input`, `search` |
| Text Field | `input`, `change` |
| Text Area | `input`, `change` |
| Select | `change` |
| Combobox | `input`, `change` |
| File Drop | `change` |
| Date Picker | `input`, `change` |
| Color Picker | `input`, `change` |

See each component API guide for exact event payloads and trigger conditions.

## 🧪 Develop and validate

The repository tooling uses Node.js 22 or newer and npm 10 or newer. It has no third-party npm dependencies.

```sh
npm ci
npm run serve
```

Open `http://127.0.0.1:8000/gallery/` to use the local gallery. In another terminal, the main checks are:

```sh
npm run check
npm test
```

`npm run check` verifies generated bundle and documentation parity, then runs the repository validator. `npm test` runs the structural validator. The GitHub Actions validation workflow also installs from the lockfile, runs these checks, and smoke-tests the local static server.

### Browser interaction tests

The optional browser test drives the live gallery in headless Chrome or Chromium with touch and keyboard input, checks component events and form values, and checks for horizontal overflow at a phone-sized viewport. Start the local server first, then run:

```sh
npm run test:browser
```

Set `CHROME` to the Chrome or Chromium executable when it is not available as `chromium` on your `PATH`. The browser test is not part of the default `npm test` command.

### Useful developer commands

| Command | Purpose |
| --- | --- |
| `npm run serve` | Start the local static server on `127.0.0.1:8000` |
| `npm run build` | Regenerate standalone component bundles from the source and shared core |
| `npm run build:check` | Check generated bundles without writing changes |
| `npm run docs` | Regenerate component guides, demos, gallery, registry, and `llms.txt` |
| `npm run docs:check` | Check generated documentation and registry parity |
| `npm run validate` | Run read-only repository structure and metadata checks |
| `npm run screenshots -- <url> <output-prefix> <width> <height> <scale>` | Capture a page using headless Chrome or Chromium |

## 🧭 Roadmap and delivery status

See the [phase roadmap](docs/ROADMAP.md) for the completed foundations, active gallery/deployment and quality work, remaining component expansion, release milestones, and clear acceptance criteria. Phase counts are evidence-based and distinguish implemented components from production validation.

## 📚 Project documentation

- [Live interactive gallery](https://brajesh31.github.io/pinmotion-ui/gallery/)
- [Component guides](toggle/README.md), with per-component API, attributes, events, sizing, and known limits
- [Registry definition](registry.json), for shadcn CLI installation
- [LLM reference](llms.txt), a compact machine-readable project guide
- [Pinball UI skill](skills/pinball-ui/SKILL.md), the workflow for integrating or creating controls in this style
- [How it was made](making-of/README.md), including design decisions, artwork plates, WebGL rendering, and sound

## 🏗️ Technical documentation

The documentation set below covers the implementation, operational workflows, browser behavior, and project limits:

- [Documentation hub](docs/README.md)
- [System architecture](docs/architecture.md)
- [Component reference and event contracts](docs/component-reference.md)
- [Site map and page behavior](docs/site-map.md)
- [Development workflow and repository conventions](docs/development.md)
- [Asset embedding and generated-file pipeline](docs/asset-pipeline.md)
- [Testing strategy and verification boundaries](docs/testing.md)
- [GitHub Pages deployment](docs/deployment.md)
- [Accessibility, rendering requirements, and known limitations](docs/accessibility.md)
- [Design system and visual tokens](docs/design-system.md)
- [Architecture and component-family diagrams](docs/diagrams/)

## 🧭 Browser and accessibility status

The repository's interaction tests exercise headless Chromium with touch and keyboard input at a mobile viewport. The project documentation does **not** claim that Safari, Firefox, physical phones, or screen-reader behavior has been tested. Sound playback has also not been verified on a physical phone. Treat those as open validation areas, not supported-browser guarantees.

## 📄 License

This repository is licensed under the **MIT License**, Copyright (c) 2026 **Brajesh Kumar**. See the full terms in [`LICENSE`](LICENSE). The root npm tooling manifest remains private, so no npm package is published at this stage.

## 👤 Maintainer

Brajesh Kumar · [GitHub](https://github.com/Brajesh31)

---

Built to make familiar controls feel like they belong on a pinball playfield.