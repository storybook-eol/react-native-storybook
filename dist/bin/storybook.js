#!/usr/bin/env node
'use strict';

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _server = require('../server');

var _server2 = _interopRequireDefault(_server);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// avoid eslint errors
var logger = console;

//  ------------------------------------------------------------------------  //

_commander2.default.version(require('../../package.json').version);

_commander2.default.command('start [platform]').option('-h, --host <host>', 'host to listen on').option('-p, --port <port>', 'port to listen on', parseInt).description('starts react native storybook').action(function (platform, env) {
  _server2.default.listen(env.port, env.host, function (err) {
    if (err) throw err;
    var address = 'http://' + (env.host || 'localhost') + ':' + env.port + '/';
    logger.info('\nStorybook server started on => ' + address + '\n');
  });
});

_commander2.default.parse(process.argv);