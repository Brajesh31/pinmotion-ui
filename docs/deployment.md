# 🚀 Deployment and hosting

## 1. Hosting model

Pinball UI is a static site deployed to GitHub Pages. It does not require a Node.js server at runtime, API server, database, environment file, or client-side build output directory.

The public project URL is:

- Gallery: https://brajesh31.github.io/pinmotion-ui/gallery/
- Root entry: https://brajesh31.github.io/pinmotion-ui/

The root `index.html` immediately redirects to `gallery/` using a meta refresh and provides a normal fallback link.

## 2. Pages deployment workflow

The workflow is [`.github/workflows/deploy-pages.yml`](../.github/workflows/deploy-pages.yml).

### Trigger

- Push to `main`;
- manual `workflow_dispatch`.

### Build job

1. Checks out the repository.
2. Verifies the root page, gallery, gallery title image, registry, and `.nojekyll`.
3. Verifies each of the seven component demo pages, component READMEs, and non-empty bundles.
4. Runs `node --check` against each distributed component JavaScript file.
5. Parses `registry.json` with Python's JSON tool.
6. Runs `actions/configure-pages`.
7. Uploads the repository as a GitHub Pages artifact, with hidden files included.

### Deploy job

The deploy job waits for the build job. It has the Pages write and OIDC token permissions required by the Pages deployment action, and publishes the uploaded artifact to the `github-pages` environment.

The workflow uses:
- `actions/checkout@v7`;
- `actions/configure-pages@v5`;
- `actions/upload-pages-artifact@v5`;
- `actions/deploy-pages@v5`.

## 3. Validation workflow

The independent [`.github/workflows/validate.yml`](../.github/workflows/validate.yml) runs on pushes and pull requests targeting `main`, and on manual dispatch. It uses Node 22, runs `npm ci`, then `npm run check`, and performs local static-server smoke tests.

The Pages workflow has its own preflight checks. It does not wait for the separate validation workflow to finish.

## 4. Repository settings checklist

For the Actions deployment flow to publish successfully, check the repository's Pages configuration:

- Set the Pages build/deployment source to **GitHub Actions**.
- Ensure the deployment workflow is allowed to use the `github-pages` environment.
- Preserve the workflow permissions needed for Pages deployment and the OIDC token.
- Keep the artifact path at the repository root unless the site is deliberately reorganized.
- Keep `.nojekyll` present so static files and folders beginning with underscores are not subject to Jekyll processing behavior.

The current workflow uploads the repository root; it does not run `npm run build` or `npm run docs` during deployment. Generated bundles and pages therefore need to be committed before the workflow runs.

## 5. Published URL structure

GitHub Pages serves the repository under the project path `/pinmotion-ui/`. Internal links in the generated demo pages and gallery use relative paths for component navigation. The canonical `SITE` value is defined in `tools/spec.mjs`, and the root package homepage points to the project site.

## 6. Manual deployment

Use the workflow_dispatch option from the GitHub Actions UI when a redeploy is required without a new push. Review the run's build and deploy jobs, and confirm the environment deployment URL reported by the deploy job.

## 7. Rollback and recovery

The current repository does not define a dedicated rollback workflow. To recover from a bad static release, revert the offending commit on `main` or restore the last known-good generated artifacts, then allow the normal Pages workflow to deploy the corrected main branch. Verify both the GitHub Actions run and the hosted routes.

No custom domain, DNS configuration, CDN, cache invalidation workflow, or runtime server configuration is defined in this repository snapshot.
