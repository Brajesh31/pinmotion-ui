# Phase 0 baseline and reproduction report

> **Status: IN PROGRESS.** Responsive reference captures are complete and reviewed at a first-pass level. Phase 0 is not closed because the exact user-referenced original four and the specific PM-001/PM-002/PM-003 reproduction cases remain unresolved.
> Current main baseline when this report was updated: 4261f5e3d4ed34926a177a08cf51307b031b904b.

## 1. Repository inventory

| Item | Verified count |
|---|---:|
| Standalone component bundles | 29 |
| Original mechanical bundles | 7 |
| Utility bundles | 22 |
| Custom-element tags | 30 |
| Dedicated component demos | 29 |
| Component API guides | 29 |

The seven original mechanical bundles are Toggle, Slider, Plunger, Stepper, Targets, Drain and Bumper. The inventory is derived from tools/build.mjs and tools/spec.mjs.

## 2. Original-four identification

The working hypothesis remains Toggle, Slider, Plunger and Stepper. It is not proven by the initial repository history.

- The initial repository commit, aae4ef33eec77a24ce6e2d649be9c3c37abcc46d, contains the seven mechanical bundles together. It does not provide a chronological sequence that identifies a separate original four.
- making-of/README.md describes Toggle as the first visual prototype but does not state that only four original controls existed.
- The concept images reviewed show more than four mechanical ideas and do not define an authoritative four-item group.

To avoid excluding an original component, Phase 0 captures all seven mechanical demos. The first four remain provisional. They must not be represented as historically verified until there is direct evidence or user confirmation.

## 3. Responsive gallery and original-control evidence

The successful published-site capture run is [44884841710](https://github.com/Brajesh31/pinmotion-ui/actions/runs/44884841710), generated from commit 44366e993e1656c266d50aed1320aed72c593176.

- [Phase 0 visual evidence artifact 14699149118](https://github.com/Brajesh31/pinmotion-ui/actions/runs/44884841710/artifacts/14699149118), retained for 90 days.
- Browser: Google Chrome for Testing 158.0.8127.36 on ubuntu-latest.
- The 26-image archive contains desktop, tablet and mobile gallery screenshots; all seven original isolated demos at all three sizes; Toggle-on and Slider-75 state screenshots.
- Gallery dimensions: desktop 1440 × 4902, tablet 768 × 11880, mobile 780 × 24466 (390 CSS px at DPR 2).
- Isolated mechanical demos: desktop 1440 × 1000, tablet 768 × 1024, mobile 780 × 1688 (390 CSS px at DPR 2).

Manual first-pass review found all seven original visual designs present at all three sizes. Their pinball artwork and distinctive mechanisms remain intact. The gallery contains 29 visible component cards. No obvious blank card, clipped control or horizontal page overflow was observed in the captures.

The Bumper demo intentionally includes both the three-control cluster and a separate single +1 bumper; bumper/index.html confirms that markup. The mobile layout stacks the single bumper under the cluster.

This is a layout baseline, not a full state or historical fidelity sign-off. Detailed per-component state, accessibility, WebGL fallback and audio checks remain open.

## 4. Confirmed Toggle defects

### PM-005, property state before connection

Setting checked or calling toggle() on a detached pinball-toggle could dereference this.btn before setup created the shadow button. The checked getter also returned undefined before connection.

Fixed in commit 7ff7e014d6e72319290c55b776622333bc1b5b4f. The checked getter now returns a boolean, early property and method calls reflect the checked attribute, and form synchronization / animation kick are deferred until the element is ready.

The four new detached-state Chromium regressions passed in Validate run [44884388345](https://github.com/Brajesh31/pinmotion-ui/actions/runs/44884388345): boolean getter; detached setter and toggle; connected ARIA/FormData state; attribute removal and programmatic event suppression.

### PM-006, Shadow DOM accessible name

The Toggle setup originally skipped assigning an accessible name to the inner button whenever aria-label or aria-labelledby was present on the custom-element host. The actual interactive button could therefore be left without the intended name.

Fixed in commits d229456ce825375ca167837cd8d39f46f2c9a92d and 4261f5e3d4ed34926a177a08cf51307b031b904b. The resolver now applies the accessible name in this order: text from aria-labelledby references in the same document/shadow root, explicit aria-label, component label, then Toggle fallback. The tokenization handles whitespace-separated ID references.

Three new browser checks passed in Validate run [44885328475](https://github.com/Brajesh31/pinmotion-ui/actions/runs/44885328475): host aria-label, external aria-labelledby, and label fallback.

## 5. CI evidence

Validate run [44884841699](https://github.com/Brajesh31/pinmotion-ui/actions/runs/44884841699) succeeded for commit 44366e993e1656c266d50aed1320aed72c593176. The generator/deploy run [44884841710](https://github.com/Brajesh31/pinmotion-ui/actions/runs/44884841710) also succeeded, including published-site verification and the complete screenshot archive.

After the Toggle accessible-name change and regex correction, Validate run [44885328475](https://github.com/Brajesh31/pinmotion-ui/actions/runs/44885328475) succeeded for commit 4261f5e3d4ed34926a177a08cf51307b031b904b:

| Check | Result |
|---|---:|
| Component contract audit | 540 passed, 0 failed |
| Repository validation | 611 passed, 0 failed |
| Integrity / local Markdown-link audit | 786 passed, 0 failed; 375 links inspected |
| Browser interaction suite | All passed, including the three new accessible-name cases |
| Clean registry consumer and mixed bundle-load audit | 639 passed, 0 failed |

These results are for headless Chromium. They do not certify Safari, Firefox, physical devices, screen readers, WebGL failure, audible output or reduced-motion behavior.

## 6. Outstanding Phase 0 gates

- [x] Inventory all 29 bundles, 30 tags, 29 demos and 29 API guides.
- [x] Inspect initial Git history and available making-of / concept references.
- [x] Capture and review the gallery at 1440 × 1000.
- [x] Capture and review the gallery at 768 × 1024.
- [x] Capture and review the gallery at 390 × 844.
- [x] Capture all seven original mechanical demos in isolation at desktop, tablet and mobile sizes.
- [x] Review the first-pass sizing and rendering of all seven isolated demos.
- [x] Capture Toggle off/on and Slider 75 states.
- [x] Reproduce and fix PM-005, add browser regression, and pass CI.
- [x] Reproduce and fix PM-006, add browser regressions, and pass CI.
- [ ] Establish the exact original-four membership, or keep the provisional list explicitly labelled.
- [ ] Obtain sufficient exact reproduction details for the remaining broad PM-001, PM-002 and PM-003 reports; no other individual failing case was established by the current screenshots or automated test suite.
- [ ] Capture/review additional interactive states, reduced motion, WebGL-unavailable fallback and audio behavior before visual baseline approval.

**Next permitted work:** continue the Toggle component audit as a provisional first-control review, without treating Phase 0 or Phase 1A as complete. Do not move to Slider until Toggle's remaining lifecycle, accessibility and visual gates are evidenced and the Phase 0 ambiguity is resolved or explicitly carried as a user-confirmed assumption.


## 7. Latest Toggle and Phase 0 evidence update

This addendum supersedes older CI and Toggle status statements above where their evidence was less recent. It is based on tested main commit `e62c7d082b1f79ee7500beb1db90561572d397b4`; the documentation describing it was subsequently committed to main in `36e81f6d0eac2e7ac9dbaebb5d9ab4a3c54de54a`.

Latest successful validation: [Validate run 44888652944](https://github.com/Brajesh31/pinmotion-ui/actions/runs/44888652944). Results: 540 component contract checks, 611 repository validation checks, 788 integrity checks across 377 local Markdown links, and 639 clean-consumer / mixed-bundle checks, all passing.

Latest successful published-site run: [Generate and publish run 44888652835](https://github.com/Brajesh31/pinmotion-ui/actions/runs/44888652835). Refreshed visual archive: [artifact 14700861951](https://github.com/Brajesh31/pinmotion-ui/actions/runs/44888652835/artifacts/14700861951).

Two more Toggle defects are now reproduced, fixed and verified:
- **PM-007:** Reduced-motion mode now synchronizes the ball, lamp and body spring. Both on and off transitions and spring rest pass in [Validate run 44888328829](https://github.com/Brajesh31/pinmotion-ui/actions/runs/44888328829).
- **PM-008:** Pointer cancellation restores the prior logical state without emitting a change event; disconnecting during a held drag clears transient state, and the element remains interactive after reinsertion. The real touch cancellation and remove/reinsert regressions pass in [Validate run 44886569149](https://github.com/Brajesh31/pinmotion-ui/actions/runs/44886569149).

The newest browser run additionally proves the computed accessibility tree for host aria-label, multiple aria-labelledby IDs, a label in an enclosing ShadowRoot and the label fallback; native form reset; visible keyboard focus; disabled pointer and keyboard suppression; and the complete pointer lifecycle suite. These are Chromium automation results, not manual assistive-technology certification.

**Phase 0 remains open.** The original-four subset remains historically unproven, the broad PM-001/002/003 reports still lack component-specific reproduction steps, and WebGL-unavailable/context-loss and audible-output behavior remain to be checked. Do not advance the component sequence or mark Toggle complete until its remaining manual visual, screen-reader and runtime fallback gates are evidenced.


## 8. Additional Toggle visual-state evidence

The latest screenshot workflow [44889582125](https://github.com/Brajesh31/pinmotion-ui/actions/runs/44889582125) passed for commit `e01bd8c267838c1ecd1a3f4ce0276ff576c27de5`. Refreshed archive: [artifact 14700793459](https://github.com/Brajesh31/pinmotion-ui/actions/runs/44889582125/artifacts/14700793459), containing 29 PNGs.

The new Toggle captures are:
- Focus-visible: inner switch shows the keyboard focus outline.
- Disabled-on: original artwork stays intact and the control is visibly muted.
- Reduced-motion-on: the ball and lamp appear directly at the final on position.

All three images were manually opened and visually reviewed. Latest Validate run [44889582076](https://github.com/Brajesh31/pinmotion-ui/actions/runs/44889582076) also passed: 540 contract checks, 611 repository checks, 788 integrity checks (377 links), and 639 clean-consumer/mixed-load checks, all green.

This is stronger state evidence, not baseline approval. Hover, alternate modes, WebGL failure/context loss, audible output, and manual screen-reader checks remain open.


## 9. WebGL-unavailable baseline defect and remediation

The no-WebGL screenshot generated from the published demo on commit `0178dffe6c8be451d641a4313a26c09d910f96f4` showed only the Toggle page's text and controls. The visual plate, lamp and chrome ball were completely absent. This reproduces PM-009 and invalidates the previous accepted limitation that “shader visuals are missing” without WebGL.

The fix uses the original embedded `toggle-off`, `toggle-on`, and `ball` images in a Canvas 2D renderer when WebGL is not available or the WebGL paint step cannot draw. No generic replacement artwork is used. A dedicated no-WebGL browser regression is now part of the mandatory Validate workflow; pending its result, do not mark PM-009 fixed or sign off Toggle.


## 10. WebGL-unavailable fallback remediation and latest CI

The no-WebGL capture from commit `0178dffe6c8be451d641a4313a26c09d910f96f4` demonstrated PM-009: Toggle kept its title and controls but lost the pinball artwork. The problem was reproduced in the published demo and fixed in commit `55f99aff000cf4c8de52bb7a411f7b06eacda77c`.

The fallback reuses the original embedded off/on photographed plates and chrome-ball image in Canvas 2D whenever WebGL cannot initialize or the WebGL paint path returns false. It preserves the visual design and functionality; only the live reflective shader is unavailable.

- [Validate run 44890886645](https://github.com/Brajesh31/pinmotion-ui/actions/runs/44890886645), success.
- [Published-site workflow 44890886623](https://github.com/Brajesh31/pinmotion-ui/actions/runs/44890886623), success.
- [Visual archive 14701533586](https://github.com/Brajesh31/pinmotion-ui/actions/runs/44890886623/artifacts/14701533586), including the new `toggle-webgl-unavailable-desktop.png`.

Dedicated no-WebGL regression results: WebGL unavailable confirmed; 46,793 visible pixels on the Canvas 2D fallback; off/on plate changes with checked state; button activation and change event work; configured form value is submitted; zero JavaScript exceptions.

| Latest Validate gate | Result |
|---|---:|
| Component contract audit | 540 passed, 0 failed |
| Repository validation | 614 passed, 0 failed |
| Integrity / Markdown links | 788 passed, 0 failed; 377 local links |
| Main Chromium interaction suite | All passed |
| Dedicated Toggle no-WebGL fallback | 0 failed |
| Clean consumer and mixed bundle loading | 639 passed, 0 failed |

PM-009 is fixed and verified. Phase 0 remains open for historical original-four identification or user confirmation, exact reproduction of PM-001/002/003, forced context-loss and asset-failure tests, audio output, and manual assistive-technology review.

### PM-010, idle WebGL context-loss recovery

The context-loss regression initially failed because the shared WebGL context became unavailable, but idle connected controls were not woken to run their Canvas 2D fallback. The fix adds a wake hook to each connected PinballKit frame callback and calls it for all connected controls when the shared WebGL context is lost. This starts fallback asset loading and drawing without waiting for a later user interaction. The context-loss regression explicitly checks fallback readiness and visible pixels before changing checked state. CI verification is pending.
