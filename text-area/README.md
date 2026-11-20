# Text Area

A multi-line text input with resizable height, optional maximum length and form-associated value synchronization.

## 📦 Bundle and elements

- **Bundle:** `text-area/text-area.js`, approximately 23 KB.
- **Custom elements:** `<pinball-text-area>`.
- **Dependencies:** no external runtime packages. The bundle embeds the lightweight helper and component implementation; it does not include WebGL or audio.

## 🚀 Quick start

Load the standalone script and add the element to your HTML:

```html
<script src="text-area.js"></script>\n<pinball-text-area id="el" name="message" label="Message" rows="3" maxlength="180" placeholder="Write a short note…"></pinball-text-area>
```

Listen to the documented events and read the current properties:

```js
const area = document.querySelector('pinball-text-area');\narea.addEventListener('change', e => saveMessage(e.detail.value));\narea.value = 'A new note';
```

The component bundle is a plain script, not an ES module. It embeds the lightweight helper and this control; it has no external runtime dependencies.

## 🧩 API reference

### Attributes

| Attribute | Type | Default | Applies to / update behavior |
|---|---|---|---|
| value | String | Empty | Observed | Current text. |
| label | String | Message | Observed | Visible and accessible label. |
| placeholder | String | Empty | Observed | Placeholder text. |
| rows | Integer | 4 | Observed | Visible line count. |
| maxlength | Integer | Unset | Observed | Native character limit. |
| required | Boolean | Absent | Observed | Native required constraint. |
| name | String | Omitted | Form configuration | Form field name. |
| disabled | Boolean | Absent | Observed by shared base | Makes the host inert. |

Value, label, placeholder, rows, maxlength and required update after connection. Set name before form submission.

### Properties

| Property | Type | Access | Details |
|---|---|---|---|
| value | string | Read/write | Current text value. |

### Methods

No additional public methods are documented.

### Events

| Event | Payload and trigger |
|---|---|
| input | CustomEvent, { value: string } Fires for each edit. |
| change | CustomEvent, { value: string } Fires when the native textarea commits a change. |

The shared event helper dispatches custom events with `bubbles: true` and `composed: true`, so listeners can be attached to the custom element or an ancestor outside its Shadow DOM. Event names and payloads above describe this component's actual implementation.

## 🎮 Input and keyboard

**Pointer and touch:** Enter multi-line text. The field can be resized vertically.

**Keyboard:** Native textarea editing, arrow navigation and line breaks are preserved.

## 📝 Form integration

Form-associated. With name set, submits the current text value. Required and maxlength use native textarea behavior.

## 🎨 Styling, rendering, and sound

The component sits in the shared Pinball UI metal deck with brushed-steel edges, four recessed fasteners, a component-specific backglass emblem, three pilot lamps, a chrome ball marker and a dark inset playfield. If PinballKit is already present, the marker uses the original shared chrome-ball shader; otherwise it falls back to CSS. The textarea sits in a warm cream panel and can be vertically resized.

This standalone file embeds the compact Pinmotion Extras base and this component implementation. It does not initialize or embed PinballKit, its WebGL runtime, shader source or recorded audio. Its component-specific backglass emblem and metal deck use the Pinball UI mechanical visual language. When PinballKit is already present, the backglass chrome-ball marker reuses its shared WebGL shader and user actions can reuse its sound effects. When loaded alone, the control remains self-contained and uses the CSS chrome-ball fallback.

## ♿ Motion and accessibility

No custom motion is used.

The interactive control lives in an open Shadow DOM and uses the semantic role and focus behavior described above. Set a useful `label`, or provide `aria-label` / `aria-labelledby` before connection. The repository's optional automated interaction script uses headless Chromium; it is not a substitute for a screen-reader audit.

## 🎯 Mechanical behavior

| Action | Result |
|---|---|
| Edit | The input event and character counter update. |
| Commit | The change event carries the current text. |

## ⚠️ Implementation notes and limits

- The character counter appears only when maxlength is configured.
- The component does not add rich-text formatting.
