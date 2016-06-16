#!/usr/bin/env node
'use strict';

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _socket = require('socket.io');

var _socket2 = _interopRequireDefault(_socket);

var _middleware = require('./middleware');

var _middleware2 = _interopRequireDefault(_middleware);

var _package = require('../../package.json');

var _package2 = _interopRequireDefault(_package);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// avoid eslint errors
var logger = console;

_commander2.default.version(_package2.default.version).option('-p, --port [number]', 'Port to run Storybook (Required)', parseInt).option('-h, --host [string]', 'Host to run Storybook').parse(process.argv);

if (!_commander2.default.port) {
  logger.error('Error: port to run Storybook is required!\n');
  _commander2.default.help();
  process.exit(-1);
}

// Used with `app.listen` below
var listenAddr = [_commander2.default.port];

if (_commander2.default.host) {
  listenAddr.push(_commander2.default.host);
}

var app = (0, _express2.default)();
app.use((0, _middleware2.default)());

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

server.listen.apply(server, listenAddr.concat([function (error) {
  if (error) {
    throw error;
  } else {
    var address = 'http://' + (_commander2.default.host || 'localhost') + ':' + _commander2.default.port + '/';
    logger.info('\nReact Storybook started on => ' + address + '\n');
  }
}]));