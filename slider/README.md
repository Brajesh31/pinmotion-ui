# Slider

A numeric range control with a rolling chrome-ball thumb and ten fixed lamps. The numeric value changes immediately; the ball animates toward the corresponding position.

## 📦 Bundle and elements

- **Bundle:** `slider/slider.js`, approximately 607 KB.
- **Custom elements:** `<pinball-slider>`.
- **Dependencies:** no external runtime packages. The selected bundle embeds its shared runtime, artwork, and sound data.

## 🚀 Quick start

Load the standalone script and add the element to your HTML:

```html
<script src="slider.js"></script>
<pinball-slider name="volume" min="0" max="100" step="1" value="40" label="Volume"></pinball-slider>
```

Listen to the documented events and read the current properties:

```js
const slider = document.querySelector('pinball-slider');

slider.addEventListener('input', (event) => {
  updatePreview(event.detail.value);
});

slider.addEventListener('change', (event) => {
  saveSetting(event.detail.value);
});

slider.value = 80; // Programmatic update, without input or change events.
```

The component bundle is a plain script, not an ES module. Do not split it or remove its embedded artwork/runtime data. See [the repository README](../README.md) for the shadcn registry route and local development commands.

## 🧩 API reference

### Attributes

| Attribute | Type | Default | Applies to / update behavior |
|---|---|---|---|
| value | Number | `0` | Observed after connection | Initial numeric value; clamped to the configured range and snapped to the step grid. |
| min | Number | `0` | Observed after connection | Lower bound. |
| max | Number | `100` | Observed after connection | Upper bound. The effective maximum is never lower than `min`. |
| step | Number | `1` | Observed after connection | Value increment. Use a positive step. |
| disabled | Boolean | Absent | Observed after connection | Makes the host inert and prevents interaction. |
| label | String | `Slider` | Read on connection | Accessible-name fallback. It is not observed for later changes. |
| name | String | Omitted | Form configuration | Form field name. Set it before form submission. |

The `value`, `min`, `max`, `step`, and `disabled` attributes are observed after connection. Changing the range attributes re-snaps the current value and updates slider ARIA values. Set `label` and `name` before connection.

### Properties

| Property | Type | Access | Details |
|---|---|---|---|
| `value` | number | Read/write | Current numeric value. |
| `min` | number | Read-only getter | Effective lower bound from the `min` attribute. |
| `max` | number | Read-only getter | Effective upper bound, not lower than `min`. |
| `stepSize` | number | Read-only getter | Effective increment from the `step` attribute. |

### Methods

No additional public methods are documented.

### Events

| Event | Payload and trigger |
|---|---|
| `input` | CustomEvent, `detail: { value: number }` Fires each time a user pointer or keyboard interaction changes the numeric value. |
| `change` | CustomEvent, `detail: { value: number }` Fires after a changed pointer drag ends, or immediately after a keyboard adjustment changes the value. |

The shared event helper dispatches custom events with `bubbles: true` and `composed: true`, so listeners can be attached to the custom element or an ancestor outside its Shadow DOM. Event names and payloads above describe this component's actual implementation.

## 🎮 Input and keyboard

**Pointer and touch:** Press anywhere on the track to move the thumb there, or drag the ball. The numeric value updates as the thumb moves.

**Keyboard:** The focusable internal slider has `role="slider"`. Arrow Right/Up increase by `step`; Arrow Left/Down decrease by `step`; Page Up/Down move by one tenth of the range (at least one step); Home and End go to the bounds.

## 📝 Form integration

The control is form-associated. With `name` set, it submits the current number as a string. Form-associated custom elements require browser support for `ElementInternals`.

## 🎨 Styling, rendering, and sound

Set `--pb-size` to change height (36px by default); width follows the photographed track's fixed aspect ratio. Set `--pb-page` to a six-digit hex page colour and `--pb-focus` to change the visible focus outline.

The shared chrome ball and lamps use WebGL. Set the instance's `silent` attribute to mute that element, or set `PinballKit.sound = false` to mute the shared page audio. Audio initializes after the first pointer or keyboard interaction, as browsers require.

## ♿ Motion and accessibility

The shared runtime honours `prefers-reduced-motion`; the thumb snaps to the final value while the value and lamp state remain available.

The interactive control lives in an open Shadow DOM and uses the semantic role and focus behavior described above. Set a useful `label`, or provide `aria-label` / `aria-labelledby` before connection. The mandatory Validate CI workflow runs the headless Chromium interaction suite, including gallery and standalone component checks. This automated browser coverage is not a substitute for a dedicated screen-reader audit.

## 🎯 Mechanical behavior

| Action | Result |
|---|---|
| Press the track | The numeric value changes to the pressed position and the ball rolls there. |
| Drag the ball | The value and `input` event update as the pointer moves. |
| Release the pointer | A `change` event fires if the drag changed the value. |
| Reach a lamp | The lamp lights or goes out as the ball passes it. |

## ⚠️ Implementation notes and limits

- The track always has ten lamps. They visualize fill along the range; they do not represent the configured step count.
- The value is snapped to the nearest step relative to `min`, with decimal precision rounded to six places.
- The `label` attribute is read on connection rather than observed live. Set it before the element is inserted, or provide `aria-label` / `aria-labelledby`.
- Use a positive `step`; the component does not expose a separate `step` property, only the `stepSize` getter.
- **It needs WebGL** for the ball and the lamps. Without it the control is still a working, focusable control, but the shader-drawn visuals are missing.
- **One kind of picture.** It scales with `--pb-size` and stays sharp to about three times its default size, but it does not reflow: the photographed body keeps its shape.
- **The ball mirrors the page.** Set `--pb-page` to a six-digit hex colour such as `#14161a` so its reflections match; the default is the cream the set was shot on.
- **The file is large** because photographs and sounds are embedded. Load only the controls a page uses.
- **Browser coverage.** The mandatory Validate CI workflow runs the headless Chromium interaction suite with touch and keyboard input at a mobile-width viewport. Safari, Firefox, physical devices, and screen-reader behavior are not documented as tested.
