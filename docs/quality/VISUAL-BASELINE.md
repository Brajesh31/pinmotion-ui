# Pinmotion UI visual baseline

> Status: pending capture. Do not treat Phase 0 or any component visual QA as complete until this document contains actual screenshots and review results.

## Capture environment

Record exact browser name/version, OS, viewport CSS pixels, device scale factor, color scheme, reduced-motion setting, device pixel ratio and WebGL availability.

## Required reference captures

| Capture | Viewport | Scope | Status |
|---|---:|---|---|
| gallery-desktop | 1440 × 1000 | Header, filters, all cards and footer | Pending |
| gallery-tablet | 768 × 1024 | Responsive grid and card proportions | Pending |
| gallery-mobile | 390 × 844 | Single-column cards, text wrap, controls, overflow | Pending |
| original-four-isolated | 1440 × 1000 and 390 × 844 | Each original reference component in isolation | Pending identification |
| original-four-gallery | 1440 × 1000 and 390 × 844 | Same components inside the gallery | Pending identification |
| all-component-demos | 1440 × 1000 and 390 × 844 | 29 dedicated demos, grouped into auditable batches | Pending |

## Visual acceptance

- Preserve original pinball artwork, component proportions, colors, mechanical affordances and animation identity.
- No missing image/audio assets, blank canvases, invisible labels, malformed layouts or generic fallback replacing the intended design.
- No clipped controls, text overlap, unexpected wrapping, horizontal overflow or inaccessible action target.
- Every component state is captured: default, hover/focus, active/on, disabled, invalid, boundary and animated/settled where applicable.
- Compare the isolated demo and gallery rendering for parity.
- Record WebGL-on and WebGL-unavailable behavior for original mechanical components.
- Reduced-motion captures must show correct final state without unnecessary travel animation.
- Add image-diff tooling only after the first approved baseline exists. Set per-region tolerances; avoid brittle whole-page pixel gates where browser text rendering differs.

## Review ledger

| Component | Desktop reviewed | Tablet reviewed | Mobile reviewed | State coverage | WebGL fallback (if applicable) | Result / issue IDs |
|---|---|---|---|---|---|---|
| Original four | Pending | Pending | Pending | Pending | Pending | PM-001 |
| Remaining 25 bundles | Pending | Pending | Pending | Pending | Pending | PM-002 / PM-003 |
