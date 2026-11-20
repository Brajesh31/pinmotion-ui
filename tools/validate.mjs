#!/usr/bin/env node
// Read-only repository validation. Generated-file parity is checked separately by tools/build.mjs and tools/docs.mjs.
import { existsSync, readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { Script } from 'node:vm';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SPEC, REPO, SITE } from './spec.mjs';
import { NAMES, EXTRA_NAMES } from './build.mjs';

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
  'docs/component-api-conventions.md',
  'docs/component-inventory.md',
  'LICENSE',
  'tools/extra-core.js',
  'tools/extras-spec.mjs',
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
  'tools/integrity.mjs',
  'package.json',
  'package-lock.json'
];

for (const file of requiredFiles) {
  check(`required file: ${file}`, existsSync(join(ROOT, file)));
}

const ids = SPEC.map((component) => component.id);
check('canonical component list contains 29 bundles', ids.length === 29, `found ${ids.length}`);
check('22 lightweight additions are registered', EXTRA_NAMES.length === 22 && EXTRA_NAMES.every(id => ids.includes(id)));
check('build and documentation component lists match', JSON.stringify(NAMES) === JSON.stringify(ids));
check('component IDs are unique', new Set(ids).size === ids.length);
check('primary component tags are unique', new Set(SPEC.map((component) => component.tag)).size === ids.length);
const allTags = SPEC.flatMap(component => component.api?.tags || [`<${component.tag}>`]);
check('all 30 custom element tags are unique', allTags.length === 30 && new Set(allTags).size === allTags.length);

for (const component of SPEC) {
  const isUtility = EXTRA_NAMES.includes(component.id);
  const implementationPath = isUtility ? `extras-src/${component.id}.js` : `${component.id}/${component.id}.js`;
  const implementation = read(implementationPath);
  const registrationPattern = isUtility
    ? /customElements\\.define\\(\\s*['"]([^'"]+)['"]/g
    : /K\\.define\\(\\s*['"]([^'"]+)['"]/g;
  const registeredTags = [...implementation.matchAll(registrationPattern)].map((match) => match[1]);
  const documentedTags = component.api?.tags?.map((tag) => tag.replace(/^<|>$/g, '')) || [];
  check(`source registrations match the API tags: ${component.id}`,
    JSON.stringify(registeredTags) === JSON.stringify(documentedTags),
    `source: ${registeredTags.join(', ') || 'none'}; docs: ${documentedTags.join(', ') || 'none'}`);

  const observedMatch = implementation.match(/(?:static\\s+observedAttributes\\s*=\\s*\\[|static\\s+get\\s+observedAttributes\\s*\\(\\s*\\)\\s*\\{\\s*return\\s*\\[)([\\s\\S]*?)\\]/);
  const sourceObserved = observedMatch
    ? [...observedMatch[1].matchAll(/['"]([^'"]+)['"]/g)].map((match) => match[1])
    : [];
  const documentedAttributes = component.api?.attributes || [];
  const documentedAttributeNames = documentedAttributes.map((attribute) => attribute[0]);
  const missingObserved = documentedAttributes
    .filter((attribute) => /Observed/i.test(attribute[3] || '') &&
      !/shared base/i.test(attribute[3] || '') &&
      !sourceObserved.includes(attribute[0]))
    .map((attribute) => attribute[0]);
  const undocumentedObserved = sourceObserved.filter((attribute) => !documentedAttributeNames.includes(attribute));
  check(`observed attributes match the API contract: ${component.id}`,
    missingObserved.length === 0 && undocumentedObserved.length === 0,
    `missing from source: ${missingObserved.join(', ') || 'none'}; missing from docs: ${undocumentedObserved.join(', ') || 'none'}`);

  const documentedEvents = (component.api?.events || []).map(([name]) => String(name).replaceAll('`', ''));
  const missingEvents = documentedEvents.filter((name) =>
    !implementation.includes(`'${name}'`) && !implementation.includes(`"${name}"`));
  const sourceEvents = [...implementation.matchAll(/\\.emit\\(\\s*['"]([^'"]+)['"]/g)].map((match) => match[1]);
  const undocumentedEvents = [...new Set(sourceEvents)].filter((name) => !documentedEvents.includes(name));
  check(`event names match the API contract: ${component.id}`,
    missingEvents.length === 0 && undocumentedEvents.length === 0,
    `missing from source: ${missingEvents.join(', ') || 'none'}; missing from docs: ${undocumentedEvents.join(', ') || 'none'}`);

  const documentedProperties = (component.api?.properties || [])
    .flatMap(([names]) => String(names).replaceAll('`', '').split(',').map((name) => name.trim()))
    .filter(Boolean);
  const missingProperties = documentedProperties.filter((name) => !new RegExp(`\\b${name}\\b`).test(implementation));
  check(`documented property names exist in source: ${component.id}`,
    missingProperties.length === 0,
    missingProperties.join(', ') || '');

  const documentedMethods = (component.api?.methods || [])
    .map(([signature]) => String(signature).replaceAll('`', '').split('(')[0].trim())
    .filter(Boolean);
  const missingMethods = documentedMethods.filter((name) =>
    !new RegExp(`\\b${name.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\for (const component of SPEC) {
  check(`API metadata exists: ${component.id}`, Boolean(component.api));')}\\s*\\(`).test(implementation));
  check(`documented method names exist in source: ${component.id}`,
    missingMethods.length === 0,
    missingMethods.join(', ') || '');

  check(`API tags are unique within source: ${component.id}`,
    new Set(registeredTags).size === registeredTags.length);
  check(`API metadata exists: ${component.id}`, Boolean(component.api));
  check(`API sections are complete: ${component.id}`, Boolean(
    component.api?.attributes?.length &&
    Array.isArray(component.api?.properties) &&
    Array.isArray(component.api?.methods) &&
    Array.isArray(component.api?.events) &&
    component.api?.input &&
    component.api?.keyboard &&
    component.api?.forms &&
    component.api?.motion
  ));
  check(`custom element tags are documented: ${component.id}`, Array.isArray(component.api?.tags) && component.api.tags.length > 0);
  if (EXTRA_NAMES.includes(component.id)) check(`lightweight source exists: ${component.id}`, existsSync(join(ROOT, 'extras-src', `${component.id}.js`)));
  const guide = read(`${component.id}/README.md`);
  check(`generated guide contains API reference: ${component.id}`, guide.includes('## 🧩 API reference'));
  check(`generated guide contains event contract: ${component.id}`, guide.includes('### Events'));
  check(`generated guide contains form behavior: ${component.id}`, guide.includes('## 📝 Form integration'));
}

const inventory = read('docs/component-inventory.md');
check('component inventory records all 29 component IDs', ids.every((id) => inventory.includes(`(${id})`)));
check('component inventory records the original and utility families',
  inventory.includes('Original mechanical controls (7)') &&
  inventory.includes('Lightweight utility controls (22)'));
check('component inventory documents the static audit boundary',
  inventory.includes('This static audit does **not** prove event timing or payload semantics'));

const rootIndex = read('index.html');
check('root page redirects to the gallery', /url\s*=\s*gallery\//i.test(rootIndex) && rootIndex.includes('href="gallery/"'));

const gallery = read('gallery/index.html');
const galleryInlineScripts = [...gallery.matchAll(/<script>\s*([\s\S]*?)<\/script>/g)];
const galleryRuntime = galleryInlineScripts.at(-1);
let galleryRuntimeError = '';
try {
  if (!galleryRuntime) throw new Error('the inline gallery runtime script was not found');
  new Script(galleryRuntime[1], { filename: 'gallery/index.html inline runtime' });
} catch (error) {
  galleryRuntimeError = error.message;
}
check('gallery inline runtime parses as valid JavaScript', Boolean(galleryRuntime) && !galleryRuntimeError, galleryRuntimeError);
check('gallery error monitor provides a visible startup failure state', gallery.includes('Gallery startup failed:') && gallery.includes('the gallery bootstrap did not finish'));
check('gallery runtime quotes component IDs in its wire map', gallery.includes('"radio-group":') && gallery.includes('"text-field":') && gallery.includes('"date-picker":') && gallery.includes('"color-picker":'));
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
check('package license is MIT', packageJson.license === 'MIT' && packageLock.packages?.['']?.license === 'MIT');
check('MIT license names Brajesh Kumar', read('LICENSE').includes('Copyright (c) 2026 Brajesh Kumar'));

const syntaxFiles = [
  'core.js',
  'tools/extra-core.js',
  'tools/extras-spec.mjs',
  ...EXTRA_NAMES.map(id => `extras-src/${id}.js`),
  ...ids.map((id) => `${id}/${id}.js`),
  'tools/build.mjs',
  'tools/docs.mjs',
  'tools/spec.mjs',
  'tools/test.mjs',
  'tools/shot.mjs',
  'tools/serve.mjs',
  'tools/validate.mjs',
  'tools/integrity.mjs',
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
