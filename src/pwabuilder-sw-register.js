module.exports = (function() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/js/pwabuilder-sw.js").then(function() {
      console.log("Service Worker Registered");
    });
  }
})();
