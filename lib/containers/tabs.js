// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as Components from '../components';
import * as Containers from '../containers';

import { Text, View, StatusBar, Platform, Dimensions, StyleSheet } from 'react-native';



class Tabs extends Component {


  constructor(props: Object) {
    super(props);
  }

  componentDidMount() {
    !this.props.account.logged_in ?
      setTimeout( () => { this.props.navigator.push({ screen: 'Login' }); }, 1500): null;
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <Components.Tabbar style={styles.container}>
          <Components.Tabbar.Item
            icon={require('../../assets/img/icon-tabbar-home-i.png')}
            iconon={require('../../assets/img/icon-tabbar-home-a.png')}>
            <Containers.Home navigator={this.props.navigator} />
          </Components.Tabbar.Item>

          <Components.Tabbar.Item
            icon={require('../../assets/img/icon-tabbar-alerts-i.png')}
            iconon={require('../../assets/img/icon-tabbar-alerts-a.png')}>
            <Containers.Alerts navigator={this.props.navigator} />
          </Components.Tabbar.Item>

          <Components.Tabbar.Item
            icon={require('../../assets/img/icon-tabbar-favorites-i.png')}
            iconon={require('../../assets/img/icon-tabbar-favorites-a.png')}>
            <Containers.Favorites navigator={this.props.navigator} />
          </Components.Tabbar.Item>

          <Components.Tabbar.Item
            icon={require('../../assets/img/icon-tabbar-profile-i.png')}
            iconon={require('../../assets/img/icon-tabbar-profile-a.png')}>
            <Containers.Profile navigator={this.props.navigator} />
          </Components.Tabbar.Item>
        </Components.Tabbar>
      </View>
    );
  }
}


const Container = connect(store => ({ account:store.account }) )( Tabs );
export default Container;


let {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({

  wrapper: {
    flex: 1,
    backgroundColor: 'white'
  },

    container: {
      position: 'absolute',
      left: 0,
      top: 0,
      height: height,
      width: width
    },


});
