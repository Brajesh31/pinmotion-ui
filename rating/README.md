# Rating

A star rating control where each star behaves like an illuminated target. It supports a configurable count, read-only presentation and form submission.

## 📦 Bundle and elements

- **Bundle:** `rating/rating.js`, approximately 23 KB.
- **Custom elements:** `<pinball-rating>`.
- **Dependencies:** no external runtime packages. The bundle embeds the lightweight helper and component implementation; it does not include WebGL or audio.

## 🚀 Quick start

Load the standalone script and add the element to your HTML:

```html
<script src="rating.js"></script>\n<pinball-rating id="el" name="rating" value="4" max="5" label="Your rating"></pinball-rating>
```

Listen to the documented events and read the current properties:

```js
const rating = document.querySelector('pinball-rating');\nrating.addEventListener('change', e => saveRating(e.detail.value));\nrating.value = 5;
```

The component bundle is a plain script, not an ES module. It embeds the lightweight helper and this control; it has no external runtime dependencies.

## 🧩 API reference

### Attributes

| Attribute | Type | Default | Applies to / update behavior |
|---|---|---|---|
| value | Integer | 0 | Observed | Current rating from 0 to max. |
| max | Integer | 5 | Observed | Maximum number of stars, clamped to 1 through 10. |
| label | String | Rating | Observed | Accessible label. |
| readonly | Boolean | Absent | Observed | Prevents user selection. |
| name | String | Omitted | Form configuration | Form field name. |
| disabled | Boolean | Absent | Observed by shared base | Makes the host inert. |

Value, max, label and readonly update after connection. Name is consumed by form submission.

### Properties

| Property | Type | Access | Details |
|---|---|---|---|
| value | number | Read/write | Current integer rating. |

### Methods

No additional public methods are documented.

### Events

| Event | Payload and trigger |
|---|---|
| change | CustomEvent, { value: number, max: number } Fires when a user selects a different rating. |

The shared event helper dispatches custom events with `bubbles: true` and `composed: true`, so listeners can be attached to the custom element or an ancestor outside its Shadow DOM. Event names and payloads above describe this component's actual implementation.

## 🎮 Input and keyboard

**Pointer and touch:** Choose a star with the pointer.

**Keyboard:** Arrow Left/Down decrements, Arrow Right/Up increments, Home chooses the first star and End chooses the last.

## 📝 Form integration

Form-associated. With name set, submits the selected rating as a string.

## 🎨 Styling, rendering, and sound

The component sits in the shared Pinball UI metal deck with brushed-steel edges, four recessed fasteners, a component-specific backglass emblem, three pilot lamps, a chrome ball marker and a dark inset playfield. If PinballKit is already present, the marker uses the original shared chrome-ball shader; otherwise it falls back to CSS. Star indicators use amber illumination for selected values and muted steel-grey for unselected values.

This standalone file embeds the compact Pinmotion Extras base and this component implementation. It does not initialize or embed PinballKit, its WebGL runtime, shader source or recorded audio. Its component-specific backglass emblem and metal deck use the Pinball UI mechanical visual language. When PinballKit is already present, the backglass chrome-ball marker reuses its shared WebGL shader and user actions can reuse its sound effects. When loaded alone, the control remains self-contained and uses the CSS chrome-ball fallback.

## ♿ Motion and accessibility

No continuous motion is used.

The interactive control lives in an open Shadow DOM and uses the semantic role and focus behavior described above. Set a useful `label`, or provide `aria-label` / `aria-labelledby` before connection. The repository's optional automated interaction script uses headless Chromium; it is not a substitute for a screen-reader audit.

## 🎯 Mechanical behavior

| Action | Result |
|---|---|
| Choose a star | The rating value updates, stars illuminate and change fires. |

## ⚠️ Implementation notes and limits

- The maximum is clamped to 1 through 10.
- A readonly rating disables its internal star buttons.
- No half-star increments are supported.
