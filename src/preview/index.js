import React from 'react';
import { EventEmitter } from 'events';
import { getDefaultConfig } from '../config';
import Channel from '../channel';
import Kind from './utils/kind';
import * as stories from './utils/stories';
import * as actions from './utils/actions';
import StoryView from './components/StoryView';

// We need to pass state from this class to the StoryView component instance
// and make the component render again. As we need to change the state to do
// it and the state can only be changed from the inside of the instance code
// We're going to pass an event emitter. The Preview class cannot be a React
// component because it also needs to expose a couple of methods to the user.
export default class Preview extends EventEmitter {
  constructor(...args) {
    super(...args);
    this._config = getDefaultConfig();
    this._configFrozen = false;
    this._channel = null;
    this._stories = new stories.Store();
    this._addons = {};
    this._decorators = [];
    this._selection = null;
  }

  configure(config) {
    if (!this._configFrozen) {
      Object.assign(this._config, config);
    }
  }

  freezeConfig() {
    this._configFrozen = true;
  }

  startChannel() {
    this._channel = new Channel('preview', this._config.channel);
    this._channel.on('getStories', d => this.sendSetStories());
    this._channel.on('selectStory', d => this.selectStory(d));
    this._channel.connect();
    this.sendSetStories();
  }

  sendAddAction(action) {
    this._channel.send('addAction', {action});
  }

  sendSetStories() {
    const stories = this._stories.dump();
    this._channel.send('setStories', {stories});
  }

  sendSelectStory(kind, story) {
    this._channel.send('selectStory', {kind, story})
  }

  setAddon(addon) {
    Object.assign(this._addons, addon);
  }

  addDecorator(decorator) {
    this._decorators.push(decorator);
  }

  newKind(kind) {
    return new Kind(this._stories, this._addons, this._decorators, kind);
  }

  newAction(name) {
    return (...args) => {
      const action = actions.create(name, args);
      this.sendAddAction(action);
    };
  }

  newLink(kind, story) {
    return () => {
      this.sendSelectStory(kind, story);
    };
  }

  selectStory(selection) {
    this._selection = selection;
    const {kind, story} = selection;
    const storyFn = this._stories.get(kind, story);
    this.emit('story', storyFn);
  }

  renderPreview() {
    let storyFn = () => null;
    if (this._selection) {
      const {kind, story} = this._selection;
      storyFn = this._stories.get(kind, story);
    }
    return <StoryView events={this} storyFn={storyFn} />;
  }
}
