# Plunger

A pull-to-send action control built as a pinball shooter rod. A full pull followed by release sends the ball and emits `send`; a short pull springs back without sending.

## 📦 Bundle and elements

- **Bundle:** `plunger/plunger.js`, approximately 432 KB.
- **Custom elements:** `<pinball-plunger>`.
- **Dependencies:** no external runtime packages. The selected bundle embeds its shared runtime, artwork, and sound data.

## 🚀 Quick start

Load the standalone script and add the element to your HTML:

```html
<script src="plunger.js"></script>
<pinball-plunger label="Send"></pinball-plunger>
```

Listen to the documented events and read the current properties:

```js
const plunger = document.querySelector('pinball-plunger');

plunger.addEventListener('send', (event) => {
  sendMessage({ power: event.detail.power });
});

plunger.fire(); // Programmatically perform a full pull and release.
```

The component bundle is a plain script, not an ES module. Do not split it or remove its embedded artwork/runtime data. See [the repository README](../README.md) for the shadcn registry route and local development commands.

## 🧩 API reference

### Attributes

| Attribute | Type | Default | Applies to / update behavior |
|---|---|---|---|
| label | String | `Send` | Observed after connection | Accessible-name fallback for the internal button. |
| flip | Boolean | Absent | Observed after connection | Reverses the plunger orientation so the knob is on the left. |
| disabled | Boolean | Absent | Observed after connection | Makes the host inert and prevents interaction. |

The `label`, `flip`, and `disabled` attributes are observed after connection. Changing `flip` reverses the control orientation.

### Properties

| Property | Type | Access | Details |
|---|---|---|---|
| `flipped` | boolean | Read-only getter | Whether the `flip` attribute is present. |

### Methods

| Method | Details |
|---|---|
| `fire()` | Start a programmatic full pull. The plunger completes the pull/release sequence and emits `send` when the ball is struck. |

### Events

| Event | Payload and trigger |
|---|---|
| `send` | CustomEvent, `detail: { power: number }` Fires when the full pull/release sequence strikes the ball. `power` is normalized from 0 to 1. |

The shared event helper dispatches custom events with `bubbles: true` and `composed: true`, so listeners can be attached to the custom element or an ancestor outside its Shadow DOM. Event names and payloads above describe this component's actual implementation.

## 🎮 Input and keyboard

**Pointer and touch:** Drag the knob back and release it after the ball has dropped in front of the tip. A pointer tap only twitches the knob; it is not a send action. A release before the full pull does not emit `send`.

**Keyboard:** The internal control is a native button. Hold Space or Enter to pull it back; release the key to shoot. A synthetic button activation, such as an assistive-technology click, invokes a full `fire()` sequence.

## 📝 Form integration

The plunger is an action control and does not expose a form value.

## 🎨 Styling, rendering, and sound

Set `--pb-size` to change the knob height (44px by default). Leave roughly one knob-height of space on the pull side and room on the tip side for the ball to travel. Set `--pb-focus` to change the visible focus outline.

The shared chrome ball and lamps use WebGL. Set the instance's `silent` attribute to mute that element, or set `PinballKit.sound = false` to mute the shared page audio. Audio initializes after the first pointer or keyboard interaction, as browsers require.

## ♿ Motion and accessibility

The Plunger honours `prefers-reduced-motion` through the shared runtime. Reduced-motion mode skips the spring, drop, bounce and ball-travel animations while preserving the full-pull action and `send` event.

The interactive control lives in an open Shadow DOM and uses the semantic role and focus behavior described above. Set a useful `label`, or provide `aria-label` / `aria-labelledby` before connection. The repository's optional automated interaction script uses headless Chromium; it is not a substitute for a screen-reader audit.

## 🎯 Mechanical behavior

| Action | Result |
|---|---|
| Pull the knob | The spring compresses and the rod ratchets as the pull increases. |
| Reach full pull | A ball drops in front of the tip and bounces before the release. |
| Release at full pull | The plunger strikes the ball and emits `send` with normalized `power`. |
| Release early | The spring returns home; no `send` event is emitted. |

## ⚠️ Implementation notes and limits

- The ball travels across the page above surrounding content before it is removed. Allow sufficient open space around the control.
- The public convenience method documented for application use is `fire()`; `send` is the completion event.
- In reduced-motion mode the pull, drop, bounce and ball-travel visuals are skipped; the action and `send` event remain available.
- The travelling ball is drawn above page content and crosses the page before it disappears.
- **It needs WebGL** for the ball and the lamps. Without it the control is still a working, focusable control, but the shader-drawn visuals are missing.
- **One kind of picture.** It scales with `--pb-size` and stays sharp to about three times its default size, but it does not reflow: the photographed body keeps its shape.
- **The ball mirrors the page.** Set `--pb-page` to a six-digit hex colour such as `#14161a` so its reflections match; the default is the cream the set was shot on.
- **The file is large** because photographs and sounds are embedded. Load only the controls a page uses.
- **Browser coverage.** The repository includes an optional headless Chromium interaction script with touch and keyboard input at a mobile-width viewport. The regular CI workflow does not run it. Safari, Firefox, physical devices, and screen-reader behavior are not documented as tested.
