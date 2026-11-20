# 🧩 Component reference

This page summarizes the current component contracts. The per-component README remains the detailed usage guide and should be checked before relying on an edge case.

## 1. Bundle and element inventory

| Bundle | Custom element | Control pattern | Default `--pb-size` height |
| --- | --- | --- | ---: |
| `toggle/toggle.js` | `<pinball-toggle>` | Switch | 36px |
| `slider/slider.js` | `<pinball-slider>` | Range slider | 36px |
| `plunger/plunger.js` | `<pinball-plunger>` | Pull-to-send button | 44px knob |
| `stepper/stepper.js` | `<pinball-stepper>` | Number stepper | 52px |
| `targets/targets.js` | `<pinball-targets>` | Checkbox group | 84px |
| `drain/drain.js` | `<pinball-drain>` | Delete with undo | 112px |
| `bumper/bumper.js` | `<pinball-bumper>`, `<pinball-bumpers>` | Single hit button and three-bumper cluster | 72px / 240px |

There are seven distributed JavaScript bundles and eight custom element tags. The bumper bundle provides two tags.

## 2. Public contract summary

### Toggle

- **Attributes:** `checked`, `label`, `name`, `value`, `disabled`, and `mode` (`live`, `plates`, or `3d`).
- **State/API:** `checked`; `toggle()`.
- **Events:** `input` and `change`, each with `detail.checked`.
- **Semantics and keys:** a button with `role="switch"` and `aria-checked`; Space and Enter toggle it.
- **Forms:** participates like a checkbox when configured with a `name`; the configured `value` is submitted while on.
- **Guide:** [toggle/README.md](../toggle/README.md).

### Slider

- **Attributes:** `value`, `min`, `max`, `step`, `label`, `name`, and `disabled`.
- **State/API:** `value`.
- **Events:** `input` while the value moves; `change` when the interaction is committed. The input event carries `detail.value`.
- **Semantics and keys:** `role="slider"`; arrow keys step by `step`, Page Up/Down move by a tenth of the range, and Home/End select the endpoints.
- **Forms:** participates in forms when a `name` is present.
- **Guide:** [slider/README.md](../slider/README.md).

### Plunger

- **Attributes:** `label`, `flip`, and `disabled`.
- **State/API:** `fire()` performs a full pull and release.
- **Events:** `send`, with `detail.power` between 0 and 1 when the full pull completes.
- **Semantics and keys:** a button; holding Space or Enter pulls it back, releasing shoots. A screen-reader button activation performs the full action.
- **Forms:** no form value is documented.
- **Guide:** [plunger/README.md](../plunger/README.md).

### Stepper

- **Attributes:** `value`, `min`, `max`, `step`, `digits`, `label`, `name`, and `disabled`.
- **State/API:** `value`, `increment()`, `decrement()`; increment/decrement accept a step count.
- **Events:** `input` and `change`; the input detail contains `value`.
- **Semantics and keys:** `role="spinbutton"`; arrows and plus/minus step, Page Up/Down move by ten, and Home/End select range endpoints.
- **Forms:** participates in forms when a `name` is present.
- **Limits:** whole, non-negative values; two to four score drums.
- **Guide:** [stepper/README.md](../stepper/README.md).

### Drop targets

- **Attributes:** `items`, `checked`, `label`, `name`, and `disabled`.
- **State/API:** `selected`, `checked`, `setChecked(index, value)`, `toggle(index)`, and `resetAll()`.
- **Events:** `change`, with `detail.index`, `detail.item`, `detail.checked`, `detail.selected`, and `detail.allChecked`; `bonus`, with `detail.selected`, when all targets are selected.
- **Semantics and keys:** a group of buttons with `role="checkbox"`; Left/Right move between targets, Space/Enter toggle.
- **Forms:** selected labels are submitted as a comma-separated value when `name` is present.
- **Limits:** up to four targets; labels should be short.
- **Guide:** [targets/README.md](../targets/README.md).

### Drain

- **Attributes:** `window` (undo duration in milliseconds), `label`, and `disabled`.
- **State/API:** `state` reports `ready`, `draining`, `undoable`, `saving`, or `gone`; `remaining` reports remaining undo time; `reset()` serves a new ball.
- **Events:** `delete` begins the undo window, `undo` restores, and `commit` means the window expired and the delete is final. The delete event includes `detail.undoMs`.
- **Semantics and keys:** two buttons; the chute responds to Enter, Space, Delete, and Backspace. The SHOOT AGAIN button is `aria-disabled` when undo is unavailable.
- **Forms:** no form value is documented.
- **Guide:** [drain/README.md](../drain/README.md).

### Pop bumpers

- **Attributes:** single bumper uses `cap` and `points`; the cluster uses `caps`; both support `label` and `disabled`.
- **State/API:** cluster provides `launch()` and `resetScore()`; its score and combo are readable state.
- **Events:** `hit`, with `detail.index`, `detail.cap`, `detail.points`, `detail.count`, `detail.score`, and `detail.combo`.
- **Semantics and keys:** the single bumper is a button; the cluster exposes `role="button"`. Space and Enter activate both.
- **Limits:** the cluster is always three bumpers in one triangle; cap text should be short.
- **Guide:** [bumper/README.md](../bumper/README.md).

## 3. Shared configuration

All controls accept the shared `silent` behavior described in their component guides. Set `PinballKit.sound = false` to mute the shared sound controller.

Use `--pb-size` to size a control. The variable represents height, though each photographed body retains its aspect ratio and therefore does not reflow like a flexible CSS drawing. The chrome ball's reflections use `--pb-page`, which should be set to a hex colour matching the page background. The default is `#f3efe5`.

```css
pinball-toggle {
  --pb-size: 42px;
  --pb-page: #f3efe5;
}
```

Attributes initialize or configure an element. After initialization, use the documented properties and methods to change state.

## 4. Event consumption example

```js
const slider = document.querySelector('pinball-slider');

slider.addEventListener('input', (event) => {
  // Update fast feedback while the ball moves.
  updatePreview(event.detail.value);
});

slider.addEventListener('change', () => {
  // Persist once the interaction is committed.
  saveSetting(slider.value);
});
```

The shared base dispatches bubbling, composed custom events. A listener on the custom element or an ancestor can receive the event without querying inside its Shadow DOM.

## 5. Form participation

The documented value-bearing controls are Toggle, Slider, Stepper, and Drop targets. Their form-associated behavior is enabled through the shared base's `ElementInternals` support and each component's form value implementation. Give each control a `name` to include it in form submission. The remaining controls document action events rather than form values.

The browser test moves these value controls into a form and inspects `FormData` values. A browser that cannot attach form internals may not provide equivalent native form submission; check the target browser rather than assuming universal support.
