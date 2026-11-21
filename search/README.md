# Search

A compact search field with a dedicated submit action. It emits live query updates and a search event when submitted.

## 📦 Bundle and elements

- **Bundle:** `search/search.js`, approximately 22 KB.
- **Custom elements:** `<pinball-search>`.
- **Dependencies:** no external runtime packages. The bundle embeds the lightweight helper and component implementation; it does not include WebGL or audio.

## 🚀 Quick start

Load the standalone script and add the element to your HTML:

```html
<script src="search.js"></script>\n<pinball-search id="el" label="Search components" placeholder="Search the library…"></pinball-search>
```

Listen to the documented events and read the current properties:

```js
const search = document.querySelector('pinball-search');\nsearch.addEventListener('input', e => updateSuggestions(e.detail.value));\nsearch.addEventListener('search', e => runSearch(e.detail.value));
```

The component bundle is a plain script, not an ES module. It embeds the lightweight helper and this control; it has no external runtime dependencies.

## 🧩 API reference

### Attributes

| Attribute | Type | Default | Applies to / update behavior |
|---|---|---|---|
| value | String | Empty | Observed | Initial query. |
| placeholder | String | Search… | Observed | Input placeholder. |
| label | String | Search | Observed | Accessible label. |
| disabled | Boolean | Absent | Observed by shared base | Makes the host inert. |

Value, placeholder and label are reflected in the internal input.

### Properties

| Property | Type | Access | Details |
|---|---|---|---|
| value | string | Read/write | Current query string. |

### Methods

| Method | Details |
|---|---|
| search() | Emit the search event with the trimmed current query. |

### Events

| Event | Payload and trigger |
|---|---|
| input | CustomEvent, { value: string } Fires whenever the query changes. |
| search | CustomEvent, { value: string } Fires on form submit or Enter. |

The shared event helper dispatches custom events with `bubbles: true` and `composed: true`, so listeners can be attached to the custom element or an ancestor outside its Shadow DOM. Event names and payloads above describe this component's actual implementation.

## 🎮 Input and keyboard

**Pointer and touch:** Enter a query, then submit using the button or Enter.

**Keyboard:** The native search input supports text editing and Enter submission.

## 📝 Form integration

Does not directly contribute a form value. Listen for input or search and submit the query in your application.

## 🎨 Styling, rendering, and sound

The component sits in the shared Pinball UI metal deck with brushed-steel edges, four recessed fasteners, a component-specific backglass emblem, three pilot lamps, a chrome ball marker and a dark inset playfield. If PinballKit is already present, the marker uses the original shared chrome-ball shader; otherwise it falls back to CSS. The search field uses a wide input well and raised amber submit button.

This standalone file embeds the compact Pinmotion Extras base and this component implementation. It does not initialize or embed PinballKit, its WebGL runtime, shader source or recorded audio. Its component-specific backglass emblem and metal deck use the Pinball UI mechanical visual language. When PinballKit is already present, the backglass chrome-ball marker reuses its shared WebGL shader and user actions can reuse its sound effects. When loaded alone, the control remains self-contained and uses the CSS chrome-ball fallback.

## ♿ Motion and accessibility

No custom motion is used.

The interactive control lives in an open Shadow DOM and uses the semantic role and focus behavior described above. Set a useful `label`, or provide `aria-label` / `aria-labelledby` before connection. The mandatory Validate CI workflow runs the headless Chromium interaction suite, including gallery and standalone component checks. This automated browser coverage is not a substitute for a dedicated screen-reader audit.

## 🎯 Mechanical behavior

| Action | Result |
|---|---|
| Type | The input event fires with the live value. |
| Submit | The search event fires with a trimmed query. |

## ⚠️ Implementation notes and limits

- The search event carries a trimmed query. The input event carries the untrimmed current value.
- The component does not perform network requests or filter data by itself.
