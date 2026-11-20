# Combobox

An editable combobox with text filtering, a listbox of matching options, keyboard selection and form-associated string value.

## 📦 Bundle and elements

- **Bundle:** `combobox/combobox.js`, approximately 15 KB.
- **Custom elements:** `<pinball-combobox>`.
- **Dependencies:** no external runtime packages. The bundle embeds the lightweight helper and component implementation; it does not include WebGL or audio.

## 🚀 Quick start

Load the standalone script and add the element to your HTML:

```html
<script src="combobox.js"></script>\n<pinball-combobox id="el" name="finish" options="amber:Amber;chrome:Chrome;ivory:Ivory;red:Red" label="Finish" placeholder="Choose a finish…"></pinball-combobox>
```

Listen to the documented events and read the current properties:

```js
const combo = document.querySelector('pinball-combobox');\ncombo.addEventListener('input', e => filterPreview(e.detail.value));\ncombo.addEventListener('change', e => saveFinish(e.detail.value));
```

The component bundle is a plain script, not an ES module. It embeds the lightweight helper and this control; it has no external runtime dependencies.

## 🧩 API reference

### Attributes

| Attribute | Type | Default | Applies to / update behavior |
|---|---|---|---|
| options | Semicolon-separated value:label pairs | amber:Amber;chrome:Chrome;ivory:Ivory;red:Red | Observed | Choices shown in the listbox. |
| value | String | Empty | Observed | Current value. |
| label | String | Select or type | Observed | Accessible label. |
| placeholder | String | Start typing… | Observed | Input placeholder. |
| name | String | Omitted | Form configuration | Form field name. |
| disabled | Boolean | Absent | Observed by shared base | Makes the host inert. |

Options and value are observed. Changing the text filters options; choosing one sets the option value and label text.

### Properties

| Property | Type | Access | Details |
|---|---|---|---|
| value | string | Read/write | Current selected or typed value. |

### Methods

| Method | Details |
|---|---|
| open() | Show the filtered listbox. |
| close() | Hide the listbox. |

### Events

| Event | Payload and trigger |
|---|---|
| input | CustomEvent, { value: string } Fires as the user types. |
| change | CustomEvent, { value: string, label: string } Fires when a listed option is selected. |

The shared event helper dispatches custom events with `bubbles: true` and `composed: true`, so listeners can be attached to the custom element or an ancestor outside its Shadow DOM. Event names and payloads above describe this component's actual implementation.

## 🎮 Input and keyboard

**Pointer and touch:** Type to filter options; choose a result using pointer or keyboard.

**Keyboard:** Arrow Down/Up moves the active result, Enter selects it and Escape closes the list.

## 📝 Form integration

Form-associated. With name set, submits the current value string.

## 🎨 Styling, rendering, and sound

The component sits in the shared Pinball UI metal deck with brushed-steel edges, four recessed fasteners, a chrome ball marker, an amber pilot lamp and a dark inset playfield. A warm input surface opens a floating listbox with amber active-row feedback.

This standalone file embeds the compact Pinmotion Extras base and this component implementation. Its metal deck, chrome fasteners, amber pilot lamp and brass control styling follow the original PinballKit family. It does not load WebGL or recorded audio. When PinballKit is already present on the page, user actions reuse its recorded mechanical sound effects; when used alone, the component remains self-contained and silent.

## ♿ Motion and accessibility

The list opens without a custom animation.

The interactive control lives in an open Shadow DOM and uses the semantic role and focus behavior described above. Set a useful `label`, or provide `aria-label` / `aria-labelledby` before connection. The repository's optional automated interaction script uses headless Chromium; it is not a substitute for a screen-reader audit.

## 🎯 Mechanical behavior

| Action | Result |
|---|---|
| Type | The listbox filters and input fires. |
| Choose | The option value is committed and change fires. |

## ⚠️ Implementation notes and limits

- The search matches option labels and values case-insensitively.
- No remote asynchronous option loading is provided.
