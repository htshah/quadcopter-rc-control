require("./pwabuilder-sw-register.js");
require("./pid.js");

window.$ = require("jquery");

require("flexboxgrid");
require("../css/battery-indicator.css");
require("../css/flexbox-fixes.css");
require("../css/style.css");
require("../css/ProximaNova.css");

var touchHandler = require("./touchhandler.js");
var Controller = require("./controller.js");
var WebSocket = require("./websocket.js");

var controller = new Controller();

controller.init();

$(document).ready(function() {
  touchHandler($("#reload-btn"), () => location.reload());
});

/* var dataIsBeingSent = false;
function sendData() {
  if (dataIsBeingSent) {
    return;
  }
  dataIsBeingSent = true;

  var string = getMappedOutput(controller);
  console.log(string);
  if (typeof ws !== "undefined" && wsConnected) ws.send(string);
  dataIsBeingSent = false;
} */
