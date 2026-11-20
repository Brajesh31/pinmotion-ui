# Dialog

A modal dialog that uses the native HTML dialog element, a trigger button and a close action. Title and body content remain in light DOM slots.

## 📦 Bundle and elements

- **Bundle:** `dialog/dialog.js`, approximately 23 KB.
- **Custom elements:** `<pinball-dialog>`.
- **Dependencies:** no external runtime packages. The bundle embeds the lightweight helper and component implementation; it does not include WebGL or audio.

## 🚀 Quick start

Load the standalone script and add the element to your HTML:

```html
<script src="dialog.js"></script>\n<pinball-dialog id="el"><span slot="title">Confirm action</span><span>Are you sure you want to continue?</span></pinball-dialog>
```

Listen to the documented events and read the current properties:

```js
const dialog = document.querySelector('pinball-dialog');\ndialog.showModal();\ndialog.addEventListener('close', () => continueWorkflow());\n// The built-in trigger and close button are also available.
```

The component bundle is a plain script, not an ES module. It embeds the lightweight helper and this control; it has no external runtime dependencies.

## 🧩 API reference

### Attributes

| Attribute | Type | Default | Applies to / update behavior |
|---|---|---|---|
| open | Boolean | Absent | Observed | Requests the dialog to open. |
| label | String | Dialog | Reserved for host integration | Name for the dialog wrapper; the visible title is supplied by slot=title. |
| disabled | Boolean | Absent | Observed by shared base | Makes the host inert. |

The open attribute synchronizes with the native dialog open state.

### Properties

| Property | Type | Access | Details |
|---|---|---|---|
| open | boolean | Read-only getter | Whether the native dialog is open. |

### Methods

| Method | Details |
|---|---|
| showModal() | Open the dialog using native modal behavior. |
| close() | Close the dialog. |

### Events

| Event | Payload and trigger |
|---|---|
| open | CustomEvent, empty detail Fires when opened by the component method. |
| cancel | CustomEvent, empty detail Fires when the native dialog receives a cancel action such as Escape. |
| close | CustomEvent, empty detail Fires when the dialog closes. |

The shared event helper dispatches custom events with `bubbles: true` and `composed: true`, so listeners can be attached to the custom element or an ancestor outside its Shadow DOM. Event names and payloads above describe this component's actual implementation.

## 🎮 Input and keyboard

**Pointer and touch:** Use the built-in Open dialog button, then the Close button in the dialog footer.

**Keyboard:** The native dialog supports Escape cancellation and browser focus behavior. Buttons use native keyboard activation.

## 📝 Form integration

Does not contribute a form value. Use a separate form control inside the slotted dialog content when needed.

## 🎨 Styling, rendering, and sound

The component sits in the shared Pinball UI metal deck with brushed-steel edges, four recessed fasteners, a component-specific backglass emblem, three pilot lamps, a chrome ball marker and a dark inset playfield. If PinballKit is already present, the marker uses the original shared chrome-ball shader; otherwise it falls back to CSS. The modal uses a cream panel, darkened backdrop, amber trigger and compact action footer.

This standalone file embeds the compact Pinmotion Extras base and this component implementation. It does not initialize or embed PinballKit, its WebGL runtime, shader source or recorded audio. Its component-specific backglass emblem and metal deck use the Pinball UI mechanical visual language. When PinballKit is already present, the backglass chrome-ball marker reuses its shared WebGL shader and user actions can reuse its sound effects. When loaded alone, the control remains self-contained and uses the CSS chrome-ball fallback.

## ♿ Motion and accessibility

No scripted dialog animation is used.

The interactive control lives in an open Shadow DOM and uses the semantic role and focus behavior described above. Set a useful `label`, or provide `aria-label` / `aria-labelledby` before connection. The repository's optional automated interaction script uses headless Chromium; it is not a substitute for a screen-reader audit.

## 🎯 Mechanical behavior

| Action | Result |
|---|---|
| Open | The native modal dialog enters the top layer. |
| Close | The dialog closes and emits close. |

## ⚠️ Implementation notes and limits

- Provide the title using slot=title. Other child nodes appear in the dialog body.
- The component relies on native HTMLDialogElement support.
