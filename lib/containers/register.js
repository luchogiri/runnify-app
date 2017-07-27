// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Text, View, ScrollView, Image, TouchableOpacity, Platform, StyleSheet } from 'react-native';


import I18n from '../helpers/i18n';
import Account from '../actions/account';
import TextInput from '../components/text-input';


class Register extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      repeat: '',
      accept: false,
      error: false,
      serverError: false,
      submitted: false
    };
  }


  handleInput = (field) => {
    return (value) => {
      this.setState({ [field]: value });
    };
  };

  handleNext = (field) => {
    return () => {
      this.refs[field] && this.refs[field].focus();
    };
  };

  validateEmpty = (field) => {
    if (!this.state[field]) return '*El campo es obligatorio';
    return false;
  };

  validateEmail = () => {
    if (this.validateEmpty('email')) return this.validateEmpty('email');
    let regexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regexp.test(this.state.email)) return I18n('*El formato de email es incorrecto.');
    else return false;
  };

  validatePassword = () => {
    if (this.validateEmpty('password')) return this.validateEmpty('password');
    if (this.state.password.length < 8) return I18n('*La contraseña es demasiado corta.');
    return false;
  };

  validateRepeat = () => {
    if (this.validateEmpty('repeat')) return this.validateEmpty('repeat');
    if (this.state.password != this.state.repeat) return I18n('*Las contraseñas deben coincidir.');
    return false;
  };

  validateAccept = () => {
    if (!this.state.accept) return I18n('Debe aceptar los términos y condiciones');
  };

  submit = () => {
    this.setState({ submitted: true });
    if (this.state.loading || this.state.error) return false;

    let error = this.state.error;
    error = this.validateEmpty('first_name') || error;
    error = this.validateEmpty('last_name') || error;
    error = this.validateEmail() || error;
    error = this.validatePassword() || error;
    error = this.validateRepeat() || error;
    error = this.validateAccept() || error;
    ['first_name', 'last_name', 'email', 'password', 'repeat'].forEach(f => this.refs[f].validate());

    if (!error) {
      this.setState({loading: true, error: false, submitted: false});
      this.props.dispatch(Account.Register(this.state)).then(this.onCreated, this.onError);
    }
  };


  onCreated = (data) => {
    this.setState({ loading: false });
    this.props.navigator.popToTop();
  };

  onError = (err) => {
    // console.log(err);
    this.setState({ loading: false, serverError: err });
  };

  onFacebookLogin = () => {
    this.setState({ loading: true });
    this.props.dispatch(Account.Login()).then(this.onLoCreatedthis.onError);
  };



  render() {
    return (
      <Image style={styles.wrapper} source={require('../../assets/img/main-bg.jpg')}>
        <ScrollView>
          <Image style={styles.logo} source={require('../../assets/img/runnify-logo.png')} />

          <View style={styles.form}>

            <TextInput
              label={I18n('Nombre')}
              ref='first_name'
              placeholder={I18n('ej: Mariano')}
              value={this.state.first_name}
              error={this.validateEmpty('first_name')}
              onChangeText={this.handleInput('first_name')}
              onSubmitEditing={this.handleNext('last_name')}
            />

            <TextInput
              label={I18n('Apellido')}
              ref='last_name'
              placeholder={I18n('ej: Moreno')}
              value={this.state.last_name}
              error={this.validateEmpty('last_name')}
              onChangeText={this.handleInput('last_name')}
              onSubmitEditing={this.handleNext('email')}
            />

            <TextInput
              label='E-mail'
              ref='email'
              placeholder={I18n('ej: mariano@runnify.com')}
              value={this.state.email}
              keyboardType='email-address'
              autoCapitalize='none'
              error={this.validateEmail()}
              onChangeText={this.handleInput('email')}
              onSubmitEditing={this.handleNext('password')}
            />

            <TextInput
              label={I18n('Contraseña')}
              ref='password'
              placeholder='••••••••'
              value={this.state.password}
              secureTextEntry={true}
              autoCapitalize='none'
              error={this.validatePassword()}
              onChangeText={this.handleInput('password')}
              onSubmitEditing={this.handleNext('repeat')}
            />

            <TextInput
              label={I18n('Repetir contraseña')}
              ref='repeat'
              placeholder='••••••••'
              value={this.state.repeat}
              secureTextEntry={true}
              autoCapitalize='none'
              returnKeyType='done'
              blurOnSubmit={true}
              error={this.validateRepeat()}
              onChangeText={this.handleInput('repeat')}
              onSubmitEditing={this.submit}
            />


            <View style={styles.terms}>
              <TouchableOpacity style={styles.terms_check} onPress={() => { this.setState({ accept: !this.state.accept }) }}>
                {this.state.accept && <Image source={require('../../assets/img/icon-checked.png')} style={styles.terms_checked} />}
              </TouchableOpacity>
              <Text style={styles.terms_text}>{I18n('Acepto')}</Text>
              <Text style={styles.terms_link}>{I18n('TÉRMINOS Y CONDICIONES')}</Text>
            </View>

            {this.validateAccept() && this.state.submitted && <Text style={styles.terms_error}>{this.validateAccept()}</Text>}
            {this.state.serverError && <Text style={styles.terms_error}>{I18n((this.state.serverError || {}).msg || '')}</Text>}

            <TouchableOpacity style={[styles.submit, !!this.state.loading && styles.submit_loading]} onPress={this.submit}>
              <Text style={styles.submit_text}>{this.state.loading ? I18n('Creando'): I18n('Crear')}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.actions}>
            <TouchableOpacity style={styles.actions_cancel} onPress={this.props.navigator.pop}>
              <Text style={styles.actions_cancel_text}>{I18n('Cancelar')}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actions_fb} onPress={this.onFacebookLogin}>
              <Image style={styles.actions_fb_img} source={require('../../assets/img/icon-social-facebook.png')} />
              <Text style={styles.actions_fb_text}>Facebook</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Image>
    );
  }
}

const Container = connect(store => store)(Register);
export default Container;


const styles = StyleSheet.create({

  wrapper: {
    flex: 1,
    width: null,
    resizeMode: 'cover',
    paddingTop: Platform.OS == 'android' ? 24 : 20,
  },

    logo: {
      width: 121,
      height: 35,
      marginTop: 35,
      marginBottom: 8,
      alignSelf: 'center'
    },

    form: {
      marginHorizontal: 16,
      paddingHorizontal: 32,
      paddingBottom: 24,
      borderBottomWidth: 1,
      borderBottomColor: '#e1e1e1'
    },


  terms: {
    height: 24,
    marginTop: 24,
    flexDirection: 'row',
    alignItems: 'center'
  },
    terms_check: {
      height: 18,
      width: 18,
      marginRight: 12,
      borderWidth: 2,
      borderRadius: 2,
      borderColor: '#ffffff88',
      backgroundColor: 'transparent'
    },
      terms_checked: {
        height: 14,
        width: 14
      },

      terms_text: {
        color: '#ffffffb2'
      },

      terms_link: {
        color: '#196fce',
        marginLeft: 6,
        fontWeight: '500'
      },

      terms_error: {
        color: '#ff4433',
        fontSize: 12,
        marginTop: 16,
      },


    submit: {
      backgroundColor: '#ffffff',
      justifyContent: 'center',
      borderRadius: 2,
      marginTop: 40,
      height: 36
    },
      submit_text: {
        color: '#532880',
        fontSize: 16,
        textAlign: 'center',
        fontWeight: '500'
      },

      submit_loading: {
        opacity: 0.4
      },


    actions: {
      marginHorizontal: 16,
      paddingHorizontal: 32,
      marginTop: 24,
      marginBottom: 24,
      flexDirection: 'row'
    },

      actions_cancel: {
        flex: 1,
        marginRight: 8,
        borderWidth: 1,
        borderRadius: 3,
        borderColor: '#b7bbc0',
        justifyContent: 'center',
        height: 32
      },
        actions_cancel_text: {
          color: '#ffffff',
          textAlign: 'center'
        },

      actions_fb: {
        flex: 1,
        marginLeft: 8,
        borderRadius: 3,
        backgroundColor: '#354c8c',
        alignItems: 'center',
        flexDirection: 'row',
        height: 32
      },
        actions_fb_img: {
          marginLeft: 8
        },

        actions_fb_text: {
          flex: 1,
          textAlign: 'center',
          color: '#ffffff'
        }

});
