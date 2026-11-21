# Component audit: Toggle

> **Status: IN PROGRESS.** This is a provisional first-control audit. Phase 0 remains open, and no final approval is claimed.
> Programme batch: 1A, provisional original-four set. Audit baseline: main commit 4261f5e3d4ed34926a177a08cf51307b031b904b.

## 1. Component identity

| Field | Value |
|---|---|
| Component ID | toggle |
| Custom element | pinball-toggle |
| Canonical source | toggle/toggle.js |
| Generated standalone bundle | toggle/toggle.js (self-contained PinballKit runtime, artwork and sound payload) |
| Demo | toggle/index.html |
| Component guide | toggle/README.md |
| Specification / generated API source | tools/spec.mjs |
| Browser regression suite | tools/test.mjs |
| Runtime family | PinballKit, WebGL canvas and recorded sound |
| Related defects | PM-005, PM-006 |

## 2. Original design and visual baseline

Reference style: a photographed red-trimmed teal pinball lane, live chrome-ball knob, warm lamp under the active end, rolling/impact movement and recorded mechanical sound. The implementation and screenshots preserve this style; no generic switch replacement was introduced.

Evidence archive: [Phase 0 visual artifact 14699149118](https://github.com/Brajesh31/pinmotion-ui/actions/runs/44884841710/artifacts/14699149118).

| Capture | Size | Result |
|---|---:|---|
| Off / default, desktop | 1440 × 1000 | Captured and visually reviewed |
| Off / default, tablet | 768 × 1024 | Captured and visually reviewed |
| Off / default, mobile | 780 × 1688 at DPR 2 | Captured and visually reviewed |
| On state, desktop | 1440 × 1000 | Captured; ball at right end and amber lamp visible |
| Gallery card, desktop/tablet/mobile | Full-page gallery captures | Present in all captures; deeper parity review pending |

Remaining visual work: keyboard focus, hover, disabled/invalid, WebGL unavailable/context loss, asset failure and isolated/gallery pixel-level parity. Reduced-motion state synchronization was found defective, fixed in the pending commit described below, and must not be marked verified until CI passes.

## 3. Public API contract

| Member | Current documented behavior | Evidence / status |
|---|---|---|
| checked | Boolean read/write; presence of checked attribute means on | Contract audit and browser regression; passed |
| toggle() | Flips logical state programmatically; no user interaction events | Contract audit; passed |
| checked attribute | Observed after connection; add means on, remove means off | Contract audit; passed |
| disabled | Observed; host becomes inert and visually muted | Existing browser suite checks inert state; broader disabled-state test pending |
| mode | live, plates or 3d rendering mode | Contract audit; passed; visual comparison pending |
| label | Accessible-name fallback, read on connection | New label fallback browser check passed |
| aria-label | Host-provided accessible name forwarded to inner switch button | New browser check passed |
| aria-labelledby | Whitespace-separated IDs resolved from same document/shadow root, then forwarded as inner button name | New browser check passed for external reference |
| name / value | Form field configuration; set before connection | Existing form tests; passed |
| change | Composed, bubbling CustomEvent with detail { checked: boolean }, for user activation | Existing event contract test; passed |
| input | Plain composed, bubbling Event without detail, immediately after change for user toggle | Contract audit; passed |

Programmatic checked updates deliberately do not emit change/input. The input event has no detail payload. The label and ARIA naming inputs are read at connection and are not observed live.

## 4. Reproduction and fixes

### PM-005: detached property/method access

Before the fix, checked returned undefined before connection and set()/toggle() could access an absent this.btn. Fixed in commit 7ff7e014d6e72319290c55b776622333bc1b5b4f.

Regression coverage: detached checked getter; detached checked setter and toggle(); state/ARIA/FormData after connection; attribute removal; programmatic event suppression. These tests passed in Validate run 44884388345.

### PM-006: accessible name on shadow switch

Before the fix, host aria-label and aria-labelledby did not become the accessible name of the inner button with role=switch. Fixed in commit 4261f5e3d4ed34926a177a08cf51307b031b904b. The resolver now follows aria-labelledby, aria-label, label, then Toggle fallback.

Regression coverage: explicit aria-label, external aria-labelledby and label fallback. All three passed in Validate run [44885328475](https://github.com/Brajesh31/pinmotion-ui/actions/runs/44885328475).


### PM-007: reduced-motion lamp and spring state

The reduced-motion branch previously moved the ball and zeroed its velocity without synchronizing the lamp's logical/visual state or snapping the body spring. The new fix sets the ball position, lamp state, and spring to their final values. Browser regression checks both on and off transitions while prefers-reduced-motion is active. CI verification is pending.

## 5. Interaction, forms and browser evidence

Validated in headless Chromium 158.0.8127.36 at a 390 CSS px interaction viewport:

- Pointer activation toggles on and emits change.
- Dragging the ball across the lane changes checked state.
- Space and Enter activate the native button role=switch.
- checked state is reflected in FormData when on and removed when off.
- Programmatic state changes do not emit change/input.
- Disabled attribute makes the host inert.
- Disabled fieldset excludes the control from form submission.
- formStateRestoreCallback restores checked state and submitted value.
- No horizontal overflow at the 390 CSS px viewport.
- WebGL test confirms the Toggle canvas draws non-transparent pixels when WebGL is enabled.

Current successful Validate run: [44885328475](https://github.com/Brajesh31/pinmotion-ui/actions/runs/44885328475). This run reports 540 contract checks, 611 repository validation checks, 786 integrity checks (375 Markdown links), and 639 clean consumer/mixed bundle-load checks, all passing. The browser suite completed with all tests passing.

## 6. Documentation and skill

- toggle/README.md updated for detached state seeding and accessible-name forwarding.
- tools/spec.mjs records the public accessible-name and detached setup contract.
- skills/pinball-ui/SKILL.md now requires detached-state tests and correct accessible-name forwarding for Shadow DOM controls.
- toggle/index.html is retained as the original standalone demo and still renders the photographed pinball switch.

## 7. Outstanding acceptance work

- [ ] Disconnect/reconnect during animation, drag and pending callbacks; verify scheduler/listener/observer cleanup.
- [ ] Verify focus behavior with keyboard and screen reader, including VoiceOver/NVDA or equivalent manual review.
- [ ] Verify disabled interaction behavior under mouse, touch, keyboard and programmatic activation.
- [ ] Test the label mapping through the computed browser accessibility tree, including multiple ID references and nested shadow-root references.
- [ ] Test label/ARIA name updates after connection or document the static-name limitation as a deliberate API contract.
- [ ] Test WebGL unavailable, shader/asset failure and context loss. README currently explains that shader visuals are missing without WebGL; confirm whether that fallback is acceptable.
- [ ] Verify audio initialization and the first user-interaction policy with audible output; screenshot evidence is not audio evidence.
- [ ] Capture focus, hover, disabled, and all visual rendering modes. Reduced-motion functional verification is pending for PM-007; a dedicated screenshot remains pending.
- [ ] Finish full component visual/API/lifecycle/a11y review and close Phase 0 ambiguities before advancing to Slider.

**Disposition:** Toggle has two confirmed defects fixed and passing regression tests, and its primary artwork is present at the three reference widths. It is not yet a fully audited or release-ready component.
