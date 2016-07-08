'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FirebaseCh = exports.WebSocketCh = exports.TYPE_WEBSOCKET = exports.TYPE_FIREBASE = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = getChannel;

var _app = require('firebase/app');

var _app2 = _interopRequireDefault(_app);

require('firebase/database');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TYPE_FIREBASE = exports.TYPE_FIREBASE = 'firebase';
var TYPE_WEBSOCKET = exports.TYPE_WEBSOCKET = 'websocket';

// These are classes which can be used to communicate with the
// Storybook UI. All classes should implement this interface
//
//   Channel {
//     send(type, data)
//     on(type, handler)
//   }
//

function getChannel(config) {
  switch (config.type) {
    case TYPE_FIREBASE:
      return new FirebaseCh(config.options);
    case TYPE_WEBSOCKET:
      return new WebSocketCh(config.options);
    default:
      throw new Error('please set channel.type');
  }
}

// WebSocketCh uses WebSockets to communicate with the Storybook UI.
// Takes the address as an option. It needs storybook server to run.
//
//     options: {
//       address: 'ws://localhost:9001',
//     }
//

var WebSocketCh = exports.WebSocketCh = function () {
  function WebSocketCh(options) {
    _classCallCheck(this, WebSocketCh);

    this.options = options;
    this.socket = null;
    this.isReady = false;
    this._messages = [];
    this._handlers = {};
    this._connect();
  }

  _createClass(WebSocketCh, [{
    key: 'send',
    value: function send(type, data) {
      if (!this.isReady) {
        this._messages.push({ type: type, data: data });
        return;
      }
      var id = Math.random().toString(16).slice(2);
      this.socket.send(JSON.stringify({ id: id, type: type, data: data }));
    }
  }, {
    key: 'on',
    value: function on(type, handler) {
      this._handlers[type] = this._handlers[type] || [];
      this._handlers[type].push(handler);
    }
  }, {
    key: '_connect',
    value: function _connect() {
      var _this = this;

      this.socket = new WebSocket(this.options.address);

      // initial setup
      this.socket.onopen = function () {
        _this.isReady = true;
        _this._flush();
      };

      // listen for events
      this.socket.onmessage = function (e) {
        var _JSON$parse = JSON.parse(e.data);

        var type = _JSON$parse.type;
        var data = _JSON$parse.data;

        var handlers = _this._handlers[type];
        if (handlers) {
          handlers.forEach(function (handler) {
            return handler(data);
          });
        }
      };

      // an error occurred
      this.socket.onerror = function (e) {
        console.warn('websocket: connection error', e.message);
      };

      // connection closed
      this.socket.onclose = function (e) {
        console.warn('websocket: connection closed', e.code, e.reason);
      };
    }
  }, {
    key: '_flush',
    value: function _flush() {
      var _this2 = this;

      var messages = this._messages;
      this._messages = [];
      messages.forEach(function (m) {
        return _this2.send(m.type, m.data);
      });
    }
  }]);

  return WebSocketCh;
}();

// FirebaseCh uses Firebase to communicate with the Storybook UI.
// This makes it easy for the storybook to work over the internet.
//
//     options: {
//       baseUrl: 'https://my-app.firebaseio.com',
//       readRef: '/read/from/here',
//       writeRef: '/write/to/here',
//     }
//


var FirebaseCh = exports.FirebaseCh = function () {
  function FirebaseCh(options) {
    _classCallCheck(this, FirebaseCh);

    this.options = options;
    this._readRef = null;
    this._writeRef = null;
    this._handlers = {};
    this._connect();
  }

  _createClass(FirebaseCh, [{
    key: 'send',
    value: function send(type, data) {
      var id = Math.random().toString(16).slice(2);
      this._writeRef.set({ id: id, type: type, data: data });
    }
  }, {
    key: 'on',
    value: function on(type, handler) {
      this._handlers[type] = this._handlers[type] || [];
      this._handlers[type].push(handler);
    }
  }, {
    key: '_connect',
    value: function _connect() {
      var _this3 = this;

      var randId = Math.random().toString();
      var config = { databaseURL: this.options.baseUrl };
      var app = _app2.default.initializeApp(config, randId);

      this._readRef = app.database().ref(this.options.readRef);
      this._writeRef = app.database().ref(this.options.writeRef);

      var initialValueIgnored = false;
      this._readRef.on('value', function (snap) {
        if (!initialValueIgnored) {
          initialValueIgnored = true;
          return;
        }

        var _snap$val = snap.val();

        var id = _snap$val.id;
        var type = _snap$val.type;
        var data = _snap$val.data;

        var handlers = _this3._handlers[type];
        if (handlers) {
          handlers.forEach(function (handler) {
            return handler(data);
          });
        }
      });
    }
  }]);

  return FirebaseCh;
}();