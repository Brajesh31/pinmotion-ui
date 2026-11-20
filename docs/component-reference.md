# 🧩 Component API reference

This page is the navigation and cross-component summary for the seven standalone bundles. The individual guides contain the complete attributes, properties, methods, event payloads, interaction rules, forms behavior, and limitations.

| Bundle | Custom elements | Pattern | Guide |
| --- | --- | --- | --- |
| `toggle/toggle.js` | `<pinball-toggle>` | Switch | [Toggle API](../toggle/README.md) |
| `slider/slider.js` | `<pinball-slider>` | Range slider | [Slider API](../slider/README.md) |
| `plunger/plunger.js` | `<pinball-plunger>` | Pull-to-send action | [Plunger API](../plunger/README.md) |
| `stepper/stepper.js` | `<pinball-stepper>` | Whole-number stepper | [Stepper API](../stepper/README.md) |
| `targets/targets.js` | `<pinball-targets>` | Checkbox group | [Drop targets API](../targets/README.md) |
| `drain/drain.js` | `<pinball-drain>` | Delete with undo | [Drain API](../drain/README.md) |
| `bumper/bumper.js` | `<pinball-bumper>`, `<pinball-bumpers>` | Single bumper and cluster | [Pop bumpers API](../bumper/README.md) |

## 📦 Bundle model

Each component file is a standalone plain script with its own embedded copy of the shared runtime, artwork, and recorded sound data. The first bundle loaded initializes `window.PinballKit`; subsequent bundles reuse that page-level runtime. There are seven files and eight registered custom elements because the bumper file defines two elements.

## 🔔 Event conventions

- Events documented as `CustomEvent` use the payload shown in their component guide.
- Events emitted by the shared base bubble and cross the Shadow DOM boundary (`bubbles: true`, `composed: true`).
- Programmatic property/method updates are generally silent unless the guide explicitly says otherwise or a method's optional `user` argument is enabled.
- Toggle is a specific exception: its `input` event is a plain `Event` with no `detail`; use its `change` event payload or read `checked`.
- The bumper bundle uses different `hit` detail shapes for the single bumper and the cluster.

## 📝 Form-associated elements

| Element | Form value |
| --- | --- |
| `<pinball-toggle>` | Nothing while off; configured `value` (defaults to `on`) while checked |
| `<pinball-slider>` | Current numeric value as a string |
| `<pinball-stepper>` | Current whole-number value as a string |
| `<pinball-targets>` | Checked labels joined by commas |
| `<pinball-plunger>`, `<pinball-drain>`, `<pinball-bumper>`, `<pinball-bumpers>` | No form value is documented |

The four value controls use form-associated custom-element support through `ElementInternals`. Verify this against the browser versions supported by the consuming application.

## ♿ Reduced-motion behavior

Most controls snap their animated visuals to the final logical state when `prefers-reduced-motion: reduce` is active. Plunger is not yet reduced-motion-aware. Drop Targets has an event caveat: its `bonus` event is tied to the visual target-impact callback and is not emitted in reduced-motion mode. Use `change.detail.allChecked` for application logic.

## 📐 Shared styling

All controls use `--pb-size` to set height and retain a fixed photographed aspect ratio. `--pb-page` sets the hex page colour reflected by the chrome ball. `--pb-focus` sets the visible keyboard-focus outline. Each guide lists the default height and any extra space required for moving parts.

## 🧭 API documentation conventions

See [Component API conventions](component-api-conventions.md) for the source-of-truth rules used to keep attributes, events, properties, methods, keyboard support, and browser caveats consistent across the guides.
