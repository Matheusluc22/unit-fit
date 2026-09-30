/* ==========================================================================
   UNIFIT - SERVICE WORKER (PWA OFFLINE CACHE)
   ========================================================================== */

const CACHE_NAME = "unifit-v1.0.2";
const ASSETS_TO_CACHE = [
  "./",
  "./index.html",
  "./logo.jpg",
  "./logo.svg",
  "./css/styles.css",
  "./js/utils/formatters.js",
  "./js/utils/validators.js",
  "./js/services/storage-service.js",
  "./js/services/api-service.js",
  "./js/services/exercise-service.js",
  "./js/services/auth-service.js",
  "./js/services/privacy-service.js",
  "./js/exercises-db.js",
  "./js/algorithm.js",
  "./js/auth.js",
  "./js/workout-session.js",
  "./js/workout-builder.js",
  "./js/subscription.js",
  "./js/evolution.js",
  "./js/ai-assistant.js",
  "./js/gamification.js",
  "./js/admin.js",
  "./js/app.js",
  "./manifest.webmanifest"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).catch(() => {
        if (event.request.headers.get("accept")?.includes("text/html")) {
          return caches.match("./index.html");
        }
      });
    })
  );
});
