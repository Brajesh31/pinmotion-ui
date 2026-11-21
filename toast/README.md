# Toast

A dismissible notification with a status announcement, severity variant and optional automatic timeout.

## 📦 Bundle and elements

- **Bundle:** `toast/toast.js`, approximately 23 KB.
- **Custom elements:** `<pinball-toast>`.
- **Dependencies:** no external runtime packages. The bundle embeds the lightweight helper and component implementation; it does not include WebGL or audio.

## 🚀 Quick start

Load the standalone script and add the element to your HTML:

```html
<script src="toast.js"></script>\n<pinball-toast id="el" message="Settings saved" variant="success" duration="0"></pinball-toast>
```

Listen to the documented events and read the current properties:

```js
const toast = document.querySelector('pinball-toast');\ntoast.show('Saved successfully', 3000);\ntoast.addEventListener('dismiss', () => console.log('Toast hidden'));\n// duration=0 keeps the toast visible until dismissed.
```

The component bundle is a plain script, not an ES module. It embeds the lightweight helper and this control; it has no external runtime dependencies.

## 🧩 API reference

### Attributes

| Attribute | Type | Default | Applies to / update behavior |
|---|---|---|---|
| message | String | Notification | Observed | Default notification text. |
| variant | info, success, error | info | Observed | Changes the status accent. |
| duration | Number (milliseconds) | 3500 | Read when shown | Auto-dismiss delay. Zero means no automatic dismissal. |
| disabled | Boolean | Absent | Observed by shared base | Makes the host inert. |

Message and variant update the current presentation. Duration is read when show() is called.

### Properties

No additional public properties are documented.

### Methods

| Method | Details |
|---|---|
| show(message, duration) | Display a notification. A positive duration auto-dismisses it; zero keeps it visible. |
| dismiss() | Hide the notification and clear its timer. |

### Events

| Event | Payload and trigger |
|---|---|
| show | CustomEvent, { message: string } Fires when the notification is shown. |
| dismiss | CustomEvent, empty detail Fires when the notification is dismissed. |

The shared event helper dispatches custom events with `bubbles: true` and `composed: true`, so listeners can be attached to the custom element or an ancestor outside its Shadow DOM. Event names and payloads above describe this component's actual implementation.

## 🎮 Input and keyboard

**Pointer and touch:** Use the internal Show notification button or call show(). Dismiss with the × button or dismiss().

**Keyboard:** The show and dismiss buttons use native keyboard activation.

## 📝 Form integration

Does not contribute a form value.

## 🎨 Styling, rendering, and sound

The component sits in the shared Pinball UI metal deck with brushed-steel edges, four recessed fasteners, a component-specific backglass emblem, three pilot lamps, a chrome ball marker and a dark inset playfield. If PinballKit is already present, the marker uses the original shared chrome-ball shader; otherwise it falls back to CSS. The notification uses an amber, green or red left accent with a compact status lamp.

This standalone file embeds the compact Pinmotion Extras base and this component implementation. It does not initialize or embed PinballKit, its WebGL runtime, shader source or recorded audio. Its component-specific backglass emblem and metal deck use the Pinball UI mechanical visual language. When PinballKit is already present, the backglass chrome-ball marker reuses its shared WebGL shader and user actions can reuse its sound effects. When loaded alone, the control remains self-contained and uses the CSS chrome-ball fallback.

## ♿ Motion and accessibility

No sliding transition is used. Auto-dismiss is timer-based and should not carry critical information.

The interactive control lives in an open Shadow DOM and uses the semantic role and focus behavior described above. Set a useful `label`, or provide `aria-label` / `aria-labelledby` before connection. The mandatory Validate CI workflow runs the headless Chromium interaction suite, including gallery and standalone component checks. This automated browser coverage is not a substitute for a dedicated screen-reader audit.

## 🎯 Mechanical behavior

| Action | Result |
|---|---|
| Show | The notification becomes visible and emits show. |
| Dismiss | The notification hides and emits dismiss. |

## ⚠️ Implementation notes and limits

- The default duration is 3500ms. Set duration=0 for persistent notices.
- A toast should not replace durable inline validation or confirmation for critical actions.
