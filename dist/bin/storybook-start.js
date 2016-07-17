#!/usr/bin/env node
'use strict';

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _webapp = require('../webapp');

var _webapp2 = _interopRequireDefault(_webapp);

var _config = require('../config.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_commander2.default.option('-h, --host <host>', 'host to listen on').option('-p, --port <port>', 'port to listen on').option('-c, --config <config>', 'configurations (json)').parse(process.argv);

var config = (0, _config.getDefaultConfig)();

if (_commander2.default.host || _commander2.default.port) {
  _commander2.default.host = _commander2.default.host || 'localhost';
  _commander2.default.port = _commander2.default.port || 9001;
  Object.assign(config, {
    channel: {
      type: 'websocket',
      options: {
        url: 'ws://' + _commander2.default.host + ':' + _commander2.default.port
      }
    },
    webapp: {
      host: _commander2.default.host,
      port: _commander2.default.port
    }
  });
}

if (_commander2.default.config) {
  var customConfig = JSON.parse(_commander2.default.config);
  Object.assign(config, customConfig);
}

var webapp = new _webapp2.default(config);
webapp.listen().then(function () {
  return console.info('listening on http://' + config.webapp.host + ':' + config.webapp.port);
}).catch(function (e) {
  return console.error(e);
});