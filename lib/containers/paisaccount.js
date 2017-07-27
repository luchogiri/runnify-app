// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';

import I18n from '../helpers/i18n';
import * as Components from './index';
import Config from '../actions/config';
import Account from '../actions/account';

import {

  Text,
  View,
  ListView,
  Image,
  TouchableOpacity,
  Platform,
  Dimensions,
  StyleSheet,

} from 'react-native';


class Paisaccount extends Component {

  constructor(props: Object) {
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  }

  _onCountrySelected(country) {
    return () => {
      //this.props.updateCountryAccount(country);
      this.props.dispatch( Account.Save({country:country}) );
      this.props.navigator.pop();
    }
  }


  render() {
    return (
      <View style={styles.wrapper}>
        <View style={styles.wrapper}>

          <View style={styles.close}>
            <View style={styles.heading}>
              <TouchableOpacity style={styles.btn} onPress={this.props.navigator.pop} >
                <Image source={require('../../assets/img/icon-close.png')} style={styles.imgClose} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.boxFilters}>

            <ListView
              dataSource={this.ds.cloneWithRows(this.props.config.countries)}
              renderRow={(rowData) => {
                return (
                  <View style={styles.rowPais}>
                    <TouchableOpacity style={styles.touchPais} onPress={this._onCountrySelected(rowData.name)}>
                      <View style={styles.nomPais}>
                        <Text style={styles.txtPais}>{rowData.name}</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
              )}}

            />

          </View>

        </View>

      </View>
    );
  }
}

const Container = connect(store => ({config: store.config,account:store.account}) )(Paisaccount);
export default Container;

let {height, width} = Dimensions.get('window');
var styles = StyleSheet.create({

  container: {
    flex: 1
  },
  imgClose:{
      width:30,height:30,marginLeft:10
  },
  rowPais:{
    paddingTop:10,
    paddingBottom:10,
    paddingLeft:10,
    paddingRight:10,
  },
  touchPais:{
    flexDirection: 'row',
  },
  nomPais:{
    flex:1,
    justifyContent: 'center',
  },
  checkPais:{
    width:64,
    justifyContent: 'center',
    // textAlign: 'center'
  },
  close:{
    flexDirection: 'row',
    paddingTop: Platform.OS == 'android' ? 24 : 20,
    height: Platform.OS == 'android' ? 68 : 64,
  },
  txtPais:{
    color:'#ffffff',
    fontSize:16
  },


  headerTitle:{
    position:'absolute',
    top:15,
    left:10,
    fontSize: 18,
    fontWeight: 'bold',
    color:'#ffffff'
  },
  heading:{
    flex:1,
    alignItems:'flex-end'
  },
  btn:{
    width:50,marginTop:10
  },

  btnFiltros:{
    flexDirection: 'row',
    flex:1
  },

  closetext:{
    flexDirection: 'row',
    flex:1,
    textAlign:"right",
    fontSize: 24,
    paddingRight: 10,
    paddingTop:5
  },

  boxFilters:{
    flex:1
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

  rowFilter:{
    flex:1,
    flexDirection: 'row',
    marginBottom: 10,
    paddingTop: 10,
    borderBottomWidth: 2,
    borderStyle:'dotted',
    borderBottomColor: '#efefef'
  },

  textFilter:{
    fontSize: 20,
    fontWeight: 'bold',
    paddingLeft:20,
    color: '#000000'
  },

  textValue:{
    fontSize: 16,
    color: '#cccccc'
  },

  wrapper: {
    flex: 1,
    backgroundColor:'#510c80'
    // paddingTop: Platform.OS == 'android' ? 24 : 20,
  }

});
