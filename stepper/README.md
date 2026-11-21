# Stepper

A whole-number stepper with two flippers and a mechanical score reel. The public value updates immediately while the illustrated drums animate into place.

## 📦 Bundle and elements

- **Bundle:** `stepper/stepper.js`, approximately 779 KB.
- **Custom elements:** `<pinball-stepper>`.
- **Dependencies:** no external runtime packages. The selected bundle embeds its shared runtime, artwork, and sound data.

## 🚀 Quick start

Load the standalone script and add the element to your HTML:

```html
<script src="stepper.js"></script>
<pinball-stepper name="players" value="4" min="0" max="99" label="Players"></pinball-stepper>
```

Listen to the documented events and read the current properties:

```js
const stepper = document.querySelector('pinball-stepper');

stepper.addEventListener('input', (event) => {
  updatePreview(event.detail.value);
});

stepper.addEventListener('change', (event) => {
  savePlayers(event.detail.value);
});

stepper.increment(5); // Programmatic update; no user-interaction events.
```

The component bundle is a plain script, not an ES module. Do not split it or remove its embedded artwork/runtime data. See [the repository README](../README.md) for the shadcn registry route and local development commands.

## 🧩 API reference

### Attributes

| Attribute | Type | Default | Applies to / update behavior |
|---|---|---|---|
| value | Number | `0` | Observed after connection | Initial value; clamped to the range and snapped to the configured integer step. |
| min | Number | `0` | Observed after connection | Lower bound. Keep it non-negative because the visual score reel has no minus sign. |
| max | Number | `99` | Observed after connection | Upper bound; the effective maximum is never lower than `min`. |
| step | Integer | `1` | Observed after connection | Increment, rounded to an integer and kept at least 1. |
| digits | Integer | Automatic | Observed after connection | Force 2 to 4 drums. Otherwise the count is derived from `max`, with at least two drums and at most four. |
| label | String | `Stepper` | Observed after connection | Accessible-name fallback for the spinbutton. |
| name | String | Omitted | Form configuration | Form field name. |
| disabled | Boolean | Absent | Observed after connection | Makes the host inert and prevents interaction. |

The `value`, `min`, `max`, `step`, `digits`, `label`, and `disabled` attributes are observed after connection. Range changes re-snap the current value. Set `name` before form submission.

### Properties

| Property | Type | Access | Details |
|---|---|---|---|
| `value` | number | Read/write | Current whole-number value. |
| `min` | number | Read-only getter | Effective lower bound. |
| `max` | number | Read-only getter | Effective upper bound, not lower than `min`. |
| `stepSize` | number | Read-only getter | Effective integer step, at least 1. |
| `digitCount` | number | Read-only getter | Current number of score-reel drums, from 2 to 4. |

### Methods

| Method | Details |
|---|---|
| `increment(n = 1)` | Increase by `n` configured steps. Programmatic calls do not emit `input` or `change`. |
| `decrement(n = 1)` | Decrease by `n` configured steps. Programmatic calls do not emit `input` or `change`. |

### Events

| Event | Payload and trigger |
|---|---|
| `input` | CustomEvent, `detail: { value: number }` Fires when a user interaction changes the value, including each auto-repeat step while a flipper is held. |
| `change` | CustomEvent, `detail: { value: number }` Fires for each user-initiated step that changes the value, including hold-to-repeat. |

The shared event helper dispatches custom events with `bubbles: true` and `composed: true`, so listeners can be attached to the custom element or an ancestor outside its Shadow DOM. Event names and payloads above describe this component's actual implementation.

## 🎮 Input and keyboard

**Pointer and touch:** Press a plus/minus flipper, hold it for repeated steps, or drag the score reels vertically. Flipper presses focus the spinbutton control.

**Keyboard:** The focusable internal control has `role="spinbutton"`. Arrow Right/Up and `+`/`=` increase; Arrow Left/Down and `-`/`_` decrease. Page Up/Down move by roughly one tenth of the configured range (at least one step); Home/End go to the bounds. Holding an increment/decrement key repeats.

## 📝 Form integration

The control is form-associated. With `name` set, it submits the current whole number as a string. Form-associated custom elements require browser support for `ElementInternals`.

## 🎨 Styling, rendering, and sound

Set `--pb-size` to change height (52px by default); the housing keeps its fixed aspect ratio. Set `--pb-page` to a six-digit hex page colour and `--pb-focus` to change the visible focus outline.

The shared chrome ball and lamps use WebGL. Set the instance's `silent` attribute to mute that element, or set `PinballKit.sound = false` to mute the shared page audio. Audio initializes after the first pointer or keyboard interaction, as browsers require.

## ♿ Motion and accessibility

The shared runtime honours `prefers-reduced-motion`; the drums and flippers snap to their final state while the value remains available.

The interactive control lives in an open Shadow DOM and uses the semantic role and focus behavior described above. Set a useful `label`, or provide `aria-label` / `aria-labelledby` before connection. The mandatory Validate CI workflow runs the headless Chromium interaction suite, including gallery and standalone component checks. This automated browser coverage is not a substitute for a dedicated screen-reader audit.

## 🎯 Mechanical behavior

| Action | Result |
|---|---|
| Press a flipper | The value steps once, the flipper snaps up, and the score drums roll. |
| Hold a flipper or direction key | The control repeats the configured step and emits user events for each changed value. |
| Cross a decimal place | The higher drum follows after a short mechanical carry delay. |
| Reach a bound | The value does not change; the control produces a mechanical stop response. |

## ⚠️ Implementation notes and limits

- The default range is 0 through 99. Keep `min` non-negative because the visual drum renderer has no minus sign.
- The configured `step` is rounded to a whole number and cannot be less than 1. `digits` affects the number of displayed drums, not the value range.
- The visual score reel has no minus sign. Use a non-negative `min` even though the numeric range attributes accept numbers.
- The drum display supports at most four places.
- **It needs WebGL** for the ball and the lamps. Without it the control is still a working, focusable control, but the shader-drawn visuals are missing.
- **One kind of picture.** It scales with `--pb-size` and stays sharp to about three times its default size, but it does not reflow: the photographed body keeps its shape.
- **The ball mirrors the page.** Set `--pb-page` to a six-digit hex colour such as `#14161a` so its reflections match; the default is the cream the set was shot on.
- **The file is large** because photographs and sounds are embedded. Load only the controls a page uses.
- **Browser coverage.** The mandatory Validate CI workflow runs the headless Chromium interaction suite with touch and keyboard input at a mobile-width viewport. Safari, Firefox, physical devices, and screen-reader behavior are not documented as tested.
