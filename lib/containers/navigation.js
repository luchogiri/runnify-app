// @flow

import React, { Component } from 'react';
import { Navigator, StyleSheet, BackAndroid } from 'react-native';

import * as Containers from '../containers';


class AppNavigation extends Component {

  constructor(props: Object) {
    super(props);
    this._handlers = [];
  }
  
  render() {
    return (
      <Navigator
        ref="navigator"
        style={styles.container}
        initialRoute={{ screen: "Main" }}
        renderScene={this.renderScene}
        configureScene={(route) => {
          if (route.screen == 'Login') return Navigator.SceneConfigs.FloatFromBottom;
          return Navigator.SceneConfigs.FloatFromRight
        }}
      />
    );
  }
  
  renderScene = (route: Object, navigator: Navigator) => {
    navigator.screen = (screen, props = {}) => { return () => { return navigator.push({ screen, ...props }); } };
    let { screen, ...props } = route;
    let Component = Containers[screen];
    return <Component navigator={navigator} {...props} />;
  };


  // -------------------------------
  // other stuff to back for android
  componentDidMount = () => { BackAndroid.addEventListener('hardwareBackPress', this.handleBackButton); };
  componentWillUnmount = () => { BackAndroid.removeEventListener('hardwareBackPress', this.handleBackButton); };
  getChildContext = () => { return { addBackButtonListener: this.addBackButtonListener, removeBackButtonListener: this.removeBackButtonListener, };};
  addBackButtonListener = (listener:Object) => { this._handlers.push(listener); };
  removeBackButtonListener = (listener:Object) => { this._handlers = this._handlers.filter((handler) => handler !== listener); };
  handleBackButton = () => { for (let i = this._handlers.length - 1; i >= 0; i--) { if (this._handlers[i]()) return true; } if (this.refs.navigator && this.refs.navigator.getCurrentRoutes().length > 1) { this.refs.navigator.pop(); return true; } return false; };
  // ---------------------------------
}

AppNavigation.childContextTypes = { addBackButtonListener: React.PropTypes.func, removeBackButtonListener: React.PropTypes.func };
export default AppNavigation;

// styles
const styles = StyleSheet.create({

  container: {
    flex: 1
  }
});