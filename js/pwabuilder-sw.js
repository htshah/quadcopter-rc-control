var cacheName = "hello-world-page";
var filesToCache = [
  "/index.html",
  "/dist/bundle.js",
  "/images/icons/play.svg",
  "/images/icons/pause.svg",
  "/images/icons/reload.svg",
  "/images/icons/orientation-icon.svg"
];
self.addEventListener("install", function(e) {
  console.log("[ServiceWorker] Install");
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log("[ServiceWorker] Caching app shell");
      return cache.addAll(filesToCache);
    })
  );
});
self.addEventListener("activate", event => {
  event.waitUntil(self.clients.claim());
});
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request, { ignoreSearch: true }).then(response => {
      return response || fetch(event.request);
    })
  );
});
