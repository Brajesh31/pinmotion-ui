# Tabs

A tab set with keyboard navigation and named content slots. Each tab selects one corresponding panel while preserving light-DOM content.

## 📦 Bundle and elements

- **Bundle:** `tabs/tabs.js`, approximately 23 KB.
- **Custom elements:** `<pinball-tabs>`.
- **Dependencies:** no external runtime packages. The bundle embeds the lightweight helper and component implementation; it does not include WebGL or audio.

## 🚀 Quick start

Load the standalone script and add the element to your HTML:

```html
<script src="tabs.js"></script>\n<pinball-tabs id="el" labels="Overview,Details,History"><span slot="panel-0">The overview panel.</span><span slot="panel-1">Details about the control.</span><span slot="panel-2">Recent changes.</span></pinball-tabs>
```

Listen to the documented events and read the current properties:

```js
const tabs = document.querySelector('pinball-tabs');\ntabs.addEventListener('change', e => analytics.track('tab', e.detail));\ntabs.activeIndex = 1;\n// Add panel content as children with slot="panel-0", slot="panel-1", etc.
```

The component bundle is a plain script, not an ES module. It embeds the lightweight helper and this control; it has no external runtime dependencies.

## 🧩 API reference

### Attributes

| Attribute | Type | Default | Applies to / update behavior |
|---|---|---|---|
| labels | Comma-separated strings | Overview,Details,History | Observed | Tab labels; up to eight. |
| active | Integer | 0 | Observed | Selected tab index. |
| label | String | Tabs | Observed | Accessible name for the tablist. |
| disabled | Boolean | Absent | Observed by shared base | Makes the host inert. |

Labels and active index are observed after connection. Provide one slotted panel per tab using slot names panel-0, panel-1, and so on.

### Properties

| Property | Type | Access | Details |
|---|---|---|---|
| activeIndex | number | Read/write | Selected tab index. |

### Methods

| Method | Details |
|---|---|
| select(index, user = false) | Select a valid tab index. Pass user=true to emit change. |

### Events

| Event | Payload and trigger |
|---|---|
| change | CustomEvent, { activeIndex: number, label: string } Fires when a user selects another tab. |

The shared event helper dispatches custom events with `bubbles: true` and `composed: true`, so listeners can be attached to the custom element or an ancestor outside its Shadow DOM. Event names and payloads above describe this component's actual implementation.

## 🎮 Input and keyboard

**Pointer and touch:** Click a tab to activate its corresponding panel.

**Keyboard:** Arrow Left/Right cycle through tabs. Home and End jump to the first and last tabs.

## 📝 Form integration

Does not contribute a form value.

## 🎨 Styling, rendering, and sound

The component sits in the shared Pinball UI metal deck with brushed-steel edges, four recessed fasteners, a component-specific backglass emblem, three pilot lamps, a chrome ball marker and a dark inset playfield. If PinballKit is already present, the marker uses the original shared chrome-ball shader; otherwise it falls back to CSS. Tabs are styled as amber-underlined labels on a warm recessed machine panel.

This standalone file embeds the compact Pinmotion Extras base and this component implementation. It does not initialize or embed PinballKit, its WebGL runtime, shader source or recorded audio. Its component-specific backglass emblem and metal deck use the Pinball UI mechanical visual language. When PinballKit is already present, the backglass chrome-ball marker reuses its shared WebGL shader and user actions can reuse its sound effects. When loaded alone, the control remains self-contained and uses the CSS chrome-ball fallback.

## ♿ Motion and accessibility

No scripted animation is used.

The interactive control lives in an open Shadow DOM and uses the semantic role and focus behavior described above. Set a useful `label`, or provide `aria-label` / `aria-labelledby` before connection. The repository's optional automated interaction script uses headless Chromium; it is not a substitute for a screen-reader audit.

## 🎯 Mechanical behavior

| Action | Result |
|---|---|
| Select a tab | The selected tab receives aria-selected and its panel slot becomes active. |

## ⚠️ Implementation notes and limits

- Panel children remain in light DOM and are projected through slots named panel-N.
- The labels attribute supports up to eight tabs. Each panel should provide matching slot content.
