# Pinmotion UI defect register

> Baseline: 21 November 2026. This is an evidence ledger, not a list of guessed defects.
> Update each entry with reproduction steps, browser/version, viewport, screenshot, console/network trace, source file, fix and regression test.

## P0 — release-blocking

No P0 defect has been independently confirmed in this planning update. Record security, data-loss, crash or unsafe-execution defects here immediately.

## P1 — core behavior / rendering

| ID | Component / area | Report | Evidence required | Status |
|---|---|---|---|---|
| PM-001 | Original four reference components | User reports original four are not working and must retain original design and work correctly | Identify exact four from initial implementation history; capture their current and intended behavior/screenshots; reproduce in isolated demos and gallery | Open, reproduction required |
| PM-002 | Remaining component catalogue | User reports some additional components do not work | Per-component reproduction, exact API action and event/state trace | Open, component inventory required |
| PM-003 | Gallery card rendering | User reports several cards/components do not display properly | Desktop/tablet/mobile screenshots, DOM dimensions, CSS errors, asset loading and card readiness | Open, visual audit required |
| PM-004 | Original visual fidelity | Existing visual identity must not be replaced with generic substitutes | Approved baseline captures and per-control visual comparison | Open, baseline required |

## Rules

- Do not guess which four components are meant. Recover the original four from Git history, prior reference screenshots and source structure. Until identified, label the group "original four, identification pending".
- Do not mark a report fixed when only the source compiles. Re-test the exact reproduction path in the standalone demo and in the full gallery.
- Capture evidence at 390 CSS px, 768 CSS px and 1440 CSS px unless the component requires additional viewports.
- Keep one defect per row once reproduction establishes distinct root causes. Link each issue to a regression test and commit.
- Do not change approved visual behavior without documenting and approving the change.
