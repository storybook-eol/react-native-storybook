'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _ws = require('ws');

var _ws2 = _interopRequireDefault(_ws);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//  ------------------------------------------------------------------------  //

var app = (0, _express2.default)();
app.use(_express2.default.static(_path2.default.join(__dirname, 'public')));

//  ------------------------------------------------------------------------  //

var server = _http2.default.Server(app);
var wss = _ws2.default.Server({ server: server });

wss.on('connection', function (socket) {
  console.log('> new websocket connection');
  socket.data = { clientType: null };

  socket.on('message', function (data) {
    try {
      var message = JSON.parse(data);

      // clients must init first
      if (!socket.data.clientType) {
        if (message.type === 'init') {
          socket.data.clientType = message.data.clientType;
          console.log('> initialize new "' + socket.data.clientType + '"');
          return;
        } else {
          throw new Error('client must init first');
        }
      }

      // forward
      wss.clients.filter(function (client) {
        return client.data.clientType !== socket.data.clientType;
      }).forEach(function (client) {
        return client.send(data);
      });
    } catch (e) {
      socket.close();
    }
  });
});

//  ------------------------------------------------------------------------  //

exports.default = server;