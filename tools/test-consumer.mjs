#!/usr/bin/env node
// Build a dependency-free temporary consumer from registry.json, then verify each
// registry file alone and all bundles in several mixed load orders using Chromium.
import { createServer } from 'node:http';
import { createServer as createNetServer } from 'node:net';
import { copyFileSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { spawn } from 'node:child_process';
import { tmpdir } from 'node:os';
import { dirname, extname, join, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SPEC } from './spec.mjs';
import { LEGACY_NAMES, EXTRA_NAMES } from './build.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const CHROME = process.env.CHROME || 'chromium';
const registry = JSON.parse(readFileSync(join(ROOT, 'registry.json'), 'utf8'));
let passed = 0;
let failed = 0;
const check = (label, ok, detail = '') => {
  if (ok) { passed++; console.log('PASS ' + label); }
  else { failed++; console.error('FAIL ' + label + (detail ? ': ' + detail : '')); }
};
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const getPort = () => new Promise((resolve, reject) => {
  const s = createNetServer();
  s.once('error', reject);
  s.listen(0, '127.0.0.1', () => {
    const port = s.address().port;
    s.close((error) => error ? reject(error) : resolve(port));
  });
});
const toElement = (tag) => '<' + tag + ' id="' + tag + '"></' + tag + '>';

const temp = mkdtempSync(join(tmpdir(), 'pinmotion-consumer-'));
const publicRoot = join(temp, 'public', 'pinball-ui');
mkdirSync(publicRoot, { recursive: true });
const allItems = [];
for (const component of SPEC) {
  const item = registry.items.find((entry) => entry.name === component.id);
  check(component.id + ': registry item exists exactly once',
    registry.items.filter((entry) => entry.name === component.id).length === 1);
  if (!item || !Array.isArray(item.files) || item.files.length !== 1) {
    check(component.id + ': one distributable registry file', false, 'expected one registry:file');
    continue;
  }
  const file = item.files[0];
  const expectedPath = component.id + '/' + component.id + '.js';
  const expectedTarget = '~/public/pinball-ui/' + component.id + '.js';
  const source = join(ROOT, file.path || '');
  const relativeTarget = resolve(temp, (file.target || '').replace(/^~\//, ''));
  check(component.id + ': registry source path is canonical', file.path === expectedPath, file.path);
  check(component.id + ': registry target is canonical', file.target === expectedTarget, file.target);
  check(component.id + ': source bundle exists', existsSync(source), source);
  if (existsSync(source) && file.target === expectedTarget) copyFileSync(source, relativeTarget);
  const tags = (component.api?.tags || ['<' + component.tag + '>']).map((tag) => tag.replace(/^<|>$/g, ''));
  allItems.push({ id: component.id, url: '/public/pinball-ui/' + component.id + '.js', tags });
}

check('registry has exactly the 29 canonical component entries',
  registry.items.length === 29 && allItems.length === 29,
  registry.items.length + ' registry items / ' + allItems.length + ' copied');

const htmlPage = (scripts, tags, mixed = false) => {
  const snapshots = mixed
    ? '<script>window.__loaded=[];window.__errors=[];window.__runtimeObjects=new WeakMap();window.__nextRuntimeId=0;window.__runtimeId=value=>{if(!value||(typeof value!=="object"&&typeof value!=="function"))return null;if(!window.__runtimeObjects.has(value))window.__runtimeObjects.set(value,++window.__nextRuntimeId);return window.__runtimeObjects.get(value)};addEventListener("error",e=>window.__errors.push(e.message||"script error"));addEventListener("unhandledrejection",e=>window.__errors.push(String(e.reason)));</script>'
    : '<script>window.__errors=[];addEventListener("error",e=>window.__errors.push(e.message||"script error"));addEventListener("unhandledrejection",e=>window.__errors.push(String(e.reason)));</script>';
  const scriptTags = scripts.map((item) =>
    '<script src="' + item.url + '"' +
    (mixed ? " onload='window.__loaded.push({id:" + JSON.stringify(item.id) + ",pinballId:window.__runtimeId(window.PinballKit),extrasId:window.__runtimeId(window.PinmotionExtras)})'" : '') +
    '></script>'
  ).join('\n');
  return '<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Pinmotion clean consumer</title></head><body>' +
    tags.map(toElement).join('\n') + snapshots + scriptTags + '</body></html>';
};

for (const item of allItems) {
  const dir = join(temp, 'cases', item.id);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), htmlPage([item], item.tags));
}
const allTags = [...new Set(allItems.flatMap((item) => item.tags))];
const interleave = (left, right) => {
  const result = [];
  for (let i = 0; i < Math.max(left.length, right.length); i++) {
    if (left[i]) result.push(left[i]);
    if (right[i]) result.push(right[i]);
  }
  return result;
};
const byId = new Map(allItems.map((item) => [item.id, item]));
const originals = LEGACY_NAMES.map((id) => byId.get(id)).filter(Boolean);
const utilities = EXTRA_NAMES.map((id) => byId.get(id)).filter(Boolean);
const orders = [
  ['originals-first', [...originals, ...utilities]],
  ['utilities-first', [...utilities, ...originals]],
  ['interleaved', interleave(originals, utilities)],
  ['reverse-all', [...allItems].reverse()]
];
for (const [name, items] of orders) {
  const dir = join(temp, 'mixed', name);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), htmlPage(items, allTags, true));
}

const mime = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8' };
const server = createServer((req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://127.0.0.1').pathname);
    let file = resolve(temp, '.' + pathname);
    if (file !== temp && !file.startsWith(temp + sep)) { res.writeHead(403).end(); return; }
    if (existsSync(file) && !extname(file)) file = join(file, 'index.html');
    if (!existsSync(file)) { res.writeHead(404).end('Not found'); return; }
    res.writeHead(200, { 'content-type': mime[extname(file)] || 'application/octet-stream', 'cache-control': 'no-store' });
    res.end(readFileSync(file));
  } catch (error) { res.writeHead(500).end(String(error)); }
});

const port = await new Promise((resolve, reject) => {
  server.once('error', reject);
  server.listen(0, '127.0.0.1', () => resolve(server.address().port));
});
const debugPort = await getPort();
const profile = mkdtempSync(join(tmpdir(), 'pinmotion-consumer-chrome-'));
const chromeOutput = [];
const chrome = spawn(CHROME, [
  '--headless=new', '--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage',
  '--enable-unsafe-swiftshader', '--remote-debugging-port=' + debugPort,
  '--remote-debugging-address=127.0.0.1', '--remote-allow-origins=*',
  '--user-data-dir=' + profile, '--no-first-run', '--disable-extensions',
  '--hide-scrollbars', 'about:blank'
], { stdio: ['ignore', 'ignore', 'pipe'] });
chrome.stderr.setEncoding('utf8');
chrome.stderr.on('data', (chunk) => {
  chromeOutput.push(...chunk.split(/\r?\n/).filter(Boolean));
  if (chromeOutput.length > 80) chromeOutput.splice(0, chromeOutput.length - 80);
});
let target;
for (let i = 0; i < 150; i++) {
  if (chrome.exitCode !== null) break;
  try {
    const response = await fetch('http://127.0.0.1:' + debugPort + '/json/list');
    if (response.ok) {
      const pages = await response.json();
      target = pages.find((page) => page.type === 'page');
      if (target?.webSocketDebuggerUrl) break;
    }
  } catch {}
  await sleep(400);
}
if (!target?.webSocketDebuggerUrl) {
  chrome.kill('SIGTERM'); server.close(); rmSync(profile, { recursive: true, force: true }); rmSync(temp, { recursive: true, force: true });
  throw new Error('Chrome did not expose a DevTools page target. ' + chromeOutput.slice(-20).join('\n'));
}
const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((resolve, reject) => {
  const timeout = setTimeout(() => reject(new Error('DevTools WebSocket timeout')), 15000);
  ws.addEventListener('open', () => { clearTimeout(timeout); resolve(); }, { once: true });
  ws.addEventListener('error', () => { clearTimeout(timeout); reject(new Error('DevTools WebSocket failed')); }, { once: true });
});
let command = 0;
const pending = new Map();
ws.addEventListener('message', (event) => {
  const message = JSON.parse(event.data);
  if (message.id && pending.has(message.id)) {
    const resolve = pending.get(message.id);
    pending.delete(message.id);
    resolve(message);
  }
});
const send = (method, params = {}) => new Promise((resolve, reject) => {
  const id = ++command;
  pending.set(id, (message) => message.error ? reject(new Error(method + ': ' + message.error.message)) : resolve(message.result));
  ws.send(JSON.stringify({ id, method, params }));
});
const evaluate = async (expression) => {
  const result = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.exception?.description || result.exceptionDetails.text);
  return result.result.value;
};
const navigate = async (path, readyExpression) => {
  await send('Page.navigate', { url: 'http://127.0.0.1:' + port + path });
  for (let attempt = 0; attempt < 80; attempt++) {
    try { if (await evaluate(readyExpression)) return true; } catch {}
    await sleep(100);
  }
  return false;
};

try {
  await send('Runtime.enable');
  await send('Page.enable');
  await send('Network.enable');
  for (const item of allItems) {
    const ok = await navigate('/cases/' + item.id + '/',
      'document.readyState === "complete" && ' + JSON.stringify(item.tags) +
      '.every(tag => !!customElements.get(tag) && !!document.querySelector(tag)?.shadowRoot)');
    check(item.id + ': clean consumer registers and initializes all documented tags', ok, item.url);
    const state = JSON.parse(await evaluate('JSON.stringify({pinball:!!window.PinballKit,extras:!!window.PinmotionExtras,errors:window.__errors||[]})'));
    const legacy = LEGACY_NAMES.includes(item.id);
    check(item.id + ': isolated runtime family is correct',
      legacy ? state.pinball && !state.extras : state.extras && !state.pinball, JSON.stringify(state));
    check(item.id + ': isolated consumer has no uncaught script errors', state.errors.length === 0, JSON.stringify(state.errors));
  }

  for (const [name] of orders) {
    const ok = await navigate('/mixed/' + name + '/',
      'document.readyState === "complete" && ' + JSON.stringify(allTags) +
      '.every(tag => !!customElements.get(tag) && !!document.querySelector(tag)?.shadowRoot) && window.__loaded?.length === 29');
    check('mixed load order ' + name + ': all 30 custom elements register and connect', ok);
    const state = JSON.parse(await evaluate('JSON.stringify({errors:window.__errors||[],loaded:(window.__loaded||[]).length,pinball:!!window.PinballKit,extras:!!window.PinmotionExtras,pinballIds:(window.__loaded||[]).map(x=>x.pinballId).filter(x=>x!==null),extrasIds:(window.__loaded||[]).map(x=>x.extrasId).filter(x=>x!==null)})'));
    const refsStable = (refs) => refs.length > 0 && refs.every((value) => value === refs[0]);
    check('mixed load order ' + name + ': no script/runtime errors', state.errors.length === 0, JSON.stringify(state.errors));
    check('mixed load order ' + name + ': both shared runtimes remain singletons',
      state.pinball && state.extras && refsStable(state.pinballIds) && refsStable(state.extrasIds),
      JSON.stringify({pinballIds:state.pinballIds,extrasIds:state.extrasIds}));
  }
} finally {
  try { ws.close(); } catch {}
  chrome.kill('SIGTERM');
  server.close();
  await sleep(300);
  rmSync(profile, { recursive: true, force: true });
  rmSync(temp, { recursive: true, force: true });
}
console.log('');
console.log('Clean registry consumer and mixed bundle audit: ' + passed + ' passed, ' + failed + ' failed.');
if (failed) process.exitCode = 1;
