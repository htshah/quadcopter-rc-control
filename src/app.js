require("./pwabuilder-sw-register.js");
require("./pid.js");

require("flexboxgrid");
require("../css/flexbox-fixes.css");
require("../css/style.css");
require("../css/ProximaNova.css");

var Controller = require("./controller.js");
var WebSocket = require("./websocket.js");

var controller = new Controller();

controller.init();

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
