# Text Field

A single-line text input with label, placeholder, required state and form-associated value synchronization.

## 📦 Bundle and elements

- **Bundle:** `text-field/text-field.js`, approximately 23 KB.
- **Custom elements:** `<pinball-text-field>`.
- **Dependencies:** no external runtime packages. The bundle embeds the lightweight helper and component implementation; it does not include WebGL or audio.

## 🚀 Quick start

Load the standalone script and add the element to your HTML:

```html
<script src="text-field.js"></script>\n<pinball-text-field id="el" name="displayName" label="Display name" placeholder="Enter a name" value="Brajesh"></pinball-text-field>
```

Listen to the documented events and read the current properties:

```js
const field = document.querySelector('pinball-text-field');\nfield.addEventListener('change', e => saveName(e.detail.value));\nfield.value = 'New name';
```

The component bundle is a plain script, not an ES module. It embeds the lightweight helper and this control; it has no external runtime dependencies.

## 🧩 API reference

### Attributes

| Attribute | Type | Default | Applies to / update behavior |
|---|---|---|---|
| value | String | Empty | Observed | Current field value. |
| label | String | Text | Observed | Visible and accessible label. |
| type | Input type | text | Observed | Native input type. |
| placeholder | String | Empty | Observed | Placeholder text. |
| required | Boolean | Absent | Observed | Native required constraint. |
| name | String | Omitted | Form configuration | Form field name. |
| disabled | Boolean | Absent | Observed by shared base | Makes the host inert. |

Value, label, type, placeholder and required update after connection. Set name before form submission.

### Properties

| Property | Type | Access | Details |
|---|---|---|---|
| value | string | Read/write | Current input value. |

### Methods

No additional public methods are documented.

### Events

| Event | Payload and trigger |
|---|---|
| input | CustomEvent, { value: string } Fires as the user edits. |
| change | CustomEvent, { value: string } Fires when the native input commits a change. |

The shared event helper dispatches custom events with `bubbles: true` and `composed: true`, so listeners can be attached to the custom element or an ancestor outside its Shadow DOM. Event names and payloads above describe this component's actual implementation.

## 🎮 Input and keyboard

**Pointer and touch:** Enter one line of text. The underlying input retains native browser validation and input behavior.

**Keyboard:** Native text input keyboard editing is preserved.

## 📝 Form integration

Form-associated. With name set, submits the current value. Required state is delegated to the internal native input; test validation in the target browser.

## 🎨 Styling, rendering, and sound

The component sits in the shared Pinball UI metal deck with brushed-steel edges, four recessed fasteners, a component-specific backglass emblem, three pilot lamps, a chrome ball marker and a dark inset playfield. If PinballKit is already present, the marker uses the original shared chrome-ball shader; otherwise it falls back to CSS. Use the shared --pui-* custom properties to tune the warm input panel and focus ring.

This standalone file embeds the compact Pinmotion Extras base and this component implementation. It does not initialize or embed PinballKit, its WebGL runtime, shader source or recorded audio. Its component-specific backglass emblem and metal deck use the Pinball UI mechanical visual language. When PinballKit is already present, the backglass chrome-ball marker reuses its shared WebGL shader and user actions can reuse its sound effects. When loaded alone, the control remains self-contained and uses the CSS chrome-ball fallback.

## ♿ Motion and accessibility

No custom motion is used.

The interactive control lives in an open Shadow DOM and uses the semantic role and focus behavior described above. Set a useful `label`, or provide `aria-label` / `aria-labelledby` before connection. The repository's optional automated interaction script uses headless Chromium; it is not a substitute for a screen-reader audit.

## 🎯 Mechanical behavior

| Action | Result |
|---|---|
| Edit | The component emits input with the live value. |
| Commit | The component emits change with the current value. |

## ⚠️ Implementation notes and limits

- The internal input type is configurable through the type attribute.
- Browser native validation UI is rendered inside the component shadow tree.
