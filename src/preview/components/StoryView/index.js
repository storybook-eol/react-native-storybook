import React from 'react';
import style from './style';

export default class StoryView extends React.Component {
  constructor(props, ...args) {
    super(props, ...args);
    this.state = {storyFn: this.props.storyFn};
    this.props.events.on('story', storyFn => this.setState({storyFn}));
  }

  render() {
    if (!this.state.storyFn) {
      return null;
    }
    return this.state.storyFn();
  }
}
