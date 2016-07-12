import React from 'react';

export class AppetizePreview extends React.Component {
  style = {
    iframe: {
      margin: '0 10px',
      border: '1px solid rgb(193, 193, 193)',
    },
  }

  devices = {
    nexus5: { width: 270, height: 480, scale: 75 },
    nexus7: { width: 300, height: 480, scale: 50 },
    iphone6: { width: 282, height: 501, scale: 75 },
  }

  constructor(props, ...args) {
    super(props, ...args);
  }

  render() {
    const { pubKey, device } = this.props;
    const { width, height, scale } = this.devices[device];
    const embed = `https://appetize.io/embed/${pubKey}`
      + `?device=${device}`
      + `&scale=${scale}`
      + '&autoplay=true'
      + '&screenOnly=true';

    return (
      <iframe
        style={this.style.iframe}
        src={embed}
        width={width}
        height={height}
        scrolling="no"
      />
    );
  }
}

export default class Preview extends React.Component {
  style = {
    container: {
      display: 'flex',
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paragraph: {
      margin: 0,
      fontFamily: 'sans-serif',
    },
  }

  constructor(props, ...args) {
    super(props, ...args);
  }

  render() {
    if (this.props.appetize) {
      return this.renderAppetize();
    }
    return (
      <div style={this.style.container}>
        <p style={this.style.paragraph}>
          Please check your device or simulator
        </p>
      </div>
    );
  }

  renderAppetize() {
    const children = [];

    if (this.props.appetize.android) {
      const key = this.props.appetize.android;
      children.push(<AppetizePreview pubKey={key} device='nexus5' />);
    }

    if (this.props.appetize.ios) {
      const key = this.props.appetize.ios;
      children.push(<AppetizePreview pubKey={key} device='iphone6' />);
    }

    return (
      <div style={this.style.container}>
        {children}
      </div>
    );
  }
}
