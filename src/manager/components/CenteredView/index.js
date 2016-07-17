import React from 'react';
import style from './style';

export default class CenteredView extends React.Component {
  render() {
    return (
      <div style={style.container}>
        {this.props.children}
      </div>
    );
  }
}
