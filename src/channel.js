import createFirebaseChannel from '@kadira/storybook-channel-firebase';
import createWebsocketChannel from '@kadira/storybook-channel-websocket';

export default function createChannel(channelConfig) {
  switch (channelConfig.type) {
    case 'firebase':
      return createFirebaseChannel(channelConfig.options);
    case 'websocket':
      return createWebsocketChannel(channelConfig.options);
    default:
      throw new Error('please set channel.type');
  }
}
