const CACHE_NAME = 'sensor-pwa-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  // list your icons here, e.g. './icons/icon-192.png'
];

self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then(cached => cached || fetch(evt.request))
  );
});
