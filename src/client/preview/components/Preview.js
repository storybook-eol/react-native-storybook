import React, { Component } from 'react';
import CenteredText from './CenteredText';

export default class Preview extends Component {
  static propTypes = {
    address: React.PropTypes.string.isRequired,
    stories: React.PropTypes.object.isRequired,
  }

  constructor(...props) {
    super(...props);
    this.socket = null;
    this.state = {selection: null};
  }

  selectStory({kind, story}) {
    this.setState({selection: {kind, story}});
  }

  sendInit() {
    this.socket.send(JSON.stringify({type: 'init', data: {clientType: 'device'}}));
  }

  sendAddAction(action) {
    this.socket.send(JSON.stringify({type: 'addAction', data: {action}}));
  }

  sendSetStories() {
    const stories = this.props.stories.dump();
    // FIXME this will send stories list to all browser clients
    //       these clients may or may not re render the list but
    //       anyways it's best not to send unnecessary messages
    this.socket.send(JSON.stringify({type: 'setStories', data: {stories}}));
  }

  handleMessage(message) {
    switch (message.type) {
      case 'getStories':
        this.sendSetStories();
        break;
      case 'selectStory':
        this.selectStory(message.data);
        break;
      default:
        console.error('unknown message type:', message.type, message);
    }
  }

  componentDidMount() {
    // new connection
    this.socket = new WebSocket(this.props.address);

    // initial setup
    this.socket.onopen = () => {
      this.sendInit();
      this.sendSetStories();
    };

    // listen for events
    this.socket.onmessage = (e) => {
      const message = JSON.parse(e.data);
      this.handleMessage(message);
    };

    // an error occurred
    this.socket.onerror = (e) => {
      console.warn('websocket connection error', e.message);
    };

    // connection closed
    this.socket.onclose = (e) => {
      console.warn('websocket connection closed', e.code, e.reason);
    };

    // listen for story changes
    this.props.stories.on('change', () => {
      this.sendSetStories();
    });

    // listen for action triggers
    this.props.actions.on('action', action => {
      this.sendAddAction(action);
    });
  }

  render() {
    if (!this.state.selection) {
      return <CenteredText>Welcome to Storybook!</CenteredText>
    }
    const {kind, story} = this.state.selection;
    const context = {kind, story};
    const getStory = this.props.stories.get(kind, story);
    return getStory(context);
  }
}
