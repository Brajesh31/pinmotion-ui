# 🧩 Component API reference

This index covers all 29 standalone bundles and 30 registered custom-element tags. Each linked README is the authoritative component-level API guide.

## 🎱 Original mechanical controls

| Bundle | Custom element(s) | Pattern | API guide |
| --- | --- | --- | --- |
| `toggle/toggle.js` | `<pinball-toggle>` | Switch | [Toggle](../toggle/README.md) |
| `slider/slider.js` | `<pinball-slider>` | Range slider | [Slider](../slider/README.md) |
| `plunger/plunger.js` | `<pinball-plunger>` | Pull-to-send | [Plunger](../plunger/README.md) |
| `stepper/stepper.js` | `<pinball-stepper>` | Number stepper | [Stepper](../stepper/README.md) |
| `targets/targets.js` | `<pinball-targets>` | Checkbox group | [Drop targets](../targets/README.md) |
| `drain/drain.js` | `<pinball-drain>` | Delete with undo | [Drain](../drain/README.md) |
| `bumper/bumper.js` | `<pinball-bumper>`, `<pinball-bumpers>` | Single bumper and cluster | [Pop bumpers](../bumper/README.md) |

## 🧰 Lightweight utility controls

| Bundle | Custom element(s) | Pattern | API guide |
| --- | --- | --- | --- |
| `checkbox/checkbox.js` | `<pinball-checkbox>` | binary selection | [Checkbox API](../checkbox/README.md) |
| `radio-group/radio-group.js` | `<pinball-radio-group>` | single-choice group | [Radio Group API](../radio-group/README.md) |
| `segmented/segmented.js` | `<pinball-segmented>` | compact single-choice selector | [Segmented Control API](../segmented/README.md) |
| `progress/progress.js` | `<pinball-progress>` | progress indicator | [Progress API](../progress/README.md) |
| `meter/meter.js` | `<pinball-meter>` | scalar measurement | [Meter API](../meter/README.md) |
| `rating/rating.js` | `<pinball-rating>` | rating input | [Rating API](../rating/README.md) |
| `tabs/tabs.js` | `<pinball-tabs>` | tab navigation | [Tabs API](../tabs/README.md) |
| `accordion/accordion.js` | `<pinball-accordion>` | expandable sections | [Accordion API](../accordion/README.md) |
| `disclosure/disclosure.js` | `<pinball-disclosure>` | single disclosure | [Disclosure API](../disclosure/README.md) |
| `tooltip/tooltip.js` | `<pinball-tooltip>` | contextual hint | [Tooltip API](../tooltip/README.md) |
| `dialog/dialog.js` | `<pinball-dialog>` | modal dialog | [Dialog API](../dialog/README.md) |
| `toast/toast.js` | `<pinball-toast>` | notification feedback | [Toast API](../toast/README.md) |
| `breadcrumbs/breadcrumbs.js` | `<pinball-breadcrumbs>` | navigation trail | [Breadcrumbs API](../breadcrumbs/README.md) |
| `pagination/pagination.js` | `<pinball-pagination>` | page navigation | [Pagination API](../pagination/README.md) |
| `search/search.js` | `<pinball-search>` | search input | [Search API](../search/README.md) |
| `text-field/text-field.js` | `<pinball-text-field>` | single-line text input | [Text Field API](../text-field/README.md) |
| `text-area/text-area.js` | `<pinball-text-area>` | multi-line text input | [Text Area API](../text-area/README.md) |
| `select/select.js` | `<pinball-select>` | single-choice dropdown | [Select API](../select/README.md) |
| `combobox/combobox.js` | `<pinball-combobox>` | editable choice | [Combobox API](../combobox/README.md) |
| `file-drop/file-drop.js` | `<pinball-file-drop>` | file selection and dropzone | [File Drop API](../file-drop/README.md) |
| `date-picker/date-picker.js` | `<pinball-date-picker>` | date input | [Date Picker API](../date-picker/README.md) |
| `color-picker/color-picker.js` | `<pinball-color-picker>` | color input | [Color Picker API](../color-picker/README.md) |

## 📦 Runtime model

- **Seven original bundles:** include the PinballKit clock, WebGL renderer, artwork and recorded sound data. The first loaded original bundle initializes `window.PinballKit`; subsequent original bundles reuse it.
- **Twenty-two utility bundles:** include the compact `PinmotionExtras` base and one native/CSS component source. They do not load PinballKit, WebGL or recorded audio.
- All bundles are plain scripts, not ES modules. Each bundle can be copied separately and loaded with a script tag.

## 🔔 Event conventions

- The original shared base emits composed, bubbling custom events. Toggle's `input` is a plain Event without `detail`; its `change` carries the checked value.
- Utility events are composed, bubbling custom events with component-specific payloads. Progress, Meter and Tooltip currently expose no custom events.
- Programmatic property updates are generally silent unless a method signature or component guide explicitly says otherwise.

## 📝 Form participation

The original mechanical form controls are Toggle, Slider, Stepper and Drop targets. Utility form-associated controls are Checkbox, Radio Group, Segmented Control, Rating, Text Field, Text Area, Select, Combobox, Date Picker and Color Picker. File Drop exposes native File objects through a change event; it does not upload or submit them automatically. Form-associated custom elements require browser support for ElementInternals.

## ♿ Reduced motion and rendering

- The original Plunger still animates when reduced motion is requested. Drop Targets' `bonus` event is tied to its normal-motion impact callback; use `change.detail.allChecked` for application logic.
- Utility controls use native browser inputs and CSS. Progress currently uses an indeterminate CSS animation; validate this in the target environment and avoid indeterminate mode for users who request reduced motion until a no-motion treatment is added.
- WebGL is required only by the original seven mechanical controls.

## 📐 Styling

The original mechanical family uses `--pb-size`, `--pb-page` and `--pb-focus`. The lightweight utility family uses `--pui-ink`, `--pui-dim`, `--pui-line`, `--pui-amber` and `--pui-focus` from its embedded helper.
