module.exports = function(options) {
  var ws = null;
  var host = "ws://192.168.4.1";
  // var host = "wss://echo.websocket.org";

  var states = {
    nosupport: 0,
    failed: 1,
    disconnected: 2,
    connecting: 3,
    connected: 4
  };

  //Used setter and getter for automatic update of state on screen
  var state = {
    _val: states.disconnected,
    listener: function(val) {
      var str = [
        "Websocket not supported",
        "Connection failed",
        "Disconnected",
        "Connecting to drone",
        "Connected"
      ];
      console.log(str[this._val]);
      options.statusEle.html(str[this._val]);
    },
    set val(val) {
      this._val = val;
      this.listener(val);
    },
    get val() {
      return this._val;
    }
  };

  function isConnected() {
    return state.val == states.connected;
  }

  function init() {
    if (state.val == states.connected) return; //already connected
    console.log("opening");

    if (!("WebSocket" in window)) {
      state.val = states.nosupport;
    }

    //do connection
    try {
      state.val = states.connecting;
      ws = new WebSocket(host);

      _addListeners();
    } catch (error) {
      console.log(error);
      close();
    }
  }

  function _addListeners() {
    if (ws == null) return false;

    ws.onopen = function() {
      console.log("opened");
      state.val = states.connected;

      options.connect();
    };

    ws.onmessage = function(evt) {
      // Copy msg removing all ~(non UTF-8 representation char)
      msg = evt.data.split("~").join("");
      switch (msg.charAt(0)) {
        case "B":
          let battery = parseFloat(msg.replace("B", ""));
          $(".battery-indicator .battery-level").css(
            "width",
            `${(battery * 100) / 12.6}%`
          );
          $("#battery-cell-1").html(msg.replace("B", "") + "v");
          break;
        case "W":
          print("Watchdog reset");
          break;
        default:
          console.log(msg);
        // print("Message received : " + msg);
      }
    };

    /* ws.onerror = function(e) {
      console.log(e);
    }; */

    ws.onclose = function(e) {
      console.log("closing");
      _close(e);
      options.close();
      console.log("closed");
    };
  }

  function send(data) {
    ws.send(data);
  }

  function close() {
    ws.close();
  }

  function _close(e) {
    // console.log(e);
    // websocket is closed.
    if (state.val != states.connected) {
      state.val = states.failed;
    } else {
      state.val = states.disconnected;
    }
  }

  return {
    init: init,
    socket: ws,
    isConnected: isConnected,
    send: send,
    close: close
  };
};
