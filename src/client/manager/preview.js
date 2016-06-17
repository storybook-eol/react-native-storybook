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
  }

  constructor(...args) {
    super(...args);
  }

  render() {
    return (
      <div style={this.style.container}>
        <p style={this.style.paragraph}>
          Please check your device or simulator
        </p>
      </div>
    );
  }
}
