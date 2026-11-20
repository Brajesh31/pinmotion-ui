# Segmented Control

A compact segmented selector for mutually exclusive values. One segment is visibly latched at a time, with a form value and change event.

## 📦 Bundle and elements

- **Bundle:** `segmented/segmented.js`, approximately 13 KB.
- **Custom elements:** `<pinball-segmented>`.
- **Dependencies:** no external runtime packages. The bundle embeds the lightweight helper and component implementation; it does not include WebGL or audio.

## 🚀 Quick start

Load the standalone script and add the element to your HTML:

```html
<script src="segmented.js"></script>\n<pinball-segmented id="el" name="range" options="day:Day;week:Week;month:Month" value="week"></pinball-segmented>
```

Listen to the documented events and read the current properties:

```js
const range = document.querySelector('pinball-segmented');\nrange.addEventListener('change', e => refreshReport(e.detail.value));\nrange.value = 'month';
```

The component bundle is a plain script, not an ES module. It embeds the lightweight helper and this control; it has no external runtime dependencies.

## 🧩 API reference

### Attributes

| Attribute | Type | Default | Applies to / update behavior |
|---|---|---|---|
| options | Semicolon-separated value:label pairs | day:Day;week:Week;month:Month | Observed | Defines the available segments. |
| value | String | First option | Observed | Selected segment value. |
| name | String | Omitted | Form configuration | Form field name. |
| disabled | Boolean | Absent | Observed by shared base | Makes the host inert. |

Options and value are observed after connection. The first configured option is selected when no value is supplied.

### Properties

| Property | Type | Access | Details |
|---|---|---|---|
| value | string | Read/write | Selected segment value. |

### Methods

| Method | Details |
|---|---|
| setValue(value, user = false) | Select a configured option; pass user=true to emit change. |

### Events

| Event | Payload and trigger |
|---|---|
| change | CustomEvent, { value: string } Fires when a user selects a different segment. |

The shared event helper dispatches custom events with `bubbles: true` and `composed: true`, so listeners can be attached to the custom element or an ancestor outside its Shadow DOM. Event names and payloads above describe this component's actual implementation.

## 🎮 Input and keyboard

**Pointer and touch:** Press a segment to latch it as selected.

**Keyboard:** Arrow Left and Arrow Right move selection between segments and keep focus on the active segment.

## 📝 Form integration

Form-associated. With name set, submits the selected value.

## 🎨 Styling, rendering, and sound

The component sits in the shared Pinball UI metal deck with brushed-steel edges, four recessed fasteners, a chrome ball marker, an amber pilot lamp and a dark inset playfield. The segment rail uses a recessed warm-grey track with a highlighted cream and amber active segment.

This standalone file embeds the compact Pinmotion Extras base and this component implementation. Its metal deck, chrome fasteners, amber pilot lamp and brass control styling follow the original PinballKit family. It does not load WebGL or recorded audio. When PinballKit is already present on the page, user actions reuse its recorded mechanical sound effects; when used alone, the component remains self-contained and silent.

## ♿ Motion and accessibility

The component uses native browser controls and CSS transitions. No continuous scripted physics or automatic motion is required.

The interactive control lives in an open Shadow DOM and uses the semantic role and focus behavior described above. Set a useful `label`, or provide `aria-label` / `aria-labelledby` before connection. The repository's optional automated interaction script uses headless Chromium; it is not a substitute for a screen-reader audit.

## 🎯 Mechanical behavior

| Action | Result |
|---|---|
| Select a segment | The selected segment receives the raised active surface and change event. |

## ⚠️ Implementation notes and limits

- Use this component for a small number of mutually exclusive choices.
- Long labels can make the control wider than its container.
