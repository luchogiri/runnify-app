// @flow

import React, { Component } from 'react';

import { Text, View, WebView, Image, TouchableOpacity, Platform, Dimensions, StyleSheet } from 'react-native';


class Webview extends Component {

  state: Object;

  constructor(props: Object) {
    super(props);
  }

  render() {
    return (
      <View style={styles.wrapper}>

        <View style={styles.header}>
          <TouchableOpacity style={styles.back} onPress={this.props.navigator.pop}>
            <Image source={require('../../assets/img/icon-header-back.png')} style={styles.back_img} />
          </TouchableOpacity>

          <View style={styles.title}>
            <Text style={styles.title_text}>{this.props.data.name}</Text>
          </View>
        </View>

        <WebView style={styles.wrapper} source={{ uri: this.props.data.link }} startInLoadingState={true} />
      </View>
    );
  }
}

export default Webview;


const styles = StyleSheet.create({

  wrapper: {
    flex: 1,
    backgroundColor:'#510c80'
  },

    header: {
      height: Platform.OS == 'android' ? 74 : 70,
      paddingTop: Platform.OS == 'android' ? 24 : 20,
      alignItems: 'center',
      justifyContent: 'flex-start',
      flexDirection: 'row',
      paddingLeft: 12,

    },
      back: {
        width: 32,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center'
      },
        back_img: {
          height: 24,
          width: 24
        },

  title: {
    flex: 1,
    paddingLeft: 16,
    justifyContent: 'center',
  },
    title_text: {
      color: '#ffffff',
      fontSize: 18
    },
});
