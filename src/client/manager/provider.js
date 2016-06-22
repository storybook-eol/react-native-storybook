import React from 'react';
import { Provider } from '@kadira/storybook-ui';
import Preview from './preview';

export default class ReactNativeProvider extends Provider {
  constructor() {
    super();

    this.socket = new WebSocket(`ws://${location.host}`);
    this.socket.onopen = () => {
      this.sendInit();
      this.sendGetStories();
    };
  }

  sendInit() {
    this.socket.send(JSON.stringify({type: 'init', data: {clientType: 'browser'}}));
  }

  sendGetStories() {
    this.socket.send(JSON.stringify({type: 'getStories', data: {}}));
  }

  sendSelectStory(selection) {
    this.socket.send(JSON.stringify({type: 'selectStory', data: selection}));
  }

  handleMessage(api, message) {
    switch (message.type) {
      case 'addAction':
        api.addAction(message.data.action);
        break;
      case 'setStories':
        api.setStories(message.data.stories);
        break;
      case 'selectStory':
        api.selectStory(message.data.kind, message.data.story);
        break;
      case 'applyShortcut':
        api.handleShortcut(message.data.event);
        break;
      default:
        console.error('unknown message type:', message.type, message);
    }
  }

  handleAPI(api) {
    api.onStory((kind, story) => {
      this.sendSelectStory({kind, story});
    });

    // listen for events
    this.socket.onmessage = (e) => {
      const message = JSON.parse(e.data);
      this.handleMessage(api, message);
    };

    // an error occurred
    this.socket.onerror = (e) => {
      console.warn('websocket connection error', e.message);
    };

    // connection closed
    this.socket.onclose = (e) => {
      console.warn('websocket connection closed', e.code, e.reason);
    };
  }

  renderPreview(selectedKind, selectedStory) {
    if (selectedKind && selectedStory) {
      this.sendSelectStory({kind: selectedKind, story: selectedStory});
    }
    return <Preview />;
  }
}
