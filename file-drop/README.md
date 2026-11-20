# File Drop

A keyboard-accessible file chooser and drag-and-drop target. It reports selected File objects to application code but does not upload them.

## 📦 Bundle and elements

- **Bundle:** `file-drop/file-drop.js`, approximately 13 KB.
- **Custom elements:** `<pinball-file-drop>`.
- **Dependencies:** no external runtime packages. The bundle embeds the lightweight helper and component implementation; it does not include WebGL or audio.

## 🚀 Quick start

Load the standalone script and add the element to your HTML:

```html
<script src="file-drop.js"></script>\n<pinball-file-drop id="el" accept="image/*,.pdf" multiple label="Drop files or browse"></pinball-file-drop>
```

Listen to the documented events and read the current properties:

```js
const upload = document.querySelector('pinball-file-drop');\nupload.addEventListener('change', e => {\n  for (const file of e.detail.files) console.log(file.name, file.size);\n});
```

The component bundle is a plain script, not an ES module. It embeds the lightweight helper and this control; it has no external runtime dependencies.

## 🧩 API reference

### Attributes

| Attribute | Type | Default | Applies to / update behavior |
|---|---|---|---|
| accept | File type string | Unset | Observed | Native file input accept filter. |
| multiple | Boolean | Absent | Observed | Allows more than one file. |
| label | String | Drop files here or browse | Observed | Visible instruction text. |
| disabled | Boolean | Absent | Observed by shared base | Makes the host inert. |

Accept, multiple and label update the internal file input and instruction text.

### Properties

| Property | Type | Access | Details |
|---|---|---|---|
| files | File[] | Read-only | Current selected files. |

### Methods

| Method | Details |
|---|---|
| setFiles(files) | Internal selection helper used for change and drop events; applications should use the native picker instead. |

### Events

| Event | Payload and trigger |
|---|---|
| change | CustomEvent, { files: File[] } Fires after file selection or file drop. |

The shared event helper dispatches custom events with `bubbles: true` and `composed: true`, so listeners can be attached to the custom element or an ancestor outside its Shadow DOM. Event names and payloads above describe this component's actual implementation.

## 🎮 Input and keyboard

**Pointer and touch:** Use Browse files, keyboard activation on the dropzone, or drag files into the area.

**Keyboard:** The drop area is focusable and responds to Enter or Space. The native file picker supplies its own keyboard behavior.

## 📝 Form integration

Does not submit files automatically. Listen for change and upload the File objects using your application’s chosen transport.

## 🎨 Styling, rendering, and sound

The component sits in the shared Pinball UI metal deck with brushed-steel edges, four recessed fasteners, a chrome ball marker, an amber pilot lamp and a dark inset playfield. The drop area uses a dashed steel border and amber hover feedback.

This standalone file embeds the compact Pinmotion Extras base and this component implementation. Its metal deck, chrome fasteners, amber pilot lamp and brass control styling follow the original PinballKit family. It does not load WebGL or recorded audio. When PinballKit is already present on the page, user actions reuse its recorded mechanical sound effects; when used alone, the component remains self-contained and silent.

## ♿ Motion and accessibility

No custom motion is used.

The interactive control lives in an open Shadow DOM and uses the semantic role and focus behavior described above. Set a useful `label`, or provide `aria-label` / `aria-labelledby` before connection. The repository's optional automated interaction script uses headless Chromium; it is not a substitute for a screen-reader audit.

## 🎯 Mechanical behavior

| Action | Result |
|---|---|
| Choose files | The selected filenames and sizes are shown and change fires. |
| Drop files | The dropped File objects are exposed in the same event shape. |

## ⚠️ Implementation notes and limits

- Files are exposed as native File objects.
- No upload request is made by this component.
- The component selects files locally. It does not persist, upload or validate server-side content.
