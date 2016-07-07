'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StorybookUI = exports.PreviewComponent = exports.storiesOf = exports.configure = exports.setAddon = exports.addDecorator = exports.action = undefined;

var _configure = require('./configure/');

Object.defineProperty(exports, 'action', {
  enumerable: true,
  get: function get() {
    return _configure.action;
  }
});
Object.defineProperty(exports, 'addDecorator', {
  enumerable: true,
  get: function get() {
    return _configure.addDecorator;
  }
});
Object.defineProperty(exports, 'setAddon', {
  enumerable: true,
  get: function get() {
    return _configure.setAddon;
  }
});
Object.defineProperty(exports, 'configure', {
  enumerable: true,
  get: function get() {
    return _configure.configure;
  }
});
Object.defineProperty(exports, 'storiesOf', {
  enumerable: true,
  get: function get() {
    return _configure.storiesOf;
  }
});
exports.getStorybookUI = getStorybookUI;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Preview = require('./preview/components/Preview');

var _Preview2 = _interopRequireDefault(_Preview);

var _configure2 = require('./configure');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// export the function to generate the preview component
function getStorybookUI(_config) {
  var config = _config;

  // NOTE: for backward compatibility
  if (config.host || config.port) {
    config.channel = config.channel || {
      type: 'websocket',
      options: { address: 'ws://' + config.host + ':' + config.port }
    };
  }

  return function () {
    return _react2.default.createElement(_Preview2.default, { config: config, stories: _configure2.stories, actions: _configure2.actions });
  };
}

// for the backward compatibility
var PreviewComponent = exports.PreviewComponent = getStorybookUI;
var StorybookUI = exports.StorybookUI = getStorybookUI;