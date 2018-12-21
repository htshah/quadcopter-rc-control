var Joystick = require("./joysticks.js");
var WebSocket = require("./websocket.js");
var $ = require("jquery");

module.exports = function(options) {
  var options = {
    consoleEle: $("#console"),
    statusEle: $("#status"),
    connectBtnEle: $("#connect-btn")
  };

  var joystick = new Joystick();

  var websocket = new WebSocket({
    statusEle: options.statusEle,
    connect: () => {
      options.connectBtnEle.removeAttr("disabled");
      //change icon on connect btn
      options.connectBtnEle.find(".play-btn").hide();
      options.connectBtnEle.find(".pause-btn").show();

      //If connected,send data every 300ms
      transmissionInterval = setInterval(function() {
        websocket.send(joystick.output());
      }, 300);
    },
    close: () => {
      options.connectBtnEle.removeAttr("disabled");
      clearInterval(transmissionInterval);
      transmissionInterval = null;
      options.connectBtnEle.find(".play-btn").show();
      options.connectBtnEle.find(".pause-btn").hide();
    }
  });

  var transmissionInterval = null;

  function init() {
    options.connectBtnEle.on("click", _handleConnection);
    window.addEventListener("orientationchange", _initJoystick);
    _initJoystick();
  }

  function _handleConnection() {
    if (options.connectBtnEle.is("[disabled]")) return;

    options.connectBtnEle.attr("disabled", "disabled");
    if (!websocket.isConnected()) {
      websocket.init();
    } else {
      websocket.close();
    }
  }

  function _initJoystick() {
    //init joystick only if in landscape mode
    if (Math.abs(window.orientation) == 90) {
      //Landscape mode
      joystick.init();
    }
  }

  function consoleWrite(str) {
    options.myConsole.append(`$ ${str}<br>`);
    var domEle = options.myConsole[0];
    domEle.scrollTop = domEle.scrollHeight;
  }

  function _transmit() {
    if (!websocket.isConnected()) return;

    websocket.send(joystick.output());
  }

  return {
    init: init
  };
};
