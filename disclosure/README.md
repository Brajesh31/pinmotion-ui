# Disclosure

A simple disclosure built on the native details and summary elements. It exposes an open property and a composed toggle event.

## 📦 Bundle and elements

- **Bundle:** `disclosure/disclosure.js`, approximately 12 KB.
- **Custom elements:** `<pinball-disclosure>`.
- **Dependencies:** no external runtime packages. The bundle embeds the lightweight helper and component implementation; it does not include WebGL or audio.

## 🚀 Quick start

Load the standalone script and add the element to your HTML:

```html
<script src="disclosure.js"></script>\n<pinball-disclosure id="el"><span slot="summary">What does this control do?</span><span>It reveals additional content using native disclosure semantics.</span></pinball-disclosure>
```

Listen to the documented events and read the current properties:

```js
const disclosure = document.querySelector('pinball-disclosure');\ndisclosure.addEventListener('toggle', e => console.log(e.detail.open));\ndisclosure.open = true;
```

The component bundle is a plain script, not an ES module. It embeds the lightweight helper and this control; it has no external runtime dependencies.

## 🧩 API reference

### Attributes

| Attribute | Type | Default | Applies to / update behavior |
|---|---|---|---|
| open | Boolean | Absent | Observed | Controls whether the panel is expanded. |
| disabled | Boolean | Absent | Observed by shared base | Makes the host inert. |

The open attribute stays synchronized with the nested native details element.

### Properties

| Property | Type | Access | Details |
|---|---|---|---|
| open | boolean | Read/write | Current disclosure state. |

### Methods

No additional public methods are documented.

### Events

| Event | Payload and trigger |
|---|---|
| toggle | CustomEvent, { open: boolean } Fires when native details toggles. |

The shared event helper dispatches custom events with `bubbles: true` and `composed: true`, so listeners can be attached to the custom element or an ancestor outside its Shadow DOM. Event names and payloads above describe this component's actual implementation.

## 🎮 Input and keyboard

**Pointer and touch:** Activate the summary row to expand or collapse the content.

**Keyboard:** The native summary element supports standard browser keyboard activation.

## 📝 Form integration

Does not contribute a form value.

## 🎨 Styling, rendering, and sound

The component sits in the shared Pinball UI metal deck with brushed-steel edges, four recessed fasteners, a chrome ball marker, an amber pilot lamp and a dark inset playfield. A bordered warm panel uses a plus/minus mechanical indicator beside the summary slot.

This standalone file embeds the compact Pinmotion Extras base and this component implementation. Its metal deck, chrome fasteners, amber pilot lamp and brass control styling follow the original PinballKit family. It does not load WebGL or recorded audio. When PinballKit is already present on the page, user actions reuse its recorded mechanical sound effects; when used alone, the component remains self-contained and silent.

## ♿ Motion and accessibility

No scripted motion is used.

The interactive control lives in an open Shadow DOM and uses the semantic role and focus behavior described above. Set a useful `label`, or provide `aria-label` / `aria-labelledby` before connection. The repository's optional automated interaction script uses headless Chromium; it is not a substitute for a screen-reader audit.

## 🎯 Mechanical behavior

| Action | Result |
|---|---|
| Open | The body content becomes visible. |
| Close | The body content is hidden. |

## ⚠️ Implementation notes and limits

- Supply summary content with slot=summary; remaining child content appears in the disclosure body.
- Use one disclosure per element.
