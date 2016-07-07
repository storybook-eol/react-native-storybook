import React, { Component } from 'react';
import getChannel from '../../shared/channel';
import CenteredText from './CenteredText';

export default class Preview extends Component {
  static propTypes = {
    config: React.PropTypes.object.isRequired,
    stories: React.PropTypes.object.isRequired,
    actions: React.PropTypes.object.isRequired,
  }

  constructor(props, ...args) {
    super(props, ...args);
    this.state = {selection: null};
    this._channel = getChannel(props.config.channel);
    this._channel.on('getStories', d => this.sendSetStories());
    this._channel.on('selectStory', d => this.selectStory(d));
    props.stories.on('change', () => this.sendSetStories());
    props.actions.on('action', action => this.sendAddAction(action));
    this.sendInit();
    this.sendSetStories();
  }

  selectStory(selection) {
    this.setState({selection});
  }

  sendInit() {
    this._channel.send('init', {clientType: 'device'});
  }

  sendAddAction(action) {
    this._channel.send('addAction', {action});
  }

  sendSetStories() {
    const stories = this.props.stories.dump();
    this._channel.send('setStories', {stories});
  }

  componentDidMount() {
    // ...
  }

  render() {
    if (!this.state.selection) {
      return <CenteredText>Welcome to Storybook!!</CenteredText>
    }
    const {kind, story} = this.state.selection;
    const getStory = this.props.stories.get(kind, story);
    const context = {kind, story};
    return getStory(context);
  }
}
