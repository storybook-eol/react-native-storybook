'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.storiesOf = exports.configure = exports.setAddon = exports.addDecorator = exports.client = exports.stories = undefined;

var _store = require('./store');

var _store2 = _interopRequireDefault(_store);

var _client = require('./client');

var _client2 = _interopRequireDefault(_client);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var stories = exports.stories = new _store2.default();
var client = exports.client = new _client2.default(stories);

var addDecorator = exports.addDecorator = client.addDecorator.bind(client);
var setAddon = exports.setAddon = client.setAddon.bind(client);
var configure = exports.configure = client.configure.bind(client);
var storiesOf = exports.storiesOf = client.storiesOf.bind(client);