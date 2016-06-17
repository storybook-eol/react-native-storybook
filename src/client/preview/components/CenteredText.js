import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class CenteredText extends Component {
  style = {
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    textView: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
  }

  render() {
    return (
      <View style={this.style.container}>
        <Text style={this.style.textView}>
          {this.props.children}
        </Text>
      </View>
    );
  }
}
