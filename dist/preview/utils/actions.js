'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = create;

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function create(name, _args) {
  var id = _uuid2.default.v4();
  var args = Array.from(_args).map(filterSyntheticEvents);
  return { id: id, data: { name: name, args: args } };
}

function filterSyntheticEvents(arg) {
  if (arg && typeof arg.preventDefault === 'function') {
    return '[SyntheticEvent]';
  }
  return arg;
}