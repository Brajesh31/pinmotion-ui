# Pagination

A compact pagination control with previous/next actions, current-page state and a limited set of nearby page numbers.

## 📦 Bundle and elements

- **Bundle:** `pagination/pagination.js`, approximately 13 KB.
- **Custom elements:** `<pinball-pagination>`.
- **Dependencies:** no external runtime packages. The bundle embeds the lightweight helper and component implementation; it does not include WebGL or audio.

## 🚀 Quick start

Load the standalone script and add the element to your HTML:

```html
<script src="pagination.js"></script>\n<pinball-pagination id="el" pages="12" page="4" label="Results pages"></pinball-pagination>
```

Listen to the documented events and read the current properties:

```js
const pager = document.querySelector('pinball-pagination');\npager.addEventListener('change', e => loadPage(e.detail.page));\npager.setPage(8);
```

The component bundle is a plain script, not an ES module. It embeds the lightweight helper and this control; it has no external runtime dependencies.

## 🧩 API reference

### Attributes

| Attribute | Type | Default | Applies to / update behavior |
|---|---|---|---|
| pages | Integer | 10 | Observed | Total pages, clamped from 1 through 1000. |
| page | Integer | 1 | Observed | Current page, clamped to the valid range. |
| label | String | Pagination | Observed | Accessible name for the navigation landmark. |
| disabled | Boolean | Absent | Observed by shared base | Makes the host inert. |

Changing page or pages updates the selected item and the previous/next disabled states.

### Properties

| Property | Type | Access | Details |
|---|---|---|---|
| page | number | Read/write | Current page. |
| pages | number | Read-only | Total number of pages. |

### Methods

| Method | Details |
|---|---|
| setPage(page, user = false) | Set a valid page. Pass user=true to emit change. |

### Events

| Event | Payload and trigger |
|---|---|
| change | CustomEvent, { page: number, pages: number } Fires when a user selects a different page. |

The shared event helper dispatches custom events with `bubbles: true` and `composed: true`, so listeners can be attached to the custom element or an ancestor outside its Shadow DOM. Event names and payloads above describe this component's actual implementation.

## 🎮 Input and keyboard

**Pointer and touch:** Use the page buttons or the previous and next controls.

**Keyboard:** Native buttons support Enter and Space. Tab moves between available pagination buttons.

## 📝 Form integration

Does not contribute a form value.

## 🎨 Styling, rendering, and sound

The component sits in the shared Pinball UI metal deck with brushed-steel edges, four recessed fasteners, a chrome ball marker, an amber pilot lamp and a dark inset playfield. The active page uses an amber raised button; neighboring pages remain cream with steel borders.

This standalone file embeds the compact Pinmotion Extras base and this component implementation. Its metal deck, chrome fasteners, amber pilot lamp and brass control styling follow the original PinballKit family. It does not load WebGL or recorded audio. When PinballKit is already present on the page, user actions reuse its recorded mechanical sound effects; when used alone, the component remains self-contained and silent.

## ♿ Motion and accessibility

No scripted motion is used.

The interactive control lives in an open Shadow DOM and uses the semantic role and focus behavior described above. Set a useful `label`, or provide `aria-label` / `aria-labelledby` before connection. The repository's optional automated interaction script uses headless Chromium; it is not a substitute for a screen-reader audit.

## 🎯 Mechanical behavior

| Action | Result |
|---|---|
| Choose a page | The page property updates and change is emitted. |

## ⚠️ Implementation notes and limits

- Only the first, last and current-neighbor page numbers are displayed, with ellipses for gaps.
- The component does not fetch content; the application listens for change and loads the selected page.
