'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stories = undefined;
exports.configure = configure;
exports.storiesOf = storiesOf;

var _store = require('./store');

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var stories = exports.stories = new _store2.default();

//
function configure(loaders) {
  loaders();
}

//
function storiesOf(kind) {
  var api = {};
  api.add = function (story, fn) {
    stories.add(kind, story, fn);
    return api;
  };
  return api;
}