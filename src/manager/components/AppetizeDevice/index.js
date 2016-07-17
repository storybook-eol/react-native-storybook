import React from 'react';
import style from './style';

export default class AppetizeDevice extends React.Component {
  devices = {
    nexus5: { type: 'nexus5', width: 270, height: 480, scale: 75 },
    nexus7: { type: 'nexus7', width: 300, height: 480, scale: 50 },
    iphone6: { type: 'iphone6', width: 282, height: 501, scale: 75 },
  }

  render() {
    const { pubKey, type } = this.props.device;
    const { device, width, height, scale } = this.devices[type];
    const embed = `https://appetize.io/embed/${pubKey}`
      + `?device=${device}`
      + `&scale=${scale}`
      + '&autoplay=true'
      + '&screenOnly=true';

    return (
      <iframe
        style={style.iframe}
        src={embed}
        width={width}
        height={height}
        scrolling="no"
      />
    );
  }
}
