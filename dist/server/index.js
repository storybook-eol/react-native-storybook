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

var _socket = require('socket.io');

var _socket2 = _interopRequireDefault(_socket);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//  ------------------------------------------------------------------------  //

var app = (0, _express2.default)();
app.use(_express2.default.static(_path2.default.join(__dirname, 'public')));

//  ------------------------------------------------------------------------  //

var server = _http2.default.Server(app);
var io = (0, _socket2.default)(server);

io.on('connection', function (socket) {
  socket.on('init', function (msg) {
    var clientType = msg.type;
    socket.join(clientType);

    // device ==> browser
    if (clientType === 'device') {
      ['setStories', 'addAction', 'selectStory', 'applyShortcut'].forEach(function (type) {
        socket.on(type, function (m) {
          return io.sockets.in('browser').emit(type, m);
        });
      });
    }

    // browser ==> device
    if (clientType === 'browser') {
      ['getStories', 'selectStory'].forEach(function (type) {
        socket.on(type, function (m) {
          return io.sockets.in('device').emit(type, m);
        });
      });
    }
  });
});

//  ------------------------------------------------------------------------  //

exports.default = server;