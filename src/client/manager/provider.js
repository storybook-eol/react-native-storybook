import React from 'react';
import { Provider } from '@kadira/storybook-ui';
import getChannel from '../shared/channel';
import Preview from './preview';

export default class ReactNativeProvider extends Provider {
  constructor(config, ...args) {
    super(config, ...args);
    this.config = config;
    this._channel = getChannel(config.channel);
    this.sendInit();
    this.sendGetStories();
  }

  sendInit() {
    this._channel.send('init', {clientType: 'browser'});
  }

  sendGetStories() {
    this._channel.send('getStories', {});
  }

  sendSelectStory(kind, story) {
    this._channel.send('selectStory', {kind, story})
  }

  handleAPI(api) {
    api.onStory((kind, story) => this.sendSelectStory(kind, story));
    this._channel.on('addAction', d => api.addAction(d.action));
    this._channel.on('setStories', d => api.setStories(d.stories));
    this._channel.on('selectStory', d => api.selectStory(d.kind, d.story));
  }

  renderPreview(selectedKind, selectedStory) {
    if (selectedKind && selectedStory) {
      const selection = {kind: selectedKind, story: selectedStory};
      this._channel.send('selectStory', selection);
    }
    return <Preview {...this.config.preview} />;
  }
}
