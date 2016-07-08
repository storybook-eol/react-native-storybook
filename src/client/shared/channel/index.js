import firebase from 'firebase/app';
import 'firebase/database';

export const TYPE_FIREBASE = 'firebase';
export const TYPE_WEBSOCKET = 'websocket';

// These are classes which can be used to communicate with the
// Storybook UI. All classes should implement this interface
//
//   Channel {
//     send(type, data)
//     on(type, handler)
//   }
//

export default function getChannel(config) {
  switch (config.type) {
    case TYPE_FIREBASE:
      return new FirebaseCh(config.options);
    case TYPE_WEBSOCKET:
      return new WebSocketCh(config.options);
    default:
      throw new Error('please set channel.type');
  }
}

// WebSocketCh uses WebSockets to communicate with the Storybook UI.
// Takes the address as an option. It needs storybook server to run.
//
//     options: {
//       address: 'ws://localhost:9001',
//     }
//
export class WebSocketCh {
  constructor(options) {
    this.options = options;
    this.socket = null;
    this.isReady = false;
    this._messages = [];
    this._handlers = {};
    this._connect();
  }

  send(type, data) {
    if (!this.isReady) {
      this._messages.push({type, data});
      return;
    }
    const id = Math.random().toString(16).slice(2);
    this.socket.send(JSON.stringify({id, type, data}));
  }

  on(type, handler) {
    this._handlers[type] = this._handlers[type] || [];
    this._handlers[type].push(handler);
  }

  _connect() {
    this.socket = new WebSocket(this.options.address);

    // initial setup
    this.socket.onopen = () => {
      this.isReady = true;
      this._flush();
    };

    // listen for events
    this.socket.onmessage = e => {
      const { type, data } = JSON.parse(e.data);
      const handlers = this._handlers[type];
      if (handlers) {
        handlers.forEach(handler => handler(data));
      }
    };

    // an error occurred
    this.socket.onerror = e => {
      console.warn('websocket: connection error', e.message);
    };

    // connection closed
    this.socket.onclose = e => {
      console.warn('websocket: connection closed', e.code, e.reason);
    };
  }

  _flush() {
    const messages = this._messages;
    this._messages = [];
    messages.forEach(m => this.send(m.type, m.data));
  }
}

// FirebaseCh uses Firebase to communicate with the Storybook UI.
// This makes it easy for the storybook to work over the internet.
//
//     options: {
//       baseUrl: 'https://my-app.firebaseio.com',
//       readRef: '/read/from/here',
//       writeRef: '/write/to/here',
//     }
//
export class FirebaseCh {
  constructor(options) {
    this.options = options;
    this._readRef = null;
    this._writeRef = null;
    this._handlers = {};
    this._connect();
  }

  send(type, data) {
    const id = Math.random().toString(16).slice(2);
    this._writeRef.set({id, type, data});
  }

  on(type, handler) {
    this._handlers[type] = this._handlers[type] || [];
    this._handlers[type].push(handler);
  }

  _connect() {
    const randId = Math.random().toString();
    const config = {databaseURL: this.options.baseUrl};
    const app = firebase.initializeApp(config, randId);

    this._readRef = app.database().ref(this.options.readRef);
    this._writeRef = app.database().ref(this.options.writeRef);

    let initialValueIgnored = false;
    this._readRef.on('value', snap => {
      if (!initialValueIgnored) {
        initialValueIgnored = true;
        return;
      }
      const { id, type, data } = snap.val();
      const handlers = this._handlers[type];
      if (handlers) {
        handlers.forEach(handler => handler(data));
      }
    });
  }
}
