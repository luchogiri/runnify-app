// @flow

import React, { Component } from 'react';
import { Provider } from 'react-redux';

import Store from './reducers/store';
import Navigation from './containers/navigation';

import { Text, View, Image, StatusBar, StyleSheet, LayoutAnimation, UIManager } from 'react-native';


(console: Object).disableYellowBox = true;
UIManager.setLayoutAnimationEnabledExperimental &&
UIManager.setLayoutAnimationEnabledExperimental(true);



export default class Application extends Component {

  state: Object;
  mounted: Boolean;
  received: Boolean;


  constructor() {
    super();
    this.mounted = this.received = false;
    this.state = { loading: true, store : Store(this.storeDidLoad)};
  }

  componentWillUpdate() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }

  componentDidMount() {
    if (this.received) this.setState({ loading: false });
    this.mounted = true;
  }

  storeDidLoad = () => {
    if (this.mounted) this.setState({ loading: false });
    this.received = true;
  };

  render() {
    return (
      <Provider store={this.state.store}>
        <View style={styles.wrapper}>
          <StatusBar translucent={true} barStyle="light-content" backgroundColor="rgba(0,0,0,0.25)" />
          {!this.state.loading ? <Navigation ref="nav" />:null}
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'rgb(35,13,74)'
  }
});
