# Meter

A read-only scalar meter with a mechanical needle over low, middle and high zones. It exposes an accessible meter value and is not an input.

## 📦 Bundle and elements

- **Bundle:** `meter/meter.js`, approximately 23 KB.
- **Custom elements:** `<pinball-meter>`.
- **Dependencies:** no external runtime packages. The bundle embeds the lightweight helper and component implementation; it does not include WebGL or audio.

## 🚀 Quick start

Load the standalone script and add the element to your HTML:

```html
<script src="meter.js"></script>\n<pinball-meter id="el" value="72" min="0" max="100" low="30" high="80" optimum="65" label="Signal strength"></pinball-meter>
```

Listen to the documented events and read the current properties:

```js
const meter = document.querySelector('pinball-meter');\nmeter.value = 88;\nmeter.setAttribute('max', '120');
```

The component bundle is a plain script, not an ES module. It embeds the lightweight helper and this control; it has no external runtime dependencies.

## 🧩 API reference

### Attributes

| Attribute | Type | Default | Applies to / update behavior |
|---|---|---|---|
| value | Number | 0 | Observed | Current measurement. |
| min | Number | 0 | Observed | Lower bound. |
| max | Number | 100 | Observed | Upper bound. |
| low | Number | Unset | Observed | Optional low threshold. |
| high | Number | Unset | Observed | Optional high threshold. |
| optimum | Number | Unset | Observed | Optional optimum point. |
| label | String | Level | Observed | Accessible label. |

The measurement and range attributes update the visible needle and aria-valuenow.

### Properties

| Property | Type | Access | Details |
|---|---|---|---|
| value | number | Read/write | Current measurement. |

### Methods

No additional public methods are documented.

### Events

No public events are documented.

The shared event helper dispatches custom events with `bubbles: true` and `composed: true`, so listeners can be attached to the custom element or an ancestor outside its Shadow DOM. Event names and payloads above describe this component's actual implementation.

## 🎮 Input and keyboard

**Pointer and touch:** Display-only. Change the value attribute or property from application code.

**Keyboard:** Not focusable because this is a measurement indicator.

## 📝 Form integration

Does not contribute a form value.

## 🎨 Styling, rendering, and sound

The component sits in the shared Pinball UI metal deck with brushed-steel edges, four recessed fasteners, a component-specific backglass emblem, three pilot lamps, a chrome ball marker and a dark inset playfield. If PinballKit is already present, the marker uses the original shared chrome-ball shader; otherwise it falls back to CSS. A segmented colour band and high-contrast needle show the current position. The value is displayed numerically alongside the meter.

This standalone file embeds the compact Pinmotion Extras base and this component implementation. It does not initialize or embed PinballKit, its WebGL runtime, shader source or recorded audio. Its component-specific backglass emblem and metal deck use the Pinball UI mechanical visual language. When PinballKit is already present, the backglass chrome-ball marker reuses its shared WebGL shader and user actions can reuse its sound effects. When loaded alone, the control remains self-contained and uses the CSS chrome-ball fallback.

## ♿ Motion and accessibility

The needle changes position directly without continuous animation.

The interactive control lives in an open Shadow DOM and uses the semantic role and focus behavior described above. Set a useful `label`, or provide `aria-label` / `aria-labelledby` before connection. The repository's optional automated interaction script uses headless Chromium; it is not a substitute for a screen-reader audit.

## 🎯 Mechanical behavior

| Action | Result |
|---|---|
| Update value | The numeric readout and aria meter value update. |

## ⚠️ Implementation notes and limits

- The current renderer uses the min/max range for needle placement. Low/high/optimum are accepted as descriptive meter attributes for host markup.
- This is a read-only display, not a validated range input.
