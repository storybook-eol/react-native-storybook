import React from 'react';
import CenteredView from '../CenteredView';
import AppetizeDevice from '../AppetizeDevice';
import style from './style';

export default class PreviewAppetize extends React.Component {
  renderDevice(device) {
    return (
      <div style={style.device}>
        <AppetizeDevice device={device} />
      </div>
    );
  }

  render() {
    const children = this.props.devices.map(d => this.renderDevice(d));
    return <CenteredView>{children}</CenteredView>;
  }
}
