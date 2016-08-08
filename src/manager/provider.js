import React from 'react';
import { Provider } from '@kadira/storybook-ui';
import PreviewAppetize from './components/PreviewAppetize';
import PreviewMessage from './components/PreviewMessage';
import PreviewQRCode from './components/PreviewQRCode';
import createChannel from '../channel';

export default class ReactNativeProvider extends Provider {
  constructor(config, ...args) {
    super(config, ...args);
    this._config = config;
    this._channel = createChannel(config.channel);
    this.sendGetStories();
  }

  sendGetStories() {
    this._channel.emit('getStories', {});
  }

  sendSelectStory(kind, story) {
    this._channel.emit('selectStory', {kind, story})
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
      this._channel.emit('selectStory', selection);
    }
    const { type, options } = this._config.preview;
    switch (type) {
      case 'message':
        return <PreviewMessage {...options} />;
      case 'appetize':
        return <PreviewAppetize {...options} />;
      case 'qr-code':
        return <PreviewQRCode {...options} />;
      default:
        throw new Error('please set preview.type');
    }
  }
}
