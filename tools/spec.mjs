// What each control is, in one place. tools/docs.mjs turns this into every folder's README.md and index.html, the gallery,
// registry.json and llms.txt, so they cannot drift apart. Edit here, then run `node tools/docs.mjs`.
export const REPO = 'Brajesh31/pinmotion-ui';
export const SITE = 'https://brajesh31.github.io/pinmotion-ui';
export const AUTHOR = 'Brajesh Kumar (maintainer)';

// Limits every control shares; each README ends with its own, then these.
export const COMMON_LIMITS = [
  '**It needs WebGL** for the ball and the lamps. Without it the control is still a working, focusable control, but the shader-drawn visuals are missing.',
  '**One kind of picture.** It scales with `--pb-size` and stays sharp to about three times its default size, but it does not reflow: the photographed body keeps its shape.',
  '**The ball mirrors the page.** Set `--pb-page` to a six-digit hex colour such as `#14161a` so its reflections match; the default is the cream the set was shot on.',
  '**The file is large** because photographs and sounds are embedded. Load only the controls a page uses.',
  '**Browser coverage.** The mandatory Validate workflow runs the headless Chromium interaction suite with touch and keyboard input at a mobile-width viewport. Safari, Firefox, physical devices, and screen-reader behavior are not documented as tested.',
];

import { EXTRA_SPEC } from './extras-spec.mjs';

export const SPEC = [
  {
    id: 'toggle', name: 'Toggle', tag: 'pinball-toggle', kind: 'switch', categories: ['switch', 'toggle', 'pinball', 'webgl', 'animation'],
    size: { gallery: 'min(96px, 25vw)', page: 'min(140px, 26vw)' },
    sub: 'A switch whose knob is a steel pinball.',
    desc: 'A switch whose knob is a chrome pinball in a short lane. Flip it and the ball is kicked across, hits the far wall, rocks in its seat and settles, and the lamp under the on end lights.',
    docs: 'then use <pinball-toggle></pinball-toggle>. Read el.checked and listen for change. Works in forms with a name, like a checkbox.',
    api: {
      "overview": "A binary switch whose thumb is a live chrome ball. The checked state is logical state; the ball and lamp animate toward that state.",
      "tags": [
        "<pinball-toggle>"
      ],
      "quickStart": "<script src=\"toggle.js\"></script>\n<pinball-toggle name=\"notifications\" value=\"yes\" label=\"Push alerts\"></pinball-toggle>",
      "example": "const toggle = document.querySelector('pinball-toggle');\n\ntoggle.addEventListener('change', (event) => {\n  console.log('Checked:', event.detail.checked);\n});\n\ntoggle.checked = true; // Updates state without dispatching change or input.",
      "attributes": [
        [
          "checked",
          "Boolean",
          "Absent (off)",
          "Observed after connection",
          "Presence means on; removing it means off."
        ],
        [
          "disabled",
          "Boolean",
          "Absent",
          "Observed after connection",
          "Makes the host inert and prevents interaction."
        ],
        [
          "mode",
          "String enum",
          "`live`",
          "Observed after connection",
          "`live`, `plates`, or `3d`. The latter two are alternate rendering modes, not separate controls."
        ],
        [
          "label",
          "String",
          "`Toggle`",
          "Read on connection",
          "Accessible-name fallback when `aria-label` and `aria-labelledby` are not supplied. It is not observed for later changes."
        ],
        [
          "name",
          "String",
          "Omitted",
          "Form configuration",
          "Form field name. Set it before using the control in a form."
        ],
        [
          "value",
          "String",
          "`on`",
          "Form configuration",
          "Submitted while checked. An empty string also falls back to `on` in the current implementation."
        ]
      ],
      "attributeUpdates": "Only `checked`, `disabled`, and `mode` are observed after the element connects. Set `label`, `name`, and `value` before connection. The `checked` property and attribute stay synchronized.",
      "properties": [
        [
          "`checked`",
          "boolean",
          "Read/write",
          "Current logical switch value."
        ]
      ],
      "methods": [
        [
          "`toggle()`",
          "Flip the logical checked state programmatically. It does not emit user-interaction events."
        ]
      ],
      "events": [
        [
          "`change`",
          "CustomEvent, `detail: { checked: boolean }`",
          "Fires for user activation, including a drag that resolves to a new checked state. It does not fire for programmatic state changes."
        ],
        [
          "`input`",
          "Plain `Event`; **no `detail` payload**",
          "Fires immediately after `change` for the same user toggle. Read `event.target.checked` or use the `change` payload."
        ]
      ],
      "input": "Tap or click the switch button, or drag the ball along the lane and release. A drag resolves to the nearest end and commits the checked state.",
      "keyboard": "The internal control is a native button with `role=\"switch\"` and `aria-checked`. Space and Enter activate it.",
      "forms": "The control is form-associated. With `name` set, it submits no value while off. While on, it submits the `value` attribute, or `on` when that attribute is absent or empty. Native `form.reset()` restores the checked state captured when the element first connects and synchronizes its checked attribute and submitted value. Form-associated custom elements require browser support for `ElementInternals`.",
      "styling": "Set `--pb-size` to change the control height (36px by default). Set `--pb-page` to a six-digit hex colour matching the page background so the chrome reflections blend into the page. `--pb-focus` changes the visible keyboard-focus outline.",
      "motion": "The shared runtime honours `prefers-reduced-motion` by moving the ball directly to the final state. The lamp still reflects the checked state.",
      "notes": [
        "The visual `mode` attribute switches rendering style only. Do not use it as application state.",
        "Programmatic `.checked` changes and `toggle()` update the form value and rendering but deliberately do not emit `change` or `input`.",
        "Set `checked` or call `toggle()` before appending the element to seed its initial state; the reflected `checked` attribute is applied when the element connects.",
        "The shadow switch button receives its accessible name from `aria-labelledby` (resolved from the same document or shadow root), then `aria-label`, then `label`; set the naming attributes before connection.",
        "When `prefers-reduced-motion: reduce` is active, the ball, lamp and body spring snap to the final checked state without travel animation.",
        "A cancelled pointer or lost pointer capture rolls an unfinished drag back to the last checked state without firing change/input. Disconnecting during a drag clears transient pressed/held state before the element is reconnected.",
        "Native `form.reset()` restores the checked state captured at initial connection and updates the reflected attribute and form value without emitting user-interaction events."
      ],
      "happens": [
        [
          "Activate",
          "The ball is kicked toward the selected end; the lamp and sound feedback follow the ball."
        ],
        [
          "Drag and release",
          "The ball carries its release momentum, then settles at the nearest end."
        ],
        [
          "Disable",
          "The custom element becomes inert and visually muted."
        ]
      ],
      "limits": [
        "The `input` event is not a `CustomEvent` and has no `detail`; use `change.detail.checked` when you need a payload.",
        "The `label` attribute is read on connection rather than observed live. Set it before the element is inserted, or provide `aria-label` / `aria-labelledby`."
      ]
    },
    intro: ['A switch. The body is a photograph of a short pinball lane with a lamp under one end, and the knob is a chrome ball drawn live: it mirrors the lane under it, and its scratches turn as it rolls. Flip it and a solenoid kicks the ball across. It rolls, hits the far wall with a clack, the lamp\'s relay closes as the ball reaches the seat, a chime rings, and the ball rocks back and forth a few times before it comes to rest. You can also drag the ball and throw it.'],
    demo: { html: '<pinball-toggle id="el" label="Push alerts"></pinball-toggle>', hint: 'Press it, or drag the ball across and let go. Space flips it too.' },
    wire: "el.addEventListener('change', (e) => say(e.detail.checked ? 'On' : 'Off'));",
    use: '<script src="toggle.js"></script>\n<pinball-toggle label="Push alerts"></pinball-toggle>',
    js: "const el = document.querySelector('pinball-toggle');\nel.addEventListener('change', (e) => console.log(e.detail.checked));\nel.checked = true;    // from code: the ball is kicked across, with no change event\nel.toggle();",
    attrs: [['`checked`', 'starts on', 'off'], ['`label`', 'its name for screen readers', 'Toggle'], ['`name`, `value`', 'sent with its form when on, like a checkbox', '`on`'], ['`disabled`', 'greys it out and ignores presses', 'off'], ['`mode`', '`live`, or `plates` (a photographed ball that slides) or `3d` (no photographs at all): the three ways it was tried', '`live`']],
    notes: ['**It is a `<button role="switch">`** in the shadow root, with `aria-checked`. It takes focus; Space and Enter flip it.', '**`change` fires with `{ checked }`** when a person flips it, and an `input` event with it. Setting `checked` from code does not fire them.', '**Size** is `--pb-size`, its height: 36 pixels by default.'],
    happens: [['press', 'a solenoid kick, then the ball rolls across with a rolling sound'], ['the ball reaches the far end', 'it clacks into the wall, the lamp\'s relay closes, the lamp warms up from red to amber and a chime rings'], ['then', 'it rocks in its seat four or five times, each knock quieter, and settles'], ['drag the ball', 'it follows your finger; let go and it carries on with the speed it had, to whichever end it was heading']],
    limits: [],
  },
  {
    id: 'slider', name: 'Slider', tag: 'pinball-slider', kind: 'slider', categories: ['slider', 'range', 'pinball', 'webgl', 'animation'],
    size: { gallery: 'min(72px, 19vw)', page: 'min(96px, 19vw)' },
    sub: 'A slider whose thumb is a pinball rolling past ten lamps.',
    desc: 'A slider whose thumb is a chrome pinball rolling along a lane of ten lamps. Each lamp lights as the ball reaches it and goes out as the ball rolls back past it, so the lit lamps are the filled part of the track.',
    docs: 'then use <pinball-slider value="40" min="0" max="100"></pinball-slider>. Read el.value; it fires input while it moves and change when let go. Works in forms with a name.',
    api: {
      "overview": "A numeric range control with a rolling chrome-ball thumb and ten fixed lamps. The numeric value changes immediately; the ball animates toward the corresponding position.",
      "tags": [
        "<pinball-slider>"
      ],
      "quickStart": "<script src=\"slider.js\"></script>\n<pinball-slider name=\"volume\" min=\"0\" max=\"100\" step=\"1\" value=\"40\" label=\"Volume\"></pinball-slider>",
      "example": "const slider = document.querySelector('pinball-slider');\n\nslider.addEventListener('input', (event) => {\n  updatePreview(event.detail.value);\n});\n\nslider.addEventListener('change', (event) => {\n  saveSetting(event.detail.value);\n});\n\nslider.value = 80; // Programmatic update, without input or change events.",
      "attributes": [
        [
          "value",
          "Number",
          "`0`",
          "Observed after connection",
          "Initial numeric value; clamped to the configured range and snapped to the step grid."
        ],
        [
          "min",
          "Number",
          "`0`",
          "Observed after connection",
          "Lower bound."
        ],
        [
          "max",
          "Number",
          "`100`",
          "Observed after connection",
          "Upper bound. The effective maximum is never lower than `min`."
        ],
        [
          "step",
          "Number",
          "`1`",
          "Observed after connection",
          "Value increment. Use a positive step."
        ],
        [
          "disabled",
          "Boolean",
          "Absent",
          "Observed after connection",
          "Makes the host inert and prevents interaction."
        ],
        [
          "label",
          "String",
          "`Slider`",
          "Read on connection",
          "Accessible-name fallback. It is not observed for later changes."
        ],
        [
          "name",
          "String",
          "Omitted",
          "Form configuration",
          "Form field name. Set it before form submission."
        ]
      ],
      "attributeUpdates": "The `value`, `min`, `max`, `step`, and `disabled` attributes are observed after connection. Changing the range attributes re-snaps the current value and updates slider ARIA values. Set `label` and `name` before connection.",
      "properties": [
        [
          "`value`",
          "number",
          "Read/write",
          "Current numeric value."
        ],
        [
          "`min`",
          "number",
          "Read-only getter",
          "Effective lower bound from the `min` attribute."
        ],
        [
          "`max`",
          "number",
          "Read-only getter",
          "Effective upper bound, not lower than `min`."
        ],
        [
          "`stepSize`",
          "number",
          "Read-only getter",
          "Effective increment from the `step` attribute."
        ]
      ],
      "methods": [],
      "events": [
        [
          "`input`",
          "CustomEvent, `detail: { value: number }`",
          "Fires each time a user pointer or keyboard interaction changes the numeric value."
        ],
        [
          "`change`",
          "CustomEvent, `detail: { value: number }`",
          "Fires after a changed pointer drag ends, or immediately after a keyboard adjustment changes the value."
        ]
      ],
      "input": "Press anywhere on the track to move the thumb there, or drag the ball. The numeric value updates as the thumb moves.",
      "keyboard": "The focusable internal slider has `role=\"slider\"`. Arrow Right/Up increase by `step`; Arrow Left/Down decrease by `step`; Page Up/Down move by one tenth of the range (at least one step); Home and End go to the bounds.",
      "forms": "The control is form-associated. With `name` set, it submits the current number as a string. Form-associated custom elements require browser support for `ElementInternals`.",
      "styling": "Set `--pb-size` to change height (36px by default); width follows the photographed track's fixed aspect ratio. Set `--pb-page` to a six-digit hex page colour and `--pb-focus` to change the visible focus outline.",
      "motion": "The shared runtime honours `prefers-reduced-motion`; the thumb snaps to the final value while the value and lamp state remain available.",
      "notes": [
        "The track always has ten lamps. They visualize fill along the range; they do not represent the configured step count.",
        "The value is snapped to the nearest step relative to `min`, with decimal precision rounded to six places."
      ],
      "happens": [
        [
          "Press the track",
          "The numeric value changes to the pressed position and the ball rolls there."
        ],
        [
          "Drag the ball",
          "The value and `input` event update as the pointer moves."
        ],
        [
          "Release the pointer",
          "A `change` event fires if the drag changed the value."
        ],
        [
          "Reach a lamp",
          "The lamp lights or goes out as the ball passes it."
        ]
      ],
      "limits": [
        "The `label` attribute is read on connection rather than observed live. Set it before the element is inserted, or provide `aria-label` / `aria-labelledby`.",
        "Use a positive `step`; the component does not expose a separate `step` property, only the `stepSize` getter."
      ]
    },
    intro: ['A slider. The body is a photograph of a longer lane with ten round lamp inserts in it, and the thumb is the same live chrome ball as the toggle\'s. Drag the ball, press anywhere on the lane to send it there, or use the arrow keys. Each lamp lights with a relay tick as the ball reaches it, the ticks rising in pitch along the row, and a chime note plays for each lamp that lights. At either end the ball stops dead against the wall.'],
    demo: { html: '<pinball-slider id="el" value="40" label="Volume"></pinball-slider>', hint: 'Drag the ball, press the lane, or focus it and use the arrow keys. Home and End jump to the ends.' },
    wire: "el.addEventListener('input', (e) => say(String(e.detail.value)));",
    use: '<script src="slider.js"></script>\n<pinball-slider value="40" label="Volume"></pinball-slider>',
    js: "const el = document.querySelector('pinball-slider');\nel.addEventListener('input', (e) => setVolume(e.detail.value));   // while it moves\nel.addEventListener('change', () => save(el.value));               // when it is let go\nel.value = 80;        // from code: the ball rolls there, with no events",
    attrs: [['`value`', 'where it starts', '0'], ['`min`, `max`, `step`', 'the range', '0, 100, 1'], ['`label`', 'its name for screen readers', 'Slider'], ['`name`', 'sent with its form', ''], ['`disabled`', 'greys it out and ignores input', 'off']],
    notes: ['**It is an element with `role="slider"`** in the shadow root: it takes focus, the arrows step by `step`, Page Up and Page Down by a tenth of the range, Home and End go to the ends.', '**The ball rolls; it does not jump.** The value changes at once, and the ball catches up with a little overshoot.', '**Size** is `--pb-size`, its height: 36 pixels by default. It is about four and a half times as wide as it is high.'],
    happens: [['drag or press the lane', 'the ball rolls to the spot; each lamp it reaches lights with a relay tick and a chime note on a five-note scale'], ['roll back', 'each lamp it leaves goes out with a softer tick'], ['hit an end', 'a dead-stop clack and a small flinch of the body']],
    limits: ['**Always ten lamps,** whatever the range: they show the fill, not the steps.'],
  },
  {
    id: 'plunger', name: 'Plunger', tag: 'pinball-plunger', kind: 'pull to send', categories: ['button', 'send', 'confirm', 'pinball', 'webgl', 'animation'],
    size: { gallery: 'min(64px, 17vw)', page: 'min(92px, 18vw)' },
    sub: 'A pull-to-send button that is a pinball shooter rod.',
    desc: 'A send button you pull. It is a bare pinball shooter rod: knob, rod, spring and rubber tip. Pull the knob all the way back and a ball drops in front of the tip; let go and the plunger knocks the ball off the edge of the screen and fires send.',
    docs: 'then use <pinball-plunger label="Send"></pinball-plunger>. Listen for send; el.fire() does a full pull for you.',
    api: {
      "overview": "A pull-to-send action control built as a pinball shooter rod. A full pull followed by release sends the ball and emits `send`; a short pull springs back without sending.",
      "tags": [
        "<pinball-plunger>"
      ],
      "quickStart": "<script src=\"plunger.js\"></script>\n<pinball-plunger label=\"Send\"></pinball-plunger>",
      "example": "const plunger = document.querySelector('pinball-plunger');\n\nplunger.addEventListener('send', (event) => {\n  sendMessage({ power: event.detail.power });\n});\n\nplunger.fire(); // Programmatically perform a full pull and release.",
      "attributes": [
        [
          "label",
          "String",
          "`Send`",
          "Observed after connection",
          "Accessible-name fallback for the internal button."
        ],
        [
          "flip",
          "Boolean",
          "Absent",
          "Observed after connection",
          "Reverses the plunger orientation so the knob is on the left."
        ],
        [
          "disabled",
          "Boolean",
          "Absent",
          "Observed after connection",
          "Makes the host inert and prevents interaction."
        ]
      ],
      "attributeUpdates": "The `label`, `flip`, and `disabled` attributes are observed after connection. Changing `flip` reverses the control orientation.",
      "properties": [
        [
          "`flipped`",
          "boolean",
          "Read-only getter",
          "Whether the `flip` attribute is present."
        ]
      ],
      "methods": [
        [
          "`fire()`",
          "Start a programmatic full pull. The plunger completes the pull/release sequence and emits `send` when the ball is struck."
        ]
      ],
      "events": [
        [
          "`send`",
          "CustomEvent, `detail: { power: number }`",
          "Fires when the full pull/release sequence strikes the ball. `power` is normalized from 0 to 1."
        ]
      ],
      "input": "Drag the knob back and release it after the ball has dropped in front of the tip. A pointer tap only twitches the knob; it is not a send action. A release before the full pull does not emit `send`.",
      "keyboard": "The internal control is a native button. Hold Space or Enter to pull it back; release the key to shoot. A synthetic button activation, such as an assistive-technology click, invokes a full `fire()` sequence.",
      "forms": "The plunger is an action control and does not expose a form value.",
      "styling": "Set `--pb-size` to change the knob height (44px by default). Leave roughly one knob-height of space on the pull side and room on the tip side for the ball to travel. Set `--pb-focus` to change the visible focus outline.",
      "motion": "The Plunger honours `prefers-reduced-motion` through the shared runtime. Reduced-motion mode skips the spring, drop, bounce and ball-travel animations while preserving the full-pull action and `send` event.",
      "notes": [
        "The ball travels across the page above surrounding content before it is removed. Allow sufficient open space around the control.",
        "The public convenience method documented for application use is `fire()`; `send` is the completion event."
      ],
      "happens": [
        [
          "Pull the knob",
          "The spring compresses and the rod ratchets as the pull increases."
        ],
        [
          "Reach full pull",
          "A ball drops in front of the tip and bounces before the release."
        ],
        [
          "Release at full pull",
          "The plunger strikes the ball and emits `send` with normalized `power`."
        ],
        [
          "Release early",
          "The spring returns home; no `send` event is emitted."
        ]
      ],
      "limits": [
        "The travelling ball is drawn above page content and crosses the page before it disappears."
      ]
    },
    intro: ['A send button you have to mean. It is a pinball shooter rod with nothing round it: a black knob, a chrome collar, the rod, a red rubber tip, a steel bracket, and two springs drawn live, one that squashes and one that stretches. Drag the knob back. The rod ratchets every fifth of the way. Pull all the way and a steel ball drops in front of the pulled-back tip and bounces twice. Let go and the plunger slams forward and knocks the ball off the edge of the screen, and `send` fires. A shorter pull just springs back and sends nothing.'],
    demo: { html: '<pinball-plunger id="el" label="Send"></pinball-plunger>', hint: 'Drag the black knob all the way back, wait for the ball, and let go. Or hold Space and let go.' },
    wire: "let n = 0; el.addEventListener('send', () => say('Sent ' + ++n));",
    use: '<script src="plunger.js"></script>\n<pinball-plunger label="Send"></pinball-plunger>',
    js: "const el = document.querySelector('pinball-plunger');\nel.addEventListener('send', (e) => send(e.detail.power));   // power: how hard, 0 to 1\nel.fire();            // a full pull and release, from code",
    attrs: [['`label`', 'its name for screen readers', 'Send'], ['`flip`', 'puts the knob on the left: you pull left and the ball leaves to the right', 'off'], ['`disabled`', 'greys it out and ignores presses', 'off']],
    notes: ['**It is a `<button>`** in the shadow root. Hold Space or Enter to pull it back and let go to shoot; a screen reader can also press it, which does the whole pull.', '**Leave room on both sides.** About one knob-height on the knob\'s side for the pull, and on the tip\'s side for the ball. The ball leaves across the page: while it rolls away it is drawn above everything else, then removed.', '**Let go while the ball is still falling** and the plunger waits for it to land.', '**Size** is `--pb-size`, the height of the knob: 44 pixels by default.'],
    happens: [['drag the knob back', 'the spring squashes and the rod ratchets every fifth of the way'], ['pull all the way', 'a relay clicks, a ball drops in front of the tip, lands and bounces twice'], ['let go', 'the plunger slams forward, hits the ball and knocks it off the edge of the screen; `send` fires with `{ power }` at the hit'], ['let go early', 'it springs back home; nothing is sent']],
    limits: ['**The ball crosses the whole page,** above everything else, for about a second when reduced motion is not enabled.'],
  },
  {
    id: 'stepper', name: 'Stepper', tag: 'pinball-stepper', kind: 'stepper', categories: ['stepper', 'number', 'counter', 'pinball', 'webgl', 'animation'],
    size: { gallery: 'min(104px, 26vw)', page: 'min(128px, 26vw)' },
    sub: 'A number stepper: two flippers and a score reel.',
    desc: 'A number stepper made of two pinball flippers either side of a two-digit score reel. Press a flipper and it snaps up, the lamp flashes and the drums roll to the new number, carrying into the tens like an old score counter.',
    docs: 'then use <pinball-stepper value="4" min="0" max="99"></pinball-stepper>. Read el.value; it fires input and change. Works in forms with a name.',
    api: {
      "overview": "A whole-number stepper with two flippers and a mechanical score reel. The public value updates immediately while the illustrated drums animate into place.",
      "tags": [
        "<pinball-stepper>"
      ],
      "quickStart": "<script src=\"stepper.js\"></script>\n<pinball-stepper name=\"players\" value=\"4\" min=\"0\" max=\"99\" label=\"Players\"></pinball-stepper>",
      "example": "const stepper = document.querySelector('pinball-stepper');\n\nstepper.addEventListener('input', (event) => {\n  updatePreview(event.detail.value);\n});\n\nstepper.addEventListener('change', (event) => {\n  savePlayers(event.detail.value);\n});\n\nstepper.increment(5); // Programmatic update; no user-interaction events.",
      "attributes": [
        [
          "value",
          "Number",
          "`0`",
          "Observed after connection",
          "Initial value; clamped to the range and snapped to the configured integer step."
        ],
        [
          "min",
          "Number",
          "`0`",
          "Observed after connection",
          "Lower bound. Keep it non-negative because the visual score reel has no minus sign."
        ],
        [
          "max",
          "Number",
          "`99`",
          "Observed after connection",
          "Upper bound; the effective maximum is never lower than `min`."
        ],
        [
          "step",
          "Integer",
          "`1`",
          "Observed after connection",
          "Increment, rounded to an integer and kept at least 1."
        ],
        [
          "digits",
          "Integer",
          "Automatic",
          "Observed after connection",
          "Force 2 to 4 drums. Otherwise the count is derived from `max`, with at least two drums and at most four."
        ],
        [
          "label",
          "String",
          "`Stepper`",
          "Observed after connection",
          "Accessible-name fallback for the spinbutton."
        ],
        [
          "name",
          "String",
          "Omitted",
          "Form configuration",
          "Form field name."
        ],
        [
          "disabled",
          "Boolean",
          "Absent",
          "Observed after connection",
          "Makes the host inert and prevents interaction."
        ]
      ],
      "attributeUpdates": "The `value`, `min`, `max`, `step`, `digits`, `label`, and `disabled` attributes are observed after connection. Range changes re-snap the current value. Set `name` before form submission.",
      "properties": [
        [
          "`value`",
          "number",
          "Read/write",
          "Current whole-number value."
        ],
        [
          "`min`",
          "number",
          "Read-only getter",
          "Effective lower bound."
        ],
        [
          "`max`",
          "number",
          "Read-only getter",
          "Effective upper bound, not lower than `min`."
        ],
        [
          "`stepSize`",
          "number",
          "Read-only getter",
          "Effective integer step, at least 1."
        ],
        [
          "`digitCount`",
          "number",
          "Read-only getter",
          "Current number of score-reel drums, from 2 to 4."
        ]
      ],
      "methods": [
        [
          "`increment(n = 1)`",
          "Increase by `n` configured steps. Programmatic calls do not emit `input` or `change`."
        ],
        [
          "`decrement(n = 1)`",
          "Decrease by `n` configured steps. Programmatic calls do not emit `input` or `change`."
        ]
      ],
      "events": [
        [
          "`input`",
          "CustomEvent, `detail: { value: number }`",
          "Fires when a user interaction changes the value, including each auto-repeat step while a flipper is held."
        ],
        [
          "`change`",
          "CustomEvent, `detail: { value: number }`",
          "Fires for each user-initiated step that changes the value, including hold-to-repeat."
        ]
      ],
      "input": "Press a plus/minus flipper, hold it for repeated steps, or drag the score reels vertically. Flipper presses focus the spinbutton control.",
      "keyboard": "The focusable internal control has `role=\"spinbutton\"`. Arrow Right/Up and `+`/`=` increase; Arrow Left/Down and `-`/`_` decrease. Page Up/Down move by roughly one tenth of the configured range (at least one step); Home/End go to the bounds. Holding an increment/decrement key repeats.",
      "forms": "The control is form-associated. With `name` set, it submits the current whole number as a string. Form-associated custom elements require browser support for `ElementInternals`.",
      "styling": "Set `--pb-size` to change height (52px by default); the housing keeps its fixed aspect ratio. Set `--pb-page` to a six-digit hex page colour and `--pb-focus` to change the visible focus outline.",
      "motion": "The shared runtime honours `prefers-reduced-motion`; the drums and flippers snap to their final state while the value remains available.",
      "notes": [
        "The default range is 0 through 99. Keep `min` non-negative because the visual drum renderer has no minus sign.",
        "The configured `step` is rounded to a whole number and cannot be less than 1. `digits` affects the number of displayed drums, not the value range."
      ],
      "happens": [
        [
          "Press a flipper",
          "The value steps once, the flipper snaps up, and the score drums roll."
        ],
        [
          "Hold a flipper or direction key",
          "The control repeats the configured step and emits user events for each changed value."
        ],
        [
          "Cross a decimal place",
          "The higher drum follows after a short mechanical carry delay."
        ],
        [
          "Reach a bound",
          "The value does not change; the control produces a mechanical stop response."
        ]
      ],
      "limits": [
        "The visual score reel has no minus sign. Use a non-negative `min` even though the numeric range attributes accept numbers.",
        "The drum display supports at most four places."
      ]
    },
    intro: ['A number stepper. A minus flipper and a plus flipper sit either side of a steel housing with an electromechanical score reel behind glass and an amber lamp on top. Press a flipper: its solenoid fires, it snaps up, the lamp flashes, and the number drums roll to the new value, the tens drum turning over when the ones carry, and settle with a small bounce on their detent. Hold a flipper to repeat. You can also drag the drums up and down.'],
    demo: { html: '<pinball-stepper id="el" value="4" min="0" max="99" label="Players"></pinball-stepper>', hint: 'Press or hold a flipper, drag the drums up or down, or focus it and use the arrow keys.' },
    wire: "el.addEventListener('input', (e) => say(String(e.detail.value).padStart(2, '0')));",
    use: '<script src="stepper.js"></script>\n<pinball-stepper value="4" min="0" max="99" label="Players"></pinball-stepper>',
    js: "const el = document.querySelector('pinball-stepper');\nel.addEventListener('change', () => setPlayers(el.value));\nel.increment();       // or el.decrement(), or el.increment(5)\nel.value = 42;        // from code: the drums roll there, with no events",
    attrs: [['`value`', 'where it starts', '0'], ['`min`, `max`, `step`', 'the range; whole numbers only', '0, 99, 1'], ['`digits`', 'how many drums, 2 to 4', 'as many as `max` needs, at least 2'], ['`label`', 'its name for screen readers', 'Stepper'], ['`name`', 'sent with its form', ''], ['`disabled`', 'greys it out and ignores input', 'off']],
    notes: ['**It is a `role="spinbutton"`** in the shadow root: the arrows and + and - step, Page Up and Page Down step by ten, Home and End go to the ends, and the flipper on that side moves with the key.', '**Size** is `--pb-size`, its height: 52 pixels by default.'],
    happens: [['press a flipper', 'the solenoid fires, the flipper snaps up, the lamp flashes, the drums roll one step'], ['hold it', 'it repeats, the solenoid re-pulsing with each step'], ['pass a ten', 'the tens drum turns over too, a little after the ones'], ['press at the limit', 'the drums nudge and knock against the stop; the number does not change']],
    limits: ['**Whole numbers only,** and no negative numbers.'],
  },
  {
    id: 'targets', name: 'Drop targets', tag: 'pinball-targets', kind: 'checkboxes', categories: ['checkbox', 'checklist', 'pinball', 'webgl', 'animation'],
    size: { gallery: 'min(136px, 36vw)', page: 'min(180px, 36vw)' },
    sub: 'Up to four checkboxes as a bank of drop targets.',
    desc: 'A row of up to four checkboxes as a bank of pinball drop targets with your labels printed on them. Tick one and a ball rolls in, knocks its target down and lights its lamp; untick it and the target springs back up. Knock all four down for a bonus chime.',
    docs: 'then use <pinball-targets items="EMAIL,PUSH,TEXT,CALLS" checked="0,2"></pinball-targets>. Read el.selected (the ticked items) or el.checked (an array of booleans); it fires change and, when all are ticked, bonus. Works in forms with a name.',
    api: {
      "overview": "A checkbox group with up to four custom-labeled drop targets. The checked state is logical form state; the target artwork animates as the ball knocks each target down.",
      "tags": [
        "<pinball-targets>"
      ],
      "quickStart": "<script src=\"targets.js\"></script>\n<pinball-targets name=\"channels\" items=\"EMAIL,PUSH,TEXT,CALLS\" checked=\"0,2\" label=\"Notification channels\"></pinball-targets>",
      "example": "const targets = document.querySelector('pinball-targets');\n\ntargets.addEventListener('change', (event) => {\n  console.log(event.detail.item, event.detail.checked, event.detail.selected);\n});\n\ntargets.addEventListener('bonus', (event) => {\n  celebrate(event.detail.selected);\n});\n\ntargets.setChecked(1, true); // Programmatic by default: no change event.",
      "attributes": [
        [
          "items",
          "Comma-separated strings",
          "`EMAIL,PUSH,TEXT,CALLS`",
          "Observed after connection",
          "Target labels. Empty entries are removed; at most four labels are used. If no usable labels remain, the default list is restored."
        ],
        [
          "checked",
          "Comma-separated indexes or labels",
          "None",
          "Observed after connection",
          "Initial checked set. Indexes are zero-based (0 to 3); label matching is case-insensitive."
        ],
        [
          "label",
          "String",
          "`Bonus targets`",
          "Observed after connection",
          "Accessible name for the checkbox group."
        ],
        [
          "name",
          "String",
          "Omitted",
          "Form configuration",
          "Form field name."
        ],
        [
          "disabled",
          "Boolean",
          "Absent",
          "Observed after connection",
          "Makes the host inert and prevents interaction."
        ]
      ],
      "attributeUpdates": "The `items`, `checked`, `label`, and `disabled` attributes are observed after connection. Changing `items` rebuilds the visible button labels; changing `checked` updates logical state. Set `name` before form submission.",
      "properties": [
        [
          "`checked`",
          "boolean[]",
          "Read/write",
          "Array of checked states, in the current item order. Assigning a non-array is ignored."
        ],
        [
          "`selected`",
          "string[]",
          "Read-only getter",
          "Labels for currently checked items, in item order."
        ]
      ],
      "methods": [
        [
          "`toggle(index, user = false)`",
          "Invert one item. Pass `user: true` to emit the user-style `change` event."
        ],
        [
          "`setChecked(index, checked, user = false)`",
          "Set one item. The default programmatic call is silent."
        ],
        [
          "`resetAll(user = false)`",
          "Clear all checked items. With `user: true`, emits one summary `change` event using `index: -1` and `item: null."
        ]
      ],
      "events": [
        [
          "`change`",
          "CustomEvent, `detail: { index, item, checked, selected, allChecked }`",
          "Fires for a user toggle. `selected` is a snapshot of checked labels after the update. `resetAll(true)` emits a summary event with index -1."
        ],
        [
          "`bonus`",
          "CustomEvent, `detail: { selected: string[] }`",
          "Fires when the final target impact completes the cleared bank in normal-motion mode. It is tied to the impact animation."
        ]
      ],
      "input": "Activate a target to check or uncheck it. The `checked` property updates immediately; the target drop animation follows.",
      "keyboard": "Each target is a native button with `role=\"checkbox\"`. Space and Enter activate the focused target. Arrow Left/Right move focus between targets and wrap at either end.",
      "forms": "The control is form-associated. With `name` set, it submits the checked labels joined by commas (for example `EMAIL,PUSH`). Form-associated custom elements require browser support for `ElementInternals`.",
      "styling": "Set `--pb-size` to change the bank height (84px by default). The bank has four photographed slots and retains its aspect ratio. Set `--pb-page` to a six-digit hex page colour and `--pb-focus` to change the visible focus outline.",
      "motion": "The shared runtime honours `prefers-reduced-motion` by snapping targets and lamps to their final visual state. In this mode the normal impact callback is skipped, so the `bonus` event is currently not emitted; use `change` and `allChecked` for application logic.",
      "notes": [
        "The `bonus` event is associated with the target impact animation. Do not make business logic depend on it when reduced motion is enabled; `change.detail.allChecked` is the reliable state signal.",
        "The group has a maximum of four labels. Keep labels short; the photographed target face has limited space."
      ],
      "happens": [
        [
          "Check a target",
          "A ball rolls in, knocks the target down, and lights its lamp."
        ],
        [
          "Uncheck a target",
          "The reset solenoid raises the target and turns its lamp off."
        ],
        [
          "Complete the bank",
          "The final impact emits `bonus` in normal-motion mode."
        ]
      ],
      "limits": [
        "Four targets maximum. Labels are printed inside the photographed target faces; short labels work best.",
        "In reduced-motion mode, `bonus` is not emitted by the current implementation."
      ]
    },
    intro: ['A checkbox group of up to four. The body is a photograph of a steel drop-target bank with an amber lamp in front of each slot, and the targets are ivory blocks with your words printed on them. Tick an item and a chrome ball rolls in from below, knocks its target down into the slot, lights the lamp and bounces away. Untick it and the reset solenoid pops the target back up and the lamp goes dark. Knock the last one down and a three-note bonus chime plays.'],
    demo: { html: '<pinball-targets id="el" items="EMAIL,PUSH,TEXT,CALLS" checked="0,2" label="Alerts"></pinball-targets>', hint: 'Press a target to tick or untick it, or Tab to it and press Space. Knock all four down.' },
    wire: "const show = () => say(el.selected.length ? el.selected.join(' · ') : 'None'); el.addEventListener('change', show); el.addEventListener('bonus', () => say('All four')); show();",
    use: '<script src="targets.js"></script>\n<pinball-targets items="EMAIL,PUSH,TEXT,CALLS" checked="0,2" label="Alerts"></pinball-targets>',
    js: "const el = document.querySelector('pinball-targets');\nel.addEventListener('change', (e) => console.log(e.detail.item, e.detail.checked, el.selected));\nel.addEventListener('bonus', () => celebrate());   // all of them ticked\nel.setChecked(1, true);   // or el.toggle(1), el.resetAll(), el.checked = [true, false, true, false]",
    attrs: [['`items`', 'the labels, comma-separated, up to four', 'EMAIL,PUSH,TEXT,CALLS'], ['`checked`', 'which start ticked, by position from 0 or by label', 'none'], ['`label`', 'the group\'s name for screen readers', 'Bonus targets'], ['`name`', 'sent with its form as the ticked labels, comma-separated', ''], ['`disabled`', 'greys it out and ignores presses', 'off']],
    notes: ['**It is a `role="group"` of `<button role="checkbox">`s** in the shadow root, one per target, each named by its label. Left and right arrows move between them; Space or Enter ticks.', '**`change` fires with `{ index, item, checked, selected, allChecked }`**, and `bonus` with `{ selected }` when the last one goes down.', '**Size** is `--pb-size`, the bank\'s height: 84 pixels by default.'],
    happens: [['tick', 'a solenoid kick, a ball rolls in from below and knocks the target down; the lamp lights and a chime note rises with each target down'], ['untick', 'the reset solenoid fires, the target pops back up with a relay click, the lamp goes out'], ['tick the last one', 'the bonus chime: three rising notes']],
    limits: ['**Four at most.** The bank is photographed with four slots; with fewer items the spare slots stay empty.', '**Short labels.** About six capital letters fit on a target.'],
  },
  {
    id: 'drain', name: 'Drain', tag: 'pinball-drain', kind: 'delete and undo', categories: ['delete', 'undo', 'button', 'pinball', 'webgl', 'animation'],
    size: { gallery: 'min(180px, 46vw)', page: 'min(220px, 44vw)' },
    sub: 'Delete with undo: drain the ball, SHOOT AGAIN to save it.',
    desc: 'A delete button with an undo window, built from a pinball outhole and a SHOOT AGAIN lamp. Press or drag the ball into the drain to delete; SHOOT AGAIN blinks while you can still undo, and pressing it kicks the ball back out.',
    docs: 'then use <pinball-drain window="6000" label="Delete draft"></pinball-drain>. Listen for delete, undo and commit (the delete is final); el.reset() serves a new ball.',
    api: {
      "overview": "A delete action with a timed undo window. The ball drains to represent deletion; the SHOOT AGAIN control restores it before the countdown expires.",
      "tags": [
        "<pinball-drain>"
      ],
      "quickStart": "<script src=\"drain.js\"></script>\n<pinball-drain window=\"6000\" label=\"Delete draft\"></pinball-drain>",
      "example": "const drain = document.querySelector('pinball-drain');\n\ndrain.addEventListener('delete', (event) => {\n  hideDraft({ undoMs: event.detail.undoMs });\n});\n\ndrain.addEventListener('undo', () => showDraft());\ndrain.addEventListener('commit', () => destroyDraft());\n\ndrain.addEventListener('reset', () => prepareNextDraft());",
      "attributes": [
        [
          "window",
          "Number (milliseconds)",
          "`6000`",
          "Observed after connection",
          "Undo duration, read when a delete starts. A value of 0 makes deletion final immediately. Invalid or negative values fall back to 6000ms."
        ],
        [
          "label",
          "String",
          "`Delete and undo`",
          "Observed after connection",
          "Accessible name for the control group."
        ],
        [
          "disabled",
          "Boolean",
          "Absent",
          "Observed after connection",
          "Makes the host inert and prevents interaction."
        ]
      ],
      "attributeUpdates": "The `window`, `label`, and `disabled` attributes are observed after connection. Set `window` before triggering a delete; changing it during an active countdown does not rewrite the timer already started.",
      "properties": [
        [
          "`state`",
          "string",
          "Read-only by convention",
          "Current lifecycle state: `ready`, `draining`, `undoable`, `saving`, or `gone`."
        ],
        [
          "`undoWindow`",
          "number",
          "Read-only getter",
          "Effective undo duration in milliseconds."
        ],
        [
          "`remaining`",
          "number",
          "Read-only getter",
          "Remaining milliseconds while state is `undoable`; otherwise 0."
        ]
      ],
      "methods": [
        [
          "`delete(user = false, initialVel = 180)`",
          "Begin deletion when the control is ready. Use the UI for normal interaction; passing `true` as the first argument emits the `delete` event."
        ],
        [
          "`undo(user = false)`",
          "Restore while state is `draining` or `undoable`. Passing `true` emits `undo`."
        ],
        [
          "`reset(user = false)`",
          "Serve a fresh ball and return to `ready`. Passing `true` emits `reset`."
        ]
      ],
      "events": [
        [
          "`delete`",
          "CustomEvent, `detail: { undoMs: number }`",
          "Fires when a user starts deletion, before the ball finishes draining."
        ],
        [
          "`undo`",
          "CustomEvent, empty detail object",
          "Fires when a user restores the item using SHOOT AGAIN."
        ],
        [
          "`commit`",
          "CustomEvent, empty detail object",
          "Fires when the undo window expires. With `window=\"0\"`, it fires immediately after deletion."
        ],
        [
          "`reset`",
          "CustomEvent, empty detail object",
          "Only emitted when `reset(true)` is called. The normal `reset()` programmatic call is silent."
        ]
      ],
      "input": "Click the ball/chute or drag the ball downward. SHOOT AGAIN restores the item while the state is `draining` or `undoable`.",
      "keyboard": "The chute and SHOOT AGAIN are native buttons and support normal button activation (Enter/Space). Delete and Backspace on the chute also begin deletion. SHOOT AGAIN is exposed with `aria-disabled` when undo is unavailable; its handler also checks lifecycle state.",
      "forms": "The drain is an action control and does not expose a form value.",
      "styling": "Set `--pb-size` to change the plate height (112px by default). Set `--pb-page` to a six-digit hex page colour and `--pb-focus` to change the visible focus outline.",
      "motion": "The shared runtime honours `prefers-reduced-motion`; the ball moves directly to its state destination, while the undo countdown and lifecycle continue.",
      "notes": [
        "The `delete` event occurs at the start of the drain animation. Treat it as the beginning of the undo window, not as proof that the commit has happened.",
        "After `commit`, the component remains in `gone` until `reset()` is called. The demo page resets it automatically for demonstration purposes."
      ],
      "happens": [
        [
          "Delete",
          "The ball rolls down the chute; state becomes `draining` and `delete` fires."
        ],
        [
          "Undo is available",
          "The state becomes `undoable` and the SHOOT AGAIN lamp blinks while time remains."
        ],
        [
          "Undo",
          "The ball is kicked back; `undo` fires."
        ],
        [
          "Timer expires",
          "`commit` fires and state becomes `gone`."
        ]
      ],
      "limits": [
        "After `commit`, the component stays empty until your application calls `reset()`.",
        "A `window` of 0 removes the undo opportunity and emits `commit` immediately after deletion."
      ]
    },
    intro: ['Delete, with undo. A steel plate holds a chute with a ball resting at the top, a dark outhole at the bottom, and a round SHOOT AGAIN lamp. Press the ball, or drag it down the chute, and it rolls into the hole and drops out of sight: that is the delete. SHOOT AGAIN starts blinking for the undo window, faster near the end. Press it and the ball-save kickback fires the ball straight back up out of the drain, with two chime notes: that is the undo. Let the window run out and the lamp goes dark and the delete is final.'],
    demo: { html: '<pinball-drain id="el" window="6000" label="Delete draft"></pinball-drain>', hint: 'Press the ball or drag it into the drain, then press SHOOT AGAIN before it stops blinking.' },
    wire: "el.addEventListener('delete', () => say('Deleted. Undo?')); el.addEventListener('undo', () => say('Saved')); el.addEventListener('commit', () => { say('Gone'); setTimeout(() => { el.reset(); say(''); }, 1600); });",
    use: '<script src="drain.js"></script>\n<pinball-drain window="6000" label="Delete draft"></pinball-drain>',
    js: "const el = document.querySelector('pinball-drain');\nel.addEventListener('delete', (e) => hide(draft));        // e.detail.undoMs: how long undo lasts\nel.addEventListener('undo', () => show(draft));\nel.addEventListener('commit', () => destroy(draft));      // the window ran out\nel.state;             // 'ready', 'draining', 'undoable', 'saving' or 'gone'\nel.reset();           // a new ball at the top, ready again",
    attrs: [['`window`', 'how long undo lasts, in milliseconds; 0 makes the delete final at once', '6000'], ['`label`', 'the group\'s name for screen readers', 'Delete and undo'], ['`disabled`', 'greys it out and ignores presses', 'off']],
    notes: ['**Two `<button>`s** in the shadow root: the chute (Enter, Space, Delete or Backspace drains the ball) and SHOOT AGAIN, which is `aria-disabled` except while undo is possible.', '**After `commit` it stays empty** until you call `reset()`. The demo pages reset it after a moment.', '**`el.remaining`** is how many milliseconds of undo are left.', '**Size** is `--pb-size`, its height: 112 pixels by default.'],
    happens: [['press the ball or drag it down', 'a relay, then the ball rolls down the chute and drops into the hole; `delete` fires'], ['during the window', 'SHOOT AGAIN blinks, then blinks faster near the end'], ['press SHOOT AGAIN', 'the kickback solenoid fires the ball back up the chute with a streak and two chime notes; `undo` fires'], ['let it run out', 'a low chime, the lamp goes dark; `commit` fires']],
    limits: [],
  },
  {
    id: 'bumper', name: 'Pop bumpers', tag: 'pinball-bumpers', kind: 'button', categories: ['button', 'like', 'counter', 'pinball', 'webgl', 'animation'],
    size: { gallery: 'min(250px, 66vw)', page: 'min(300px, 60vw)' },
    sub: 'A button as a pop bumper, and a three-bumper cluster.',
    desc: 'Pinball pop bumpers as buttons. One file defines two: <pinball-bumper>, a single bumper you press like a clap or upvote button, and <pinball-bumpers>, a triangle of three that a ball ricochets around when you press it, scoring as it goes.',
    docs: 'then use <pinball-bumper cap="+1"></pinball-bumper> for one button, or <pinball-bumpers caps="100,500,100"></pinball-bumpers> for the cluster. Both fire hit with { points, score, combo }.',
    api: {
      "overview": "One standalone bundle registers two related controls: a single pop bumper button and a fixed three-bumper cluster. Both score hits, but their configuration and event payloads are not identical.",
      "tags": [
        "<pinball-bumper>",
        "<pinball-bumpers>"
      ],
      "quickStart": "<script src=\"bumper.js\"></script>\n<pinball-bumper cap=\"+1\" points=\"1\" label=\"Clap\"></pinball-bumper>\n<pinball-bumpers caps=\"100,500,100\" label=\"Bonus bumpers\"></pinball-bumpers>",
      "example": "const one = document.querySelector('pinball-bumper');\none.addEventListener('hit', (event) => {\n  showSingleScore(event.detail.score);\n});\n\nconst cluster = document.querySelector('pinball-bumpers');\ncluster.addEventListener('hit', (event) => {\n  showClusterScore(event.detail.score, event.detail.index);\n});\n\ncluster.launch(); // Launch a ball programmatically.\ncluster.resetScore();",
      "attributes": [
        [
          "cap",
          "String",
          "`100`",
          "`<pinball-bumper>`",
          "Text printed on the single bumper cap."
        ],
        [
          "points",
          "Integer",
          "Parsed from `cap`, else `100`",
          "`<pinball-bumper>`",
          "Explicit points per hit. The first integer parsed from `cap` is used when `points` is not a valid integer."
        ],
        [
          "caps",
          "Comma-separated strings",
          "`100,500,100`",
          "`<pinball-bumpers>`",
          "Three cap labels for the cluster; missing entries use the defaults and extra entries are ignored."
        ],
        [
          "label",
          "String",
          "`Bonus bumper` / cluster-specific fallback",
          "Both elements",
          "Accessible-name fallback for the relevant control."
        ],
        [
          "disabled",
          "Boolean",
          "Absent",
          "Both elements",
          "Makes the host inert and prevents interaction."
        ]
      ],
      "attributeUpdates": "The single bumper observes `cap`, `points`, `label`, and `disabled`. The cluster observes `caps`, `label`, and `disabled`. Changes to cap text update the rendered cap labels.",
      "properties": [
        [
          "`capText`",
          "string",
          "`<pinball-bumper>`; read-only getter",
          "Current trimmed cap text."
        ],
        [
          "`pointValue`",
          "number",
          "`<pinball-bumper>`; read-only getter",
          "Effective points per single-bumper hit."
        ],
        [
          "`count`, `score`, `combo`",
          "number",
          "`<pinball-bumper>`; readable state",
          "Total hits, cumulative points, and current combo count."
        ],
        [
          "`score`, `hits`, `combo`",
          "number",
          "`<pinball-bumpers>`; readable state",
          "Cluster score, total bumper collisions, and current combo count."
        ]
      ],
      "methods": [
        [
          "`launch(targetIdx = -1, user = false)`",
          "`<pinball-bumpers>`; launch a ball. `targetIdx` may be 0, 1, or 2 to aim at a bumper; -1 selects the normal centre-funnel launch."
        ],
        [
          "`resetScore()`",
          "`<pinball-bumpers>`; reset `score`, `hits`, and `combo` to 0. It does not cancel balls already in play."
        ]
      ],
      "events": [
        [
          "`hit`",
          "`<pinball-bumper>`: `{ index, cap, points, count, score, combo }`",
          "Fires for each pointer or keyboard activation of the single bumper."
        ],
        [
          "`hit`",
          "`<pinball-bumpers>`: `{ index, cap, points, count, score, combo, user }`",
          "Fires once for every bumper collision in the cluster. `index` is 0–2; `user` identifies whether the launch came from user activation."
        ]
      ],
      "input": "The single bumper registers a hit where it is pressed. The cluster launches a ball; pressing over a bumper aims the initial ball toward that bumper. Up to three balls can be active at once.",
      "keyboard": "The single bumper uses a native button. The cluster uses a focusable `div` with `role=\"button\"`. Space and Enter activate both.",
      "forms": "Neither bumper element is form-associated. Treat `hit` as an action event and read the score properties for current totals.",
      "styling": "Set `--pb-size` independently on each element. The single bumper defaults to 72px high; the cluster defaults to 240px. Both retain fixed aspect ratios. Set `--pb-page` to a six-digit hex page colour and `--pb-focus` to change the visible focus outline.",
      "motion": "The shared runtime honours `prefers-reduced-motion`; bumper hits and score changes occur without the ball travel animation.",
      "notes": [
        "A single bumper derives points from the first integer in `cap` unless a valid integer `points` attribute is provided.",
        "The cluster is always a fixed triangle of three bumpers. Its `hit` event includes `user`; the single bumper event does not."
      ],
      "happens": [
        [
          "Single bumper",
          "The cap pops, the lamp flashes, and one `hit` event is emitted."
        ],
        [
          "Cluster",
          "A ball ricochets between bumpers; one `hit` event is emitted per collision."
        ],
        [
          "Rapid repeated launches",
          "The cluster supports up to three balls active at once."
        ]
      ],
      "limits": [
        "The cluster always contains three bumpers in a fixed triangle.",
        "Cap text is short by design; long labels may not fit the photographed caps."
      ]
    },
    intro: ['Buttons as pop bumpers. The bumper is a photograph of a red and cream bumper cap on a chrome skirt, with your own text printed on the cap. Press `<pinball-bumper>` and its solenoid fires: the skirt pops, the lamp under the cap flashes amber, and a chime plays, climbing a five-note scale if you keep pressing quickly. `<pinball-bumpers>` is three bumpers in a triangle: press it and a chrome ball drops in from the top and ricochets between them four to six times, firing each one it hits. Press again while it is still going and up to three balls play at once.'],
    demo: { html: '<pinball-bumpers id="el" caps="100,500,100" label="Bonus bumpers"></pinball-bumpers>', hint: 'Press the cluster to drop a ball in; press quickly for more balls. Or Tab to it and press Space.' },
    wire: "el.addEventListener('hit', (e) => say('+' + e.detail.points + ' · ' + e.detail.score.toLocaleString()));",
    use: '<script src="bumper.js"></script>\n<pinball-bumper cap="+1" label="Clap"></pinball-bumper>\n<pinball-bumpers caps="100,500,100"></pinball-bumpers>',
    js: "const one = document.querySelector('pinball-bumper');\none.addEventListener('hit', (e) => clap(e.detail.count));\nconst three = document.querySelector('pinball-bumpers');\nthree.addEventListener('hit', (e) => showScore(e.detail.score));   // once per bumper the ball hits\nthree.launch();       // drop a ball in from code\nthree.resetScore();",
    attrs: [['`cap`', '`<pinball-bumper>`: the text on its cap', '100'], ['`points`', '`<pinball-bumper>`: points per hit', 'the number in `cap`, or 100'], ['`caps`', '`<pinball-bumpers>`: the three caps, comma-separated; the numbers in them are the points', '100,500,100'], ['`label`', 'its name for screen readers', 'Bonus bumper'], ['`disabled`', 'greys it out and ignores presses', 'off']],
    notes: ['**The single bumper is a `<button>`** in the shadow root; the cluster is an element with `role="button"`. Both take focus, and Space or Enter presses them.', '**`hit` fires with `{ index, cap, points, count, score, combo }`.** For the cluster it fires once for every bumper the ball hits, so one press scores several times.', '**Size** is `--pb-size`, the height: 72 pixels for the single bumper and 240 for the cluster by default.'],
    happens: [['press a bumper', 'the solenoid fires, the chrome skirt pops toward where you pressed, the lamp flashes amber and a chime plays'], ['press again quickly', 'the chime climbs the scale: a combo'], ['press the cluster', 'a ball drops in and ricochets off four to six bumpers, each one firing as it is hit, then leaves'], ['press the cluster again while a ball is in play', 'another ball; up to three at once']],
    limits: ['**Short cap text.** About four characters fit on a cap.', '**The cluster is always three bumpers** in the same triangle.'],
    extra: { gallery: '<pinball-bumper cap="+1" points="1" label="Clap" style="--pb-size: min(84px, 22vw)"></pinball-bumper>', page: '<pinball-bumper id="one" cap="+1" points="1" label="Clap" style="--pb-size: min(96px, 22vw)"></pinball-bumper>' },
  },
];

// Preserve the original seven controls first, then append the lightweight utility family.
SPEC.push(...EXTRA_SPEC);
