// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Text, View, ListView, ScrollView, Platform, Dimensions, RefreshControl, TouchableOpacity, Image, StyleSheet } from 'react-native';


import I18n from '../helpers/i18n';
import * as Components from '../components';
import Account from '../actions/account';



const checkType = (distance) => {
  return distance == '42-200'   ? 'SUPERHERO' :
         distance == '21-41.99' ? 'ATHLETE' :
         distance == '10-20.99' ? 'SPORTY' :
                                  'ENJOYER';
};


class Alerts extends Component {

  state: Object;
  ds: Object;

  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = { alerts: [], refreshing: false };
  }

  componentDidMount() {
    this.retrieveAlerts();
  }


  retrieveAlerts = () => {
    this.setState({ refreshing: true });
    this.props
      .dispatch( Account.RetrieveAlerts( this.props.account.token ) )
      .then(
        data => { this.setState({ refreshing: false, alerts: data }); },
        err => { this.setState({ refreshing: false }); }
      );
  };

  check = (idx) => {
    return () => {
      let alert = this.state.alerts[idx];
      alert.checked = !alert.checked;
      this.setState({ alerts : this.state.alerts });
    };
  };

  checked = () => {
    return this.state.alerts.filter( a => a.checked ).length;
  };

  onDelete = () => {
    this.state.alerts
      .filter( a => a.checked )
      .forEach(a => this.props.dispatch( Account.DeleteAlert( a, this.props.account.token ) ));
    this.setState({ alerts: this.state.alerts.filter( a => !a.checked ) })
  };

  render() {
    return (

      <View style={styles.wrapper}>
        <Components.HeaderView navigator={this.props.navigator} right={this.checked()? ['delete']: []} onDelete={this.onDelete} />

        <View style={styles.wrapper}>

          {!this.state.alerts.length &&
            <View style={styles.empty}>
              <Image source={require('../../assets/img/placeholder-alerts.png')} />
              <Text style={styles.empty_text}>{I18n('¡Todavía no creaste ningún alerta!')}</Text>
            </View>}

          <ListView
            dataSource={this.ds.cloneWithRows(this.state.alerts)}
            refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.retrieveAlerts} />}
            renderRow={(data, section, i) => {
              let query = JSON.parse(data.query.replace(/'/g, '"'));
              let description = I18n('Carreras ');
              if (query.search) description += query.search;
              else description += '#' + checkType(query.query.distance);

              return (
                <View style={styles.row}>
                  <TouchableOpacity style={styles.row_check} onPress={this.check(i)}>
                    {data.checked ?
                      <Image source={require('../../assets/img/icon-check-checked.png')} />:
                      <Image source={require('../../assets/img/icon-check-unchecked.png')} />}
                  </TouchableOpacity>
                  <Text style={styles.row_text}>{description}</Text>
                </View>
              )}}
          />
        </View>
      </View>
    );
  }
}


const Container = connect(store => ({ account:store.account }) )( Alerts );
export default Container;


const styles = StyleSheet.create({

  wrapper: {
    flex: 1,
    backgroundColor: '#f4f4f4'
  },

    empty: {
      flex: 1,
      alignItems: 'center',
      marginTop: 100
    },
      empty_text: {
        marginTop: 24,
        color: '#9b9b9b',
        textAlign: 'center',
        fontSize: 16,
      },

  row: {
    height: 52,
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc'
  },

    row_check: {
      width: 52,
      alignItems: 'center',
      justifyContent: 'center'
    },

    row_text: {
      color: '#4a4a4a'
    }

});
