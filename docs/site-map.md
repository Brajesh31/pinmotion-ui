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

The root page is a tiny HTML redirect, not a full landing page. The gallery is the project's principal landing experience.

## 2. Gallery page

The gallery is generated at `gallery/index.html` from `tools/spec.mjs`.

### Sections and controls

- **Header artwork:** `gallery/title.jpg`, displayed at its 1600:700 aspect ratio and given descriptive alternative text.
- **Project title and introduction:** describes the seven ordinary controls expressed as pinball mechanisms.
- **Repository links:** GitHub repository and the maintainer's linked profile.
- **Sound control:** toggles the shared PinballKit sound setting.
- **Control grid:** generated cards for Toggle, Slider, Plunger, Stepper, Drop targets, Drain, and Pop bumpers.
- **Per-card actions:** Copy install, Copy a prompt, and Open the matching standalone demo route.
- **Closing note:** explains that the controls are live, sound starts with interaction, and most motion respects the reduced-motion preference.

The gallery loads all seven component bundles. Since the core is idempotent, those bundles reuse the first initialized `window.PinballKit` runtime.

## 3. Standalone component demo pages

Each component directory has an `index.html` and a README. The page generator in `tools/docs.mjs` creates a centered demo layout containing:

- component title and element tag;
- live custom element example;
- a visual status line wired to the component's public events;
- a short interaction hint;
- a sound on/off control;
- a link back to the gallery and a link to the component documentation.

The demo page loads only its own component bundle, except the bumper page which uses the two elements registered by the bumper bundle.

Appending `?embed=1` hides the page heading, hint, tools, and back-navigation content to make the control easier to embed in an iframe-like presentation. It does not create a distinct application route.

## 4. Responsive layout behavior

The gallery stylesheet uses a centered wrapper with a maximum width of 1400px. Its control list uses an auto-filling CSS grid with a minimum card width capped at 400px, so the number of columns changes with available space. Cards and action groups use wrapping flex layouts.

The gallery declares a mobile-aware viewport including `viewport-fit=cover`. Individual demo pages use a content width capped at 720px with horizontal viewport padding. Their control stages use wrapping flex layouts and control-specific `--pb-size` values.

These rules document responsive layout intent. They are not a guarantee that each control's photographed body will reflow; each control guide explicitly notes that the plate scales while retaining its fixed shape.

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
