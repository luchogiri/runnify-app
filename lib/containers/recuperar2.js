
// @flow

import React, { Component } from 'react';
//import { connect } from 'react-redux';

import I18n from '../helpers/i18n';
import * as Components from '../components';
//import User from '../actions/user';

import {

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


export default class Recuperar2 extends Component {

    constructor(props) {
        super(props);
        this.state = { user: '', pass: '' };
    }

    saveData(){

        //console.log("CLICK INICIAR SESION");

        return () => {

        }
    }

    render() {

        return (

            <View style={styles.wrapper}>
                <Image style={styles.imgBackground} source={require('../../assets/img/main-bg.jpg')}>
                    <View style={styles.boxGoback} >
                        <TouchableOpacity style={styles.goback} onPress={this.props.navigator.pop} >
                            <Image style={styles.imgGoBack} source={require('../../assets/img/line.png')} />
                        </TouchableOpacity>
                    </View>
                    {/*<ScrollView>*/}
                        <View style={styles.form}>
                            <View style={styles.item} >
                                <Text style={styles.txtTitle}>{I18n('Olvide mi contraseña')}</Text>
                                <Text style={styles.txtSubTitle} >{I18n('Te enviamos un email a')} {this.props.username} {I18n('con los pasos a seguir para recuperarla.')}</Text>
                            </View>
                            
                            <TouchableOpacity style={styles.btn} >
                                <Text style={styles.btnLogin}>{I18n('Continuar')}</Text>
                            </TouchableOpacity>
                            
                            <TouchableOpacity style={styles.btn} >
                                <View style={styles.borde}>
                                    <Text style={styles.btnEmail}>{I18n('Reenviar e-mail')}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    {/*</ScrollView>*/}

                </Image>

            </View>
        );
    }
}


let {height, width} = Dimensions.get('window');
var styles = StyleSheet.create({
    hr:{borderBottomWidth:2,borderBottomColor:'#e1e1e1',width:340,height:50},
    imgBackground:{
        flex: 1,
        resizeMode: 'cover',
        alignSelf: 'stretch',
        width: null,
    },
    boxGoback:{alignItems:'flex-end'},
    goback:{flex:1,marginTop:40,marginRight:15},
    imgGoBack:{},
    form:{
        alignItems:'center',marginTop:120, flex: 1
    },
    borderBottom:{borderBottomWidth:2,borderBottomColor:'#e1e1e1'},
    txtTitle:{ fontSize:26,color:'#ffffff',textAlign:'center',width:300 },
    txtSubTitle:{fontSize:16,color:'#ffffff',height:50,textAlign:'center',opacity:0.8,width:300,marginTop:40},
    rowBtns:{flexDirection:"row",marginTop:40},
    btn1:{flex:1,marginLeft:27},
    btn2:{flex:1},
    itemFacebook:{width:140,height:54,borderRadius:5,borderWidth:2,borderColor:'#cccccc',textAlign:'center'},
    textFacebook:{color:'#ffffff',textAlign:'center',marginTop:12,fontSize:16},
    itemCreateAcount:{width:140,height:54,borderRadius:5,borderWidth:2,borderColor:'#cccccc',textAlign:'center'},
    textCreateAcount:{ color:'#ffffff',textAlign:'center',marginTop:12,fontSize:16},
    item:{
        width:300,height:54
    },
    form__input:{
        fontSize:16,marginTop:38,height:40,color:'#ffffff',width:248
    },
    forgot:{
        textAlign:'center',marginTop:20
    },
    txtForgot:{
        fontSize:16,color:'#ffffff'
    },
    borde:{borderWidth:2,borderColor:'#ffffff',borderRadius:3,marginTop:10, flex: 1,height:44, marginRight:55,marginLeft:55},
    btn:{textAlign:'center',flexDirection: 'row'},
    btnLogin:{marginTop:100,textAlign:'center',backgroundColor:'#ffffff',borderRadius:10,color:'#532880',fontSize:16,paddingTop:10,paddingBottom:10,flex:1,marginLeft:55,marginRight:55},
    btnEmail:{textAlign:'center',color:'#ffffff',fontSize:16,paddingTop:10,paddingBottom:10,flex:1},
    wrapper: {
        flex: 1,
        // paddingTop: Platform.OS == 'android' ? 24 : 20,
    }


});
