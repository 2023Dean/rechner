// Service Worker: App offline verfügbar machen.
// Seite: zuerst Netz (Updates sofort), offline aus dem Cache. Übrige Dateien: Cache zuerst.
const CACHE = 'kreditrechner-v4.5';
const CORE = ['./', './index.html', './vendor/chart.umd.js', './manifest.webmanifest',
  './icons/icon-192.png', './icons/icon-512.png', './icons/icon.svg', './icons/apple-touch-icon.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req)
      .then(res => { const copy = res.clone(); caches.open(CACHE).then(c => c.put('./index.html', copy)); return res; })
      .catch(() => caches.match('./index.html')));
    return;
  }
  // Schriften (fontshare) und eigene Dateien: Cache zuerst, im Hintergrund aktualisieren
  if (url.origin === location.origin || url.hostname.endsWith('fontshare.com')) {
    e.respondWith(caches.open(CACHE).then(async c => {
      const hit = await c.match(req);
      const net = fetch(req).then(res => { if (res && (res.ok || res.type === 'opaque')) c.put(req, res.clone()); return res; }).catch(() => hit);
      return hit || net;
    }));
  }
});
