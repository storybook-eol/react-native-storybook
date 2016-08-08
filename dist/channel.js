'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createChannel;

var _storybookChannelFirebase = require('@kadira/storybook-channel-firebase');

var _storybookChannelFirebase2 = _interopRequireDefault(_storybookChannelFirebase);

var _storybookChannelWebsocket = require('@kadira/storybook-channel-websocket');

var _storybookChannelWebsocket2 = _interopRequireDefault(_storybookChannelWebsocket);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createChannel(channelConfig) {
  switch (channelConfig.type) {
    case 'firebase':
      return (0, _storybookChannelFirebase2.default)(channelConfig.options);
    case 'websocket':
      return (0, _storybookChannelWebsocket2.default)(channelConfig.options);
    default:
      throw new Error('please set channel.type');
  }
}