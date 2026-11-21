# Pinmotion UI GitHub Actions and repository automation plan

> Status: Planned. Existing workflows are not automatically considered complete just because their YAML exists.
> Reference: VFX UI Anime workflow structure, adapted for Pinmotion UI.

## Current workflow inventory

The current repository has:
- `.github/workflows/validate.yml`
- `.github/workflows/deploy-pages.yml`
- `.github/workflows/generate-components.yml`

The current Validate workflow runs npm installation, build/docs generation and checks, a Chromium browser suite and clean registry consumer tests. The current Pages workflow is manually triggered. The generator workflow also deploys Pages. These responsibilities should be reviewed and separated so generation, validation and deployment cannot race or mask failures.

## Target workflow inventory

| Workflow | Purpose | Trigger | Blocking for stable release |
|---|---|---|---|
| `validate.yml` | Source syntax, build/doc parity, static validator, integrity, browser regression and clean consumer | PR, main push, manual | Yes |
| `component-regression.yml` | Test changed components and dependencies using the component audit matrix | Component source/spec/demo/doc changes, PR | Yes |
| `visual-regression.yml` | Capture desktop/tablet/mobile component and gallery screenshots; compare with approved baselines | PR and manual | Yes for visual changes; manual approval required |
| `deploy-pages.yml` | Build Pages artifact, deploy exact artifact, verify public homepage/gallery/routes/assets in live browser | Main push and controlled manual | Required for release candidate |
| `codeql.yml` | Static application security analysis for JavaScript and any future TypeScript | PR, main, weekly schedule | Yes |
| `codeql-alert-inventory.yml` | Export and retain open code-scanning alert inventory after CodeQL | CodeQL completion, schedule/manual | Yes for final release decision |
| `dependency-review.yml` | Review changed dependencies, licenses and known vulnerabilities | PR | Yes |
| `security-audit.yml` | npm audit, lockfile integrity, supplemental secret scan, license and asset-origin checks | PR, main, weekly schedule | Yes |
| `scorecard.yml` | OpenSSF Scorecard and actionable supply-chain report | Main, schedule | Yes for final security sign-off |
| `package-smoke.yml` | Inspect npm tarball, install in clean consumer, resolve root and every component subpath, browser registration | PR, main, release candidate | Yes |
| `release.yml` | Source-only release candidate, exact SHA validation and release notes | Release branch/tag, manual | Yes |
| `publish.yml` | Protected npm publication using OIDC/trusted publishing and provenance where supported | Stable semver tag | Yes |
| `post-release.yml` | Verify public npm version/install, tarball integrity, GitHub Release, site and demo routes | Successful publish | Yes |
| `generate-components.yml` | Generate standalone bundles, guides, demos, gallery, registry and llms.txt | Manual or controlled source changes | Yes, generated parity |
| Optional `publish-github-package.yml` | Publish a second scoped GitHub Packages distribution only if there is a real need | Stable version tag | Only if adopted |

Do not create two workflows that independently publish/deploy the same artifact without a clearly controlled dependency chain. GitHub Packages is optional; npmjs is the primary target because the user-facing install command is `npm install pinmotion-ui`.

## Staged implementation plan

### Workflow Stage W0 — audit current CI
- Document triggers, required permissions, toolchain, caching, concurrency and artifact behavior for the three existing workflows.
- Fix the Pages artifact identity/retrieval failure recorded in the current acceptance matrix.
- Decide one authoritative Pages deploy workflow. Generator should not deploy a second artifact independently.
- Add workflow syntax and permission review. No broad workflow replacement until current jobs are understood.

**Exit:** one clearly defined validate workflow, one generation path, one deploy path; no concurrent deployment race; exact CI evidence attached.

### Workflow Stage W1 — component regression
- Extend tests per component batch and make changed-component selection deterministic.
- Full regression still runs on main and release candidates.
- Upload per-component failure logs, console logs and browser screenshots.
- Fail if a component crashes, does not register, fails to render or blocks unrelated gallery cards.

**Exit:** each completed component batch has a repeatable focused test and the full suite remains green.

### Workflow Stage W2 — visual and browser evidence
- Add screenshot capture for 1440, 768 and 390 CSS px.
- Capture each component's approved states and gallery first-load.
- Store approved baselines and review artifacts. Never automatically overwrite a baseline after a failing visual diff.
- Add Firefox and WebKit jobs when Phase 17 begins; use physical device QA separately.

**Exit:** every component batch has visual evidence and the baseline update process is reviewable.

### Workflow Stage W3 — repository and supply-chain security
- Add CodeQL and dependency review.
- Add npm audit and supplemental secret scanning (for example Gitleaks) without printing secrets.
- Add Scorecard and an alert inventory artifact.
- Review action pinning, token permissions, workflow write access, pull request from fork behavior and branch protection.
- Audit asset licenses/provenance.

**Exit:** workflow reports are archived; all findings are triaged; critical/high findings are fixed or release is blocked.

### Workflow Stage W4 — package distribution
- Add tarball smoke test before changing package visibility.
- Validate `npm pack --dry-run --json`, actual .tgz contents, offline clean-consumer installation, root import, all 29 component subpaths and browser registration.
- Validate ESM side-effect behavior and import timing.
- Add npm trusted publishing (OIDC) only after npm account's Trusted Publisher settings are configured and verified.

**Exit:** clean consumer passes using the exact tarball built from the release candidate.

### Workflow Stage W5 — controlled release and post-release verification
- Release workflow verifies semver/tag match, release SHA is an ancestor of main, no dirty generated files and all required checks on that exact SHA.
- Use protected environments/manual approval.
- Publish npm with OIDC and provenance when supported.
- Attach package archive, checksums, changelog and source reference to GitHub Release.
- Run post-publication `npm view`, clean install/import and published Pages checks.

**Exit:** package and live site work from the public registry/site and evidence is linked from the release record.

## Workflow hardening rules

- Pin all third-party actions to full commit SHAs in security and release workflows. Dependabot or another reviewed update mechanism may propose SHA updates.
- Set explicit minimal `permissions` for every workflow and job.
- Use `persist-credentials: false` for checkout unless authenticated pushes are required.
- Never echo secrets, print environment dumps or write tokens into committed config files.
- Use protected environments for production deployment and npm publication.
- Use concurrency groups to avoid simultaneous Pages/npm releases.
- Retain screenshots, browser logs, test reports, tarballs and security reports with clear retention windows.
- Do not let workflow success imply manual screen-reader/device QA passed.
- All required checks must be configured in GitHub branch protection/rulesets by the repository maintainer.
- Verify workflow failure paths, including missing/expired artifacts, unavailable WebGL, a broken component script and package export mismatch.

## Repository support assets to add in phases

| Path | Purpose |
|---|---|
| `.github/pull_request_template.md` | Required summary, component IDs, screenshots, browsers, tests and risk |
| `.github/ISSUE_TEMPLATE/bug_report.yml` | Reproducible component/browser/environment reports |
| `.github/ISSUE_TEMPLATE/feature_request.yml` | Clear use case and expected behavior |
| `.github/ISSUE_TEMPLATE/config.yml` | Direct security reports to private disclosure |
| `.github/CODEOWNERS` | Optional ownership map for runtime, components, docs and release files |
| GitHub ruleset | Require checks, restrict force-push/deletion and protect stable tags |
| Repository security settings | Secret scanning, push protection and private vulnerability reporting where available |

## Completion record

| Stage | Status | Evidence |
|---|---|---|
| W0 | Planned | Pending |
| W1 | Planned | Pending |
| W2 | Planned | Pending |
| W3 | Planned | Pending |
| W4 | Planned | Pending |
| W5 | Planned | Pending |

The current workflow files must be audited before these stages are implemented. Do not mark W0 complete based solely on this plan.
