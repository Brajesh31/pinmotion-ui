# ♿ Accessibility, rendering, and known limitations

## 1. Semantic control patterns

The controls put a semantic interactive element inside an open Shadow DOM rather than making the entire visual drawing the input.

| Control | Internal semantics documented by the component guide | Keyboard interaction |
| --- | --- | --- |
| Toggle | Button with `role="switch"` and `aria-checked` | Space and Enter |
| Slider | Element with `role="slider"` | Arrow keys, Page Up/Down, Home, End |
| Plunger | Button | Hold Space/Enter to pull; release to shoot |
| Stepper | Element with `role="spinbutton"` | Arrows, plus/minus, Page Up/Down, Home/End |
| Drop targets | Group of buttons with `role="checkbox"` | Left/Right move; Space/Enter toggle |
| Drain | Two buttons; the undo button is `aria-disabled` when unavailable | Chute: Enter, Space, Delete, Backspace |
| Pop bumpers | Single button; cluster has `role="button"` | Space and Enter |

The `label` attribute gives the internal control or group a name. The shared base attaches an open shadow root with `delegatesFocus: true`. Custom events are bubbling and composed so application event handlers can remain outside the shadow tree.

## 2. Disabled state

The shared base watches the host's `disabled` attribute and sets the host's `inert` property accordingly. The component guides describe disabled controls as inert to presses and greyed out.

## 3. Form behavior

Toggle, Slider, Stepper, and Drop targets document form participation when a `name` attribute is present. The shared base attempts `ElementInternals` attachment for components that declare `formAssociated`, and calls the component's `formValue()` implementation through `syncForm()`.

Plunger, Drain, and Pop bumpers are action controls and do not document native form values.

Form-associated custom elements depend on browser platform support. The repository's browser test exercises successful value submission in headless Chromium, but no cross-browser form-support matrix is published.

**Known form lifecycle gaps:** The original PinballKit base and the utility base do not implement `formResetCallback`, so calling `form.reset()` does not currently restore the custom controls to their initial values. The original PinballKit base also does not implement `formDisabledCallback`; the utility base does. Disabled-fieldset behavior for original form controls is therefore not established and must be tested and fixed before release. No `formStateRestoreCallback` implementation is present in either base.

## 4. Reduced motion

The core reads `prefers-reduced-motion: reduce` and updates its `calm` state when the media query changes.

- Toggle, Slider, Stepper, Drain, and Pop bumpers snap moving visuals to their final state while retaining the resulting control state.
- **Drop targets** also snap their targets and lamps. Its `bonus` event is tied to the normal-motion impact callback and is not emitted in reduced-motion mode; use `change.detail.allChecked` for application logic.
- **Progress indeterminate animation** is disabled when reduced motion is requested.
- **Plunger remains an exception.** Its pull and shot continue to animate when reduced motion is requested.

Do not claim full reduced-motion coverage until Plunger behavior is addressed and retested.

## 5. WebGL and visual fallback

The live chrome ball and lamps are drawn with WebGL. If WebGL is unavailable or fails, the shared drawing layer cannot provide those visuals. The component guides state that the underlying control remains focusable and usable, but the animated chrome ball and lamp effects are not drawn.

The repository does not currently document an alternate non-WebGL renderer for all components.

## 6. Sound behavior

Sound is enabled by default, but browser autoplay restrictions mean audio is initialized after the first pointer or keyboard interaction. The shared controller decodes embedded takes after that first interaction.

Consumers can mute one element with the `silent` attribute or mute the shared audio output using `PinballKit.sound = false`. The gallery and component demo pages provide a sound toggle.

Sound is supplemental feedback. Application logic should depend on control state and events, not on whether a sound played successfully.

## 7. Visual sizing and responsive limits

The `--pb-size` variable controls component height. Artwork plates keep their original proportions. They can scale but do not reflow into a different shape. The Plunger also needs room for the pull movement and for its ball to travel away from the control.

The `--pb-page` variable should be set to a hex value matching the page background so the chrome ball's reflections blend with the interface.

## 8. Verification status

The repository records automated checks in headless Chromium with touch and keyboard input at a mobile-width viewport. It does not claim testing with:
- Safari;
- Firefox;
- physical mobile devices;
- screen readers;
- physical-device audio playback.

These are known evidence gaps. The presence of ARIA roles and keyboard handlers is not the same as a completed assistive-technology audit. Test the real consuming application with its target browsers and assistive technologies before relying on these controls in a high-accessibility context.


## 9. Lightweight utility component semantics

The 22 utility controls use native browser elements or ARIA patterns inside their own open Shadow DOM. These descriptions document implementation intent, not screen-reader certification.

| Component family | Semantic implementation | Keyboard model |
| --- | --- | --- |
| Checkbox / Radio Group / Segmented / Rating | Buttons with checkbox, radio or pressed-state semantics | Space/Enter; choice groups add arrow navigation |
| Progress / Meter | `progressbar` / `meter` informational roles | Not focusable; display-only |
| Tabs / Accordion / Disclosure | Tablist/tab/tabpanel, expanded buttons, native details/summary | Arrow/Home/End where implemented; native summary activation |
| Tooltip / Dialog / Toast | Tooltip description, native dialog, live status region | Focus/Escape, native dialog cancellation, native buttons |
| Breadcrumbs / Pagination | Navigation landmarks, ordered trail, native page buttons | Native link/button keyboard behavior |
| Search / Text Field / Text Area / Select / Date Picker / Color Picker | Native inputs, textarea and select | Browser-native keyboard behavior |
| Combobox / File Drop | ARIA combobox/listbox with input; focusable drop target and native file input | Arrow/Enter/Escape for listbox; Enter/Space to open file picker |

The utility family has a separate base helper and CSS-rendered mechanical housings, but does not rely on WebGL or embedded audio. If the original PinballKit runtime is already loaded, utility interactions can call its shared sound effects. Form-associated controls attempt `ElementInternals`; support depends on browser implementation. Dedicated physical-device and assistive-technology testing is still required.
