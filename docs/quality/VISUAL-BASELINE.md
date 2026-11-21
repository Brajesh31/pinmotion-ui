# Pinmotion UI visual baseline

> **Status: Phase 0 in progress, not approved.** Gallery desktop/mobile captures exist and have been manually inspected. Tablet and isolated original-control captures are being added to the required CI evidence.

## Capture environment

| Setting | Verified baseline |
|---|---|
| Runner OS | GitHub Actions ubuntu-latest |
| Browser | Google Chrome for Testing 158.0.8127.36 |
| Desktop viewport | 1440 × 1000 CSS px, device scale factor 1 |
| Tablet viewport | 768 × 1024 CSS px, capture pending |
| Mobile viewport | 390 × 844 CSS px, device scale factor 2; PNG width is 780 px |
| Color scheme | Site default light / warm-cream theme |
| Reduced motion | Default browser preference; no explicit reduced-motion emulation for these captures |
| WebGL | Enabled in Chromium; browser test confirmed non-transparent pixels in the Toggle canvas |
| Audio | Screenshot capture does not certify audible output or browser audio permission behavior |

## Captured gallery evidence

The published gallery screenshot artifact was generated on commit 7ff7e014d6e72319290c55b776622333bc1b5b4f.

- [GitHub Actions run 44884388441](https://github.com/Brajesh31/pinmotion-ui/actions/runs/44884388441)
- [Phase 0 visual evidence artifact 14699083436](https://github.com/Brajesh31/pinmotion-ui/actions/runs/44884388441/artifacts/14699083436)
- Files in that artifact: pinmotion-gallery-desktop.png (1440 × 4902) and pinmotion-gallery-mobile.png (780 × 24466).
- The original artifact retention was 30 days. The expanded workflow now retains subsequent baseline artifacts for 90 days.

### Initial visual observations

| View | Result | Scope and limitation |
|---|---|---|
| Desktop gallery | Captured and manually reviewed | All 29 cards are present in a three-column layout. The original mechanical controls show their photographed pinball bodies; utility controls retain the shared mechanical visual language. No obvious missing card or blank control was visible in the full-page capture. |
| Mobile gallery | Captured and manually reviewed | The page stacks into a single column. The hero, search/filter controls and component cards are visible in the capture. The browser test reports document width 390 CSS px, so no horizontal page overflow was observed in this run. |
| Tablet gallery | Pending | Added to the next CI evidence capture. |
| Original mechanical demos in isolation | Pending | Added for all seven mechanical bundles at desktop, tablet and mobile widths. |
| Interactive and edge states | Pending | Default gallery screenshots do not verify active, disabled, invalid, boundary, reduced-motion or WebGL-fallback states. |

These captures do not prove that every interaction works, nor do they reproduce every visual issue reported by the user. They establish a first gallery baseline only. Component-by-component visual review remains mandatory.

## Required reference captures

| Capture | Viewport | Scope | Status |
|---|---:|---|---|
| gallery-desktop | 1440 × 1000 | Header, filters, all cards and footer | Captured and reviewed |
| gallery-tablet | 768 × 1024 | Responsive grid and card proportions | Pending next CI run |
| gallery-mobile | 390 × 844 | Single-column cards, text wrap, controls, overflow | Captured and reviewed |
| original-four-isolated | 1440 × 1000, 768 × 1024 and 390 × 844 | Each original reference component in isolation | Exact four-item subset not independently proven; all seven originals are being captured |
| original-four-gallery | 1440 × 1000, 768 × 1024 and 390 × 844 | Same components inside the gallery | Exact four-item subset not independently proven |
| original-seven-isolated | 1440 × 1000, 768 × 1024 and 390 × 844 | Toggle, Slider, Plunger, Stepper, Targets, Drain and Bumper | Added to next CI capture |
| all-component-demos | 1440 × 1000, 768 × 1024 and 390 × 844 | 29 dedicated demos, grouped into auditable batches | Pending component-by-component |

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

| Component / family | Desktop reviewed | Tablet reviewed | Mobile reviewed | State coverage | WebGL fallback (if applicable) | Result / issue IDs |
|---|---|---|---|---|---|---|
| Gallery (29 cards) | Yes, initial full-page pass | Pending | Yes, initial full-page pass | Default only | Not applicable to all cards | No obvious missing card in current capture; PM-003 remains open pending broader reproduction |
| Original mechanical family (7 bundles) | Gallery images only | Pending | Gallery images only | Partial | Pending | Per-component isolated review required; PM-001/PM-002 |
| Original four (provisional subset) | Pending | Pending | Pending | Pending | Pending | Membership not confirmed; PM-001 |
| Remaining 22 utility bundles | Gallery images only | Pending | Gallery images only | Default only | Not applicable | Per-component batch review required; PM-002/PM-003 |
