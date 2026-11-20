# 🗺️ Site map and page behavior

## 1. Published paths

The site is a static multi-page site. There is no client-side router, route configuration, or API endpoint in the current repository.

| Path | Page | Purpose |
| --- | --- | --- |
| `/` | Root redirect | Meta-refreshes to `gallery/`; also includes a normal link as a fallback. |
| `/gallery/` | Interactive gallery | Main collection page, with all controls rendered live. |
| `/toggle/` | Toggle demo | Standalone toggle example and interaction feedback. |
| `/slider/` | Slider demo | Standalone slider example and value feedback. |
| `/plunger/` | Plunger demo | Standalone pull-to-send example and send feedback. |
| `/stepper/` | Stepper demo | Standalone number stepper example and value feedback. |
| `/targets/` | Drop targets demo | Standalone checkbox bank example and selection feedback. |
| `/drain/` | Drain demo | Standalone delete/undo example and state feedback. |
| `/bumper/` | Pop bumpers demo | Single bumper and cluster examples with hit feedback. |
| `/checkbox/` | Checkbox demo | binary selection; lightweight utility component example and interaction feedback. |
| `/radio-group/` | Radio Group demo | single-choice group; lightweight utility component example and interaction feedback. |
| `/segmented/` | Segmented Control demo | compact single-choice selector; lightweight utility component example and interaction feedback. |
| `/progress/` | Progress demo | progress indicator; lightweight utility component example and interaction feedback. |
| `/meter/` | Meter demo | scalar measurement; lightweight utility component example and interaction feedback. |
| `/rating/` | Rating demo | rating input; lightweight utility component example and interaction feedback. |
| `/tabs/` | Tabs demo | tab navigation; lightweight utility component example and interaction feedback. |
| `/accordion/` | Accordion demo | expandable sections; lightweight utility component example and interaction feedback. |
| `/disclosure/` | Disclosure demo | single disclosure; lightweight utility component example and interaction feedback. |
| `/tooltip/` | Tooltip demo | contextual hint; lightweight utility component example and interaction feedback. |
| `/dialog/` | Dialog demo | modal dialog; lightweight utility component example and interaction feedback. |
| `/toast/` | Toast demo | notification feedback; lightweight utility component example and interaction feedback. |
| `/breadcrumbs/` | Breadcrumbs demo | navigation trail; lightweight utility component example and interaction feedback. |
| `/pagination/` | Pagination demo | page navigation; lightweight utility component example and interaction feedback. |
| `/search/` | Search demo | search input; lightweight utility component example and interaction feedback. |
| `/text-field/` | Text Field demo | single-line text input; lightweight utility component example and interaction feedback. |
| `/text-area/` | Text Area demo | multi-line text input; lightweight utility component example and interaction feedback. |
| `/select/` | Select demo | single-choice dropdown; lightweight utility component example and interaction feedback. |
| `/combobox/` | Combobox demo | editable choice; lightweight utility component example and interaction feedback. |
| `/file-drop/` | File Drop demo | file selection and dropzone; lightweight utility component example and interaction feedback. |
| `/date-picker/` | Date Picker demo | date input; lightweight utility component example and interaction feedback. |
| `/color-picker/` | Color Picker demo | color input; lightweight utility component example and interaction feedback. |

The root page is a tiny HTML redirect, not a full landing page. The gallery is the project's principal landing experience.

## 2. Gallery page

The gallery is generated at `gallery/index.html` from `tools/spec.mjs`.

### Sections and controls

- **Header artwork:** `gallery/title.jpg`, displayed at its 1600:700 aspect ratio and given descriptive alternative text.
- **Project title and introduction:** describes the original mechanical controls and introduces the lightweight utility family.
- **Repository links:** GitHub repository and the maintainer's linked profile.
- **Sound control:** toggles the shared PinballKit sound setting.
- **Control grid:** generated cards for all 29 controls, split across the mechanical and utility runtime families.
- **Per-card actions:** Copy install, Copy a prompt, and Open the matching standalone demo route.
- **Closing note:** explains that the controls are live, sound starts with interaction, and most motion respects the reduced-motion preference.

The gallery loads all 29 component bundles. The original seven share the first initialized `window.PinballKit` runtime; the 22 utility components use `window.PinmotionExtras` and do not depend on WebGL or audio.

## 3. Standalone component demo pages

Each component directory has an `index.html` and a README. The page generator in `tools/docs.mjs` creates a centered demo layout containing:

- component title and element tag;
- live custom element example;
- a visual status line wired to the component's public events;
- a short interaction hint;
- a sound on/off control on the original mechanical demo pages;
- a link back to the gallery and a link to the component documentation.

Each demo page loads only its own bundle. The original mechanical pages use PinballKit and include sound controls; lightweight utility pages use the smaller helper and omit audio controls.

Appending `?embed=1` hides the page heading, hint, tools, and back-navigation content to make the control easier to embed in an iframe-like presentation. It does not create a distinct application route.

## 4. Responsive layout behavior

The gallery stylesheet uses a centered wrapper with a maximum width of 1400px. Its control list uses an auto-filling CSS grid with a minimum card width capped at 400px, so the number of columns changes with available space. Cards and action groups use wrapping flex layouts.

The gallery declares a mobile-aware viewport including `viewport-fit=cover`. Individual demo pages use a content width capped at 720px with horizontal viewport padding. Their control stages use wrapping flex layouts. The original mechanical family uses `--pb-size`; the utility family uses its own CSS sizing.

These rules document responsive layout intent. They are not a guarantee that each control's photographed body will reflow; each control guide explicitly notes that the photographed mechanical plate scales while retaining its fixed shape.

## 5. User journeys

### Discover and try a control

`/` → `/gallery/` → choose a live control → interact with it → open its standalone demo or read its README.

### Copy a control into an app

`/gallery/` → choose a card → Copy install → use the shown shadcn registry command, or copy the standalone JavaScript file → load the script from the app's public/static directory → add the custom element and wire its events.

### Inspect a specific control

Open its `/{control}/` route → use the live demo → follow the Docs link to its component README.

## 6. Search, metadata, and machine-readable content

- `gallery/index.html` contains the page title, meta description, Open Graph title/description, and image reference.
- `registry.json` provides one registry item per bundle.
- `llms.txt` is the compact machine-readable overview and includes links to the gallery, source bundles, component docs, and the included skill.
- The root README links to the main technical and component documentation.

No sitemap.xml, robots.txt, API routes, or separate search index are defined in the current repository snapshot.
