import React from 'react';
import QRCode from 'qrcode.react';
import CenteredView from '../CenteredView';
import style from './style';

export default class PreviewQRCode extends React.Component {
  render() {
    return (
      <CenteredView>
        <QRCode value={this.props.value} />
        <p style={style.paragraph}>{this.props.message}</p>
      </CenteredView>
    );
  }
}
