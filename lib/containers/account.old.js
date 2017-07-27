
// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';

import I18n from '../helpers/i18n';
import * as Components from '../components';
import Account from '../actions/account';

import { Text, TextInput, View, ScrollView, Image, Platform, TouchableOpacity, Dimensions, StyleSheet, Switch, Linking } from 'react-native';


class MyAccount extends Component {


  constructor(props) {
    super(props);
    this.state = { iduser:'', first_name: '', last_name: '', pais:'', prov:'', email: '', password: '', disconect: false, alerts: true };
    this.onFacebookLogin = this.onFacebookLogin.bind(this);
    this.onFacebookLogout = this.onFacebookLogout.bind(this);
  }

  componentDidMount() {
    //this.props.showUser();

    this.setState({first_name:this.props.account.first_name});
    this.setState({last_name:this.props.account.last_name});
    this.setState({email:this.props.account.email});
    this.setState({password:this.props.account.password});
    this.setState({country:this.props.account.country});
    this.setState({state:this.props.account.state});
    this.setState({pais:this.props.account.pais});
    this.setState({prov:this.props.account.prov});
  }


  saveData = () => {
    return () => {

      //pais:this.props.account.pais,prov:this.props.account.prov
      this.props.dispatch( Account.Save({first_name:this.state.first_name,last_name:this.state.last_name,country:this.props.account.country,state:this.props.account.state, favorites:this.props.account.favorites, registered:this.props.account.registered}) );

      // guardar en base de datos
      this.props.dispatch( Account.Update({id:this.props.account._id,first_name:this.state.first_name,last_name:this.state.last_name,password:this.state.password,country:this.props.account.country,state:this.props.account.state, favorites:this.props.account.favorites, registered:this.props.account.registered}, this.props.account.token ));
    }
  };

  onFacebookLogin = () => {

    this.props.dispatch( Account.Login() ).then(
      (ok) => {
        this.setState({first_name:this.props.account.first_name});
        this.setState({last_name:this.props.account.last_name});
        this.setState({email:this.props.account.email});

      }, (error) => {
        console.log(error);
      }

    );

  };

  onFacebookLogout = () => {
    //this.props.Logout();
    this.props.dispatch( Account.Logout() );
    this.props.navigator.popToTop();

  };

  showType = (distance) => {
    let d = 0;

    distance = d;
    return distance <= 9.99 ?  '#enjoyer' :
           distance <= 20.99 ? '#sporty' :
           distance <= 41.99 ? '#athlete' : '#superhero'

  };

  render() {
    let pic = {
      uri: require('../../assets/img/run.png')
    };
    let picArrowBack = {
      uri: require('../../assets/img/arrowBack.png')
    };
    let avatar_img = {
        uri: require('../../assets/img/avatar_img.png')
    };
    let edit = {
      uri: require('../../assets/img/edit.png')
    };
    let fbicon = {
      uri: require('../../assets/img/socialfacebook.png')
    };

    return (

      <View style={styles.wrapper}>

      <Components.Headersimple style={styles.headersimple} title={I18n('Mi Cuenta')} navigator={this.props.navigator} />
        <ScrollView>
          <View style={styles.box1}>
            <View style={styles.userImage}>
              <View style={styles.boxUserData}>
                <Text style={styles.userDataName}>{this.props.account.first_name}</Text>
                <Text style={styles.userDataLoc}>{this.props.account.state ? this.props.account.state+"," : null } {this.props.account.country ? this.props.account.country+"." : null}</Text>
              </View>
              <View style={styles.cntImage}>

              { this.props.account.picture ? <Image style={styles.imgProfile} source={{uri:this.props.account.picture}} /> : <Image style={styles.imgProfile} source={pic.uri} /> }

                <Image style={styles.imgMask} source={avatar_img.uri} />
              </View>
              <View style={styles.cntUser}>
                <Text style={styles.txtUser}>
                  {this.showType()}
                </Text>
              </View>
            </View>
            <View style={styles.cntCols}>
              <View style={styles.col}>
                {/*
                <Text style={styles.txtCol}>Seguidores</Text>
                <Text style={styles.txtCol}>0</Text>
                */}
              </View>
              <View style={styles.col}>
                <Text style={styles.txtCol}>{I18n('Carreras')}</Text>
                <Text style={styles.txtCol}>{this.props.account.registered.length ? this.props.account.registered.length : "0"}</Text>
              </View>
              <View style={styles.col}>
                {/*
                <Text style={styles.txtCol}>Seguidos</Text>
                <Text style={styles.txtCol}>0</Text>
                */}
              </View>
            </View>
          </View>

          <View style={styles.box2}>
            <View style={styles.item} >
              <Text style={styles.itemLabel}>{I18n('Nombre')}:</Text>
                <TextInput
                   style={styles.form__input}
                   placeholder=''
                   returnKeyType='next'
                   placeholderTextColor='#1e1126'
                   underlineColorAndroid='transparent'
                   onFocus={() => { }}
                   onBlur={() => { }}
                   onChangeText={(first_name) => { this.setState({first_name}) }}
                   value={this.state.first_name}
                   blurOnSubmit={false}
                 />
            </View>
            <View style={styles.item} >
              <Text style={styles.itemLabel}>{I18n('Apellido')}:</Text>
                <TextInput
                   style={styles.form__input}
                   placeholder=''
                   returnKeyType='next'
                   placeholderTextColor='#1e1126'
                   underlineColorAndroid='transparent'
                   onFocus={() => { }}
                   onBlur={() => { }}
                   onChangeText={(last_name) => { this.setState({last_name}) }}
                   value={this.state.last_name}
                   blurOnSubmit={false}
                 />
            </View>
            <View style={styles.item} >
              <Text style={styles.itemLabel}>Email:</Text>
              <TextInput
                 style={styles.form__input}
                 placeholder=''
                 returnKeyType='next'
                 placeholderTextColor='#1e1126'
                 underlineColorAndroid='transparent'
                 onFocus={() => { }}
                 onBlur={() => { }}
                 onChangeText={(email) => { this.setState({email}) }}
                 value={this.state.email}
                 blurOnSubmit={false}
               />
            </View>
            <View style={styles.item} >
              <Text style={styles.itemLabel}>{I18n('Pais')}:</Text>
              <TouchableOpacity style={styles.btnPais} onPress={() => this.props.navigator.push({ screen: "Paisaccount" })} ><Text style={styles.lblBtn}>{this.props.account.country ? this.props.account.country : "Elegir Pais"}</Text></TouchableOpacity>
            </View>
            <View style={styles.item} >
              <Text style={styles.itemLabel}>{I18n('Provincia')}:</Text>
              <TouchableOpacity style={styles.btnPais} onPress={() => this.props.navigator.push({ screen: "Provaccount" })} ><Text style={styles.lblBtn}>{this.props.account.state ? this.props.account.state : "Elegir Provincia"}</Text></TouchableOpacity>
            </View>

            <View style={styles.itemBorderTop} >
              <Text style={styles.itemLabel2}>{ this.props.account.logged_in ? I18n('Desconectar') : I18n('Conectar') } </Text>
              <View style={styles.colflex}>
              {this.props.account.logged_in ?
                <TouchableOpacity style={styles.btnCustom} onPress={this.onFacebookLogout} ><Image style={styles.imgfb} source={fbicon.uri} /></TouchableOpacity>:
                <TouchableOpacity style={styles.btnCustom} onPress={this.onFacebookLogin} ><Image style={styles.imgfb} source={fbicon.uri} /></TouchableOpacity> }
              </View>
            </View>

            <View style={styles.itemBorderTop}>
              <TouchableOpacity onPress={()=>{ Linking.openURL('mailto:hola@runnify.com?Subject=Contacto desde Runnify'); }}>
                <Text style={styles.itemLabel2}>{I18n('Contactenos')} </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        <View style={styles.footerOptions}>
          <View style={styles.btnFooter}>
            <Text style={styles.btnText}></Text>
          </View>
          <TouchableOpacity style={styles.btnFooter} onPress={this.saveData()} >
            <View style={styles.btnFooter}>
              <Text style={styles.btnText}>{I18n('Guardar')}</Text>
            </View>
          </TouchableOpacity>
        </View>

      </View>
    );
  }
}


const Container = connect(store => ({ account:store.account }) )( MyAccount );
export default Container;


const styles = StyleSheet.create({
    lblBtn:{color:'#1e1126',fontSize:20},
    cntCols:{flexDirection:'row'},
    colDer:{alignItems:'flex-end'},
    col:{flex:1,marginTop:30},
    txtCol:{color:'#ffffff',fontSize:16,textAlign:'center'},
    boxUserData:{alignItems: 'center'},
      userDataName:{color:'#ffffff',fontSize:18},
      userDataLoc:{color:'#ffffff',fontSize:16,opacity:0.8},
    itemFlexDir:{flexDirection:'row'},
    colflex:{flex:1},
    widthFix:{width:50},
    itemSubLabel:{flexDirection:'row'},
  itemLabel2:{fontSize:20,color:'#311833',flex:1},
  itemLabel:{fontSize:14,color:'#9b9b9b'},
  imgBackground:{
    flex: 1,
    resizeMode: 'cover',
    alignSelf: 'stretch',
    width: null,
  },

  footerOptions:{
    height: 50,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#efefef',
    backgroundColor: '#f5f5f5'
  },

  btnFooter:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5'
  },

  form__input:{
    fontSize: 20,
    height:30
  },

  container: {
    flex: 1
  },
  backBar:{
    flexDirection: 'row',
    paddingTop: Platform.OS == 'android' ? 24 : 20,
    height: Platform.OS == 'android' ? 68 : 64,
  },
  backBarBtn:{
    flexDirection: 'row',
    justifyContent: 'center'
  },
  arrowBack:{
    width:30,
    color:'#cccccc'
  },
  titleBack:{
    color:'#333333'
  },
  userImage:{
    alignItems: 'center',marginTop:35
  },
  cntUser:{alignItems: 'center'},
  txtUser:{fontSize:16,color:'#21e4d5',opacity:0.8,marginTop:10},
  cntImage:{
    borderStyle: 'dotted',
    overflow:'hidden',
    width:100,
    height:100,
    marginTop:10
  },
  btnCustom:{
    alignItems:'flex-end'
  },
  imgfb:{
    marginRight:5
  },
  imgProfile:{
    width:100,
    height:100
  },
  imgMask:{
      width:100,
      height:100,
      marginTop:-100
  },
  imgEdit:{
    marginTop:30,marginLeft:20
  },
  box1:{
    height:330,
    alignItems: 'center',
    backgroundColor:'#510c80'
  },
  box2:{
    flex: 1
  },
    itemBorderTop:{
        flexDirection:'row',
        paddingTop:15,
        paddingBottom:10,
        paddingLeft:10,
        paddingRight:10,
        borderTopWidth: 1,
        borderTopColor: '#979797'
    },
    itemFlexRow:{
        flexDirection:'row',
        paddingTop:15,
        paddingBottom:10,
        paddingLeft:10,
        paddingRight:10},
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
