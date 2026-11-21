# Breadcrumbs

A responsive breadcrumb navigation trail generated from a compact label and URL list. The final item is marked as the current page.

## 📦 Bundle and elements

- **Bundle:** `breadcrumbs/breadcrumbs.js`, approximately 22 KB.
- **Custom elements:** `<pinball-breadcrumbs>`.
- **Dependencies:** no external runtime packages. The bundle embeds the lightweight helper and component implementation; it does not include WebGL or audio.

## 🚀 Quick start

Load the standalone script and add the element to your HTML:

```html
<script src="breadcrumbs.js"></script>\n<pinball-breadcrumbs id="el" items="Home|/;Components|/components;Breadcrumbs"></pinball-breadcrumbs>
```

Listen to the documented events and read the current properties:

```js
const breadcrumbs = document.querySelector('pinball-breadcrumbs');\nbreadcrumbs.setAttribute('items', 'Home|/;Docs|/docs;API reference');
```

The component bundle is a plain script, not an ES module. It embeds the lightweight helper and this control; it has no external runtime dependencies.

## 🧩 API reference

### Attributes

| Attribute | Type | Default | Applies to / update behavior |
|---|---|---|---|
| items | Semicolon-separated label|URL pairs | Home|/;Components|/components;Current | Observed | Creates the trail. The final item is rendered as current page text. |
| label | String | Breadcrumb | Observed | Accessible name for the navigation landmark. |

Changing items rebuilds the ordered list. URL values are restricted to common safe URL schemes and relative/hash paths.

### Properties

No additional public properties are documented.

### Methods

No additional public methods are documented.

### Events

No public events are documented.

The shared event helper dispatches custom events with `bubbles: true` and `composed: true`, so listeners can be attached to the custom element or an ancestor outside its Shadow DOM. Event names and payloads above describe this component's actual implementation.

## 🎮 Input and keyboard

**Pointer and touch:** Navigation links are ordinary anchors; the current page is not a link.

**Keyboard:** Each non-current item is a native anchor and follows standard browser keyboard navigation.

## 📝 Form integration

Does not contribute a form value.

## 🎨 Styling, rendering, and sound

The component sits in the shared Pinball UI metal deck with brushed-steel edges, four recessed fasteners, a component-specific backglass emblem, three pilot lamps, a chrome ball marker and a dark inset playfield. If PinballKit is already present, the marker uses the original shared chrome-ball shader; otherwise it falls back to CSS. A light machine panel and amber underline maintain visual consistency while keeping navigation compact.

This standalone file embeds the compact Pinmotion Extras base and this component implementation. It does not initialize or embed PinballKit, its WebGL runtime, shader source or recorded audio. Its component-specific backglass emblem and metal deck use the Pinball UI mechanical visual language. When PinballKit is already present, the backglass chrome-ball marker reuses its shared WebGL shader and user actions can reuse its sound effects. When loaded alone, the control remains self-contained and uses the CSS chrome-ball fallback.

## ♿ Motion and accessibility

No motion is used.

The interactive control lives in an open Shadow DOM and uses the semantic role and focus behavior described above. Set a useful `label`, or provide `aria-label` / `aria-labelledby` before connection. The mandatory Validate CI workflow runs the headless Chromium interaction suite, including gallery and standalone component checks. This automated browser coverage is not a substitute for a dedicated screen-reader audit.

## 🎯 Mechanical behavior

| Action | Result |
|---|---|
| Navigate | Choose an ancestor link to open its URL. |

## ⚠️ Implementation notes and limits

- Use label|href for each item and separate entries with semicolons.
- The final entry is displayed with aria-current=page.
- The current page label is not linked.
