'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _firebase = require('./transport/firebase');

var _firebase2 = _interopRequireDefault(_firebase);

var _websocket = require('./transport/websocket');

var _websocket2 = _interopRequireDefault(_websocket);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Wraps channel classes and provide a common interface for use.
// These are classes which can be used to communicate with the
// Storybook UI. All classes should implement this interface
//
//   Channel {
//     connect()
//     send(msg)
//     onMessage(msg)
//   }
//

var Channel = function () {
  function Channel(sender, channelConfig) {
    _classCallCheck(this, Channel);

    this._sender = sender;
    this._handlers = {};
    this._channelConfig = channelConfig;
    this._transport = this._getTransport();
    this._transport.onMessage = this._recv.bind(this);
  }

  _createClass(Channel, [{
    key: 'connect',
    value: function connect() {
      return this._transport.connect();
    }
  }, {
    key: 'on',
    value: function on(type, handler) {
      this._handlers[type] = this._handlers[type] || [];
      this._handlers[type].push(handler);
    }
  }, {
    key: 'send',
    value: function send(type, data) {
      var id = Math.random().toString(16).slice(2);
      var msg = { id: id, type: type, data: data, sender: this._sender };
      this._transport.send(msg);
    }
  }, {
    key: '_recv',
    value: function _recv(msg) {
      if (msg.sender === this._sender) {
        return;
      }
      var handlers = this._handlers[msg.type];
      if (handlers) {
        handlers.forEach(function (handler) {
          return handler(msg.data);
        });
      }
    }
  }, {
    key: '_getTransport',
    value: function _getTransport() {
      switch (this._channelConfig.type) {
        case 'firebase':
          return new _firebase2.default(this._channelConfig);
        case 'websocket':
          return new _websocket2.default(this._channelConfig);
        default:
          throw new Error('please set channel.type');
      }
    }
  }]);

  return Channel;
}();

exports.default = Channel;