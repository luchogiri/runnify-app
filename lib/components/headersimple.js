// @flow

import React, { Component } from 'react';

import I18n from '../helpers/i18n';
import * as Components from './index';

import {

  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
  Dimensions,
  StyleSheet,

} from 'react-native';


export default class Headersimple extends Component {

  constructor(props: Object) {
    super(props);
  }

  render() {

    let picArrowBack = {
      uri: require('../../assets/img/login.png')
    };

    return (

        <View style={styles.backBar}>
          <TouchableOpacity style={styles.backBarBtn} onPress={this.props.navigator.pop} >
            <View style={styles.arrowBack} >
              <Image style={styles.imgArrowBack} source={picArrowBack.uri} />
            </View>
            <View style={styles.titleBack}><Text style={styles.titleBackText}>{this.props.title}</Text></View>
          </TouchableOpacity>
        </View>

    );
  }
}

let {height, width} = Dimensions.get('window');
var styles = StyleSheet.create({

  wrapper: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingTop: Platform.OS == 'android' ? 30 : 26,
    height: Platform.OS == 'android' ? 88 : 84,
  },
  backBar:{
    flexDirection: 'row',
    backgroundColor: '#510c80',
    paddingTop: Platform.OS == 'android' ? 30 : 26,
    height: Platform.OS == 'android' ? 88 : 84,
  },
  backBarBtn:{
    flexDirection: 'row',
    justifyContent: 'center'
  },
  arrowBack:{
    width:45,
    paddingTop:5,
    paddingLeft:5
  },
  imgArrowBack:{
    marginTop:10, marginLeft:15
  },
  titleBack:{
    paddingLeft:10,
    paddingTop:10
  },
  titleBackText:{
    color:'#ffffff',
    fontSize:20
  },
  col: {
    flex: 1,
    justifyContent: 'center'
  },

    align_left: {
      alignItems: 'flex-start'
    },

    align_center: {
      alignItems: 'center'
    },

    align_right: {
      alignItems: 'flex-end'
    },

    left: {
      width: 80,
      paddingLeft: 12,
    },

    center: {
      flex: 1
    },

    right: {
      width: 80,
      paddingRight: 12
    },

});
