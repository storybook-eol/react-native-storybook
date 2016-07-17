import React from 'react';
import { Provider } from '@kadira/storybook-ui';
import PreviewAppetize from './components/PreviewAppetize';
import PreviewMessage from './components/PreviewMessage';
import Channel from '../channel';

export default class ReactNativeProvider extends Provider {
  constructor(config, ...args) {
    super(config, ...args);
    this._config = config;
    this._channel = new Channel('manager', config.channel);
    this._channel.connect();
    this.sendGetStories();
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
    const { type, options } = this._config.preview;
    switch (type) {
      case 'message':
        return <PreviewMessage {...options} />;
      case 'appetize':
        return <PreviewAppetize {...options} />;
      default:
        throw new Error('please set preview.type');
    }
  }
}
