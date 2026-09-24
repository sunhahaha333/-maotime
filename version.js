(function () {
  var version = { version: "1.0.4", url: "./index.html", notes: "猫的时光 V1.0.4", releasedAt: "2026-09-22" };
  if (typeof window !== "undefined") window.__CAT_TIME_REMOTE_VERSION__ = version;
  if (typeof self !== "undefined" && typeof caches !== "undefined" && typeof self.skipWaiting === "function") {
    var CACHE = "cat-time-v1.0.4";
    var ASSETS = ["./", "./index.html", "./manifest.webmanifest", "./icon.png"];
    self.addEventListener("install", function (event) { event.waitUntil(caches.open(CACHE).then(function (cache) { return cache.addAll(ASSETS); }).then(function () { return self.skipWaiting(); })); });
    self.addEventListener("activate", function (event) { event.waitUntil(caches.keys().then(function (keys) { return Promise.all(keys.map(function (k) { return k === CACHE ? null : caches.delete(k); })); }).then(function () { return self.clients.claim(); })); });
    self.addEventListener("fetch", function (event) {
      var req = event.request; if (req.method !== "GET") return; var url = new URL(req.url); if (url.origin !== self.location.origin) return;
      if (url.pathname.slice(-10) === "version.js") return;
      var isPage = req.mode === "navigate" || url.pathname.slice(-10) === "index.html" || url.pathname.slice(-1) === "/";
      event.respondWith(caches.match(req, { ignoreSearch: true }).then(function (cached) {
        var net = fetch(req).then(function (resp) { if (resp && resp.ok) caches.open(CACHE).then(function (cache) { cache.put(req, resp.clone()); }); return resp; }).catch(function () { return cached; });
        return isPage && cached ? cached : (cached || net);
      }));
    });
  }
})();
