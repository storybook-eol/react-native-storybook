#!/usr/bin/env node
'use strict';

var _shelljs = require('shelljs');

var _shelljs2 = _interopRequireDefault(_shelljs);

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _server = require('../server');

var _server2 = _interopRequireDefault(_server);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//  ------------------------------------------------------------------------  //

_commander2.default.version(require('../../package.json').version);

_commander2.default.command('start [platform]').option('-h, --host <host>', 'host to listen on').option('-p, --port <port>', 'port to listen on', parseInt).option('-c, --config <config>', 'config JSON').description('starts react native storybook').action(function (platform, env) {
  var config = env.config ? JSON.parse(env.config) : {};
  // listen on localhost if a host name is not given
  (0, _server2.default)(env.port, env.host || 'localhost', config);
});

_commander2.default.command('run-ios').option('-a, --appname <appname>', 'storybook application name eg. "MyAppStorybook"').option('-i, --identifier <identifier>', 'storybook application identifier eg. "org.mycompany.MyAppStorybook"').description('starts react native storybook ios simulator').action(function (env) {
  _shelljs2.default.exec('react-native run-ios --scheme=' + env.appname);
  _shelljs2.default.exec('xcrun simctl install booted ios/build/Build/Products/Debug-iphonesimulator/' + env.appname + '.app');
  _shelljs2.default.exec('xcrun simctl launch booted ' + env.identifier);
});

_commander2.default.command('run-android').option('-i, --identifier <identifier>', 'storybook application id eg. "com.myapplication.storybook"').description('starts react native storybook on android simulator').action(function (env) {
  _shelljs2.default.exec('react-native run-android --variant=storybook');
  _shelljs2.default.exec('adb shell monkey -p ' + env.identifier + ' 1');
});

_commander2.default.parse(process.argv);