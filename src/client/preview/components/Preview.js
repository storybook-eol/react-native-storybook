import React, { Component } from 'react';
import CenteredText from './CenteredText';

export default class Preview extends Component {
  static propTypes = {
    address: React.PropTypes.string.isRequired,
    stories: React.PropTypes.object.isRequired,
  }

  constructor(...args) {
    super(...args);
    this.socket = null;
    this.state = {selection: null};
  }

  componentDidMount() {
    // TODO use an official release of socket.io-client instead
    // used a patched socket-io client until following happens
    // - engine.io-parser releases a new version after this pull-request
    //   https://github.com/socketio/engine.io-parser/pull/55
    // - socket.io-client uses the patched engine.io-parser and releases
    //   https://github.com/socketio/socket.io-client/issues/945
    const io = require('../../_vendor/patched-socket.io.js');

    // new connection
    this.socket = io(this.props.address, {jsonp: false});

    // initial setup
    this.socket.emit('init', {type: 'device'});
    this.socket.emit('setStories', {stories: this.props.stories.dump()});

    // listen for events
    this.socket.on('getStories', msg => {
      // FIXME this will send stories list to all browser clients
      //       these clients may or may not re render the list but
      //       anyways it's best not to send unnecessary messages
      this.socket.emit('setStories', {stories: this.props.stories.dump()});
    });
    this.socket.on('selectStory', msg => {
      const {kind, story} = msg;
      this.setState({selection: {kind, story}});
    });
  }

  render() {
    if (!this.state.selection) {
      return <CenteredText>Welcome to Storybook!</CenteredText>
    }
    const {kind, story} = this.state.selection;
    return this.props.stories.get(kind, story)();
  }
}
