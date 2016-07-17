#!/usr/bin/env node
'use strict';

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _shelljs = require('shelljs');

var _shelljs2 = _interopRequireDefault(_shelljs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_commander2.default.option('-a, --appname <appname>', 'storybook application name eg. "MyAppStorybook"').option('-i, --identifier <identifier>', 'storybook application id eg. "com.myapplication.storybook"').parse(process.argv);

_shelljs2.default.exec('react-native run-ios --scheme=' + _commander2.default.appname);
_shelljs2.default.exec('xcrun simctl install booted ios/build/Build/Products/Debug-iphonesimulator/' + _commander2.default.appname + '.app');
_shelljs2.default.exec('xcrun simctl launch booted ' + _commander2.default.identifier);