# Pinmotion UI visual baseline

> **Status: Phase 0 in progress, baseline captures reviewed.** The responsive gallery and all seven original mechanical demos have desktop, tablet and mobile captures. Full state, accessibility, WebGL-fallback and per-component approval remain open.

## Capture environment

| Setting | Verified baseline |
|---|---|
| Runner OS | GitHub Actions ubuntu-latest |
| Browser | Google Chrome for Testing 158.0.8127.36 |
| Desktop viewport | 1440 × 1000 CSS px, device scale factor 1 |
| Tablet viewport | 768 × 1024 CSS px, device scale factor 1 |
| Mobile viewport | 390 × 844 CSS px, device scale factor 2; PNG width 780 px |
| Color scheme | Site default light / warm-cream theme |
| Reduced motion | Default browser preference; no explicit reduced-motion emulation in this baseline |
| WebGL | Enabled in Chromium; browser test confirmed non-transparent pixels in the Toggle canvas |
| Audio | Screenshots do not certify audible output or browser audio permission behavior |

## Captured evidence

The complete evidence archive was generated from the published Pages site by commit 44366e993e1656c266d50aed1320aed72c593176.

- [Generator / published-site workflow run 44884841710](https://github.com/Brajesh31/pinmotion-ui/actions/runs/44884841710)
- [Download Phase 0 visual evidence artifact 14699149118](https://github.com/Brajesh31/pinmotion-ui/actions/runs/44884841710/artifacts/14699149118)
- Retention: 90 days.
- Archive contains 26 PNGs: three gallery captures, seven mechanical demos at three widths each, a Toggle-on desktop capture and a Slider-75 desktop capture.

| Evidence | Pixel dimensions | Review |
|---|---:|---|
| Gallery desktop | 1440 × 4902 | Reviewed, 29 cards visible in three columns |
| Gallery tablet | 768 × 11880 | Reviewed, single-column responsive layout; no obvious clipping |
| Gallery mobile | 780 × 24466 | Reviewed at 390 CSS px / DPR 2; single-column responsive layout |
| Each original mechanical demo, desktop | 1440 × 1000 | Seven files captured and reviewed |
| Each original mechanical demo, tablet | 768 × 1024 | Seven files captured and reviewed |
| Each original mechanical demo, mobile | 780 × 1688 | Seven files captured and reviewed at 390 CSS px / DPR 2 |
| Toggle on state | 1440 × 1000 | Ball reaches right end and amber lamp is visible |
| Slider at 75 | 1440 × 1000 | Ball moves to approximately three-quarter position and lamps update |

## Initial visual observations

- All 29 gallery cards are present in the desktop, tablet and mobile captures. The desktop grid is three columns; tablet and mobile use a narrow single-column layout.
- The seven original mechanical demos retain their photographed pinball bodies, chrome balls, red trim, lamps and distinctive mechanisms. No generic replacement controls were observed.
- Toggle's off and on captures show the ball at opposite ends of the lane; the on state shows the amber lamp.
- Slider's 75-state capture shows the ball and illuminated lamps moved to the corresponding position.
- Plunger, Stepper, Targets and Drain remain visually identifiable in all three viewport screenshots. No obvious clipped control, blank component image or horizontal page overflow was seen in these first-pass captures.
- The Bumper demo intentionally renders a three-bumper cluster and a separate single +1 bumper. Its mobile demo stacks the single bumper beneath the cluster. This matches bumper/index.html, so the fourth visual is not a duplicate or stray card.
- Tablet gallery layout changes to a single column at 768 CSS px. The capture shows all cards in sequence; the expected layout still needs design approval rather than being assumed optimal.

These are first-pass visual observations. A screenshot does not prove that interactions work, that every edge state renders correctly, or that a control matches a historical reference in every detail.

## Required reference captures

| Capture | Viewport | Status |
|---|---:|---|
| gallery-desktop | 1440 × 1000 | Captured and reviewed |
| gallery-tablet | 768 × 1024 | Captured and reviewed |
| gallery-mobile | 390 × 844 | Captured and reviewed |
| original-seven-isolated | 1440 × 1000, 768 × 1024, 390 × 844 | All seven captured and reviewed at a first-pass layout level |
| Toggle active / on state | 1440 × 1000 | Captured and reviewed |
| Slider at 75 | 1440 × 1000 | Captured and reviewed |
| exact original-four subset | All viewports | Unresolved; the repository history does not identify a unique four-item subset |
| other interactive states | All viewports | Pending per-component audit |
| utility demos isolated | All viewports | Pending component-by-component review |

## Visual acceptance requirements still open

- Preserve original pinball artwork, proportions, colors, mechanical affordances and animation identity.
- Capture focus/hover, disabled, invalid, boundary, rapid interaction, settled animation and reduced-motion states where applicable.
- Compare each isolated demo with its corresponding gallery card in default and active states.
- Record WebGL-unavailable and context-loss behavior for mechanical controls.
- Verify sound behavior after the browser's first user interaction.
- Inspect at 200% zoom and with forced-colors/high-contrast settings where supported.
- Add image-diff tooling only after a human-approved visual baseline exists; use region-level tolerances rather than brittle whole-page pixel comparisons.

## Review ledger

| Component / family | Desktop | Tablet | Mobile | State coverage | WebGL fallback | Result / issue IDs |
|---|---|---|---|---|---|---|
| Gallery, 29 cards | Reviewed | Reviewed | Reviewed | Default card previews | Not applicable globally | No obvious missing card; PM-003 not fully reproduced |
| Toggle | Reviewed | Reviewed | Reviewed | Off and on captured; keyboard/drag tested separately in CI | Pending | Original visual retained; PM-005 fixed; PM-006 fixed pending CI record below |
| Slider | Reviewed | Reviewed | Reviewed | Default and 75 captured; drag/keyboard tested separately in CI | Pending | First-pass baseline only |
| Plunger | Reviewed | Reviewed | Reviewed | Default capture; pull/send behavior tested separately in CI | Pending | First-pass baseline only |
| Stepper | Reviewed | Reviewed | Reviewed | Default capture; button/keyboard behavior tested separately in CI | Pending | First-pass baseline only |
| Targets | Reviewed | Reviewed | Reviewed | Default capture only | Pending | First-pass baseline only |
| Drain | Reviewed | Reviewed | Reviewed | Default capture only | Pending | First-pass baseline only |
| Bumper | Reviewed | Reviewed | Reviewed | Cluster and single control default capture | Pending | Demo layout verified against source markup |
| Remaining 22 utility bundles | Gallery only | Gallery only | Gallery only | Default previews only | Not applicable | Per-component review still pending |


## Latest refreshed evidence and state-test addendum

The latest screenshot archive was generated from the published site by [workflow run 44888652835](https://github.com/Brajesh31/pinmotion-ui/actions/runs/44888652835) on tested source commit `e62c7d082b1f79ee7500beb1db90561572d397b4`. [Download artifact 14700861951](https://github.com/Brajesh31/pinmotion-ui/actions/runs/44888652835/artifacts/14700861951). It contains the responsive gallery and all seven original mechanical demos at desktop, tablet and mobile widths, plus Toggle-on and Slider-at-75 state captures.

The latest Chromium validation [44888652944](https://github.com/Brajesh31/pinmotion-ui/actions/runs/44888652944) also confirms these functional states for Toggle: computed accessibility names, visible keyboard focus, disabled pointer/keyboard suppression, form reset, reduced-motion on/off state synchronization, pointer cancellation and disconnect/reconnect cleanup. The tests do not replace the pending screenshots of focus, disabled and reduced-motion states, or the manual screen-reader/WebGL/audio checks.

The visual baseline is still **in progress**, not approved.
