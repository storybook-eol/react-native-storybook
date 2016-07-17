import React from 'react';
import CenteredView from '../CenteredView';
import style from './style';

export default class PreviewMessage extends React.Component {
  render() {
    return (
      <CenteredView>
        <p style={style.paragraph}>{this.props.message}</p>
      </CenteredView>
    );
  }
}
