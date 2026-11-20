# Accordion

An accordion with up to eight expandable sections, optional multiple-open behavior and named slotted panel content.

## 📦 Bundle and elements

- **Bundle:** `accordion/accordion.js`, approximately 14 KB.
- **Custom elements:** `<pinball-accordion>`.
- **Dependencies:** no external runtime packages. The bundle embeds the lightweight helper and component implementation; it does not include WebGL or audio.

## 🚀 Quick start

Load the standalone script and add the element to your HTML:

```html
<script src="accordion.js"></script>\n<pinball-accordion id="el" labels="Playfield,Scoring,Sound"><span slot="panel-0">Explore the playfield controls.</span><span slot="panel-1">Scoring and combo rules.</span><span slot="panel-2">Sound and reduced-motion settings.</span></pinball-accordion>
```

Listen to the documented events and read the current properties:

```js
const accordion = document.querySelector('pinball-accordion');\naccordion.addEventListener('change', e => console.log(e.detail.openItems));\naccordion.toggle(1);\n// Set multiple to allow more than one open section.
```

The component bundle is a plain script, not an ES module. It embeds the lightweight helper and this control; it has no external runtime dependencies.

## 🧩 API reference

### Attributes

| Attribute | Type | Default | Applies to / update behavior |
|---|---|---|---|
| labels | Comma-separated strings | Playfield,Scoring,Sound | Observed | Section headings; up to eight. |
| open | Comma-separated indexes | 0 | Observed | Indexes initially or currently open. |
| multiple | Boolean | Absent | Observed | Allows multiple sections to remain open. |
| label | String | Details | Observed | Label above the accordion group. |
| disabled | Boolean | Absent | Observed by shared base | Makes the host inert. |

Labels and open indexes are observed. Set slot=panel-N on child content for each panel.

### Properties

| Property | Type | Access | Details |
|---|---|---|---|
| expanded | number[] | Read/write | Indexes currently expanded. |

### Methods

| Method | Details |
|---|---|
| toggle(index, user = false) | Toggle one section. Pass user=true to emit change. |

### Events

| Event | Payload and trigger |
|---|---|
| change | CustomEvent, { index, open, openItems: number[] } Fires after a user opens or closes a section. |

The shared event helper dispatches custom events with `bubbles: true` and `composed: true`, so listeners can be attached to the custom element or an ancestor outside its Shadow DOM. Event names and payloads above describe this component's actual implementation.

## 🎮 Input and keyboard

**Pointer and touch:** Activate a section heading to expand or collapse it.

**Keyboard:** Each heading is a native button. Arrow Up/Down, Home and End move focus between headings.

## 📝 Form integration

Does not contribute a form value.

## 🎨 Styling, rendering, and sound

The component sits in the shared Pinball UI metal deck with brushed-steel edges, four recessed fasteners, a chrome ball marker, an amber pilot lamp and a dark inset playfield. Sections use mechanical-panel borders, amber state markers and collapsible content wells.

This standalone file embeds the compact Pinmotion Extras base and this component implementation. Its metal deck, chrome fasteners, amber pilot lamp and brass control styling follow the original PinballKit family. It does not load WebGL or recorded audio. When PinballKit is already present on the page, user actions reuse its recorded mechanical sound effects; when used alone, the component remains self-contained and silent.

## ♿ Motion and accessibility

Panels show and hide without a custom physics animation.

The interactive control lives in an open Shadow DOM and uses the semantic role and focus behavior described above. Set a useful `label`, or provide `aria-label` / `aria-labelledby` before connection. The repository's optional automated interaction script uses headless Chromium; it is not a substitute for a screen-reader audit.

## 🎯 Mechanical behavior

| Action | Result |
|---|---|
| Open a section | Its panel becomes visible and aria-expanded becomes true. |
| Close a section | Its panel is hidden. |

## ⚠️ Implementation notes and limits

- Panel slot names use their zero-based index.
- The labels attribute supports up to eight sections.
