import React from 'react';
import io from 'socket.io-client';
import { Provider } from '@kadira/storybook-ui';
import Preview from './preview';

export default class ReactNativeProvider extends Provider {
  constructor() {
    super();
    this.socket = io(location.host, {jsonp: false});
    this.socket.emit('init', {type: 'browser'});
    this.socket.emit('getStories', {});
  }

  renderPreview(selectedKind, selectedStory) {
    if (selectedKind && selectedStory) {
      const selection = {kind: selectedKind, story: selectedStory};
      this.socket.emit('selectStory', selection);
    }
    return <Preview />;
  }

  handleAPI(api) {
    api.onStory((kind, story) => {
      this.socket.emit('selectStory', {kind, story});
    });

    this.socket.on('addAction', msg => {
      api.addAction(msg.action);
    });

    this.socket.on('setStories', msg => {
      api.setStories(msg.stories);
    });

    this.socket.on('selectStory', msg => {
      api.selectStory(msg.kind, msg.story);
    });

    this.socket.on('applyShortcut', msg => {
      api.handleShortcut(msg.event);
    });
  }
}
