
// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';

import I18n from '../helpers/i18n';
import * as Components from '../components';
import User from '../actions/_user';

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


class CambiarPass extends Component {

    constructor(props) {
        super(props);
        this.state = { name: '', mostrar1: true, mostrar2: true, mostrar3: true, pass2:"", pass3:"" };

        this.mostrar1 = this.mostrar1.bind(this);
        this.mostrar2 = this.mostrar2.bind(this);
        this.mostrar3 = this.mostrar3.bind(this);

    }

    mostrar1(){
        this.setState({mostrar1: !this.state.mostrar1})
    }

    mostrar2(){
        this.setState({mostrar2: !this.state.mostrar2})
    }

    mostrar3(){
        this.setState({mostrar3: !this.state.mostrar3})
    }

    render() {
        let pic = {
            uri: require('../../assets/img/run.png')
        };

        return (


            <View style={styles.wrapper}>

                <Components.Headersimple style={styles.headersimple} title={I18n('Mi Cuenta')} navigator={this.props.navigator} />
                <ScrollView>

                    <View style={styles.box2}>
                        <View style={styles.item} >
                            <View style={styles.label}>
                                <Text style={styles.itemLabel}>{I18n('Contraseña Actual')}:</Text>
                            </View>
                            <View style={styles.columns}>
                                <View style={styles.colLeft}>
                                    <TextInput
                                        style={styles.form__input}
                                        placeholder=''
                                        returnKeyType='next'
                                        secureTextEntry={this.state.mostrar1}
                                        placeholderTextColor='#1e1126'
                                        underlineColorAndroid='transparent'
                                        onFocus={() => { }}
                                        onBlur={() => { }}
                                        onChangeText={(password) => { this.setState({password}) }}
                                        value={this.state.password}
                                        blurOnSubmit={false}
                                    />
                                </View>
                                <View style={styles.colDer}>
                                    <TouchableOpacity onPress={this.mostrar1}><Text style={styles.txtMostrar}>{I18n('MOSTRAR')}</Text></TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        <View style={styles.item} >
                            <View style={styles.label}>
                                <Text style={styles.itemLabel}>{I18n('Nueva Contraseña')}:</Text>
                            </View>
                            <View style={styles.columns}>
                                <View style={styles.colLeft}>
                                    <TextInput
                                        style={styles.form__input}
                                        placeholder=''
                                        returnKeyType='next'
                                        secureTextEntry={this.state.mostrar2}
                                        placeholderTextColor='#1e1126'
                                        underlineColorAndroid='transparent'
                                        onFocus={() => { }}
                                        onBlur={() => { }}
                                        onChangeText={(pass2) => { this.setState({pass2}) }}
                                        value={this.state.pass2}
                                        blurOnSubmit={false}
                                    />
                                </View>
                                <View style={styles.colDer}>
                                    <TouchableOpacity onPress={this.mostrar2}><Text style={styles.txtMostrar}>{I18n('MOSTRAR')}</Text></TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        <View style={styles.item} >
                            <View style={styles.label}>
                                <Text style={styles.itemLabel}>{I18n('Repetir Contraseña')}:</Text>
                            </View>
                            <View style={styles.columns}>
                                <View style={styles.colLeft}>
                                    <TextInput
                                        style={styles.form__input}
                                        placeholder=''
                                        returnKeyType='next'
                                        secureTextEntry={this.state.mostrar3}
                                        placeholderTextColor='#1e1126'
                                        underlineColorAndroid='transparent'
                                        onFocus={() => { }}
                                        onBlur={() => { }}
                                        onChangeText={(pass3) => { this.setState({pass3}) }}
                                        value={this.state.pass3}
                                        blurOnSubmit={false}
                                    />
                                </View>
                                <View style={styles.colDer}>
                                    <TouchableOpacity onPress={this.mostrar3}><Text style={styles.txtMostrar}>{I18n('MOSTRAR')}</Text></TouchableOpacity>
                                </View>
                            </View>
                        </View>

                    </View>
                </ScrollView>

            </View>
        );
    }
}

const Container = connect(store => store.user)( CambiarPass );
export default Container;

let {height, width} = Dimensions.get('window');
var styles = StyleSheet.create({

    item:{borderBottomWidth:2,borderBottomColor:'#510c80',marginLeft:20,marginRight:20,marginTop:20},
    itemLabel:{color:'#510c80'},
    label:{},
    columns:{flexDirection:'row'},
    colLeft:{flex:1},
    form__input:{textAlign:'left',flexDirection:'row',fontSize:18,height:30,marginTop:10},
    colDer:{width:90},
    txtMostrar:{marginTop:20,color:'#3f006d',fontSize:18},
    wrapper: {
        flex: 1,
        backgroundColor:'#ffffff'
        // paddingTop: Platform.OS == 'android' ? 24 : 20,
    }

});
