import React, { Component } from 'react';

const style = {
  maxHeight: '100%',
  marginLeft: 'auto',
  marginRight: 'auto',
  display: 'block'
}

export default class StorySnapshotView extends Component {
  constructor(props) {
    super(props);
    this.state = { uri: null }
    this.channel = null;
  }

  componentWillMount() {
    const { channel } = this.props;
    if (channel) {
      this.channel = channel;
      channel.on('snapshotTaken', ({ uri }) => {
        var relativeFilePath = uri.match(/\/Devices\/(.*)/)[1];
        this.setState({uri: '/screenshot/' + relativeFilePath});
      });
    }
  }

  render() {
    const { uri } = this.state;
    return uri ? <img src={uri} style={style} /> : null;
  }
}
