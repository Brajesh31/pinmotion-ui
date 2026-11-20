# Drain

A delete action with a timed undo window. The ball drains to represent deletion; the SHOOT AGAIN control restores it before the countdown expires.

## 📦 Bundle and elements

- **Bundle:** `drain/drain.js`, approximately 888 KB.
- **Custom elements:** `<pinball-drain>`.
- **Dependencies:** no external runtime packages. The selected bundle embeds its shared runtime, artwork, and sound data.

## 🚀 Quick start

Load the standalone script and add the element to your HTML:

```html
<script src="drain.js"></script>
<pinball-drain window="6000" label="Delete draft"></pinball-drain>
```

Listen to the documented events and read the current properties:

```js
const drain = document.querySelector('pinball-drain');

drain.addEventListener('delete', (event) => {
  hideDraft({ undoMs: event.detail.undoMs });
});

drain.addEventListener('undo', () => showDraft());
drain.addEventListener('commit', () => destroyDraft());

drain.addEventListener('reset', () => prepareNextDraft());
```

The component bundle is a plain script, not an ES module. Do not split it or remove its embedded artwork/runtime data. See [the repository README](../README.md) for the shadcn registry route and local development commands.

## 🧩 API reference

### Attributes

| Attribute | Type | Default | Applies to / update behavior |
|---|---|---|---|
| window | Number (milliseconds) | `6000` | Observed after connection | Undo duration, read when a delete starts. A value of 0 makes deletion final immediately. Invalid or negative values fall back to 6000ms. |
| label | String | `Delete and undo` | Observed after connection | Accessible name for the control group. |
| disabled | Boolean | Absent | Observed after connection | Makes the host inert and prevents interaction. |

The `window`, `label`, and `disabled` attributes are observed after connection. Set `window` before triggering a delete; changing it during an active countdown does not rewrite the timer already started.

### Properties

| Property | Type | Access | Details |
|---|---|---|---|
| `state` | string | Read-only by convention | Current lifecycle state: `ready`, `draining`, `undoable`, `saving`, or `gone`. |
| `undoWindow` | number | Read-only getter | Effective undo duration in milliseconds. |
| `remaining` | number | Read-only getter | Remaining milliseconds while state is `undoable`; otherwise 0. |

### Methods

| Method | Details |
|---|---|
| `delete(user = false, initialVel = 180)` | Begin deletion when the control is ready. Use the UI for normal interaction; passing `true` as the first argument emits the `delete` event. |
| `undo(user = false)` | Restore while state is `draining` or `undoable`. Passing `true` emits `undo`. |
| `reset(user = false)` | Serve a fresh ball and return to `ready`. Passing `true` emits `reset`. |

### Events

| Event | Payload and trigger |
|---|---|
| `delete` | CustomEvent, `detail: { undoMs: number }` Fires when a user starts deletion, before the ball finishes draining. |
| `undo` | CustomEvent, empty detail object Fires when a user restores the item using SHOOT AGAIN. |
| `commit` | CustomEvent, empty detail object Fires when the undo window expires. With `window="0"`, it fires immediately after deletion. |
| `reset` | CustomEvent, empty detail object Only emitted when `reset(true)` is called. The normal `reset()` programmatic call is silent. |

The shared event helper dispatches custom events with `bubbles: true` and `composed: true`, so listeners can be attached to the custom element or an ancestor outside its Shadow DOM. Event names and payloads above describe this component's actual implementation.

## 🎮 Input and keyboard

**Pointer and touch:** Click the ball/chute or drag the ball downward. SHOOT AGAIN restores the item while the state is `draining` or `undoable`.

**Keyboard:** The chute and SHOOT AGAIN are native buttons and support normal button activation (Enter/Space). Delete and Backspace on the chute also begin deletion. SHOOT AGAIN is exposed with `aria-disabled` when undo is unavailable; its handler also checks lifecycle state.

## 📝 Form integration

The drain is an action control and does not expose a form value.

## 🎨 Styling, rendering, and sound

Set `--pb-size` to change the plate height (112px by default). Set `--pb-page` to a six-digit hex page colour and `--pb-focus` to change the visible focus outline.

The shared chrome ball and lamps use WebGL. Set the instance's `silent` attribute to mute that element, or set `PinballKit.sound = false` to mute the shared page audio. Audio initializes after the first pointer or keyboard interaction, as browsers require.

## ♿ Motion and accessibility

The shared runtime honours `prefers-reduced-motion`; the ball moves directly to its state destination, while the undo countdown and lifecycle continue.

The interactive control lives in an open Shadow DOM and uses the semantic role and focus behavior described above. Set a useful `label`, or provide `aria-label` / `aria-labelledby` before connection. The repository's optional automated interaction script uses headless Chromium; it is not a substitute for a screen-reader audit.

## 🎯 Mechanical behavior

| Action | Result |
|---|---|
| Delete | The ball rolls down the chute; state becomes `draining` and `delete` fires. |
| Undo is available | The state becomes `undoable` and the SHOOT AGAIN lamp blinks while time remains. |
| Undo | The ball is kicked back; `undo` fires. |
| Timer expires | `commit` fires and state becomes `gone`. |

## ⚠️ Implementation notes and limits

- The `delete` event occurs at the start of the drain animation. Treat it as the beginning of the undo window, not as proof that the commit has happened.
- After `commit`, the component remains in `gone` until `reset()` is called. The demo page resets it automatically for demonstration purposes.
- After `commit`, the component stays empty until your application calls `reset()`.
- A `window` of 0 removes the undo opportunity and emits `commit` immediately after deletion.
- **It needs WebGL** for the ball and the lamps. Without it the control is still a working, focusable control, but the shader-drawn visuals are missing.
- **One kind of picture.** It scales with `--pb-size` and stays sharp to about three times its default size, but it does not reflow: the photographed body keeps its shape.
- **The ball mirrors the page.** Set `--pb-page` to a six-digit hex colour such as `#14161a` so its reflections match; the default is the cream the set was shot on.
- **The file is large** because photographs and sounds are embedded. Load only the controls a page uses.
- **Browser coverage.** The repository includes an optional headless Chromium interaction script with touch and keyboard input at a mobile-width viewport. The regular CI workflow does not run it. Safari, Firefox, physical devices, and screen-reader behavior are not documented as tested.
