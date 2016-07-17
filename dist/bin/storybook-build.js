#!/usr/bin/env node
'use strict';

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _shelljs = require('shelljs');

var _shelljs2 = _interopRequireDefault(_shelljs);

var _indexHtml = require('../webapp/pages/index.html.js');

var _indexHtml2 = _interopRequireDefault(_indexHtml);

var _config = require('../config.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_commander2.default.option('-c, --config <config>', 'config JSON').option('-o, --outdir <outdir>', 'location to write results to').option('-i, --ios <ios>', 'build storybook for ios').option('-a, --android <android>', 'build storybook for android').parse(process.argv);

if (!_commander2.default.outdir) {
  _commander2.default.outdir = './storybook-build';
}

var config = (0, _config.getDefaultConfig)();

if (_commander2.default.config) {
  var customConfig = JSON.parse(_commander2.default.config);
  Object.assign(config, customConfig);
}

_shelljs2.default.exec('rm -rf ' + _commander2.default.outdir);
_shelljs2.default.exec('mkdir -p ' + _commander2.default.outdir);

var pubdir = path.resolve(__dirname, '../webapp/public/*');
_shelljs2.default.exec('cp -r ' + pubdir + ' ' + _commander2.default.outdir);

var indexFile = path.join(_commander2.default.outdir, 'index.html');
fs.writeFileSync(indexFile, (0, _indexHtml2.default)(config));

if (_commander2.default.ios) {
  // TODO build storybook for ios
}

if (_commander2.default.android) {
  // TODO build storybook for android
}