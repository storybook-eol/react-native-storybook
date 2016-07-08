import React from 'react';

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
    appetize: {
      border: 'none',
    },
  }

  constructor(props, ...args) {
    super(props, ...args);
  }

  renderContent() {
    if (this.props.appetizeUrl) {
      return (
        <iframe
          src={this.props.appetizeUrl}
          style={this.style.appetize}
          width='300px'
          height='597px'
          scrolling='no'
        />
      );
    }

    return (
      <p style={this.style.paragraph}>
        Please check your device or simulator
      </p>
    );
  }

  render() {
    return (
      <div style={this.style.container}>
        {this.renderContent()}
      </div>
    );
  }
}
