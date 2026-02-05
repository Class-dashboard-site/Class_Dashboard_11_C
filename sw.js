const CACHE_NAME = "class11c-offline-v5";

const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./Ndot_font.woff2",

  // backgrounds
  "./bg1.png",
  "./bg2.png",
  "./bg3.png",
  "./bg4.png",
  "./bg5.png",
  "./bg6.png",
  "./bg7.png",
  "./bg8.png",
  "./bg9.png",
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(cached => {
      return cached || fetch(event.request);
    })
  );
});


