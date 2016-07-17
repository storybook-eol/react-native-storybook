import parse from 'url-parse';
import firebase from 'firebase/app';
import 'firebase/database';

// FirebaseTransport uses Firebase to communicate with the Storybook UI.
// This makes it easy for the storybook to work over the internet.
//
//     channelConfig: {
//       type: 'firebase',
//       options: {
//         url: 'https://my-app.firebaseio.com/path/to/ref',
//       }
//     }
//

export default class FirebaseTransport {
  constructor(channelConfig) {
    this.onMessage = new Function();
    this._channelConfig = channelConfig;
  }

  connect() {
    this._reference = this._getReference();
    this._reference.on('value', after(1, snap => {
      this.onMessage(snap.val());
    }));
    return Promise.resolve(null);
  }

  send(msg) {
    this._reference.set(msg);
  }

  _getReference() {
    const parsedUrl = parse(this._channelConfig.options.url);
    const { protocol, host, pathname } = parsedUrl;
    const config = { databaseURL: `${protocol}//${host}` };
    const id = Math.random().toString(16).slice(2);
    const app = firebase.initializeApp(config, id);
    const ref = app.database().ref(pathname);
    return ref;
  }
}

// This helper will skip first n invocations of the function fn.
// This is used to skip the initial value received from firebase.
// We're only interested in values which are set after created time.

function after(n, fn) {
  let called = 0;
  return function (...args) {
    return (++called < n) ? null : fn(...args);
  };
}
