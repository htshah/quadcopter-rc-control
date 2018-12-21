module.exports = (function() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/pwabuilder-sw.js", { scope: "/" })
      .then(function() {
        console.log("Service Worker Registered");
      });
  }
})();
