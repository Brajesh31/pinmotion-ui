#!/usr/bin/env node
// Read-only repository validation. Generated-file parity is checked separately by tools/build.mjs and tools/docs.mjs.
import { existsSync, readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SPEC, REPO, SITE } from './spec.mjs';
import { NAMES } from './build.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
let failures = 0;
let passed = 0;

function check(name, condition, detail = '') {
  if (condition) {
    passed++;
    console.log(`PASS  ${name}`);
  } else {
    failures++;
    console.error(`FAIL  ${name}${detail ? ': ' + detail : ''}`);
  }
}

function read(relativePath) {
  try {
    return readFileSync(join(ROOT, relativePath), 'utf8');
  } catch (error) {
    check(`read ${relativePath}`, false, error.message);
    return '';
  }
}

const requiredFiles = [
  '.github/workflows/deploy-pages.yml',
  '.nojekyll',
  'index.html',
  'core.js',
  'gallery/index.html',
  'gallery/title.jpg',
  'registry.json',
  'llms.txt',
  'making-of/README.md',
  'making-of/prompts.md',
  'skills/pinball-ui/SKILL.md',
  'skills/pinball-ui/core.js',
  'skills/pinball-ui/starter.html',
  'skills/pinball-ui/look.mjs',
  'tools/build.mjs',
  'tools/docs.mjs',
  'tools/spec.mjs',
  'tools/test.mjs',
  'tools/shot.mjs',
  'tools/serve.mjs',
  'tools/validate.mjs',
  'package.json',
  'package-lock.json'
];

for (const file of requiredFiles) {
  check(`required file: ${file}`, existsSync(join(ROOT, file)));
}

const ids = SPEC.map((component) => component.id);
check('canonical component list contains seven entries', ids.length === 7, `found ${ids.length}`);
check('build and documentation component lists match', JSON.stringify(NAMES) === JSON.stringify(ids));
check('component IDs are unique', new Set(ids).size === ids.length);
check('component tags are unique', new Set(SPEC.map((component) => component.tag)).size === ids.length);

const rootIndex = read('index.html');
check('root page redirects to the gallery', /url\s*=\s*gallery\//i.test(rootIndex) && rootIndex.includes('href="gallery/"'));

const gallery = read('gallery/index.html');
for (const id of ids) {
  check(`${id}: standalone script exists`, existsSync(join(ROOT, id, `${id}.js`)));
  check(`${id}: demo page exists`, existsSync(join(ROOT, id, 'index.html')));
  check(`${id}: component README exists`, existsSync(join(ROOT, id, 'README.md')));
  check(`${id}: gallery loads its standalone script`, gallery.includes(`../${id}/${id}.js`));
  check(`${id}: appears in gallery catalogue`, gallery.includes(`"id": "${id}"`));
  const demo = read(`${id}/index.html`);
  check(`${id}: demo loads its local script`, demo.includes(`<script src="${id}.js"></script>`));
}

let registry;
try {
  registry = JSON.parse(read('registry.json'));
  check('registry JSON parses', true);
} catch (error) {
  check('registry JSON parses', false, error.message);
  registry = { items: [] };
}
check('registry contains one entry per component', Array.isArray(registry.items) && registry.items.length === ids.length);
check('registry homepage matches the project site', registry.homepage === SITE);
for (const id of ids) {
  const item = registry.items.find((entry) => entry.name === id);
  check(`registry entry exists: ${id}`, Boolean(item));
  if (item) {
    check(`registry type is correct: ${id}`, item.type === 'registry:file');
    check(`registry source exists: ${id}`, Array.isArray(item.files) && item.files.some((file) => file.path === `${id}/${id}.js`));
    check(`registry install target is defined: ${id}`, item.files?.some((file) => file.target === `~/public/pinball-ui/${id}.js`));
  }
}

const packageJson = JSON.parse(read('package.json'));
const packageLock = JSON.parse(read('package-lock.json'));
check('package is private until distribution phase', packageJson.private === true);
check('package has no third-party dependencies', !packageJson.dependencies && !packageJson.devDependencies);
check('package and lockfile names match', packageJson.name === packageLock.name);
check('package and lockfile versions match', packageJson.version === packageLock.version);
check('package uses the npm lockfile v3 format', packageLock.lockfileVersion === 3);
check('package repository metadata matches', packageJson.repository?.url === `https://github.com/${REPO}.git`);

const syntaxFiles = [
  'core.js',
  ...ids.map((id) => `${id}/${id}.js`),
  'tools/build.mjs',
  'tools/docs.mjs',
  'tools/spec.mjs',
  'tools/test.mjs',
  'tools/shot.mjs',
  'tools/serve.mjs',
  'tools/validate.mjs',
  'skills/pinball-ui/core.js',
  'skills/pinball-ui/look.mjs'
];

for (const file of syntaxFiles) {
  const result = spawnSync(process.execPath, ['--check', join(ROOT, file)], {
    cwd: ROOT,
    encoding: 'utf8'
  });
  check(`JavaScript syntax: ${file}`, result.status === 0, result.stderr?.trim() || result.error?.message || '');
}

const deployWorkflow = read('.github/workflows/deploy-pages.yml');
check('Pages deploy action uses v5', deployWorkflow.includes('actions/deploy-pages@v5'));
check('Pages artifact action uses v5', deployWorkflow.includes('actions/upload-pages-artifact@v5'));
check('Pages artifact includes hidden files', deployWorkflow.includes('include-hidden-files: true'));

console.log('');
console.log(`Validation summary: ${passed} passed, ${failures} failed.`);
if (failures > 0) process.exitCode = 1;
