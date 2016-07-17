import FirebaseTransport from './transport/firebase';
import WebSocketTransport from './transport/websocket';

// Wraps channel classes and provide a common interface for use.
// These are classes which can be used to communicate with the
// Storybook UI. All classes should implement this interface
//
//   Channel {
//     connect()
//     send(msg)
//     onMessage(msg)
//   }
//

export default class Channel {
  constructor(sender, channelConfig) {
    this._sender = sender;
    this._handlers = {};
    this._channelConfig = channelConfig;
    this._transport = this._getTransport();
    this._transport.onMessage = this._recv.bind(this);
  }

  connect() {
    return this._transport.connect();
  }

  on(type, handler) {
    this._handlers[type] = this._handlers[type] || [];
    this._handlers[type].push(handler);
  }

  send(type, data) {
    const id = Math.random().toString(16).slice(2);
    const msg = {id, type, data, sender: this._sender};
    this._transport.send(msg);
  }

  _recv(msg) {
    if (msg.sender === this._sender) {
      return;
    }
    const handlers = this._handlers[msg.type];
    if (handlers) {
      handlers.forEach(handler => handler(msg.data));
    }
  }

  _getTransport() {
    switch (this._channelConfig.type) {
      case 'firebase':
        return new FirebaseTransport(this._channelConfig);
      case 'websocket':
        return new WebSocketTransport(this._channelConfig);
      default:
        throw new Error('please set channel.type');
    }
  }
}
