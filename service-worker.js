/**
 * service-worker.js — Engg Study
 * ------------------------------------------------------------
 * Caches the app shell (HTML/CSS/JS/logo) so the dropdowns and
 * UI still load offline or on a flaky connection. YouTube
 * playlist embeds always need a live network connection, so
 * video requests are intentionally left untouched — this only
 * speeds up/backstops the app shell itself.
 * ------------------------------------------------------------ */

const CACHE_NAME = "engg-study-v1";

const APP_SHELL = [
  "./",
  "./index.html",
  "./css/style.css",
  "./js/data.js",
  "./js/app.js",
  "./assets/logo.png",
  "./assets/icon-512.png",
  "./assets/icon-192.png",
  "./manifest.json",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // Only handle same-origin GET requests for the app shell.
  // Everything else (YouTube, fonts, etc.) goes straight to the network.
  if (event.request.method !== "GET" || url.origin !== self.location.origin) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;

      return fetch(event.request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          return response;
        })
        .catch(() => cached);
    })
  );
});
