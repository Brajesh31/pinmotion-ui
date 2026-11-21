# Drop targets

A checkbox group with up to four custom-labeled drop targets. The checked state is logical form state; the target artwork animates as the ball knocks each target down.

## 📦 Bundle and elements

- **Bundle:** `targets/targets.js`, approximately 838 KB.
- **Custom elements:** `<pinball-targets>`.
- **Dependencies:** no external runtime packages. The selected bundle embeds its shared runtime, artwork, and sound data.

## 🚀 Quick start

Load the standalone script and add the element to your HTML:

```html
<script src="targets.js"></script>
<pinball-targets name="channels" items="EMAIL,PUSH,TEXT,CALLS" checked="0,2" label="Notification channels"></pinball-targets>
```

Listen to the documented events and read the current properties:

```js
const targets = document.querySelector('pinball-targets');

targets.addEventListener('change', (event) => {
  console.log(event.detail.item, event.detail.checked, event.detail.selected);
});

targets.addEventListener('bonus', (event) => {
  celebrate(event.detail.selected);
});

targets.setChecked(1, true); // Programmatic by default: no change event.
```

The component bundle is a plain script, not an ES module. Do not split it or remove its embedded artwork/runtime data. See [the repository README](../README.md) for the shadcn registry route and local development commands.

## 🧩 API reference

### Attributes

| Attribute | Type | Default | Applies to / update behavior |
|---|---|---|---|
| items | Comma-separated strings | `EMAIL,PUSH,TEXT,CALLS` | Observed after connection | Target labels. Empty entries are removed; at most four labels are used. If no usable labels remain, the default list is restored. |
| checked | Comma-separated indexes or labels | None | Observed after connection | Initial checked set. Indexes are zero-based (0 to 3); label matching is case-insensitive. |
| label | String | `Bonus targets` | Observed after connection | Accessible name for the checkbox group. |
| name | String | Omitted | Form configuration | Form field name. |
| disabled | Boolean | Absent | Observed after connection | Makes the host inert and prevents interaction. |

The `items`, `checked`, `label`, and `disabled` attributes are observed after connection. Changing `items` rebuilds the visible button labels; changing `checked` updates logical state. Set `name` before form submission.

### Properties

| Property | Type | Access | Details |
|---|---|---|---|
| `checked` | boolean[] | Read/write | Array of checked states, in the current item order. Assigning a non-array is ignored. |
| `selected` | string[] | Read-only getter | Labels for currently checked items, in item order. |

### Methods

| Method | Details |
|---|---|
| `toggle(index, user = false)` | Invert one item. Pass `user: true` to emit the user-style `change` event. |
| `setChecked(index, checked, user = false)` | Set one item. The default programmatic call is silent. |
| `resetAll(user = false)` | Clear all checked items. With `user: true`, emits one summary `change` event using `index: -1` and `item: null. |

### Events

| Event | Payload and trigger |
|---|---|
| `change` | CustomEvent, `detail: { index, item, checked, selected, allChecked }` Fires for a user toggle. `selected` is a snapshot of checked labels after the update. `resetAll(true)` emits a summary event with index -1. |
| `bonus` | CustomEvent, `detail: { selected: string[] }` Fires when the final target impact completes the cleared bank in normal-motion mode. It is tied to the impact animation. |

The shared event helper dispatches custom events with `bubbles: true` and `composed: true`, so listeners can be attached to the custom element or an ancestor outside its Shadow DOM. Event names and payloads above describe this component's actual implementation.

## 🎮 Input and keyboard

**Pointer and touch:** Activate a target to check or uncheck it. The `checked` property updates immediately; the target drop animation follows.

**Keyboard:** Each target is a native button with `role="checkbox"`. Space and Enter activate the focused target. Arrow Left/Right move focus between targets and wrap at either end.

## 📝 Form integration

The control is form-associated. With `name` set, it submits the checked labels joined by commas (for example `EMAIL,PUSH`). Form-associated custom elements require browser support for `ElementInternals`.

## 🎨 Styling, rendering, and sound

Set `--pb-size` to change the bank height (84px by default). The bank has four photographed slots and retains its aspect ratio. Set `--pb-page` to a six-digit hex page colour and `--pb-focus` to change the visible focus outline.

The shared chrome ball and lamps use WebGL. Set the instance's `silent` attribute to mute that element, or set `PinballKit.sound = false` to mute the shared page audio. Audio initializes after the first pointer or keyboard interaction, as browsers require.

## ♿ Motion and accessibility

The shared runtime honours `prefers-reduced-motion` by snapping targets and lamps to their final visual state. In this mode the normal impact callback is skipped, so the `bonus` event is currently not emitted; use `change` and `allChecked` for application logic.

The interactive control lives in an open Shadow DOM and uses the semantic role and focus behavior described above. Set a useful `label`, or provide `aria-label` / `aria-labelledby` before connection. The mandatory Validate CI workflow runs the headless Chromium interaction suite, including gallery and standalone component checks. This automated browser coverage is not a substitute for a dedicated screen-reader audit.

## 🎯 Mechanical behavior

| Action | Result |
|---|---|
| Check a target | A ball rolls in, knocks the target down, and lights its lamp. |
| Uncheck a target | The reset solenoid raises the target and turns its lamp off. |
| Complete the bank | The final impact emits `bonus` in normal-motion mode. |

## ⚠️ Implementation notes and limits

- The `bonus` event is associated with the target impact animation. Do not make business logic depend on it when reduced motion is enabled; `change.detail.allChecked` is the reliable state signal.
- The group has a maximum of four labels. Keep labels short; the photographed target face has limited space.
- Four targets maximum. Labels are printed inside the photographed target faces; short labels work best.
- In reduced-motion mode, `bonus` is not emitted by the current implementation.
- **It needs WebGL** for the ball and the lamps. Without it the control is still a working, focusable control, but the shader-drawn visuals are missing.
- **One kind of picture.** It scales with `--pb-size` and stays sharp to about three times its default size, but it does not reflow: the photographed body keeps its shape.
- **The ball mirrors the page.** Set `--pb-page` to a six-digit hex colour such as `#14161a` so its reflections match; the default is the cream the set was shot on.
- **The file is large** because photographs and sounds are embedded. Load only the controls a page uses.
- **Browser coverage.** The mandatory Validate CI workflow runs the headless Chromium interaction suite with touch and keyboard input at a mobile-width viewport. Safari, Firefox, physical devices, and screen-reader behavior are not documented as tested.
