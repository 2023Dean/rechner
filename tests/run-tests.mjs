// Führt tests/index.html headless aus: node tests/run-tests.mjs [--golden]
// Benötigt Playwright (npm i -g playwright oder lokal). Optional CHROMIUM_PATH setzen.
import http from 'http';
import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(import.meta.url);
let chromium;
for (const p of ['playwright', '/opt/node22/lib/node_modules/playwright']) {
  try { ({ chromium } = require(p)); break; } catch {}
}
if (!chromium) { console.error('Playwright nicht gefunden (npm i -g playwright).'); process.exit(2); }

const TYPES = { '.html': 'text/html', '.js': 'application/javascript', '.mjs': 'application/javascript', '.css': 'text/css', '.json': 'application/json' };
const server = http.createServer((req, res) => {
  const file = path.join(ROOT, decodeURIComponent(new URL(req.url, 'http://x').pathname));
  if (!file.startsWith(ROOT) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
    const idx = path.join(file, 'index.html');
    if (file.startsWith(ROOT) && fs.existsSync(idx)) { res.writeHead(200, { 'Content-Type': 'text/html' }); return res.end(fs.readFileSync(idx)); }
    res.writeHead(404); return res.end();
  }
  res.writeHead(200, { 'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream' });
  res.end(fs.readFileSync(file));
});
await new Promise(r => server.listen(0, '127.0.0.1', r));
const base = `http://127.0.0.1:${server.address().port}`;

const executablePath = process.env.CHROMIUM_PATH || (fs.existsSync('/opt/pw-browsers/chromium') ? '/opt/pw-browsers/chromium' : undefined);
const browser = await chromium.launch({ executablePath, args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.route('**/*', r => r.request().url().startsWith(base) ? r.continue() : r.abort());
const pageErrors = [];
page.on('pageerror', e => pageErrors.push(e.message));
await page.goto(`${base}/tests/index.html`);
await page.waitForFunction(() => window.__testResult, null, { timeout: 60000 });
const res = await page.evaluate(() => window.__testResult);
await browser.close(); server.close();

for (const r of res.results) console.log(`${r.ok ? '✓' : '✗'} ${r.name}${r.ok ? '' : '  → ' + r.detail}`);
if (pageErrors.length) console.log('Seitenfehler:', pageErrors);
console.log(`\n${res.pass}/${res.total} bestanden`);
if (process.argv.includes('--golden')) console.log('\nGOLDEN=' + JSON.stringify(res.golden));
process.exit(res.fail || pageErrors.length ? 1 : 0);
