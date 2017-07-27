
// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';

import I18n from '../helpers/i18n';
import * as Components from '../components';
import User from '../actions/_user';
import Account from '../actions/account';
import AccountService from '../services/account';

import {
  Alert,
  Text,
  TextInput,
  View,
  ScrollView,
  Image,
  Platform,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Switch,

} from 'react-native';


class Runner extends Component {

  constructor(props) {
    super(props);
    this.state = { runner: this.props.data };
  }

  componentDidMount() {
    console.log("props data:");
    console.log(this.props.data._id);
    //console.log("ID: "+this.props.data._id);
    //{id:this.props.data._id}
    /*
    AccountService.GetRunner( {id:this.props.data._id},this.props.account.token ).then(
      (runner) => {

        this.setState({ runner: runner });
        //console.log("runner!");
        //console.log(this.state.runner);

      } , (error) => {

        console.log(error);

      });
      */
  }

  follow = (runner:Object) => {
    return () => {
        this.props.dispatch(Account.SaveRunner({_id:runner._id},this.props.account.token)).then( (fila) => {
          console.log("Agregado a Runners");
        }, (error) => {
          console.log("Error al agregar a runners");
        });
    }
  }

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

      <Components.Headersimple style={styles.headersimple} title="Runner" navigator={this.props.navigator} />
        <ScrollView>
          <View style={styles.box1}>
              <View style={styles.userImage}>
                  <View style={styles.boxUserData}>
                    <Text style={styles.userDataName}>{this.state.runner.first_name}</Text>
                    <Text style={styles.userDataLoc}>{this.state.runner.state ? this.state.runner.state+"," : null } {this.state.runner.country ? this.state.runner.country+"." : null}</Text>
                  </View>
                  <View style={styles.cntImage}>

                  { this.state.runner.picture ? <Image style={styles.imgProfile} source={{uri:this.state.runner.picture}} /> : <Image style={styles.imgProfile} source={pic.uri} /> }

                    <Image style={styles.imgMask} source={avatar_img.uri} />
                  </View>
                  <View style={styles.cntUser}>
                    <Text style={styles.txtUser}>
                      #enjoyer
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
                    <Text style={styles.txtCol}>{this.state.runner.registered.length ? this.state.runner.registered.length : "0"}</Text>
                  </View>
                  <View style={styles.col}>
                    {/*
                    <Text style={styles.txtCol}>Seguidos</Text>
                    <Text style={styles.txtCol}>0</Text>
                    */}
                  </View>
              </View>
          </View>
        </ScrollView>

        <View style={styles.footerOptions}>
          <View style={styles.btnFooter}>
            <Text style={styles.btnText}></Text>
          </View>

          <TouchableOpacity style={styles.btnFooter} onPress={this.follow(this.state.runner)}>
            <View style={styles.btnFooter}>
              <Text style={styles.btnText}>{ ( this.state.runner._id == this.props.account._id) ? I18n('Eres tu') : I18n('Seguir') }</Text>
            </View>
          </TouchableOpacity>

        </View>

      </View>
    );
  }
}


const Container = connect(store => ({user:store.user,account:store.account}) )(Runner);
export default Container;

let {height, width} = Dimensions.get('window');
var styles = StyleSheet.create({
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
