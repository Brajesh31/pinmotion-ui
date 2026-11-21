# Toggle

A binary switch whose thumb is a live chrome ball. The checked state is logical state; the ball and lamp animate toward that state.

## 📦 Bundle and elements

- **Bundle:** `toggle/toggle.js`, approximately 848 KB.
- **Custom elements:** `<pinball-toggle>`.
- **Dependencies:** no external runtime packages. The selected bundle embeds its shared runtime, artwork, and sound data.

## 🚀 Quick start

Load the standalone script and add the element to your HTML:

```html
<script src="toggle.js"></script>
<pinball-toggle name="notifications" value="yes" label="Push alerts"></pinball-toggle>
```

Listen to the documented events and read the current properties:

```js
const toggle = document.querySelector('pinball-toggle');

toggle.addEventListener('change', (event) => {
  console.log('Checked:', event.detail.checked);
});

toggle.checked = true; // Updates state without dispatching change or input.
```

The component bundle is a plain script, not an ES module. Do not split it or remove its embedded artwork/runtime data. See [the repository README](../README.md) for the shadcn registry route and local development commands.

## 🧩 API reference

### Attributes

| Attribute | Type | Default | Applies to / update behavior |
|---|---|---|---|
| checked | Boolean | Absent (off) | Observed after connection | Presence means on; removing it means off. |
| disabled | Boolean | Absent | Observed after connection | Makes the host inert and prevents interaction. |
| mode | String enum | `live` | Observed after connection | `live`, `plates`, or `3d`. The latter two are alternate rendering modes, not separate controls. |
| label | String | `Toggle` | Read on connection | Accessible-name fallback when `aria-label` and `aria-labelledby` are not supplied. It is not observed for later changes. |
| name | String | Omitted | Form configuration | Form field name. Set it before using the control in a form. |
| value | String | `on` | Form configuration | Submitted while checked. An empty string also falls back to `on` in the current implementation. |

Only `checked`, `disabled`, and `mode` are observed after the element connects. Set `label`, `name`, and `value` before connection. The `checked` property and attribute stay synchronized.

### Properties

| Property | Type | Access | Details |
|---|---|---|---|
| `checked` | boolean | Read/write | Current logical switch value. |

### Methods

| Method | Details |
|---|---|
| `toggle()` | Flip the logical checked state programmatically. It does not emit user-interaction events. |

### Events

| Event | Payload and trigger |
|---|---|
| `change` | CustomEvent, `detail: { checked: boolean }` Fires for user activation, including a drag that resolves to a new checked state. It does not fire for programmatic state changes. |
| `input` | Plain `Event`; **no `detail` payload** Fires immediately after `change` for the same user toggle. Read `event.target.checked` or use the `change` payload. |

The shared event helper dispatches custom events with `bubbles: true` and `composed: true`, so listeners can be attached to the custom element or an ancestor outside its Shadow DOM. Event names and payloads above describe this component's actual implementation.

## 🎮 Input and keyboard

**Pointer and touch:** Tap or click the switch button, or drag the ball along the lane and release. A drag resolves to the nearest end and commits the checked state.

**Keyboard:** The internal control is a native button with `role="switch"` and `aria-checked`. Space and Enter activate it.

## 📝 Form integration

The control is form-associated. With `name` set, it submits no value while off. While on, it submits the `value` attribute, or `on` when that attribute is absent or empty. Form-associated custom elements require browser support for `ElementInternals`.

## 🎨 Styling, rendering, and sound

Set `--pb-size` to change the control height (36px by default). Set `--pb-page` to a six-digit hex colour matching the page background so the chrome reflections blend into the page. `--pb-focus` changes the visible keyboard-focus outline.

The shared chrome ball and lamps use WebGL. Set the instance's `silent` attribute to mute that element, or set `PinballKit.sound = false` to mute the shared page audio. Audio initializes after the first pointer or keyboard interaction, as browsers require.

## ♿ Motion and accessibility

The shared runtime honours `prefers-reduced-motion` by moving the ball directly to the final state. The lamp still reflects the checked state.

The interactive control lives in an open Shadow DOM and uses the semantic role and focus behavior described above. Set a useful `label`, or provide `aria-label` / `aria-labelledby` before connection. The mandatory Validate CI workflow runs the headless Chromium interaction suite, including gallery and standalone component checks. This automated browser coverage is not a substitute for a dedicated screen-reader audit.

## 🎯 Mechanical behavior

| Action | Result |
|---|---|
| Activate | The ball is kicked toward the selected end; the lamp and sound feedback follow the ball. |
| Drag and release | The ball carries its release momentum, then settles at the nearest end. |
| Disable | The custom element becomes inert and visually muted. |

## ⚠️ Implementation notes and limits

- The visual `mode` attribute switches rendering style only. Do not use it as application state.
- Programmatic `.checked` changes and `toggle()` update the form value and rendering but deliberately do not emit `change` or `input`.
- The `input` event is not a `CustomEvent` and has no `detail`; use `change.detail.checked` when you need a payload.
- The `label` attribute is read on connection rather than observed live. Set it before the element is inserted, or provide `aria-label` / `aria-labelledby`.
- **It needs WebGL** for the ball and the lamps. Without it the control is still a working, focusable control, but the shader-drawn visuals are missing.
- **One kind of picture.** It scales with `--pb-size` and stays sharp to about three times its default size, but it does not reflow: the photographed body keeps its shape.
- **The ball mirrors the page.** Set `--pb-page` to a six-digit hex colour such as `#14161a` so its reflections match; the default is the cream the set was shot on.
- **The file is large** because photographs and sounds are embedded. Load only the controls a page uses.
- **Browser coverage.** The mandatory Validate CI workflow runs the headless Chromium interaction suite with touch and keyboard input at a mobile-width viewport. Safari, Firefox, physical devices, and screen-reader behavior are not documented as tested.
