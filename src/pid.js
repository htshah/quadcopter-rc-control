var $ = require("jquery");

module.exports = (function() {
  $(document).ready(function() {
    $("td").on("click", function() {
      $("td").removeClass("active");
      $(this).addClass("active");
    });
  });
})();
