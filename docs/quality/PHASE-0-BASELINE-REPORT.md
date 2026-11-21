# Phase 0 baseline and reproduction report

> **Status: IN PROGRESS.** Do not start the next component batch until the outstanding baseline and reproduction criteria below are closed.
> Current implementation baseline: main at 7ff7e014d6e72319290c55b776622333bc1b5b4f.
> Last verified CI: Validate run [44884388345](https://github.com/Brajesh31/pinmotion-ui/actions/runs/44884388345), successful.

## 1. Repository inventory

| Item | Current verified count |
|---|---:|
| Standalone component bundles | 29 |
| Original mechanical bundles | 7 |
| Utility bundles | 22 |
| Custom-element tags | 30 |
| Dedicated component demos | 29 |
| Component API guides | 29 |

The seven original mechanical bundles are Toggle, Slider, Plunger, Stepper, Targets, Drain and Bumper. The inventory is sourced from tools/build.mjs and tools/spec.mjs.

## 2. Original-four identification

The current programme hypothesis is **Toggle, Slider, Plunger and Stepper**, but the repository history does not prove that these are the exact four the user means.

Evidence reviewed:

- The initial repository commit, aae4ef33eec77a24ce6e2d649be9c3c37abcc46d, contains all seven original mechanical components together. There is no earlier component-by-component commit sequence that identifies a distinct four-item subset.
- making-of/README.md describes Toggle as the first visual prototype and records the design decisions subsequently used across the original mechanical family. It does not state that the original product consisted of exactly four controls.
- making-of/concepts/round4-2-playfield-parts.jpg and round5-1-realistic-controls.jpg are useful visual references, but the concept boards contain more than four control concepts and do not establish a four-item historical list.

**Decision:** keep Toggle, Slider, Plunger and Stepper as a provisional working subset only. To avoid excluding any original control, capture and baseline all seven mechanical demos. Do not rewrite the other three or use a generic replacement while the reference set is unresolved.

## 3. Gallery visual evidence

The current gallery screenshots were generated from the published Pages site on the baseline commit:

- [Actions run 44884388441](https://github.com/Brajesh31/pinmotion-ui/actions/runs/44884388441)
- [Downloadable Phase 0 gallery evidence](https://github.com/Brajesh31/pinmotion-ui/actions/runs/44884388441/artifacts/14699083436)
- Browser: Google Chrome for Testing 158.0.8127.36 on the GitHub Actions ubuntu-latest runner.
- Desktop capture: 1440 CSS px wide, full-page PNG 1440 × 4902.
- Mobile capture: 390 CSS px wide at device scale factor 2, full-page PNG 780 × 24466.

Initial manual review:

- All 29 gallery cards appear in the desktop full-page capture, arranged in three columns.
- The mobile capture shows the hero/search/filter area followed by the single-column card list.
- The original seven controls retain their pinball artwork and mechanical appearance. Utility controls use the separate lightweight implementation while following the shared palette and visual language.
- No obvious missing gallery card or blank component image was seen in the inspected captures.
- The browser interaction run also reports a document width of 390 CSS px at the mobile viewport, and confirms that the Toggle canvas draws non-transparent pixels with WebGL enabled.

This is a first-pass gallery baseline, not an approval of all 29 components. The captures show mostly default state and do not cover tablet, each isolated demo, all component states, WebGL failure, context loss or audible output.

## 4. Confirmed Toggle defect found during baseline checks

**PM-005, pre-connection property setup:** before the fix, the checked getter returned undefined until connection, and the setter / toggle() path called this.btn.setAttribute() before setup() had created the internal button. Assigning state on a detached custom element therefore threw.

The fix is committed on main in 7ff7e014d6e72319290c55b776622333bc1b5b4f:

- checked now always returns a boolean.
- Early property/method updates reflect the checked attribute without touching a not-yet-created shadow control.
- Form synchronization and animation kick are deferred until the element is ready.
- The connected setup reads the reflected state and applies it to the internal switch and form value.

The new Chromium regression passed for detached assignment, detached toggle(), state preservation on connection, aria-checked, FormData, attribute removal and suppression of programmatic change/input events. See [Validate run 44884388345](https://github.com/Brajesh31/pinmotion-ui/actions/runs/44884388345).

## 5. CI evidence on the implementation baseline

Validate run [44884388345](https://github.com/Brajesh31/pinmotion-ui/actions/runs/44884388345) completed successfully on commit 7ff7e014d6e72319290c55b776622333bc1b5b4f:

| Check | Result |
|---|---:|
| Component contract audit | 540 passed, 0 failed |
| Repository validation | 611 passed, 0 failed |
| Integrity / local Markdown-link audit | 785 passed, 0 failed; 374 links inspected |
| Browser interaction suite | All checks passed, including the four new Toggle pre-connection regressions |
| Clean registry consumer and mixed bundle-load audit | 639 passed, 0 failed |
| Published gallery workflow | Success; deployed site and desktop/mobile screenshot capture completed |

These results are specific to the recorded commit and Chromium CI. They do not certify Safari, Firefox, real devices, assistive technology or all visual states.

## 6. Outstanding Phase 0 gates

- [x] Inventory all 29 bundles, 30 tags, 29 demos and 29 API guides.
- [x] Inspect initial Git history and available making-of / concept references.
- [x] Capture and inspect the desktop gallery.
- [x] Capture and inspect the mobile gallery.
- [x] Reproduce and fix one concrete Toggle API failure; add and pass its browser regression.
- [ ] Resolve the exact membership of the user-referenced original four, or obtain confirmation that the provisional set is correct.
- [ ] Capture the gallery at 768 × 1024.
- [ ] Capture all seven original mechanical demos in isolation at 1440, 768 and 390 CSS px.
- [ ] Review isolated/gallery parity and component sizing for each original.
- [ ] Reproduce PM-001, PM-002 and PM-003 reports component by component, with browser, viewport, expected/actual result and console/network evidence.
- [ ] Record the remaining baseline states needed before Phase 1A is formally opened.

The expanded capture workflow now creates the pending tablet gallery and seven isolated mechanical-demo captures. Phase 0 stays open until those artifacts are reviewed and the remaining user-reported failures have reproducible records.
