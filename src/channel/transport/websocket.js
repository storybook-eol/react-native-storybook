// WebSocketTransport uses WebSockets to communicate with the Storybook UI.
// Takes the address as an option. It needs storybook server to run.
//
//     channelConfig: {
//       type: 'websocket',
//       options: {
//         url: 'ws://localhost:9001',
//       }
//     }
//

export default class WebSocketTransport {
  constructor(channelConfig) {
    this.onMessage = new Function();
    this._log = console.log.bind(console);
    this._channelConfig = channelConfig;
    this._socket = null;
    this._messages = [];
  }

  connect() {
    let resolved = false;

    return new Promise((resolve, reject) => {
      this._socket = new WebSocket(this._channelConfig.options.url);

      // initial setup
      this._socket.onopen = () => {
        this.isReady = true;
        this._flush();
        resolve(null);
        resolved = true;
      };

      // listen for events
      this._socket.onmessage = e => {
        const msg = JSON.parse(e.data);
        this.onMessage(msg);
      };

      // an error occurred
      this._socket.onerror = e => {
        this._log('websocket: connection error', e.message);
        if (!resolved) {
          reject();
        }
      };

      // connection closed
      this._socket.onclose = e => {
        this._log('websocket: connection closed', e.code, e.reason);
      };
    });
  }

  send(msg) {
    if (!this.isReady) {
      this._messages.push(msg);
      return;
    }
    const data = JSON.stringify(msg);
    this._socket.send(data);
  }

  _flush() {
    const messages = this._messages;
    this._messages = [];
    messages.forEach(msg => this.send(msg));
  }
}
