# Color Picker

A color picker using the native browser color input, with a synchronized uppercase hex value display and form support.

## 📦 Bundle and elements

- **Bundle:** `color-picker/color-picker.js`, approximately 22 KB.
- **Custom elements:** `<pinball-color-picker>`.
- **Dependencies:** no external runtime packages. The bundle embeds the lightweight helper and component implementation; it does not include WebGL or audio.

## 🚀 Quick start

Load the standalone script and add the element to your HTML:

```html
<script src="color-picker.js"></script>\n<pinball-color-picker id="el" name="accent" value="#c9700f" label="Accent colour"></pinball-color-picker>
```

Listen to the documented events and read the current properties:

```js
const color = document.querySelector('pinball-color-picker');\ncolor.addEventListener('change', e => applyThemeColor(e.detail.value));\ncolor.value = '#b3322b';
```

The component bundle is a plain script, not an ES module. It embeds the lightweight helper and this control; it has no external runtime dependencies.

## 🧩 API reference

### Attributes

| Attribute | Type | Default | Applies to / update behavior |
|---|---|---|---|
| value | Hex colour string | #c9700f | Observed | Current colour. |
| label | String | Accent colour | Observed | Visible label. |
| name | String | Omitted | Form configuration | Form field name. |
| disabled | Boolean | Absent | Observed by shared base | Makes the host inert. |

Value and label update after connection. The native color input normalizes the color representation.

### Properties

| Property | Type | Access | Details |
|---|---|---|---|
| value | string | Read/write | Current hexadecimal color value. |

### Methods

No additional public methods are documented.

### Events

| Event | Payload and trigger |
|---|---|
| input | CustomEvent, { value: string } Fires while the native color picker changes. |
| change | CustomEvent, { value: string } Fires when the native color picker commits. |

The shared event helper dispatches custom events with `bubbles: true` and `composed: true`, so listeners can be attached to the custom element or an ancestor outside its Shadow DOM. Event names and payloads above describe this component's actual implementation.

## 🎮 Input and keyboard

**Pointer and touch:** Use the native color input to select a color.

**Keyboard:** Keyboard behavior follows the browser’s native color input implementation.

## 📝 Form integration

Form-associated. With name set, submits the hexadecimal color string.

## 🎨 Styling, rendering, and sound

The component sits in the shared Pinball UI metal deck with brushed-steel edges, four recessed fasteners, a component-specific backglass emblem, three pilot lamps, a chrome ball marker and a dark inset playfield. If PinballKit is already present, the marker uses the original shared chrome-ball shader; otherwise it falls back to CSS. A native color swatch sits beside an uppercase monospace hexadecimal readout.

This standalone file embeds the compact Pinmotion Extras base and this component implementation. It does not initialize or embed PinballKit, its WebGL runtime, shader source or recorded audio. Its component-specific backglass emblem and metal deck use the Pinball UI mechanical visual language. When PinballKit is already present, the backglass chrome-ball marker reuses its shared WebGL shader and user actions can reuse its sound effects. When loaded alone, the control remains self-contained and uses the CSS chrome-ball fallback.

## ♿ Motion and accessibility

No custom motion is used.

The interactive control lives in an open Shadow DOM and uses the semantic role and focus behavior described above. Set a useful `label`, or provide `aria-label` / `aria-labelledby` before connection. The mandatory Validate CI workflow runs the headless Chromium interaction suite, including gallery and standalone component checks. This automated browser coverage is not a substitute for a dedicated screen-reader audit.

## 🎯 Mechanical behavior

| Action | Result |
|---|---|
| Select colour | The swatch and hex readout update and events are emitted. |

## ⚠️ Implementation notes and limits

- Color parsing and chooser presentation are delegated to the browser.
- The chooser UI is browser and operating-system dependent.
