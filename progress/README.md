# Progress

A determinate or indeterminate progress bar styled as a row of mechanical lane markings. It communicates task progress without being an input.

## 📦 Bundle and elements

- **Bundle:** `progress/progress.js`, approximately 23 KB.
- **Custom elements:** `<pinball-progress>`.
- **Dependencies:** no external runtime packages. The bundle embeds the lightweight helper and component implementation; it does not include WebGL or audio.

## 🚀 Quick start

Load the standalone script and add the element to your HTML:

```html
<script src="progress.js"></script>\n<pinball-progress id="el" value="68" max="100" label="Upload progress"></pinball-progress>
```

Listen to the documented events and read the current properties:

```js
const progress = document.querySelector('pinball-progress');\nprogress.value = 82;\nprogress.setAttribute('max', '120');\nprogress.setAttribute('indeterminate', '');
```

The component bundle is a plain script, not an ES module. It embeds the lightweight helper and this control; it has no external runtime dependencies.

## 🧩 API reference

### Attributes

| Attribute | Type | Default | Applies to / update behavior |
|---|---|---|---|
| value | Number | 0 | Observed | Current progress value. |
| max | Number | 100 | Observed | Maximum value; non-positive values render as zero-width. |
| label | String | Progress | Observed | Accessible label. |
| indeterminate | Boolean | Absent | Observed | Shows indeterminate activity instead of a numeric percentage. |

All listed attributes are observed after connection and update the progressbar state.

### Properties

| Property | Type | Access | Details |
|---|---|---|---|
| value | number | Read/write | Current progress value. |
| max | number | Read-only | Maximum configured progress value. |

### Methods

No additional public methods are documented.

### Events

No public events are documented.

The shared event helper dispatches custom events with `bubbles: true` and `composed: true`, so listeners can be attached to the custom element or an ancestor outside its Shadow DOM. Event names and payloads above describe this component's actual implementation.

## 🎮 Input and keyboard

**Pointer and touch:** Display-only. Update the value or indeterminate attribute from application code.

**Keyboard:** Not focusable because this is a status indicator, not an interactive control.

## 📝 Form integration

Does not contribute a form value.

## 🎨 Styling, rendering, and sound

The component sits in the shared Pinball UI metal deck with brushed-steel edges, four recessed fasteners, a component-specific backglass emblem, three pilot lamps, a chrome ball marker and a dark inset playfield. If PinballKit is already present, the marker uses the original shared chrome-ball shader; otherwise it falls back to CSS. Width is responsive up to 320px. The fill uses a repeating amber lane stripe and a native progressbar role with min, max and current values.

This standalone file embeds the compact Pinmotion Extras base and this component implementation. It does not initialize or embed PinballKit, its WebGL runtime, shader source or recorded audio. Its component-specific backglass emblem and metal deck use the Pinball UI mechanical visual language. When PinballKit is already present, the backglass chrome-ball marker reuses its shared WebGL shader and user actions can reuse its sound effects. When loaded alone, the control remains self-contained and uses the CSS chrome-ball fallback.

## ♿ Motion and accessibility

The indeterminate fill moves with a CSS animation. A `prefers-reduced-motion` media query disables the animation and transform while retaining the indeterminate progress state.

The interactive control lives in an open Shadow DOM and uses the semantic role and focus behavior described above. Set a useful `label`, or provide `aria-label` / `aria-labelledby` before connection. The repository's optional automated interaction script uses headless Chromium; it is not a substitute for a screen-reader audit.

## 🎯 Mechanical behavior

| Action | Result |
|---|---|
| Update value | The visible fill and aria-valuenow update. |
| Set indeterminate | The indicator shows ongoing activity without announcing a percentage. |

## ⚠️ Implementation notes and limits

- The visual percentage is clamped to the configured range.
- The progress element is informational and has no user input or completion event.
