# Date Picker

A date field that delegates parsing, calendar presentation and constraints to the browser’s native date input.

## 📦 Bundle and elements

- **Bundle:** `date-picker/date-picker.js`, approximately 5 KB.
- **Custom elements:** `<pinball-date-picker>`.
- **Dependencies:** no external runtime packages. The bundle embeds the lightweight helper and component implementation; it does not include WebGL or audio.

## 🚀 Quick start

Load the standalone script and add the element to your HTML:

```html
<script src="date-picker.js"></script>\n<pinball-date-picker id="el" name="startDate" label="Start date" value="2026-11-20"></pinball-date-picker>
```

Listen to the documented events and read the current properties:

```js
const date = document.querySelector('pinball-date-picker');\ndate.addEventListener('change', e => saveDate(e.detail.value));\ndate.value = '2026-12-01';
```

The component bundle is a plain script, not an ES module. It embeds the lightweight helper and this control; it has no external runtime dependencies.

## 🧩 API reference

### Attributes

| Attribute | Type | Default | Applies to / update behavior |
|---|---|---|---|
| value | ISO date string | Empty | Observed | Current date value in YYYY-MM-DD format. |
| min | ISO date string | Unset | Observed | Earliest valid date. |
| max | ISO date string | Unset | Observed | Latest valid date. |
| label | String | Date | Observed | Visible and accessible label. |
| name | String | Omitted | Form configuration | Form field name. |
| disabled | Boolean | Absent | Observed by shared base | Makes the host inert. |

Value, min, max and label are observed. Date parsing and calendar UI are supplied by the browser.

### Properties

| Property | Type | Access | Details |
|---|---|---|---|
| value | string | Read/write | Current ISO date value or empty string. |

### Methods

No additional public methods are documented.

### Events

| Event | Payload and trigger |
|---|---|
| input | CustomEvent, { value: string } Fires while the date value changes. |
| change | CustomEvent, { value: string } Fires when the native date input commits. |

The shared event helper dispatches custom events with `bubbles: true` and `composed: true`, so listeners can be attached to the custom element or an ancestor outside its Shadow DOM. Event names and payloads above describe this component's actual implementation.

## 🎮 Input and keyboard

**Pointer and touch:** Choose a date using the native browser date picker or text entry where supported.

**Keyboard:** Keyboard behavior follows the browser’s native input type=date implementation.

## 📝 Form integration

Form-associated. With name set, submits the ISO date string.

## 🎨 Styling, rendering, and sound

The date input is presented in a warm bordered control panel.

This standalone file embeds the small guarded Pinmotion Extras base and this component implementation. It does not load the PinballKit WebGL renderer, recorded audio, or external packages.

## ♿ Motion and accessibility

No custom motion is used.

The interactive control lives in an open Shadow DOM and uses the semantic role and focus behavior described above. Set a useful `label`, or provide `aria-label` / `aria-labelledby` before connection. The repository's optional automated interaction script uses headless Chromium; it is not a substitute for a screen-reader audit.

## 🎯 Mechanical behavior

| Action | Result |
|---|---|
| Choose date | The input and change events report the current date string. |

## ⚠️ Implementation notes and limits

- The exposed value uses the browser date input’s ISO YYYY-MM-DD representation.
- Calendar UI and keyboard behavior differ by browser and operating system.
