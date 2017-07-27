// @flow

import React, { Component } from 'react';
import { View, Text, Touchable, Image, StyleSheet, Platform } from '../../components';


const Header = (props) => {

  let icon = '/img/icon-header-' + ( Platform.OS === 'web' ?'go':'back' ) + '@2x.png';

  return (
    <View style={styles.header}>
      <Touchable style={styles.back} onPress={props.back}>
        <Image source={icon} style={styles.back_img} />
      </Touchable>

      <View style={styles.title}>
        <Text style={styles.title_text}>{props.children}</Text>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({

  header: {
    height: Platform.OS === 'android' ? 74 : Platform.OS === 'ios' ? 70 : 56,
    paddingTop: Platform.OS === 'android' ? 24 : Platform.OS === 'ios' ? 20 : 0,
    flexDirection: 'row',
    alignItems: 'center'
  },

  back: {
    height: 32,
    width: 32,
    marginLeft: 12,
    alignItems: 'center',
    justifyContent: 'center'
  },

  back_img: {
    height: 24,
    width: 24
  },

  title: {
    marginLeft: 16
  },

  title_text: {
    fontSize: 20
  }

});
