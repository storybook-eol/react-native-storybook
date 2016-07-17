'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _urlParse = require('url-parse');

var _urlParse2 = _interopRequireDefault(_urlParse);

var _app = require('firebase/app');

var _app2 = _interopRequireDefault(_app);

require('firebase/database');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// FirebaseTransport uses Firebase to communicate with the Storybook UI.
// This makes it easy for the storybook to work over the internet.
//
//     channelConfig: {
//       type: 'firebase',
//       options: {
//         url: 'https://my-app.firebaseio.com/path/to/ref',
//       }
//     }
//

var FirebaseTransport = function () {
  function FirebaseTransport(channelConfig) {
    _classCallCheck(this, FirebaseTransport);

    this.onMessage = new Function();
    this._channelConfig = channelConfig;
  }

  _createClass(FirebaseTransport, [{
    key: 'connect',
    value: function connect() {
      var _this = this;

      this._reference = this._getReference();
      this._reference.on('value', after(1, function (snap) {
        _this.onMessage(snap.val());
      }));
      return Promise.resolve(null);
    }
  }, {
    key: 'send',
    value: function send(msg) {
      this._reference.set(msg);
    }
  }, {
    key: '_getReference',
    value: function _getReference() {
      var parsedUrl = (0, _urlParse2.default)(this._channelConfig.options.url);
      var protocol = parsedUrl.protocol;
      var host = parsedUrl.host;
      var pathname = parsedUrl.pathname;

      var config = { databaseURL: protocol + '//' + host };
      var id = Math.random().toString(16).slice(2);
      var app = _app2.default.initializeApp(config, id);
      var ref = app.database().ref(pathname);
      return ref;
    }
  }]);

  return FirebaseTransport;
}();

// This helper will skip first n invocations of the function fn.
// This is used to skip the initial value received from firebase.
// We're only interested in values which are set after created time.

exports.default = FirebaseTransport;
function after(n, fn) {
  var called = 0;
  return function () {
    return ++called < n ? null : fn.apply(undefined, arguments);
  };
}