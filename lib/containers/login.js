
// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';

import Account from '../actions/account';

import { Text, TextInput, View, ScrollView, Image, Platform, TouchableOpacity, Dimensions, StyleSheet, Switch } from 'react-native';

import I18n from '../helpers/i18n';


class Login extends Component {

  state: Object;

  constructor(props) {
    super(props);
    this.state = { email: '', password: '', error: '', msg: '' };
  }

  handleNext = (next) => {
    return () => {
      this.refs[next].focus();
    };
  };

  handleInput = (field) => {
    return (value) => {
      this.setState({ [field] : value });
    };
  };

  validateEmail = (email) => {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
  };

  validateText = (text) => {
    var re = /^(\w+\S+)$/;
    return re.test(text);
  };

  saveData = () => {
    this.props.dispatch( Account.Save({logged_in: true}) );
  };

  onFacebookLogin = () => {
    this.props.dispatch( Account.FBLogin() ).then(
      (ok) => {
        this.props.navigator.popToTop();
        //console.log("apareci por aca ?");

      }, (error) => {
        console.log("error de cancelacion de cuenta facebook");

      }
    );
  };

  onFacebookLogout = () =>  {
    this.props.dispatch( Account.Logout() );
  };


  cambio = () => {
    if (!this.validateText(this.state.email)) {
      this.setState({msg: I18n('El Email es Obligatorio') });
      return false;
    } else {
      this.setState({msg:false});
    }
  };


  handleLogin = () => {
    const { email, password } = this.state;
    this.setState({ error: false, loading: true });

    if( this.cambio() ){

    }else{
      if (!email || !password){
        return this.setState({ error: true, loading: false });
      }
      this.props
        .dispatch( Account.Signin({ email, password }) )
        .then(this.handleLoggedIn, this.handleLoginError);
    }
  };


  handleLoggedIn = () => {
    this.setState({ error: false, loading: false });
    this.refs.password.blur();
    this.props.navigator.popToTop();
  };

  handleLoginError = (err) => {
    this.setState({ error: true, msg: err.msg, loading: false });
    console.log(err);
  };



  render() {

    let fblogin = {
      uri: require('../../assets/img/facebooklogin.jpg')
    };
    let fblogout = {
      uri: require('../../assets/img/facebooklogout.jpg')
    };

    return (
      <View style={styles.wrapper}>
        <Image style={styles.imgBackground} source={require('../../assets/img/main-bg.jpg')}>

          <ScrollView>
            <View style={styles.form}>

              <Image source={require('../../assets/img/runnify-logo.png')} style={{alignSelf: 'center', marginBottom: 40}} />

              {!!this.state.error && <Text style={styles.msjerrores}>{this.state.msg}</Text>}

              <View style={styles.item}>
                <TextInput
                   style={styles.form__input}
                   placeholder='E-mail'
                   returnKeyType='next'
                   placeholderTextColor='#ffffffa5'
                   underlineColorAndroid='transparent'
                   keyboardType='email-address'
                   autoCapitalize='none'
                   onChangeText={this.handleInput('email')}
                   value={this.state.email}
                   blurOnSubmit={false}
                   onSubmitEditing={this.handleNext('password')}
                 />
              </View>

              <View style={styles.item}>
                <TextInput
                   ref='password'
                   style={styles.form__input}
                   placeholder={I18n('Contraseña')}
                   secureTextEntry={true}
                   returnKeyType='done'
                   value={this.state.password}
                   placeholderTextColor='#ffffffa5'
                   underlineColorAndroid='transparent'
                   onChangeText={this.handleInput('password')}
                   onSubmitEditing={this.handleLogin}
                 />
              </View>


              <TouchableOpacity style={styles.forgot} onPress={this.props.navigator.screen('Recuperar1', { data: this.state.email })}>
                <Text style={styles.txtForgot}>{I18n('Olvidé mi contraseña')}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.btn} onPress={this.handleLogin}>
                <Text style={styles.btnLogin}>{I18n('Ingresar')}</Text>
              </TouchableOpacity>

              <View style={styles.hr} />


              <View style={styles.rowBtns}>
                <View style={styles.btn1}>
                  <TouchableOpacity style={styles.itemCreateAcount} onPress={this.props.navigator.screen('Register')} >
                    <Text style={styles.textCreateAcount}>{I18n('Crear cuenta')}</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.btn2}>
                  {this.props.account.logged_in ?
                    <TouchableOpacity style={styles.btnCustom} onPress={this.onFacebookLogout}>
                      <Text style={styles.btnLoginCustom}><Image style={styles.imgfb} source={fblogout.uri} /></Text>
                    </TouchableOpacity>:
                    <TouchableOpacity style={styles.btnCustom} onPress={this.onFacebookLogin}>
                      <Text style={styles.btnLoginCustom}>
                        <Image style={styles.imgfb} source={fblogin.uri} />
                      </Text>
                    </TouchableOpacity>}
                </View>
              </View>

              <TouchableOpacity style={[styles.forgot, {marginTop: 24}]} onPress={this.props.navigator.pop}>
                <Text style={styles.txtForgot}>{I18n('ó seguir como invitado')}</Text>
              </TouchableOpacity>
            </View>

          </ScrollView>
        </Image>
      </View>
    );
  }
}

const Container = connect(store => ({ account:store.account }) )( Login );
export default Container;


const styles = StyleSheet.create({

  wrapper: {
    flex: 1,
  },

    imgBackground:{
      paddingTop: Platform.OS == 'android' ? 24 : 20,
      resizeMode: 'cover',
      width: null,
      flex: 1
    },

    msjerrores: {
      color:'#ffffff',
      backgroundColor:'#ff000060',
      marginHorizontal: 30,
      borderRadius:10,
      padding:10
    },

    item:{
      height:54,
      borderBottomWidth:1,
      borderBottomColor:'#ffffff44',
      marginHorizontal: 40
    },
      form__input: {
        height:40,
        marginTop: 16,
        fontSize:16,
        color:'#ffffff'
      },

  txtblanco:{color:'#ffffff',fontSize:16},

  hr:{borderBottomWidth:1, borderBottomColor:'#e1e1e1', height: 24, marginHorizontal: 15 },

  form:{
    marginTop: 72
  },
    rowBtns:{flexDirection:"row",marginTop:24},
    btn1:{flex:1,marginLeft:30},
    btn2:{flex:1},
    itemFacebook:{width:140,height:54,borderRadius:5,borderWidth:2,borderColor:'#cccccc',textAlign:'center'},
        textFacebook:{color:'#ffffff',textAlign:'center',marginTop:12,fontSize:16},
    itemCreateAcount:{width:140,height:32,borderRadius:5,borderWidth:2,borderColor:'#cccccc',marginTop:1},
        textCreateAcount:{ color:'#ffffff',textAlign:'center',marginTop:4,fontSize:16},


    forgot:{
      marginTop: 40
    },
      txtForgot:{
        fontSize:16,color:'#ffffff', textAlign:'center'
      },

    btn:{flexDirection: 'row',marginTop:20},
    btnCustom:{flexDirection: 'row',marginTop:5},
      btnLogin:{textAlign:'center',backgroundColor:'#ffffff',borderRadius:10,color:'#532880',fontSize:16,paddingTop:10,paddingBottom:10,flex:1,marginLeft:30,marginRight:30},
      btnLoginCustom:{textAlign:'center',borderRadius:10,color:'#532880',fontSize:16,paddingTop:5,paddingBottom:10,flex:1,marginLeft:0,marginRight:30},


});
