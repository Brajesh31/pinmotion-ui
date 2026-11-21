// Runs against a locally served standalone Toggle demo with WebGL forcibly disabled.
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
const PROFILE = mkdtempSync(join(tmpdir(), 'pinmotion-no-webgl-'));
const chrome = spawn(process.env.CHROME || 'chromium', [
  '--headless=new', '--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage',
  '--disable-webgl', '--disable-3d-apis',
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
await new Promise((resolve, reject) => {
  const timeout = setTimeout(() => reject(new Error('DevTools WebSocket timeout')), 15000);
  ws.addEventListener('open', () => { clearTimeout(timeout); resolve(); }, { once: true });
  ws.addEventListener('error', () => { clearTimeout(timeout); reject(new Error('DevTools WebSocket failed')); }, { once: true });
});
let sequence = 0;
const pending = new Map();
const exceptions = [];
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
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.exception?.description || result.exceptionDetails.text);
  return result.result.value;
};
let failures = 0;
const check = (name, pass, value) => {
  console.log(`${pass ? 'PASS' : 'FAIL'} ${name}${value === undefined ? '' : ` -> ${value}`}`);
  if (!pass) failures++;
};

try {
  await send('Runtime.enable');
  await send('Page.enable');
  await send('Page.navigate', { url: URL_ });
  let ready = false;
  for (let attempt = 0; attempt < 100; attempt++) {
    try {
      ready = await evaluate("document.readyState === 'complete' && !!document.querySelector('pinball-toggle')?.shadowRoot");
    } catch {}
    if (ready) break;
    await sleep(100);
  }
  if (!ready) throw new Error('Standalone Toggle demo did not connect in Chrome');

  let rendered = false;
  for (let attempt = 0; attempt < 100; attempt++) {
    rendered = await evaluate("(() => { const e=document.querySelector('pinball-toggle'); const c=e.shadowRoot.querySelector('canvas'); return c.dataset.renderMode === '2d-fallback' && c.dataset.fallbackReady === 'true'; })()");
    if (rendered) break;
    await sleep(100);
  }

  const initial = JSON.parse(await evaluate("(() => { const e=document.querySelector('pinball-toggle'); const c=e.shadowRoot.querySelector('canvas'); const ctx=c.getContext('2d'); const d=ctx.getImageData(0,0,c.width,c.height).data; let visible=0,checksum=0; for(let i=0;i<d.length;i+=4){ if(d[i+3]>20) visible++; checksum=(checksum+d[i]*3+d[i+1]*5+d[i+2]*7+d[i+3])%1000000007; } return JSON.stringify({webgl:PinballKit.getGL()!==null,mode:c.dataset.renderMode,ready:c.dataset.fallbackReady,checked:e.checked,visible,checksum,width:c.width,height:c.height}); })()"));
  check('WebGL is genuinely unavailable in this browser', initial.webgl === false, initial.webgl);
  check('Toggle selects its original-art 2D fallback', rendered && initial.mode === '2d-fallback' && initial.ready === 'true', JSON.stringify({mode:initial.mode,ready:initial.ready}));
  check('2D fallback draws a visible non-empty control', initial.visible > 1000 && initial.width > 0 && initial.height > 0, JSON.stringify({visible:initial.visible,width:initial.width,height:initial.height}));
  check('fallback starts in the off state', initial.checked === false, initial.checked);

  await evaluate("document.querySelector('pinball-toggle').checked = true");
  let onState = null;
  for (let attempt = 0; attempt < 100; attempt++) {
    onState = JSON.parse(await evaluate("(() => { const e=document.querySelector('pinball-toggle'); const c=e.shadowRoot.querySelector('canvas'); const d=c.getContext('2d').getImageData(0,0,c.width,c.height).data; let checksum=0; for(let i=0;i<d.length;i+=4) checksum=(checksum+d[i]*3+d[i+1]*5+d[i+2]*7+d[i+3])%1000000007; return JSON.stringify({checked:e.checked,position:e.s,lamp:e.lamp,lit:e.lit,mode:c.dataset.renderMode,checksum}); })()"));
    if (onState.checked && onState.position === 1 && onState.lamp === 1 && onState.lit === true) break;
    await sleep(50);
  }
  check('programmatic on state renders the original illuminated plate and ball', onState.checked && onState.position === 1 && onState.lamp === 1 && onState.lit === true && onState.mode === '2d-fallback' && onState.checksum !== initial.checksum, JSON.stringify(onState));

  const interactions = JSON.parse(await evaluate("(() => { const e=document.querySelector('pinball-toggle'); let changes=0; const listener=()=>changes++; e.addEventListener('change',listener); e.shadowRoot.querySelector('button').click(); const result={checked:e.checked,changes}; e.removeEventListener('change',listener); return JSON.stringify(result); })()"));
  check('fallback switch remains interactive and emits the normal change event', interactions.checked === false && interactions.changes === 1, JSON.stringify(interactions));

  await evaluate("(() => { const f=document.createElement('form'); f.hidden=true; const e=document.createElement('pinball-toggle'); e.setAttribute('name','fallback-toggle'); e.setAttribute('value','enabled'); f.append(e); document.body.append(f); window.__fallbackForm={f,e}; })()");
  await sleep(80);
  await evaluate("__fallbackForm.e.checked=true");
  const formValue = await evaluate("new FormData(__fallbackForm.f).get('fallback-toggle')");
  check('fallback control remains form-associated', formValue === 'enabled', formValue);
  check('no JavaScript exceptions occur in the no-WebGL path', exceptions.length === 0, exceptions.join('; '));
} finally {
  ws.close();
  chrome.kill('SIGTERM');
  await sleep(300);
  try { rmSync(PROFILE, { recursive: true, force: true }); } catch {}
}
console.log(`No-WebGL Toggle fallback regression: ${failures} failed`);
if (failures) process.exit(1);
