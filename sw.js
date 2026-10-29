/**
 * AI Study Assistant - Service Worker
 * Manages caching, instant client synchronization, and offline fallbacks.
 */

const CACHE_NAME = 'study-assistant-v7';
const STATIC_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './css/style.css',
  './js/utils.js',
  './js/storage.js',
  './js/srs.js',
  './js/api.js',
  './js/parser.js',
  './js/render.js',
  './js/app.js',
];

// Installs the worker and immediately activates without waiting for tabs to close
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

// Clears all outdated caches and tells all open tabs/windows to reload to the clean HTML
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => {
      return self.clients.claim();
    }).then(() => {
      // Force any client stuck on an old cached view to navigate to the latest version
      return self.clients.matchAll({ type: 'window' }).then((clients) => {
        clients.forEach((client) => {
          if (client.url && 'navigate' in client) {
            client.navigate(client.url);
          }
        });
      });
    })
  );
});

// Intercepts requests: always network-first for HTML pages so changes appear immediately
self.addEventListener('fetch', (event) => {
  const url = event.request.url;

  // Never cache external AI APIs
  if (url.includes('googleapis.com') || url.includes('api.groq.com')) {
    return;
  }

  // HTML navigation requests: ALWAYS fetch from network so login screen never lingers in cache
  if (event.request.mode === 'navigate' || event.request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  // Static assets: cache-first with network fallback
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
