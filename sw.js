/**
 * AI Study Assistant - Service Worker
 * Caches static shell assets for offline availability.
 * Bypasses network requests to AI API providers (Gemini & Groq) so responses are always fresh.
 */

const CACHE_NAME = 'study-assistant-v3';
const STATIC_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './css/style.css',
  './js/utils.js',
  './js/storage.js',
  './js/auth-config.js',
  './js/auth.js',
  './js/srs.js',
  './js/api.js',
  './js/parser.js',
  './js/render.js',
  './js/app.js',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const url = event.request.url;

  // Never cache external AI APIs
  if (url.includes('googleapis.com') || url.includes('api.groq.com')) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
