import React from 'react';
import { Provider } from '@kadira/storybook-ui';
import Preview from './preview';

export class Connection {
  constructor(address) {
    this._buffer = [];
    this._socket = new WebSocket(address);
    this._socket.onopen = this.onopen.bind(this);
    this._socket.onerror = this.onerror.bind(this);
    this._socket.onclose = this.onclose.bind(this);
    this._socket.onmessage = this.onmessage.bind(this);
    this._handler = Function();
  }

  setHandler(fn) {
    this._handler = fn;
  }

  onopen() {
    this._buffer.forEach(message => this._socket.send(message));
  }

  onerror(e) {
    console.warn('websocket connection error', e.message);
  }

  onclose(e) {
    console.warn('websocket connection closed', e.code, e.reason);
  }

  onmessage(e) {
    const message = JSON.parse(e.data);
    this._handler(message.type, message.data);
  }

  send(type, data) {
    const message = JSON.stringify({type, data});
    if (this._socket.readyState === WebSocket.OPEN) {
      this._socket.send(message);
    } else {
      this._buffer.push(message);
    }
  }
}

export default class ReactNativeProvider extends Provider {
  constructor() {
    super();
    this.conn = new Connection(`ws://${location.host}`);
    this.conn.send('init', {clientType: 'browser'});
    this.conn.send('getStories', {});
  }

  handleAPI(api) {
    api.onStory((kind, story) => {
      this.conn.send('selectStory', {kind, story});
    });

    // listen for events from connection
    this.conn.setHandler((type, data) => {
      switch (type) {
        case 'addAction':
          api.addAction(data.action);
          break;
        case 'setStories':
          api.setStories(data.stories);
          break;
        case 'selectStory':
          api.selectStory(data.kind, data.story);
          break;
        default:
          console.error('unknown message type:', type);
      }
    });
  }

  renderPreview(selectedKind, selectedStory) {
    if (selectedKind && selectedStory) {
      const selection = {kind: selectedKind, story: selectedStory};
      this.conn.send('selectStory', selection);
    }
    return <Preview />;
  }
}
