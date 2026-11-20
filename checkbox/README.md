# Checkbox

A single checkbox with a physical-style lamp and a recessed mechanical button. It exposes a boolean checked state and participates in forms.

## 📦 Bundle and elements

- **Bundle:** `checkbox/checkbox.js`, approximately 23 KB.
- **Custom elements:** `<pinball-checkbox>`.
- **Dependencies:** no external runtime packages. The bundle embeds the lightweight helper and component implementation; it does not include WebGL or audio.

## 🚀 Quick start

Load the standalone script and add the element to your HTML:

```html
<script src="checkbox.js"></script>\n<pinball-checkbox id="el" label="Email updates" name="updates" value="email"></pinball-checkbox>
```

Listen to the documented events and read the current properties:

```js
const checkbox = document.querySelector('pinball-checkbox');\ncheckbox.addEventListener('change', e => savePreference(e.detail.checked));\ncheckbox.checked = true; // Programmatic updates are silent.
```

The component bundle is a plain script, not an ES module. It embeds the lightweight helper and this control; it has no external runtime dependencies.

## 🧩 API reference

### Attributes

| Attribute | Type | Default | Applies to / update behavior |
|---|---|---|---|
| checked | Boolean | Absent (false) | Observed | Presence means checked. |
| label | String | Checkbox | Observed | Accessible name for the internal checkbox button. |
| name | String | Omitted | Form configuration | Form field name. |
| value | String | on | Form configuration | Submitted while checked. |
| disabled | Boolean | Absent | Observed by shared base | Makes the host inert. |

The checked, label, value and disabled attributes are reflected or read as described. Set name before connecting the element to a form.

### Properties

| Property | Type | Access | Details |
|---|---|---|---|
| checked | boolean | Read/write | Current checked state. |
| value | string | Read-only | Submitted value, defaulting to on. |

### Methods

| Method | Details |
|---|---|
| setChecked(value, user = false) | Set checked state. Pass user=true to emit a change event; the default is a silent programmatic update. |

### Events

| Event | Payload and trigger |
|---|---|
| change | CustomEvent, { checked: boolean, value: string } Fires for a user click or activation. |

The shared event helper dispatches custom events with `bubbles: true` and `composed: true`, so listeners can be attached to the custom element or an ancestor outside its Shadow DOM. Event names and payloads above describe this component's actual implementation.

## 🎮 Input and keyboard

**Pointer and touch:** Activate the internal checkbox button by pointer, touch, or keyboard.

**Keyboard:** The internal native button uses role=checkbox. Space and Enter toggle the value.

## 📝 Form integration

Form-associated. With name set, submits value (default on) while checked and no value while unchecked. ElementInternals support is required.

## 🎨 Styling, rendering, and sound

The component sits in the shared Pinball UI metal deck with brushed-steel edges, four recessed fasteners, a component-specific backglass emblem, three pilot lamps, a chrome ball marker and a dark inset playfield. If PinballKit is already present, the marker uses the original shared chrome-ball shader; otherwise it falls back to CSS. CSS variables include --pui-ink, --pui-dim, --pui-line, --pui-amber and --pui-focus. The control uses a compact 24px indicator and flexible label.

This standalone file embeds the compact Pinmotion Extras base and this component implementation. It does not initialize or embed PinballKit, its WebGL runtime, shader source or recorded audio. Its component-specific backglass emblem and metal deck use the Pinball UI mechanical visual language. When PinballKit is already present, the backglass chrome-ball marker reuses its shared WebGL shader and user actions can reuse its sound effects. When loaded alone, the control remains self-contained and uses the CSS chrome-ball fallback.

## ♿ Motion and accessibility

Only a short CSS indicator transition is used. It respects the browser reduced-motion preference through the absence of continuous movement.

The interactive control lives in an open Shadow DOM and uses the semantic role and focus behavior described above. Set a useful `label`, or provide `aria-label` / `aria-labelledby` before connection. The repository's optional automated interaction script uses headless Chromium; it is not a substitute for a screen-reader audit.

## 🎯 Mechanical behavior

| Action | Result |
|---|---|
| Activate | The recessed indicator lights and checked state changes. |
| Submit a form | The value is included only while checked. |

## ⚠️ Implementation notes and limits

- The label is exposed as the internal button accessible name.
- Programmatic property changes do not emit user-interaction events.
- This is a single checkbox, not a multi-select list.
