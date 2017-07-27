// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';


import { Text, View, ScrollView, ListView, Image, RefreshControl, Platform, TouchableOpacity, StyleSheet } from 'react-native';

import I18n from '../helpers/i18n';
import Account from '../actions/account';


const checkType = (distance) => {
  return distance > 41.99 ? 'SUPERHERO' :
         distance > 20.99 ? 'ATHLETE' :
         distance > 9.99 ?  'SPORTY' :
                            'ENJOYER';
};


class Registered extends Component {

  state: Object;
  ds: Object;

  constructor(props) {
    super(props);
    this.state = { refreshing: false, registered: [] };
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2});
  }

  componentDidMount() {
    this.retrieveRegistered();
  }

  retrieveRegistered = () => {
    this.props
      .dispatch( Account.RetrieveRegistered( this.props.account.token ))
      .then(this.onRetrieved, this.onError);
  };

  onRetrieved = (data) => {
    this.setState({ registered: data.map(r => r.event), refreshing: false });
  };

  onError = (err) => {
    this.setState({ refreshing: false });
    // console.log(err);
  };



  render() {

    return (
      <View style={styles.wrapper}>

        <View style={styles.header}>
          <TouchableOpacity style={styles.back} onPress={this.props.navigator.pop}>
            <Image source={require('../../assets/img/icon-header-back.png')} style={styles.back_img} />
          </TouchableOpacity>
        </View>

        <View style={styles.wrapper}>

          {!this.state.registered.length &&
          <View style={styles.empty}>
            <Image source={require('../../assets/img/placeholder-results.png')} />
            <Text style={styles.empty_text}>{I18n('Aun no tienes carreras guardadas.')}</Text>
            <Text style={styles.empty_text}>{I18n('Guárdalas haciendo click en el botón')}</Text>
            <Text style={[styles.empty_text, {marginTop: 8}]}>{I18n('"Asistiré" que figura en el evento.')}</Text>
          </View>}

          <ListView
            removeClippedSubviews={false}
            dataSource={this.ds.cloneWithRows(this.state.registered)}
            refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.retrieveRegistered} />}
            renderRow={ (data,rowId, index) => (
            <View style={[styles.row, index%2? styles.row_dark: null]}>
              <TouchableOpacity style={styles.row_description} onPress={this.props.navigator.screen('Event', { data })}>
                <Text style={styles.row_text}>{data.name}</Text>
                <Text style={styles.row_subtext}>
                  {data.state} -&nbsp;
                  {moment(data.start_date).format('D')} {I18n(moment(data.start_date).format('MMM'))}</Text>
              </TouchableOpacity>
              <Text style={[styles.row_number, styles[checkType(data.activities[0].disciplines[0].distance)]]}>
                {data.activities[0].disciplines[0].distance}
                {data.activities[0].disciplines[0].distance < 1? 'M':'K'}
              </Text>
            </View>
            )}
          />
        </View>
      </View>
    );
  }
}

const Container = connect(store => ({ events:store.events, account:store.account }) )( Registered );
export default Container;

const styles = StyleSheet.create({

  wrapper: {
    flex: 1,
    backgroundColor:'#ffffff'
  },

  header: {
    height: Platform.OS == 'android' ? 74 : 70,
    paddingTop: Platform.OS == 'android' ? 24 : 20,
    backgroundColor:'#510c80',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 12,
  },
    back: {
      width: 32,
      height: 32,
      alignItems: 'center',
      justifyContent: 'center'
    },
      back_img: {
        height: 24,
        width: 24
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
      height: 64,
      alignItems: 'center',
      flexDirection: 'row',
      backgroundColor: '#4d4d4d'
    },
      row_dark: {
        backgroundColor: '#404040',
      },

      row_description: {
        flex: 1,
        height: 52,
        justifyContent: 'center',
        marginLeft: 16
      },

        row_text: {
          color: '#ffffff',
          fontWeight: '600'
        },
        row_subtext: {
          color: '#ffffff',
          fontSize: 12
        },

      row_number: {
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 16,
        fontWeight: '500'
      },

      ENJOYER: { color: '#21e4d5' },
      SPORTY: { color: '#fc4320' },
      ATHLETE: { color: '#bbee11' },
      SUPERHERO: { color: '#222529' }
});
