const CACHE_NAME = "game-one-v25-boss-clear-fix-v1";

const CORE_ASSETS = [
  "./",
  "./index.html",
  "./style.css",
  "./game_config.js",
  "./player.js",
  "./enemy.js",
  "./bullet.js",
  "./skill.js",
  "./skills.js",
  "./upgrade_ui.js",
  "./main.js",
  "./manifest.webmanifest",
  "./icons/apple-touch-icon.png",
  "./icons/icon-192.png",
  "./icons/icon-512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(CORE_ASSETS))
      .then(() => self.skipWaiting())
      .catch(error => {
        console.error("[Game One SW] install cache failed:", error);
        throw error;
      })
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.map(key => key === CACHE_NAME ? null : caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  const request = event.request;
  const url = new URL(request.url);

  if (request.method !== "GET" || url.origin !== self.location.origin) {
    return;
  }

  event.respondWith(
    caches.match(request, { ignoreSearch: true })
      .then(cached => {
        if (cached) return cached;

        if (request.mode === "navigate") {
          return caches.match("./index.html").then(indexCache => {
            if (indexCache) return indexCache;
            return fetchAndCache(request);
          });
        }

        return fetchAndCache(request);
      })
      .catch(error => {
        console.error("[Game One SW] offline missing asset:", request.url, error);
        if (request.mode === "navigate") {
          return caches.match("./index.html");
        }
        throw error;
      })
  );
});

function fetchAndCache(request) {
  return fetch(request)
    .then(response => {
      if (!response || response.status !== 200 || response.type === "opaque") {
        return response;
      }

      const clone = response.clone();
      caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
      return response;
    })
    .catch(error => {
      console.error("[Game One SW] network fetch failed and no cache was found:", request.url, error);
      throw error;
    });
}




