'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _ws = require('ws');

var _ws2 = _interopRequireDefault(_ws);

var _indexHtml = require('./pages/index.html.js');

var _indexHtml2 = _interopRequireDefault(_indexHtml);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WebApp = function () {
  function WebApp(config) {
    var _this = this;

    _classCallCheck(this, WebApp);

    this._log = (0, _debug2.default)('webapp');
    this._config = config;
    this._httpServer = _http2.default.createServer();
    this._expressApp = (0, _express2.default)();
    var staticPath = _path2.default.resolve(__dirname, 'public');
    this._expressApp.use(_express2.default.static(staticPath, { index: false }));
    this._expressApp.get('/', function (req, res) {
      return res.end(_this.getHTML());
    });
    this._httpServer.on('request', this._expressApp);
    if (this._config.channel.type === 'websocket') {
      this._websocketServer = _ws2.default.Server({ server: this._httpServer });
      this._websocketServer.on('connection', function (s) {
        return _this.handleWS(s);
      });
    }
  }

  _createClass(WebApp, [{
    key: 'getHTML',
    value: function getHTML() {
      return (0, _indexHtml2.default)(this._config);
    }
  }, {
    key: 'handleWS',
    value: function handleWS(socket) {
      var _this2 = this;

      this._log('new websocket connection');
      socket.on('message', function (data) {
        _this2._websocketServer.clients.forEach(function (client) {
          return client.send(data);
        });
      });
    }
  }, {
    key: 'listen',
    value: function listen() {
      var _this3 = this;

      return new Promise(function (resolve, reject) {
        var _config$webapp = _this3._config.webapp;
        var port = _config$webapp.port;
        var host = _config$webapp.host;

        _this3._httpServer.listen(port, host, function (err) {
          return err ? reject(err) : resolve(null);
        });
      });
    }
  }]);

  return WebApp;
}();

exports.default = WebApp;