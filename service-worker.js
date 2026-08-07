/**
 * ------------------------------------------------------------
 * service-worker.js — Engg Study
 * Optimized Service Worker
 * ------------------------------------------------------------
 */

const CACHE_NAME = "engg-study-v1.0.0";

const APP_SHELL = [
  "./",
  "./index.html",
  "./css/style.css",
  "./js/data.js",
  "./js/app.js",
  "./assets/logo.png",
  "./assets/icon-192.png",
  "./assets/icon-512.png",
  "./manifest.json"
];

// Install
self.addEventListener("install", (event) => {
  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(APP_SHELL);
    })
  );
});

// Activate
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

// Fetch
self.addEventListener("fetch", (event) => {

  if (event.request.method !== "GET") return;

  const url = new URL(event.request.url);

  // Skip external requests (YouTube, Google Fonts, APIs etc.)
  if (url.origin !== self.location.origin) {
    return;
  }

  event.respondWith(

    caches.match(event.request).then((cachedResponse) => {

      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(event.request)
        .then((networkResponse) => {

          if (
            !networkResponse ||
            networkResponse.status !== 200 ||
            networkResponse.type !== "basic"
          ) {
            return networkResponse;
          }

          const responseClone = networkResponse.clone();

          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });

          return networkResponse;
        })

        .catch(() => {

          if (event.request.mode === "navigate") {
            return caches.match("./index.html");
          }

          return new Response("Offline", {
            status: 503,
            statusText: "Offline"
          });

        });

    })

  );

});
