
// @flow

import React, { Component } from 'react';

import I18n from '../helpers/i18n';
import * as Components from '../components';

import { Linking, Text, View, ScrollView, Image, Platform, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';


export default class Feedback extends Component {

  handleClick = () => {
    Linking.openURL('market://details?id=whatsapp');
  };

  render() {
    let rating = {
      uri: require('../../assets/img/stars.png')
    };
    let picArrowBack = {
      uri: require('../../assets/img/arrowBack.png')
    };

    return (
      <View style={styles.wrapper}>

        <View style={styles.header}>
          <TouchableOpacity style={styles.back} onPress={this.props.navigator.pop}>
            <Image source={require('../../assets/img/icon-header-back.png')} style={styles.back_img} />
          </TouchableOpacity>
        </View>

        <View style={styles.box2}>
          <Image style={styles.imgRating} source={rating.uri} />
          <Text style={styles.txtTitle}>{I18n('¿Te gusta nuestra app?')}</Text>
          <Text style={styles.txtSubTitle}>{I18n('Deja tu opinion en')} {Platform.OS == 'ios'? 'AppStore':'Google Play'}!</Text>
          <Text style={styles.txtSubTitle}>{I18n('Gracias')}</Text>
          <TouchableOpacity onPress={this.handleClick} style={styles.btnOpinar}><Text style={styles.opinar}>{I18n('Opinar')}</Text></TouchableOpacity>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({

  header: {
    height: Platform.OS == 'android' ? 74 : 70,
    paddingTop: Platform.OS == 'android' ? 24 : 20,
    backgroundColor:'#510c80',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
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

  txtTitle:{color:'#000000',fontSize:24,textAlign:'center',marginBottom:20},
  txtSubTitle:{color:'#777777',fontSize:20,textAlign:'center',marginBottom:10},
  btnOpinar:{},
  opinar:{backgroundColor:'#510c80',borderWidth:2,borderColor:'#510c80',borderRadius:5,color:'#ffffff',fontSize:20,textAlign:'center',paddingTop:10,paddingBottom:10,paddingLeft:30,paddingRight:30},
  imgRating:{marginTop:60,marginBottom:20, height:64, width: 140},
  container: {
    flex: 1
  },

  userImage:{
    alignItems: 'center'
  },
  cntUser:{alignItems: 'center'},
  txtUser:{fontSize:18,fontWeight:'bold'},
  cntImage:{
    borderRadius: 100,
    borderWidth: 1,
    borderStyle: 'dotted',
    overflow:'hidden',
    width:80,
    height:80,
    marginTop:30
  },
  imgProfile:{
    width:100,
    height:100
  },
  box1:{
    height:200
  },
  box2:{
    flex: 1,alignItems:'center'
  },
  item:{
    flex: 1,
    paddingTop:15,
    paddingBottom:10,
    paddingLeft:10,
    paddingRight:10
  },
  itemText:{
    color:'#333333'
  },
  wrapper: {
    flex: 1,
    backgroundColor:'#ffffff'
    // paddingTop: Platform.OS == 'android' ? 24 : 20,
  }

});
