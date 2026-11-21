# ✅ Phase 0 verification · Gallery stabilization

> **Status:** Complete  
> **Verified commit:** `e94464445ec91cb4722f8e4e1328ffcff1467366`  
> **Date:** 21 November 2026  
> **Branch:** `main`  
> **Published site:** https://brajesh31.github.io/pinmotion-ui/

## 1. Completion summary

Phase 0 closes the gallery startup incident and proves that the deployed GitHub Pages preview can load the component catalogue after a cache-disabled hard refresh. It adds an automated post-deployment browser gate instead of treating a successful upload or an HTTP 200 response as proof that the gallery works.

The original component runtime and UI source were not refactored as part of this completion pass. Changes were limited to CI, browser/screenshot verification tooling and phase documentation.

## 2. Verified acceptance criteria

- [x] Gallery HTML and generated inline runtime pass the repository's build, documentation and syntax/parity checks.
- [x] Local Validate workflow passes, including the full headless Chromium interaction suite.
- [x] GitHub Pages deployment succeeds from the verified commit.
- [x] Published homepage and gallery URLs respond successfully.
- [x] Published registry JSON contains 29 entries.
- [x] All 29 component demo routes return successfully.
- [x] All 29 standalone component JavaScript bundle URLs return successfully.
- [x] Published gallery is opened in headless Chromium after a cache-disabled hard reload.
- [x] All 29 cards appear on first load and reach `data-load-state="ready"`.
- [x] Gallery status reports all 29 components shown.
- [x] All 30 custom-element tags register.
- [x] No failed non-favicon network responses or uncaught runtime exceptions are recorded by the live browser gate.
- [x] The gallery has no horizontal overflow at a 390 CSS px viewport.
- [x] Desktop and mobile full-page screenshots are captured and uploaded as a workflow artifact.

## 3. CI evidence

| Check | Run | Result |
| --- | --- | --- |
| Full local Validate, build, generated parity and Chromium regression suite | [44846228512](https://github.com/Brajesh31/pinmotion-ui/actions/runs/44846228512) | Passed |
| GitHub Pages build, local publication checks, deploy, live Chromium smoke and screenshot artifact | [44846228487](https://github.com/Brajesh31/pinmotion-ui/actions/runs/44846228487) | Passed |

Both runs target commit `e94464445ec91cb4722f8e4e1328ffcff1467366`.

## 4. Published-site browser results

The post-deploy workflow verifies the actual Pages URL, not just a local server. It:

1. Checks the homepage, gallery and 29-entry registry.
2. Requests all 29 standalone demo paths and all 29 generated component bundle URLs.
3. Opens the published gallery in headless Chromium with network caching disabled.
4. Reloads the page while ignoring the browser cache.
5. Confirms 29 rendered cards, 29 ready cards and 30 registered custom-element tags.
6. Confirms the page fits a 390 CSS px viewport without horizontal overflow.

The local Validate workflow continues to run the full component interaction suite and the 29 standalone route browser checks. The published Pages workflow adds deployment-specific verification.

## 5. Visual evidence

The GitHub Actions artifact [phase-0-gallery-visual-evidence](https://github.com/Brajesh31/pinmotion-ui/actions/runs/44846228487/artifacts/14682354540) contains:

- `pinmotion-gallery-desktop.png`: full-page capture at 1440 × 1000 viewport.
- `pinmotion-gallery-mobile.png`: full-page capture at 390 × 844 CSS px, device scale factor 2.

Both screenshots were downloaded and inspected. The desktop layout presents the catalogue in a three-column grid. The mobile layout presents the cards in a single vertical column. No obvious card overlap or clipping is visible, and the mobile overflow assertion passes.

**Baseline note:** The repository did not contain an approved historical screenshot baseline. A pixel-by-pixel comparison with a previous approved capture is therefore not claimed. The current screenshots were visually reviewed against the documented Pinmotion component visual language. No component rendering or visual source files were changed during this Phase 0 completion pass.

The screenshot artifact is retained by GitHub Actions until 21 December 2026.

## 6. Scope boundary

Phase 0 is complete. The following work remains outside this phase:

- Phase 1: exhaustive component contract audit.
- Phase 2: complete functional correctness and regression coverage.
- Phase 3: visual quality and interaction polish beyond Phase 0 gallery verification.
- Phase 4: complete accessibility review and assistive-technology testing.
- Phase 5: Firefox, Safari and physical device compatibility.
- Phase 6: clean-consumer distribution, release governance and stable publication.

**Stable release remains NO-GO** until all mandatory release gates in [RELEASE-CHECKLIST.md](RELEASE-CHECKLIST.md) have evidence and maintainer approval.
