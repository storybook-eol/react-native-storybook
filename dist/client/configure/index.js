'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.storiesOf = exports.configure = exports.setAddon = exports.addDecorator = exports.action = exports.client = exports.stories = exports.actions = undefined;

var _action_store = require('./action_store');

var _action_store2 = _interopRequireDefault(_action_store);

var _story_store = require('./story_store');

var _story_store2 = _interopRequireDefault(_story_store);

var _client = require('./client');

var _client2 = _interopRequireDefault(_client);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var actions = exports.actions = new _action_store2.default();
var stories = exports.stories = new _story_store2.default();
var client = exports.client = new _client2.default(actions, stories);

var action = exports.action = client.action.bind(client);
var addDecorator = exports.addDecorator = client.addDecorator.bind(client);
var setAddon = exports.setAddon = client.setAddon.bind(client);
var configure = exports.configure = client.configure.bind(client);
var storiesOf = exports.storiesOf = client.storiesOf.bind(client);