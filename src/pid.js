var $ = require("jquery");
var touchHandler = require("./touchhandler.js");

module.exports = (function() {
  $(document).ready(function() {
    touchHandler($("td"), function() {
      $("td").removeClass("active");
      $(this).addClass("active");
    });
  });
})();
