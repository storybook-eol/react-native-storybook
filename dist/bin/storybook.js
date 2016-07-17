#!/usr/bin/env node
'use strict';

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_commander2.default.version(require('../../package.json').version).command('start', 'starts storybook webapp', { isDefault: true }).command('build', 'builds storybook webapp').command('run-ios', 'run storybook in ios simulator').command('run-android', 'run storybook in android emulator').parse(process.argv);