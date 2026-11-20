#!/usr/bin/env node
// Static source-to-contract audit. This checks names and declared metadata only,
// not interaction semantics, browser behavior, or assistive-technology conformance.
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SPEC } from './spec.mjs';
import { EXTRA_NAMES } from './build.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
let failures = 0;
let passed = 0;

function check(label, condition, detail = '') {
  if (condition) {
    passed++;
    console.log('PASS  ' + label);
  } else {
    failures++;
    console.error('FAIL  ' + label + (detail ? ': ' + detail : ''));
  }
}

function read(path) {
  try {
    return readFileSync(join(ROOT, path), 'utf8');
  } catch (error) {
    check('read ' + path, false, error.message);
    return '';
  }
}

const allTags = [];

for (const component of SPEC) {
  const id = component.id;
  const isUtility = EXTRA_NAMES.includes(id);
  const sourcePath = isUtility ? 'extras-src/' + id + '.js' : id + '/' + id + '.js';
  const bundlePath = id + '/' + id + '.js';
  const guidePath = id + '/README.md';
  const demoPath = id + '/index.html';
  const source = read(sourcePath);
  const api = component.api || {};

  check(id + ': standalone source exists', existsSync(join(ROOT, sourcePath)));
  check(id + ': distributable bundle exists', existsSync(join(ROOT, bundlePath)));
  check(id + ': component guide exists', existsSync(join(ROOT, guidePath)));
  check(id + ': demo page exists', existsSync(join(ROOT, demoPath)));

  const registrationPattern = isUtility
    ? /customElements\.define\(\s*['"]([^'"]+)['"]/g
    : /K\.define\(\s*['"]([^'"]+)['"]/g;
  const registeredTags = [...source.matchAll(registrationPattern)].map((match) => match[1]);
  const documentedTags = (api.tags || []).map((tag) => String(tag).replace(/^<|>$/g, ''));
  allTags.push(...registeredTags);

  check(id + ': source registrations match documented tags',
    JSON.stringify(registeredTags) === JSON.stringify(documentedTags),
    'source=' + registeredTags.join(', ') + '; docs=' + documentedTags.join(', '));
  check(id + ': tag registrations are unique',
    new Set(registeredTags).size === registeredTags.length);

  const observedMatch = source.match(/static\s+observedAttributes\s*=\s*\[([\s\S]*?)\]/);
  const sourceObserved = observedMatch
    ? [...observedMatch[1].matchAll(/['"]([^'"]+)['"]/g)].map((match) => match[1])
    : [];
  const documentedAttributes = api.attributes || [];
  const missingObserved = documentedAttributes
    .filter((attribute) =>
      /Observed/i.test(attribute[3] || '') &&
      !/shared base/i.test(attribute[3] || '') &&
      !sourceObserved.includes(attribute[0]))
    .map((attribute) => attribute[0]);

  check(id + ': observed attributes are present in source',
    missingObserved.length === 0,
    missingObserved.join(', '));

  const documentedEvents = (api.events || []).map(([name]) => String(name).replaceAll(String.fromCharCode(96), ''));
  const missingEvents = documentedEvents.filter((name) =>
    !source.includes("'" + name + "'") && !source.includes('"' + name + '"'));

  check(id + ': documented event names occur in source',
    missingEvents.length === 0,
    missingEvents.join(', '));

  const documentedProperties = (api.properties || [])
    .flatMap(([names]) => String(names).replaceAll(String.fromCharCode(96), '').split(',').map((name) => name.trim()))
    .filter(Boolean);
  const missingProperties = documentedProperties.filter((name) => !source.includes(name));

  check(id + ': documented property names occur in source',
    missingProperties.length === 0,
    missingProperties.join(', '));

  const documentedMethods = (api.methods || [])
    .map(([signature]) => String(signature).replaceAll(String.fromCharCode(96), '').split('(')[0].trim())
    .filter(Boolean);
  const missingMethods = documentedMethods.filter((name) =>
    !source.includes(name + '(') && !source.includes(name + ' ('));

  check(id + ': documented method names occur in source',
    missingMethods.length === 0,
    missingMethods.join(', '));

  const guide = read(guidePath);
  check(id + ': generated guide contains API sections',
    guide.includes('## 🧩 API reference') &&
    guide.includes('### Attributes') &&
    guide.includes('### Properties') &&
    guide.includes('### Methods') &&
    guide.includes('### Events') &&
    guide.includes('## 📝 Form integration'));

  const demo = read(demoPath);
  check(id + ': demo loads its matching bundle',
    demo.includes('<script src="' + id + '.js"></script>'));
}

check('all source registrations are globally unique',
  new Set(allTags).size === allTags.length,
  'duplicate tags: ' + allTags.filter((tag, index) => allTags.indexOf(tag) !== index).join(', '));
check('the source registers exactly 30 custom-element tags', allTags.length === 30, 'found ' + allTags.length);

const registry = JSON.parse(read('registry.json'));
check('registry entries cover all component IDs',
  Array.isArray(registry.items) &&
  registry.items.length === SPEC.length &&
  SPEC.every((component) => registry.items.some((item) => item.name === component.id)));

const inventory = read('docs/component-inventory.md');
check('generated inventory exists and lists every bundle',
  SPEC.every((component) => inventory.includes(component.id)));
check('inventory separates original and utility families',
  inventory.includes('Original mechanical controls (7)') &&
  inventory.includes('Lightweight utility controls (22)'));

console.log('');
console.log('Component contract audit: ' + passed + ' passed, ' + failures + ' failed.');
if (failures > 0) process.exitCode = 1;
