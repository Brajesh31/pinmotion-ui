# Select

A native select control in a custom pinball-styled panel. Options are configured from compact value:label pairs and the selected value can participate in a form.

## 📦 Bundle and elements

- **Bundle:** `select/select.js`, approximately 13 KB.
- **Custom elements:** `<pinball-select>`.
- **Dependencies:** no external runtime packages. The bundle embeds the lightweight helper and component implementation; it does not include WebGL or audio.

## 🚀 Quick start

Load the standalone script and add the element to your HTML:

```html
<script src="select.js"></script>\n<pinball-select id="el" name="difficulty" options="easy:Easy;normal:Normal;hard:Hard" value="normal" label="Difficulty"></pinball-select>
```

Listen to the documented events and read the current properties:

```js
const select = document.querySelector('pinball-select');\nselect.addEventListener('change', e => setDifficulty(e.detail.value));\nselect.value = 'hard';
```

The component bundle is a plain script, not an ES module. It embeds the lightweight helper and this control; it has no external runtime dependencies.

## 🧩 API reference

### Attributes

| Attribute | Type | Default | Applies to / update behavior |
|---|---|---|---|
| options | Semicolon-separated value:label pairs | basic:Basic;pro:Professional;team:Team | Observed | Defines dropdown options. |
| value | String | First option | Observed | Selected option value. |
| label | String | Choose | Observed | Visible and accessible label. |
| name | String | Omitted | Form configuration | Form field name. |
| disabled | Boolean | Absent | Observed by shared base | Makes the host inert. |

Options, value and label are observed and rebuild the native select when needed. Set name for form submission.

### Properties

| Property | Type | Access | Details |
|---|---|---|---|
| value | string | Read/write | Selected option value. |

### Methods

No additional public methods are documented.

### Events

| Event | Payload and trigger |
|---|---|
| change | CustomEvent, { value: string, label: string } Fires when the user selects another option. |

The shared event helper dispatches custom events with `bubbles: true` and `composed: true`, so listeners can be attached to the custom element or an ancestor outside its Shadow DOM. Event names and payloads above describe this component's actual implementation.

## 🎮 Input and keyboard

**Pointer and touch:** Choose an option using the native select menu.

**Keyboard:** Native select keyboard interactions are preserved.

## 📝 Form integration

Form-associated. With name set, submits the selected option value.

## 🎨 Styling, rendering, and sound

The component sits in the shared Pinball UI metal deck with brushed-steel edges, four recessed fasteners, a chrome ball marker, an amber pilot lamp and a dark inset playfield. The native select uses a cream surface, dark text and a steel border.

This standalone file embeds the compact Pinmotion Extras base and this component implementation. Its metal deck, chrome fasteners, amber pilot lamp and brass control styling follow the original PinballKit family. It does not load WebGL or recorded audio. When PinballKit is already present on the page, user actions reuse its recorded mechanical sound effects; when used alone, the component remains self-contained and silent.

## ♿ Motion and accessibility

No custom motion is used.

The interactive control lives in an open Shadow DOM and uses the semantic role and focus behavior described above. Set a useful `label`, or provide `aria-label` / `aria-labelledby` before connection. The repository's optional automated interaction script uses headless Chromium; it is not a substitute for a screen-reader audit.

## 🎯 Mechanical behavior

| Action | Result |
|---|---|
| Choose | The select value updates and change fires. |

## ⚠️ Implementation notes and limits

- Option pairs use value:label separated by semicolons.
- This component supports one selected value at a time.
