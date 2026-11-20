# Progress

A determinate or indeterminate progress bar styled as a row of mechanical lane markings. It communicates task progress without being an input.

## 📦 Bundle and elements

- **Bundle:** `progress/progress.js`, approximately 5 KB.
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

Width is responsive up to 320px. The fill uses a repeating amber lane stripe and a native progressbar role with min, max and current values.

This standalone file embeds the small guarded Pinmotion Extras base and this component implementation. It does not load the PinballKit WebGL renderer, recorded audio, or external packages.

## ♿ Motion and accessibility

The indeterminate fill moves with a CSS animation. Consider disabling the indeterminate attribute for reduced-motion contexts; the current version does not add a separate reduced-motion animation override.

The interactive control lives in an open Shadow DOM and uses the semantic role and focus behavior described above. Set a useful `label`, or provide `aria-label` / `aria-labelledby` before connection. The repository's optional automated interaction script uses headless Chromium; it is not a substitute for a screen-reader audit.

## 🎯 Mechanical behavior

| Action | Result |
|---|---|
| Update value | The visible fill and aria-valuenow update. |
| Set indeterminate | The indicator shows ongoing activity without announcing a percentage. |

## ⚠️ Implementation notes and limits

- The visual percentage is clamped to the configured range.
- The progress element is informational and has no user input or completion event.
