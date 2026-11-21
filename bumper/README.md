# Pop bumpers

One standalone bundle registers two related controls: a single pop bumper button and a fixed three-bumper cluster. Both score hits, but their configuration and event payloads are not identical.

## 📦 Bundle and elements

- **Bundle:** `bumper/bumper.js`, approximately 713 KB.
- **Custom elements:** `<pinball-bumper>`, `<pinball-bumpers>`.
- **Dependencies:** no external runtime packages. The selected bundle embeds its shared runtime, artwork, and sound data.

## 🚀 Quick start

Load the standalone script and add the element to your HTML:

```html
<script src="bumper.js"></script>
<pinball-bumper cap="+1" points="1" label="Clap"></pinball-bumper>
<pinball-bumpers caps="100,500,100" label="Bonus bumpers"></pinball-bumpers>
```

Listen to the documented events and read the current properties:

```js
const one = document.querySelector('pinball-bumper');
one.addEventListener('hit', (event) => {
  showSingleScore(event.detail.score);
});

const cluster = document.querySelector('pinball-bumpers');
cluster.addEventListener('hit', (event) => {
  showClusterScore(event.detail.score, event.detail.index);
});

cluster.launch(); // Launch a ball programmatically.
cluster.resetScore();
```

The component bundle is a plain script, not an ES module. Do not split it or remove its embedded artwork/runtime data. See [the repository README](../README.md) for the shadcn registry route and local development commands.

## 🧩 API reference

### Attributes

| Attribute | Type | Default | Applies to / update behavior |
|---|---|---|---|
| cap | String | `100` | `<pinball-bumper>` | Text printed on the single bumper cap. |
| points | Integer | Parsed from `cap`, else `100` | `<pinball-bumper>` | Explicit points per hit. The first integer parsed from `cap` is used when `points` is not a valid integer. |
| caps | Comma-separated strings | `100,500,100` | `<pinball-bumpers>` | Three cap labels for the cluster; missing entries use the defaults and extra entries are ignored. |
| label | String | `Bonus bumper` / cluster-specific fallback | Both elements | Accessible-name fallback for the relevant control. |
| disabled | Boolean | Absent | Both elements | Makes the host inert and prevents interaction. |

The single bumper observes `cap`, `points`, `label`, and `disabled`. The cluster observes `caps`, `label`, and `disabled`. Changes to cap text update the rendered cap labels.

### Properties

| Property | Type | Access | Details |
|---|---|---|---|
| `capText` | string | `<pinball-bumper>`; read-only getter | Current trimmed cap text. |
| `pointValue` | number | `<pinball-bumper>`; read-only getter | Effective points per single-bumper hit. |
| `count`, `score`, `combo` | number | `<pinball-bumper>`; readable state | Total hits, cumulative points, and current combo count. |
| `score`, `hits`, `combo` | number | `<pinball-bumpers>`; readable state | Cluster score, total bumper collisions, and current combo count. |

### Methods

| Method | Details |
|---|---|
| `launch(targetIdx = -1, user = false)` | `<pinball-bumpers>`; launch a ball. `targetIdx` may be 0, 1, or 2 to aim at a bumper; -1 selects the normal centre-funnel launch. |
| `resetScore()` | `<pinball-bumpers>`; reset `score`, `hits`, and `combo` to 0. It does not cancel balls already in play. |

### Events

| Event | Payload and trigger |
|---|---|
| `hit` | `<pinball-bumper>`: `{ index, cap, points, count, score, combo }` Fires for each pointer or keyboard activation of the single bumper. |
| `hit` | `<pinball-bumpers>`: `{ index, cap, points, count, score, combo, user }` Fires once for every bumper collision in the cluster. `index` is 0–2; `user` identifies whether the launch came from user activation. |

The shared event helper dispatches custom events with `bubbles: true` and `composed: true`, so listeners can be attached to the custom element or an ancestor outside its Shadow DOM. Event names and payloads above describe this component's actual implementation.

## 🎮 Input and keyboard

**Pointer and touch:** The single bumper registers a hit where it is pressed. The cluster launches a ball; pressing over a bumper aims the initial ball toward that bumper. Up to three balls can be active at once.

**Keyboard:** The single bumper uses a native button. The cluster uses a focusable `div` with `role="button"`. Space and Enter activate both.

## 📝 Form integration

Neither bumper element is form-associated. Treat `hit` as an action event and read the score properties for current totals.

## 🎨 Styling, rendering, and sound

Set `--pb-size` independently on each element. The single bumper defaults to 72px high; the cluster defaults to 240px. Both retain fixed aspect ratios. Set `--pb-page` to a six-digit hex page colour and `--pb-focus` to change the visible focus outline.

The shared chrome ball and lamps use WebGL. Set the instance's `silent` attribute to mute that element, or set `PinballKit.sound = false` to mute the shared page audio. Audio initializes after the first pointer or keyboard interaction, as browsers require.

## ♿ Motion and accessibility

The shared runtime honours `prefers-reduced-motion`; bumper hits and score changes occur without the ball travel animation.

The interactive control lives in an open Shadow DOM and uses the semantic role and focus behavior described above. Set a useful `label`, or provide `aria-label` / `aria-labelledby` before connection. The mandatory Validate CI workflow runs the headless Chromium interaction suite, including gallery and standalone component checks. This automated browser coverage is not a substitute for a dedicated screen-reader audit.

## 🎯 Mechanical behavior

| Action | Result |
|---|---|
| Single bumper | The cap pops, the lamp flashes, and one `hit` event is emitted. |
| Cluster | A ball ricochets between bumpers; one `hit` event is emitted per collision. |
| Rapid repeated launches | The cluster supports up to three balls active at once. |

## ⚠️ Implementation notes and limits

- A single bumper derives points from the first integer in `cap` unless a valid integer `points` attribute is provided.
- The cluster is always a fixed triangle of three bumpers. Its `hit` event includes `user`; the single bumper event does not.
- The cluster always contains three bumpers in a fixed triangle.
- Cap text is short by design; long labels may not fit the photographed caps.
- **It needs WebGL** for the ball and the lamps. Without it the control is still a working, focusable control, but the shader-drawn visuals are missing.
- **One kind of picture.** It scales with `--pb-size` and stays sharp to about three times its default size, but it does not reflow: the photographed body keeps its shape.
- **The ball mirrors the page.** Set `--pb-page` to a six-digit hex colour such as `#14161a` so its reflections match; the default is the cream the set was shot on.
- **The file is large** because photographs and sounds are embedded. Load only the controls a page uses.
- **Browser coverage.** The mandatory Validate CI workflow runs the headless Chromium interaction suite with touch and keyboard input at a mobile-width viewport. Safari, Firefox, physical devices, and screen-reader behavior are not documented as tested.
