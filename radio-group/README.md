# Radio Group

A single-choice group rendered as a row of mechanical radio selectors. The selected value is reflected in the component property and optional form value.

## 📦 Bundle and elements

- **Bundle:** `radio-group/radio-group.js`, approximately 24 KB.
- **Custom elements:** `<pinball-radio-group>`.
- **Dependencies:** no external runtime packages. The bundle embeds the lightweight helper and component implementation; it does not include WebGL or audio.

## 🚀 Quick start

Load the standalone script and add the element to your HTML:

```html
<script src="radio-group.js"></script>\n<pinball-radio-group id="el" name="plan" options="standard:Standard;pro:Pro;team:Team" value="pro" label="Plan"></pinball-radio-group>
```

Listen to the documented events and read the current properties:

```js
const plans = document.querySelector('pinball-radio-group');\nplans.addEventListener('change', e => savePlan(e.detail.value));\nplans.value = 'team';
```

The component bundle is a plain script, not an ES module. It embeds the lightweight helper and this control; it has no external runtime dependencies.

## 🧩 API reference

### Attributes

| Attribute | Type | Default | Applies to / update behavior |
|---|---|---|---|
| options | Semicolon-separated value:label pairs | standard:Standard;pro:Pro;team:Team | Observed | Defines the radio options. |
| value | String | First option | Observed | Initial or current selected value. |
| label | String | Choose one | Observed | Accessible name for the radiogroup. |
| name | String | Omitted | Form configuration | Form field name. |
| disabled | Boolean | Absent | Observed by shared base | Makes the host inert. |

Changing options rebuilds the group and keeps the existing value only when it remains available. The value and label attributes update after connection.

### Properties

| Property | Type | Access | Details |
|---|---|---|---|
| value | string | Read/write | Selected option value. |

### Methods

| Method | Details |
|---|---|
| select(value, user = false) | Select a known option. Pass user=true to emit change. |

### Events

| Event | Payload and trigger |
|---|---|
| change | CustomEvent, { value: string } Fires when a user selects a different option. |

The shared event helper dispatches custom events with `bubbles: true` and `composed: true`, so listeners can be attached to the custom element or an ancestor outside its Shadow DOM. Event names and payloads above describe this component's actual implementation.

## 🎮 Input and keyboard

**Pointer and touch:** Select any option button. The currently selected value is shown by the illuminated centre dot.

**Keyboard:** Arrow Right/Down and Arrow Left/Up move cyclically and select the next option. Home and End select the first and last options.

## 📝 Form integration

Form-associated. With name set, submits the selected value as a string. ElementInternals support is required.

## 🎨 Styling, rendering, and sound

The component sits in the shared Pinball UI metal deck with brushed-steel edges, four recessed fasteners, a component-specific backglass emblem, three pilot lamps, a chrome ball marker and a dark inset playfield. If PinballKit is already present, the marker uses the original shared chrome-ball shader; otherwise it falls back to CSS. Use the shared --pui-* colour variables to tune the cream panel, amber selection state and focus ring.

This standalone file embeds the compact Pinmotion Extras base and this component implementation. It does not initialize or embed PinballKit, its WebGL runtime, shader source or recorded audio. Its component-specific backglass emblem and metal deck use the Pinball UI mechanical visual language. When PinballKit is already present, the backglass chrome-ball marker reuses its shared WebGL shader and user actions can reuse its sound effects. When loaded alone, the control remains self-contained and uses the CSS chrome-ball fallback.

## ♿ Motion and accessibility

The component uses native browser controls and CSS transitions. No continuous scripted physics or automatic motion is required.

The interactive control lives in an open Shadow DOM and uses the semantic role and focus behavior described above. Set a useful `label`, or provide `aria-label` / `aria-labelledby` before connection. The repository's optional automated interaction script uses headless Chromium; it is not a substitute for a screen-reader audit.

## 🎯 Mechanical behavior

| Action | Result |
|---|---|
| Select an option | Its radio lamp lights and the change event carries its value. |

## ⚠️ Implementation notes and limits

- Options use the format value:Label separated by semicolons.
- The group selects one option at a time.
- Option values should be unique and non-empty.
