
// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';

import I18n from '../helpers/i18n';

import Account from '../actions/account';
import * as Components from '../components';

import { Text, View, Image, Platform, TouchableOpacity, Dimensions, StyleSheet, Linking } from 'react-native';


class Profile extends Component {
  constructor(props: Object) {
    super(props);
  }

  logout = () => {
    this.props.dispatch(Account.Logout());
    setTimeout( this.props.navigator.screen('Login'), 1000 );
  };

  navigate = (to) => {
    return () => {
      this.props.navigator.screen( !this.props.account.logged_in ? 'Login': [to] )();
    }
  };

  render() {
    return (
      <View style={styles.wrapper}>

        <Components.HeaderView navigator={this.props.navigator} />

        <View style={styles.row}>

          <TouchableOpacity style={styles.row_item} onPress={this.navigate('Account')}>
            <Image source={require('../../assets/img/icon-row-user.png')} />
            <Text style={styles.row_text}>{I18n('Mi Cuenta')}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.row_item} onPress={this.navigate('Registered')}>
            <Image source={require('../../assets/img/icon-row-races.png')} />
            <Text style={styles.row_text}>{I18n('Mis Carreras')}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.row_item} onPress={this.navigate('Create')}>
            <Image source={require('../../assets/img/icon-row-create.png')} />
            <Text style={styles.row_text}>{I18n('Crear Carrera')}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.row_item} onPress={this.props.navigator.screen('Feedback')}>
            <Image source={require('../../assets/img/icon-row-star.png')} />
            <Text style={styles.row_text}>{I18n('Calificar App')}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.row_item} onPress={()=>{ Linking.openURL('mailto:hola@runnify.com?Subject=Contacto desde Runnify')}}>
            <Image source={require('../../assets/img/icon-row-email.png')} />
            <Text style={styles.row_text}>{I18n('Contactenos')}</Text>
          </TouchableOpacity>

          {!!this.props.account.logged_in &&
          <TouchableOpacity style={styles.row_item} onPress={this.logout}>
            <Image source={require('../../assets/img/icon-row-logout.png')} />
            <Text style={styles.row_text}>{I18n('Salir')}</Text>
          </TouchableOpacity>}

        </View>
      </View>
    );
  }
}


const Container = connect(store => ({ account: store.account }) )( Profile );
export default Container;


const styles = StyleSheet.create({

  wrapper: {
    flex: 1,
    backgroundColor:'#ffffff'
  },

    row_item: {
      height: 56,
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#979797'
    },
      row_text: {
        marginLeft: 16,
        fontSize: 20,
        color: '#311833'
      }

});
