// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Swiper from 'react-native-swiper';

import { View, Text, Image, TouchableOpacity, StyleSheet, Platform } from 'react-native';

import I18n from '../helpers/i18n';
import Config from '../actions/config';


class Onboarding extends Component {
  
  props: Object;
  state: Object;
  
  
  constructor(props: Object) {
    super(props);
    this.state = {};
  }
  
  dismiss = () => {
    this.props.dispatch( Config.Update({ show_onboarding: false }) );
    this.props.navigator.popToTop();
  };
  
  
  render() {
    return (
      <View style={styles.wrapper}>
        <Swiper
          ref='slider'
          loop={false}
          dot={<View style={styles.pagination_dot} />}
          activeDot={<View style={styles.pagination_dot_active} />}
          paginationStyle={styles.pagination}>
          
          <View style={styles.slide}>
            <View style={styles.top}>
              <Image style={styles.img} source={require('../../assets/img/onboarding-1.png')} />
            </View>
            <View style={styles.bottom}>
              <Text style={styles.title}>{I18n('BUSCAR')}</Text>
              <Text style={styles.desc}>{I18n('Encontrá las carreras que buscás')}</Text>
            </View>
          </View>
          
          <View style={styles.slide}>
            <View style={styles.top}>
              <Image style={styles.img} source={require('../../assets/img/onboarding-2.png')} />
            </View>
            <View style={styles.bottom}>
              <Text style={styles.title}>{I18n('FAVORITOS')}</Text>
              <Text style={styles.desc}>{I18n('Deslizá la carrera que te interesa, y se guardará en tus favoritos.')}</Text>
            </View>
          </View>
          
          <View style={styles.slide}>
            <View style={styles.top}>
              <Image style={styles.img} source={require('../../assets/img/onboarding-3.png')} />
            </View>
            <View style={styles.bottom}>
              <Text style={styles.title}>{I18n('ANOTATE')}</Text>
              <Text style={styles.desc}>{I18n('Sumate a está carrera y conocé quienes asistirán.')}</Text>
              
              <TouchableOpacity onPress={this.dismiss} style={styles.button}>
                <Text style={styles.button_text}>{I18n('Empezar!')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Swiper>
      
      </View>
    );
  }
}

const Container = connect(store => store)( Onboarding );
export default Container;


const styles = StyleSheet.create({
  
  wrapper: {
    flex: 1,
    backgroundColor: '#532880',
    paddingTop: Platform.OS == 'ios' ? 20 : 24
  },
  
  slide: {
    flex: 1,
    paddingTop: 48
  },
  
  pagination: {
    paddingBottom: 72
  },
    pagination_dot: {
      backgroundColor: '#734890',
      width: 12,
      height: 12,
      borderRadius: 6,
      marginRight: 8,
      marginLeft: 8
    },
    pagination_dot_active: {
      backgroundColor: '#9368B0',
      width: 12,
      height: 12,
      borderRadius: 6,
      marginRight: 8,
      marginLeft: 8
    },
    
  
  top: {
    flex: 1,
    marginLeft: 40,
    marginRight: 40,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
    img: {
      flex: 1,
      resizeMode: 'contain'
    },
  
  bottom: {
    flex: 1,
    paddingTop: 36
  },
  
  title: {
    fontSize: 28,
    textAlign: 'center',
    color: '#ffffff'
  },
  
  desc: {
    fontSize: 16,
    textAlign: 'center',
    color: '#ffffff',
    marginTop: 16,
    marginLeft: 48,
    marginRight: 48
  },
  
  button: {
    position: 'absolute',
    bottom: 48,
    left: 60,
    right: 60,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#ffffff',
    borderRadius: 2,
    borderWidth: 1
  },
    button_text: {
      color: '#ffffff'
    }
});