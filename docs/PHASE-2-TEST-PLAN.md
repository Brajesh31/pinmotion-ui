# 🧭 Phase 2 · Functional correctness and regression test plan

> This plan expands the Phase 2 requirements into repeatable test cases. It does not claim that unexecuted tests have passed.

## Test execution

1. Run `npm ci`.
2. Run `npm run build && npm run docs && npm run check`.
3. Start the site with `npm run serve`.
4. Run `npm run test:browser` with Chrome/Chromium available.
5. Record the commit SHA, CI run URL, browser version, and any skipped tests in the Phase 1–2 acceptance matrix.

## Test dimensions

### A. State and attributes

For each component, verify:

- Default values and initial ARIA state.
- Valid updates through the public property.
- Valid updates through observed attributes.
- Attribute removal and empty-string behavior.
- Disabled state blocks user actions and suppresses unexpected state changes.
- Invalid, empty, minimum, maximum, out-of-range and malformed input handling where applicable.
- Attribute/property reflection behavior matches its API guide.
- No unintended event fires during programmatic state synchronization.

### B. Input modalities

Test separately, not as substitutes:

- Pointer click/drag and release.
- Touch tap/drag and release.
- Keyboard activation and documented navigation keys.
- Programmatic property, attribute and method calls.

### C. Events

For each documented event assert:

- Exact event name and event constructor where applicable.
- Exact `detail` keys and values.
- Event count and order for one interaction.
- `bubbles` and `composed` are true for events emitted through the shared helper.
- Programmatic changes emit events only where explicitly documented.
- Event behavior in normal and reduced-motion preferences.

### D. Forms

For applicable controls assert:

- `name` and value are reflected in `FormData`.
- Unchecked/empty controls follow the documented successful-control rule.
- Disabled controls are excluded.
- Required/min/max/type/step/maxlength constraints report the correct `validity` and `checkValidity()` result.
- Disabled fieldsets propagate disabled state correctly.
- `form.reset()` restores the documented initial value.
- Browser state restoration has a documented contract and tested behavior if supported.

**Implemented baseline:** Both shared bases now capture writable `checked`/`value` state after setup, serialize it as the ElementInternals restoration state, implement `formResetCallback` and `formStateRestoreCallback`, and propagate disabled-fieldset state. The browser suite now includes passing representative reset, state-restore and fieldset assertions. Evidence: [Validate run 44839251769](https://github.com/Brajesh31/pinmotion-ui/actions/runs/44839251769). Extend this baseline across every form-associated control and browser before closing Phase 2.

### E. Asynchronous behavior and cleanup

- Drain deletion, undo window, commit and replacement-ball lifecycle.
- Toast show, manual dismiss, auto-dismiss and re-show behavior.
- Dialog open, cancel, close and repeated invocation.
- Disconnect a component while it has an active timer/animation, then reconnect it.
- Ensure callbacks do not target disconnected or replaced DOM.
- Confirm an exception from one bundle or card is visible but does not stop independent cards.

### F. Solo and full-gallery execution

- Load each of the 29 standalone demo routes in a fresh browsing context.
- Exercise its main interaction and documented event.
- Exercise all bundles together in the gallery.
- Compare component state and event behavior between standalone and gallery execution.
- Exercise mixed load order for the two runtime families.
- Verify duplicate script inclusion does not duplicate custom-element registration or event handling.

## Suggested regression groups

| Group | Components | Main risk |
| --- | --- | --- |
| Mechanical state | Toggle, Slider, Stepper, Drop Targets | Range/selection synchronization, form values |
| Mechanical actions | Plunger, Drain, Pop Bumpers | Gesture lifecycle, timers, score/event payload |
| Selection controls | Checkbox, Radio Group, Segmented, Rating | Keyboard roving and selected-state semantics |
| Disclosure/navigation | Tabs, Accordion, Disclosure, Breadcrumbs, Pagination | Focus movement, ARIA relationships |
| Feedback | Tooltip, Dialog, Toast | Focus, cancellation, async dismissal |
| Native data controls | Search, Text Field, Text Area, Select, Date Picker, Color Picker | Native validity and value synchronization |
| Composite data controls | Combobox, File Drop | Listbox keyboard handling, file selection and cleanup |
| Informational | Progress, Meter | Bounds, indeterminate state and ARIA |

## Completion rule

Do not change Phase 2 status to complete based on static audit counts or a passing subset. Complete every applicable test dimension, remediate failures, rerun the browser suite on the final commit, and attach the CI run as evidence.
