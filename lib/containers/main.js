// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet, LayoutAnimation } from 'react-native';

import I18n from '../helpers/i18n';

import Config from '../actions/config';
import Events from '../actions/events';
import * as Containers from '../containers';



class Main extends Component {
  
  constructor(props:Object) {
    super(props);
    this.state = { complete: false, error: false };
  }
  
  componentDidMount() {
    this.retrieveConfig();
    this.retrieveGeo();
  }

  componentWillUpdate() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }

  retrieveConfig = () => {
    this.setState({ complete: false, error: false});
    this.props
      .dispatch( Config.Retrieve() )
      .then( this.onConfigReceived, this.onConfigError );
  };

  onConfigError = () => {
    this.setState({ complete: false, error: true });
  };
  
  onConfigReceived = () => {
    this.setState({ complete: true, error: false});
  };

  retrieveGeo = () => {
    navigator.geolocation.getCurrentPosition((geo) => {
      if (geo && geo.coords)
        this.props.dispatch( Events.UpdateFilters({ ...this.props.events, query: { ...this.props.events.query, lat_lng: geo.coords.latitude+','+geo.coords.longitude }}));
    });
  };
  
  
  render() {
    
    let content = null;
    
    if (this.state.error) {
      content = <View style={styles.content}>
                  <Text style={styles.loading__text}>{I18n('Ha ocurrido un problema de conexión')}</Text>
                  <Text style={styles.loading__text} onPress={this.retrieveConfig}>{I18n('reintentar')}</Text>
                </View>;
    }
    
    else if (this.state.complete && this.props.config.show_onboarding) {
      content = <Containers.OnBoarding navigator={this.props.navigator} />;
    }
    
    else if (this.state.complete && !this.props.config.show_onboarding) {
      content = <Containers.Tabs navigator={this.props.navigator} />
    }

    else {
      content = <View style={styles.content}>
                  <Text style={styles.loading__text}>...</Text>
                </View>;
    }
    
    return (
      <View style={styles.wrapper}>{content}</View>
    );
  }
}



const Container = connect(store => store)( Main );
export default Container;

const styles = StyleSheet.create({
  
  wrapper: {
    flex: 1
  },
  
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 50
  },
  
  loading__text: {
    color: '#ffffff',
    fontSize: 16,
    marginTop: 8,
    textAlign: 'center',
    backgroundColor: 'transparent'
  }
});
