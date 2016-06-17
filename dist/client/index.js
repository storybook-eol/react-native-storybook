'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.storiesOf = exports.configure = undefined;

var _configure = require('./configure/');

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
exports.PreviewContainer = PreviewContainer;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Preview = require('./preview/components/Preview');

var _Preview2 = _interopRequireDefault(_Preview);

var _configure2 = require('./configure');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// export the preview container
function PreviewContainer() {
  var address = 'localhost:9001';
  return _react2.default.createElement(_Preview2.default, { address: address, stories: _configure2.stories });
}