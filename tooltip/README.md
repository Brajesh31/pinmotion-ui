# Tooltip

A small contextual tooltip that appears on pointer hover or keyboard focus. The trigger content is provided through the default slot.

## 📦 Bundle and elements

- **Bundle:** `tooltip/tooltip.js`, approximately 23 KB.
- **Custom elements:** `<pinball-tooltip>`.
- **Dependencies:** no external runtime packages. The bundle embeds the lightweight helper and component implementation; it does not include WebGL or audio.

## 🚀 Quick start

Load the standalone script and add the element to your HTML:

```html
<script src="tooltip.js"></script>\n<pinball-tooltip id="el" content="This is a contextual hint.">Hover or focus me</pinball-tooltip>
```

Listen to the documented events and read the current properties:

```js
const tooltip = document.querySelector('pinball-tooltip');\ntooltip.setAttribute('content', 'A new hint');\ntooltip.show();\ntooltip.hide();
```

The component bundle is a plain script, not an ES module. It embeds the lightweight helper and this control; it has no external runtime dependencies.

## 🧩 API reference

### Attributes

| Attribute | Type | Default | Applies to / update behavior |
|---|---|---|---|
| content | String | More information | Observed | Tooltip text. |
| placement | top or bottom | top | CSS selector | Positions the bubble above or below the trigger. |
| disabled | Boolean | Absent | Observed by shared base | Makes the host inert. |

The content attribute updates tooltip text after connection. The placement attribute switches the bubble between top and bottom.

### Properties

No additional public properties are documented.

### Methods

| Method | Details |
|---|---|
| show() | Display the tooltip. |
| hide() | Hide the tooltip. |

### Events

No public events are documented.

The shared event helper dispatches custom events with `bubbles: true` and `composed: true`, so listeners can be attached to the custom element or an ancestor outside its Shadow DOM. Event names and payloads above describe this component's actual implementation.

## 🎮 Input and keyboard

**Pointer and touch:** The slotted trigger content receives pointer and keyboard focus.

**Keyboard:** Focus the trigger to show the tooltip. Escape hides it. Blur also hides it.

## 📝 Form integration

Does not contribute a form value.

## 🎨 Styling, rendering, and sound

The component sits in the shared Pinball UI metal deck with brushed-steel edges, four recessed fasteners, a component-specific backglass emblem, three pilot lamps, a chrome ball marker and a dark inset playfield. If PinballKit is already present, the marker uses the original shared chrome-ball shader; otherwise it falls back to CSS. The tooltip is a dark floating label with a compact shadow and a warm light text treatment.

This standalone file embeds the compact Pinmotion Extras base and this component implementation. It does not initialize or embed PinballKit, its WebGL runtime, shader source or recorded audio. Its component-specific backglass emblem and metal deck use the Pinball UI mechanical visual language. When PinballKit is already present, the backglass chrome-ball marker reuses its shared WebGL shader and user actions can reuse its sound effects. When loaded alone, the control remains self-contained and uses the CSS chrome-ball fallback.

## ♿ Motion and accessibility

The tooltip uses a short opacity and position transition.

The interactive control lives in an open Shadow DOM and uses the semantic role and focus behavior described above. Set a useful `label`, or provide `aria-label` / `aria-labelledby` before connection. The mandatory Validate CI workflow runs the headless Chromium interaction suite, including gallery and standalone component checks. This automated browser coverage is not a substitute for a dedicated screen-reader audit.

## 🎯 Mechanical behavior

| Action | Result |
|---|---|
| Hover or focus | The tooltip becomes visible and remains associated through aria-describedby. |
| Blur or Escape | The tooltip is hidden. |

## ⚠️ Implementation notes and limits

- A tooltip is supplementary text. Do not place essential actions inside it.
- The trigger is a focusable wrapper around slotted content; place an accessible label on the slotted trigger when needed.
