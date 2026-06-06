const CACHE_NAME = 'fukui-quiz-v1';
const urlsToCache = [
  './index.html',
  './manifest.json'
];

// インストール時の処理
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// 通信時の処理（PWAとして認識させるための最低限の設定）
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});