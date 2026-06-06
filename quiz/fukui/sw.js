const CACHE_NAME = 'fukui-quiz-v1.1';
const urlsToCache = [
  '/quiz/fukui/index.html',
  '/quiz/fukui/manifest.json',
  '/quiz/fukui/icon-192x192.png',
  '/quiz/fukui/icon-512x512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) return caches.delete(cache);
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.url.includes('firebase') || event.request.url.includes('firestore') || event.request.url.includes('script.google.com')) return;
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});