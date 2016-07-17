#!/usr/bin/env node
'use strict';

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _shelljs = require('shelljs');

var _shelljs2 = _interopRequireDefault(_shelljs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_commander2.default.option('-i, --identifier <identifier>', 'storybook application id eg. "com.myapplication.storybook"').parse(process.argv);

_shelljs2.default.exec('react-native run-android --variant=storybook');
_shelljs2.default.exec('adb shell monkey -p ' + _commander2.default.identifier + ' 1');