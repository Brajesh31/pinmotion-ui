# 🔎 Phase 1 contract audit evidence

> **Status:** Phase 1 remains in progress  
> **Verified code/test commit:** `7dc212bc2bf2dada2804b6313bc6740b65a83495`  
> **Date:** 21 November 2026  
> **Branch:** `main`

## 1. Automated verification results

The latest completed Validate run on the verified commit passed:

- **540 source-to-contract audit checks, 0 failures.**
- **611 repository validation checks, 0 failures.**
- **762 integrity checks, 0 failures**, including 351 local Markdown links.
- The full Chromium interaction suite ended with `all passed`.
- All 29 standalone demo routes passed in fresh browser navigations.
- The clean registry consumer test reported **322 passed, 0 failed**.

Evidence: [Validate run 44849296217](https://github.com/Brajesh31/pinmotion-ui/actions/runs/44849296217). The Pages generation/deployment workflow also succeeded: [run 44849296191](https://github.com/Brajesh31/pinmotion-ui/actions/runs/44849296191).

## 2. What the source-to-contract audit now checks

For all 29 component bundles, the automated audit checks:

- Implementation source, generated bundle, standalone demo, API guide and registry entry exist.
- Source custom-element registration names match the tags declared in the API metadata, with no duplicate global tags.
- Source `observedAttributes` declarations cover and do not silently diverge from the documented observed attributes.
- The documented form-association claim matches `static formAssociated` and the form-value implementation.
- Documented property names exist in source. Read/write properties must expose a getter and setter; read-only getter properties must expose a getter without a setter.
- Documented public method names exist and declared parameter counts match the source method definitions.
- Each documented event detail-key shape matches source, and every distinct literal payload shape emitted for a documented event is represented by an API event variant.
- The two shared runtime bases configure custom events to bubble and cross the Shadow DOM boundary.
- Generated guides contain the required API and form sections, and demos load their corresponding bundle.

These are source-level contract checks. They do not prove every runtime value, return value, event order, defaulting edge case or user interaction.

## 3. Clean registry consumer and bundle-order audit

A new mandatory Validate CI step runs `npm run test:consumer`. It does not install packages from a public package registry. It uses the repository's actual `registry.json` file declarations to copy the 29 distributable bundles into a clean temporary consumer project.

Each bundle is loaded independently and checked for:
- canonical registry source path and install target;
- successful script execution;
- expected custom-element registration and Shadow DOM initialization;
- the appropriate runtime family (`PinballKit` or `PinmotionExtras`);
- actual JavaScript prototype descriptors for every documented read/write and read-only property;
- the initial runtime type for every documented boolean, number, integer, string or array property;
- actual method presence on the corresponding custom-element instance for every documented public method;
- uncaught script or runtime errors.

The full set is then loaded in four orders:

1. Original mechanical controls first.
2. Utility controls first.
3. Interleaved original and utility bundles.
4. Reverse order of all 29 bundles.

Every order registered all 30 custom-element tags without browser errors and retained one stable object instance for each shared runtime. The four order checks, per-bundle checks, runtime property-descriptor checks, initial property-type checks and public method existence checks are included in the **322 passed, 0 failed** result.

## 4. API corrections made during source review

Two reduced-motion descriptions were inaccurate and have been corrected in the source metadata and generated reference pages:

- **Plunger:** The shared runtime reads `prefers-reduced-motion`. Its calm branch skips the spring, drop, bounce and ball-travel animation while preserving the full-pull action and `send` event. The Chromium suite includes a programmatic reduced-motion test.
- **Progress:** The indeterminate fill CSS includes a `prefers-reduced-motion: reduce` media query that disables animation and transform. The Chromium suite verifies that the indeterminate animation is disabled in reduced-motion mode.

The Phase 1 audit pass also confirmed the documented bumper single-hit and cluster-hit event shapes are both represented, including the cluster's additional `user` field.

## 5. Remaining Phase 1 work

Phase 1 is **not complete**. The following gaps remain open:

- Exact initial values and defaults, type coercion, clamping, normalization and attribute reflection for every component.
- Connection-time configuration and attribute update timing.
- Runtime property values, method parameter default values, return values and public side effects.
- Exact event values and event counts/order for all interaction paths, including dispatch conditions and default prevention.
- Every documented keyboard path, pointer/touch path and disabled interaction for all applicable components.
- Complete per-control validity and form-state restoration, plus cross-browser lifecycle checks.
- Full review of styling hooks, responsive limits, renderer/audio fallbacks and reduced-motion behavior against observed rendering.
- Manual source-to-guide review and sign-off for all 29 API guides, tracked in [PHASE-1-API-GUIDE-REVIEW.md](PHASE-1-API-GUIDE-REVIEW.md).

The automated source audit and runtime consumer checks close the static contract, runtime descriptor/type/method-availability, and clean distribution-install rows. They do not prove exact default values, setter side effects, method returns, comprehensive event/input behavior, or manual guide review.

## 6. Change boundary

No component implementation source, component behavior, dependencies, or application configuration were modified during this Phase 1 pass. The changes are limited to audit/test tooling, CI wiring, API metadata and its generated documentation.
