var nipplejs = require("./nipplejs.min.js");
module.exports = function() {
  var isInitialized = false;
  var rxSize = 250;

  var controller = {
    throttle: -parseInt(getNippleSize()),
    yaw: 0,
    roll: 0,
    pitch: 0
  };
  var leftOptions = {
    zone: document.getElementById("left-stick"),
    mode: "static",
    position: { bottom: `calc(${getNippleSize()}px)`, left: "20%" },
    size: getNippleSize(),
    resetY: false,
    shape: "square"
  };

  var rightOptions = {
    zone: document.getElementById("right-stick"),
    mode: "static",
    position: { bottom: `calc(${getNippleSize()}px)`, right: "20%" },
    size: getNippleSize(),
    shape: "square"
  };

  function init() {
    if (isInitialized) return;

    var leftStick = nipplejs.create(leftOptions);
    var rightStick = nipplejs.create(rightOptions);

    leftStick.on("move", function(event, data) {
      controller.throttle = -parseInt(data.instance.frontPosition.y);
      controller.yaw = parseInt(data.instance.frontPosition.x);
    });
    leftStick.on("end", function(event, data) {
      controller.yaw = 0;
    });
    rightStick.on("move", function(event, data) {
      controller.pitch = -parseInt(data.instance.frontPosition.y);
      controller.roll = parseInt(data.instance.frontPosition.x);
    });
    rightStick.on("end", function(event, data) {
      controller.pitch = 0;
      controller.roll = 0;
    });

    isInitialized = true;
  }

  function getNippleSize() {
    //Use screen's width if in landscape
    var width = window.innerWidth;

    if (Math.abs(window.orientation) != 90) {
      //Use screen's height if in potrait
      width = screen.height;
    }
    return width * 0.2;
  }

  function getRawOutput() {
    return controller;
  }

  function getMappedOutput() {
    var data = getRawOutput();

    var size = parseInt(getNippleSize() / 2);

    var throttle = parseInt(
      mapNumber(data.throttle, -size, size, -rxSize, rxSize)
    );
    var yaw = parseInt(mapNumber(data.yaw, -size, size, -rxSize, rxSize));
    //invert Pitch readings as MPU is placed inverted;)
    var pitch = -parseInt(mapNumber(data.pitch, -size, size, -rxSize, rxSize));

    var roll = parseInt(mapNumber(data.roll, -size, size, -rxSize, rxSize));

    return `T${throttle}Y${yaw}P${pitch}R${roll}`;
  }

  function mapNumber(num, in_min, in_max, out_min, out_max) {
    return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
  }

  return {
    init: init,
    size: getNippleSize,
    output: getMappedOutput,
    rawOutput: getRawOutput
  };
};
