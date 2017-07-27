// @flow

import React, { Component } from 'react';

import { Text, View, Image, TouchableOpacity, Platform, Dimensions, StyleSheet } from 'react-native';


export default class Header extends Component {

  constructor(props: Object) {
    super(props);
  }

  render() {
    return (
      <View style={styles.wrapper}>

        <View style={styles.logo}>
          <Image source={require('../../assets/img/icon-runnify.png')}  />
        </View>

        {!this.props.right ? null:
          <View style={styles.right}>

            {this.props.right.indexOf('search') == -1 ? null:
              <View style={styles.row}>
                <TouchableOpacity style={styles.btn} onPress={this.props.navigator.screen('Search')}>
                  <Image source={require('../../assets/img/icon-header-search-i.png')} style={styles.img}  />
                </TouchableOpacity>
              </View>}

            {this.props.right.indexOf('filters') == -1 ? null:
              <View style={styles.row}>
                <TouchableOpacity style={styles.btn} onPress={this.props.navigator.screen('Filters')}>
                  <Image source={require('../../assets/img/icon-header-filters-i.png')} style={styles.img}  />
                </TouchableOpacity>
              </View>}

            {this.props.right.indexOf('delete') == -1 ? null:
              <View style={styles.row}>
                <TouchableOpacity style={styles.btn} onPress={this.props.onDelete}>
                  <Image source={require('../../assets/img/icon-header-trash.png')} style={styles.img}  />
                </TouchableOpacity>
              </View>}
          </View>}

      </View>
    );
  }
}


const styles = StyleSheet.create({

  wrapper: {
    flexDirection: 'row',
    paddingTop: Platform.OS == 'android' ? 24 : 20,
    height: Platform.OS == 'android' ? 80 : 76,
    backgroundColor:'#510c80'
  },

    logo: {
      width: 30,
      marginLeft: 16,
      justifyContent: 'center'
    },

  right: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginRight: 12,
    flexDirection: 'row'
  },

    row: {
      width: 32,
      height: 32,
      marginLeft: 8,
      justifyContent: 'center',
      alignItems: 'center'
    },

      img: {
        height: 24,
        width: 24
      }
});
