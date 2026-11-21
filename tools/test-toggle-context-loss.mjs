// Runs the Toggle demo with WebGL enabled, then loses the context and checks the live Canvas 2D recovery.
import { spawn } from 'node:child_process';
import { createServer } from 'node:net';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const URL_ = process.argv[2] || 'http://127.0.0.1:8000/toggle/';
const PORT = await new Promise((resolve) => {
  const server = createServer();
  server.listen(0, '127.0.0.1', () => {
    const port = server.address().port;
    server.close(() => resolve(port));
  });
});
const PROFILE = mkdtempSync(join(tmpdir(), 'pinmotion-context-loss-'));
const chrome = spawn(process.env.CHROME || 'chromium', [
  '--headless=new', '--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage',
  '--enable-unsafe-swiftshader',
  `--remote-debugging-port=${PORT}`, '--remote-debugging-address=127.0.0.1',
  '--remote-allow-origins=*', `--user-data-dir=${PROFILE}`, '--no-first-run',
  '--disable-extensions', 'about:blank'
], { stdio: ['ignore', 'ignore', 'pipe'] });
const chromeOutput = [];
chrome.stderr.setEncoding('utf8');
chrome.stderr.on('data', (chunk) => chromeOutput.push(chunk));
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
let target;
for (let attempt = 0; attempt < 150; attempt++) {
  if (chrome.exitCode !== null) break;
  try {
    const response = await fetch(`http://127.0.0.1:${PORT}/json/list`);
    if (response.ok) {
      target = (await response.json()).find((entry) => entry.type === 'page');
      if (target?.webSocketDebuggerUrl) break;
    }
  } catch {}
  await sleep(200);
}
if (!target?.webSocketDebuggerUrl) {
  chrome.kill('SIGTERM');
  rmSync(PROFILE, { recursive: true, force: true });
  throw new Error(`Chrome DevTools did not start. ${chromeOutput.join('')}`);
}
const ws = new WebSocket(target.webSocketDebuggerUrl);
let failures = 0;
const exceptions = [];
let sequence = 0;
const pending = new Map();
const check = (name, pass, value) => {
  console.log(`${pass ? 'PASS' : 'FAIL'} ${name}${value === undefined ? '' : ` -> ${value}`}`);
  if (!pass) failures++;
};
try {
  await new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error('DevTools WebSocket timeout')), 15000);
    ws.addEventListener('open', () => { clearTimeout(timeout); resolve(); }, { once: true });
    ws.addEventListener('error', () => { clearTimeout(timeout); reject(new Error('DevTools WebSocket failed')); }, { once: true });
  });
  ws.addEventListener('message', (event) => {
    const message = JSON.parse(event.data);
    if (message.id && pending.has(message.id)) {
      pending.get(message.id)(message);
      pending.delete(message.id);
    }
    if (message.method === 'Runtime.exceptionThrown') {
      exceptions.push(message.params.exceptionDetails.exception?.description || message.params.exceptionDetails.text);
    }
  });
  const send = (method, params = {}) => new Promise((resolve, reject) => {
    const id = ++sequence;
    pending.set(id, (message) => message.error ? reject(new Error(message.error.message)) : resolve(message.result));
    ws.send(JSON.stringify({ id, method, params }));
  });
  const evaluate = async (expression) => {
    const result = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
    if (result.exceptionDetails) throw new Error(result.result?.description || result.exceptionDetails.text);
    return result.result.value;
  };
  await send('Runtime.enable');
  await send('Page.enable');
  await send('Page.navigate', { url: URL_ });
  let ready = false;
  for (let attempt = 0; attempt < 100; attempt++) {
    ready = await evaluate("document.readyState === 'complete' && !!document.querySelector('pinball-toggle')?.shadowRoot");
    if (ready) break;
    await sleep(100);
  }
  if (!ready) throw new Error('Standalone Toggle demo did not connect');
  let webglReady = false;
  for (let attempt = 0; attempt < 120; attempt++) {
    webglReady = await evaluate("PinballKit.getGL() !== null && document.querySelector('pinball-toggle').shadowRoot.querySelector('canvas').dataset.renderMode === 'webgl'");
    if (webglReady) break;
    await sleep(100);
  }
  check('Toggle initially renders through WebGL before context loss', webglReady, webglReady);

  const loss = await evaluate("(() => { const gl=PinballKit.getGL(); const extension=gl?.getExtension('WEBGL_lose_context'); if(!extension) return false; extension.loseContext(); return true; })()");
  check('WEBGL_lose_context extension is available and was triggered', loss === true, loss);
  let recovered = false;
  for (let attempt = 0; attempt < 120; attempt++) {
    recovered = await evaluate("PinballKit.getGL() === null && (() => { const c=document.querySelector('pinball-toggle').shadowRoot.querySelector('canvas'); return c.dataset.renderMode === '2d-fallback' && c.dataset.fallbackReady === 'true'; })()");
    if (recovered) break;
    await sleep(100);
  }
  const afterLoss = JSON.parse(await evaluate("(() => { const e=document.querySelector('pinball-toggle'); const c=e.shadowRoot.querySelector('canvas'); const d=c.getContext('2d').getImageData(0,0,c.width,c.height).data; let visible=0,checksum=0; for(let i=0;i<d.length;i+=4){if(d[i+3]>20)visible++;checksum=(checksum+d[i]*3+d[i+1]*5+d[i+2]*7+d[i+3])%1000000007;} return JSON.stringify({webgl:PinballKit.getGL()!==null,mode:c.dataset.renderMode,ready:c.dataset.fallbackReady,visible,checksum,checked:e.checked}); })()"));
  check('lost WebGL context falls back to original Canvas 2D artwork', recovered && afterLoss.webgl === false && afterLoss.mode === '2d-fallback' && afterLoss.ready === 'true' && afterLoss.visible > 1000, JSON.stringify(afterLoss));

  await evaluate("document.querySelector('pinball-toggle').checked=true");
  let on = null;
  for (let attempt = 0; attempt < 100; attempt++) {
    on = JSON.parse(await evaluate("(() => {const e=document.querySelector('pinball-toggle');return JSON.stringify({checked:e.checked,position:e.s,lamp:e.lamp,lit:e.lit,mode:e.shadowRoot.querySelector('canvas').dataset.renderMode});})()"));
    if (on.checked && on.position === 1 && on.lamp === 1 && on.lit) break;
    await sleep(50);
  }
  check('Toggle continues to animate and light the lamp after context loss', on.checked && on.position === 1 && on.lamp === 1 && on.lit && on.mode === '2d-fallback', JSON.stringify(on));
  const interaction = JSON.parse(await evaluate("(() => {const e=document.querySelector('pinball-toggle');let n=0;e.addEventListener('change',()=>n++);e.shadowRoot.querySelector('button').click();return JSON.stringify({checked:e.checked,changes:n});})()"));
  check('post-context-loss input still toggles and dispatches change', interaction.checked === false && interaction.changes === 1, JSON.stringify(interaction));
  check('no JavaScript exceptions occur during context loss recovery', exceptions.length === 0, exceptions.join('; '));
} finally {
  ws.close();
  chrome.kill('SIGTERM');
  await sleep(300);
  try { rmSync(PROFILE, { recursive: true, force: true }); } catch {}
}
console.log(`Toggle WebGL context-loss fallback regression: ${failures} failed`);
if (failures) process.exit(1);
