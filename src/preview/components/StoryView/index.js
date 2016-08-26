import React, { Component } from 'react';
import { UIManager } from 'react-native';

export default class StoryView extends Component {
  constructor(props, ...args) {
    super(props, ...args);
    this.state = {storyFn: null};
    this.props.events.on('story', storyFn => {
      this.setState({storyFn},() => this._takeSnapshot.call(this));
    });
  }

  _takeSnapshot() {
    const { channel } = this.props;
    if (channel) {
      requestAnimationFrame(() => {
        UIManager
          .takeSnapshot('window', {format: 'jpeg', quality: 0.8})
          .then((uri) => channel.emit('snapshotTaken', {uri}))
          .catch((error) => alert(error));
      })
    }
  }

  render() {
    if (!this.state.storyFn) {
      return null;
    }
    return this.state.storyFn();
  }
}
