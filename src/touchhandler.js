module.exports = function(ele, fn) {
  if (!ele.jquery) {
    ele = $(ele);
  }

  function clickHandler(e) {
    fn.call(this, e);
  }
  if (!"ontouchstart" in document.documentElement) {
    ele.on("click", function(e) {
      clickHandler.call(this, e);
    });
  } else {
    var isClick = false;
    ele.on("touchstart", function() {
      isClick = true;
    });
    ele.on("touchmove", function() {
      isClick = false;
    });

    ele.on("touchend", function(e) {
      if (isClick) {
        isClick = false;
        clickHandler.call(this, e);
      }
    });
  }
};
