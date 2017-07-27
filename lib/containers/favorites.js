// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Text, View, ListView, ScrollView, Platform, Dimensions, RefreshControl, TouchableOpacity, Image, StyleSheet } from 'react-native';


import moment from 'moment';
import I18n from '../helpers/i18n';

import * as Components from '../components';
import Account from '../actions/account';


const checkType = (distance) => {
  return distance > 41.99 ? 'SUPERHERO' :
         distance > 20.99 ? 'ATHLETE' :
         distance > 9.99 ?  'SPORTY' :
                            'ENJOYER';
};


class Favorites extends Component {

  state: Object;
  ds: Object;

  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = { favorites: [], refreshing: false };
  }

  componentDidMount() {
    this.retrieveFavorites();
  }


  retrieveFavorites = () => {
    this.setState({ refreshing: true });
    this.props
      .dispatch( Account.RetrieveFavorites( this.props.account.token ) )
      .then(
        data => { this.setState({ refreshing: false, favorites: data }); },
        err => { this.setState({ refreshing: false }); }
      );
  };

  check = (idx) => {
    return () => {
      let favorite = this.state.favorites[idx];
      favorite.checked = !favorite.checked;
      this.setState({ favorites : this.state.favorites });
    };
  };

  checked = () => {
    return this.state.favorites.filter( f => f.checked ).length;
  };

  onDelete = () => {
    this.state.favorites
      .filter( f => f.checked )
      .forEach(f => this.props.dispatch( Account.DeleteFavorite( f, this.props.account.token ) ));
    this.setState({ favorites: this.state.favorites.filter( f => !f.checked ) })
  };

  render() {
    return (

      <View style={styles.wrapper}>
        <Components.HeaderView navigator={this.props.navigator} right={this.checked()? ['delete']: []} onDelete={this.onDelete} />

        <View style={styles.wrapper}>

          {!this.state.favorites.length &&
          <View style={styles.empty}>
            <Image source={require('../../assets/img/placeholder-favorites.png')} />
            <Text style={styles.empty_text}>{I18n('¡Todavía no tenés favoritos!')}</Text>
          </View>}

          <ListView
            dataSource={this.ds.cloneWithRows(this.state.favorites)}
            refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.retrieveFavorites} />}
            renderRow={(data, section, i) =>
              <View style={styles.row}>
                <TouchableOpacity style={styles.row_check} onPress={this.check(i)}>
                  {data.checked ?
                    <Image source={require('../../assets/img/icon-check-checked.png')} />:
                    <Image source={require('../../assets/img/icon-check-unchecked.png')} />}
                </TouchableOpacity>
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
            }
          />
        </View>
      </View>
    );
  }
}


const Container = connect(store => ({ account:store.account }) )( Favorites );
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
    height: 64,
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

  row_description: {
    flex: 1,
    height: 52,
    justifyContent: 'center'
  },

  row_text: {
    color: '#4a4a4a',
    fontWeight: '600'
  },
    row_subtext: {
      color: '#4a4a4a',
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
