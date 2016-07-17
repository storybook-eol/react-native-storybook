'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// WebSocketTransport uses WebSockets to communicate with the Storybook UI.
// Takes the address as an option. It needs storybook server to run.
//
//     channelConfig: {
//       type: 'websocket',
//       options: {
//         url: 'ws://localhost:9001',
//       }
//     }
//

var WebSocketTransport = function () {
  function WebSocketTransport(channelConfig) {
    _classCallCheck(this, WebSocketTransport);

    this.onMessage = new Function();
    this._log = console.log.bind(console);
    this._channelConfig = channelConfig;
    this._socket = null;
    this._messages = [];
  }

  _createClass(WebSocketTransport, [{
    key: 'connect',
    value: function connect() {
      var _this = this;

      var resolved = false;

      return new Promise(function (resolve, reject) {
        _this._socket = new WebSocket(_this._channelConfig.options.url);

        // initial setup
        _this._socket.onopen = function () {
          _this.isReady = true;
          _this._flush();
          resolve(null);
          resolved = true;
        };

        // listen for events
        _this._socket.onmessage = function (e) {
          var msg = JSON.parse(e.data);
          _this.onMessage(msg);
        };

        // an error occurred
        _this._socket.onerror = function (e) {
          _this._log('websocket: connection error', e.message);
          if (!resolved) {
            reject();
          }
        };

        // connection closed
        _this._socket.onclose = function (e) {
          _this._log('websocket: connection closed', e.code, e.reason);
        };
      });
    }
  }, {
    key: 'send',
    value: function send(msg) {
      if (!this.isReady) {
        this._messages.push(msg);
        return;
      }
      var data = JSON.stringify(msg);
      this._socket.send(data);
    }
  }, {
    key: '_flush',
    value: function _flush() {
      var _this2 = this;

      var messages = this._messages;
      this._messages = [];
      messages.forEach(function (msg) {
        return _this2.send(msg);
      });
    }
  }]);

  return WebSocketTransport;
}();

exports.default = WebSocketTransport;