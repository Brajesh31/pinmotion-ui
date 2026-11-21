# Pinmotion UI per-component audit matrix

> **Baseline:** 21 November 2026 · **Status:** All rows pending this programme's component-by-component acceptance.
> A historical Phase 1 source/API contract audit is not equivalent to this full visual, behavioral, lifecycle, accessibility and package audit.

| Component | Bundle / custom element | Programme batch | Code | Visual | API/events | Forms | Keyboard/touch | Lifecycle | Accessibility | README/demo/skill | Final evidence |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Toggle | `toggle/toggle.js` / `pinball-toggle` | 1A, provisional original four | Partial, PM-005–PM-008 fixed and regression-tested | Three-width reference baseline plus off/on and reduced-motion behavior; full state screenshots pending | Partial, property/attribute/method/event contracts pass | Partial, FormData, form reset, fieldset disabled and restore tested | Partial, Space/Enter, visible focus, drag, cancellation and disabled suppression tested | Partial, cancel/disconnect/reconnect tests pass; broader observer/scheduler cleanup pending | Partial, computed AX names/roles verified for aria-label, multiple aria-labelledby IDs, nested ShadowRoot and label fallback; manual screen-reader test pending | README, demo, spec and skill updated; generated parity passes | Pending, 1A not complete |
| Slider | `slider/slider.js` / `pinball-slider` | 1B, original four (verify history) | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending |
| Plunger | `plunger/plunger.js` / `pinball-plunger` | 1C, original four (verify history) | Pending | Pending | Pending | N/A or documented | Pending | Pending | Pending | Pending | Pending |
| Stepper | `stepper/stepper.js` / `pinball-stepper` | 1D, original four (verify history) | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending |
| Targets | `targets/targets.js` / `pinball-targets` | 2A | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending |
| Drain | `drain/drain.js` / `pinball-drain` | 2A | Pending | Pending | Pending | Document | Pending | Pending | Pending | Pending | Pending |
| Bumper | `bumper/bumper.js` / `pinball-bumper`, `pinball-bumpers` | 2B | Pending | Pending | Pending | N/A or documented | Pending | Pending | Pending | Pending | Pending |
| Checkbox | `checkbox/checkbox.js` / `pinball-checkbox` | 3 | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending |
| Radio Group | `radio-group/radio-group.js` / `pinball-radio-group` | 3 | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending |
| Segmented | `segmented/segmented.js` / `pinball-segmented` | 3 | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending |
| Progress | `progress/progress.js` / `pinball-progress` | 4 | Pending | Pending | Pending | N/A or documented | Pending | Pending | Pending | Pending | Pending |
| Meter | `meter/meter.js` / `pinball-meter` | 4 | Pending | Pending | Pending | N/A or documented | Pending | Pending | Pending | Pending | Pending |
| Rating | `rating/rating.js` / `pinball-rating` | 4 | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending |
| Tabs | `tabs/tabs.js` / `pinball-tabs` | 5 | Pending | Pending | Pending | N/A or documented | Pending | Pending | Pending | Pending | Pending |
| Accordion | `accordion/accordion.js` / `pinball-accordion` | 5 | Pending | Pending | Pending | N/A or documented | Pending | Pending | Pending | Pending | Pending |
| Disclosure | `disclosure/disclosure.js` / `pinball-disclosure` | 5 | Pending | Pending | Pending | N/A or documented | Pending | Pending | Pending | Pending | Pending |
| Tooltip | `tooltip/tooltip.js` / `pinball-tooltip` | 6 | Pending | Pending | Pending | N/A or documented | Pending | Pending | Pending | Pending | Pending |
| Dialog | `dialog/dialog.js` / `pinball-dialog` | 6 | Pending | Pending | Pending | N/A or documented | Pending | Pending | Pending | Pending | Pending |
| Toast | `toast/toast.js` / `pinball-toast` | 6 | Pending | Pending | Pending | N/A or documented | Pending | Pending | Pending | Pending | Pending |
| Breadcrumbs | `breadcrumbs/breadcrumbs.js` / `pinball-breadcrumbs` | 7 | Pending | Pending | Pending | N/A or documented | Pending | Pending | Pending | Pending | Pending |
| Pagination | `pagination/pagination.js` / `pinball-pagination` | 7 | Pending | Pending | Pending | N/A or documented | Pending | Pending | Pending | Pending | Pending |
| Search | `search/search.js` / `pinball-search` | 7 | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending |
| Text Field | `text-field/text-field.js` / `pinball-text-field` | 8 | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending |
| Text Area | `text-area/text-area.js` / `pinball-text-area` | 8 | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending |
| Select | `select/select.js` / `pinball-select` | 8 | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending |
| Combobox | `combobox/combobox.js` / `pinball-combobox` | 9 | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending |
| File Drop | `file-drop/file-drop.js` / `pinball-file-drop` | 9 | Pending | Pending | Pending | Document | Pending | Pending | Pending | Pending | Pending |
| Date Picker | `date-picker/date-picker.js` / `pinball-date-picker` | 9 | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending |
| Color Picker | `color-picker/color-picker.js` / `pinball-color-picker` | 9 | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending |

## Completion meaning

- **Code:** correct implementation in canonical source, no unexplained runtime errors, boundary and invalid input handling.
- **Visual:** approved screenshots at 1440/768/390 CSS px and relevant states; original artwork/mechanics preserved.
- **API/events:** all supported attributes, properties, methods, events, payloads and timing checked against implementation.
- **Forms:** correct FormData, disabled, required, validity, reset and restore when applicable; N/A must include a reason.
- **Keyboard/touch:** documented keyboard and pointer/touch paths exercised separately.
- **Lifecycle:** disconnect/reconnect, active timer/animation cleanup, duplicate loading and stale callback protection.
- **Accessibility:** names, roles, values, focus, contrast, motion and manual AT checks as applicable.
- **README/demo/skill:** tested examples and exact API documentation updated, generated output parity passes.
- **Final evidence:** CI run, commit SHA, issue references, screenshots and manual QA results linked.

A row moves to **Complete** only when every applicable column is evidenced and all P0/P1 defects are closed. If a column is still pending or the test was skipped, the component is not complete.


## Per-component report files

When a component batch starts, create one report at `docs/component-audits/<component-id>.md` using [the component audit template](COMPONENT-AUDIT-TEMPLATE.md). Do not create a bulk set of empty reports. Each report is completed as the component passes its own phase and links all code, screenshot, test, documentation and CI evidence.
