// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SwipeListView } from 'react-native-swipe-list-view';

import { Alert, Text, View, ListView, RefreshControl, Platform, Dimensions, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Image } from 'react-native';

import I18n from '../helpers/i18n';
import Events from '../actions/events';
import Account from '../actions/account';
import * as Components from '../components';


const checkType = (distance) => {
  return distance == '42-200'   ? 'SUPERHERO' :
         distance == '21-41.99' ? 'ATHLETE' :
         distance == '10-20.99' ? 'SPORTY' :
                                  'ENJOYER';
};



class Results extends Component {


  constructor(props: Object) {

    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = { title: '', events: { items: [], offset: 0, total: 0 }, refreshing: false, saved: false };
  }

  componentDidMount() {
    let title = '';
    if (this.props.query) title = this.props.query;
    else title = '#' + checkType(this.props.distance);
    this.setState({ title });
    this.retrieveEvents();
  }


  retrieveEvents = () => {
    let query = { query: { distance: this.props.distance }, search: this.props.query };
    this.setState({ refreshing: true });
    this.props
      .dispatch( Events.Get(query))
      .then(this.onEventsReceived, this.onError);
  };

  onEventsReceived = (data) => {
    this.setState({ events: data, refreshing: false });
  };

  onEventsAdd = (data) => {
    let { items, ...props } = data;
    this.setState({ events: { ...props, items: [...this.state.events.items, ...items]}, refreshing: false });
  };

  onError = (err) => {
    // console.log(err);
    this.setState({ refreshing: false });
  };

  onEndReached = () => {
    if ( !this.state.events.items.length ) return;
    if ( this.state.events.offset + 20 >= this.state.events.total ) return;
    let query = { distance: this.props.distance };
    this.props
      .dispatch( Events.Get({ query, search: this.props.query, offset: this.state.events.offset + 20 }))
      .then(this.onEventsAdd, this.onError);
  };

  addFavorite = (data: Object) => {
    return () => {
      if (!this.props.account.logged_in) return this.props.navigator.push({ screen: 'Login' });
      this.props.dispatch( Account.SaveFavorite({ _id: data._id }, this.props.account.token))
    };
  };

  removeFavorite = (data:Object) => {
    return () => {
      this.props.dispatch( Account.DeleteFavorite({ _id: data._id }, this.props.account.token))
    };
  };

  addAlert = () => {

    if (this.state.saved) return;

    if (!this.props.account.logged_in) return this.props.navigator.push({ screen: 'Login' });

    let query = JSON.stringify({
      search: this.props.query, query: { distance: this.props.distance }
    }).replace(/\//g, '').replace(/"/g, "'");
    this.props.dispatch( Account.SaveAlert( query, this.props.account.token ));
    this.setState({ saved: true });
  };



  render() {
    return (

      <View style={styles.wrapper}>
        <View style={styles.header}>

          <TouchableOpacity style={styles.back} onPress={this.props.navigator.pop}>
            <Image source={require('../../assets/img/icon-header-back.png')} style={styles.back_img} />
          </TouchableOpacity>

          <View style={styles.term}>
            <Text style={styles.term_text}>{this.state.title}</Text>
          </View>
        </View>


        <View style={styles.notification}>
          <Image style={styles.notification_icon} source={require('../../assets/img/icon-tabbar-alerts-i.png')} />
          <Text style={styles.notification_text}>
            {!this.state.saved ?
              I18n('Recibe alertas de esta búsqueda'):
              I18n('Tu alerta ha sido guardada!')}
          </Text>
          <TouchableOpacity
            style={[styles.notification_btn, this.state.saved ? styles.notification_saved: null]}
            onPress={this.addAlert}>
            <Text style={styles.notification_btn_text}>{I18n('Agregar')}</Text>
          </TouchableOpacity>
        </View>


        {!!this.state.events.items.length &&
        <SwipeListView
          dataSource={this.ds.cloneWithRows(this.state.events.items)}
          disableRightSwipe={true}
          removeClippedSubviews={false}
          rightOpenValue={-75}
          onEndReached={this.onEndReached}
          refreshControl={<RefreshControl onRefresh={this.retrieveEvents} refreshing={this.state.refreshing} />}
          renderRow={(data, section, i) => <Components.EventRow index={i} {...data} navigator={this.props.navigator} />}
          renderHiddenRow={data => (
            <View style={styles.rowBack}>
              {this.props.account.favorites.indexOf(data._id) != -1 ?
                <TouchableOpacity style={styles.click_fav} onPress={this.removeFavorite(data)}>
                  <Image style={styles.swipe_like} source={require('../../assets/img/icon-list-like-a.png')} />
                </TouchableOpacity> :
                <TouchableOpacity style={styles.click_fav} onPress={this.addFavorite(data)}>
                  <Image style={styles.swipe_like} source={require('../../assets/img/icon-list-like-i.png')} />
                </TouchableOpacity>}
            </View>
          )}
        />}

        {!this.state.events.items.length && !this.state.refreshing &&
        <View style={styles.empty}>
          <Image source={require('../../assets/img/placeholder-results.png')} />
          <Text style={styles.empty_text}>{I18n('No encontramos resultados para')} <Text style={{fontWeight: '600'}}>{this.state.title}</Text></Text>

          <TouchableOpacity
            style={[styles.notification_btn, {width: 200, marginTop: 24}]}
            onPress={() => { this.props.account.logged_in? this.props.navigator.screen('Create')():this.props.navigator.screen('Login')() }}>
            <Text style={styles.notification_btn_text}>{I18n('Agregar carrera')}</Text>
          </TouchableOpacity>
        </View>}

      </View>
    );
  }
}

const Container = connect(store => ({ events:store.events, account: store.account }) )( Results );
export default Container;


const styles = StyleSheet.create({

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

    term: {
      flex: 1,
      paddingLeft: 16,
      justifyContent: 'center',
    },
      term_text: {
        color: '#ffffff',
        fontSize: 18
      },


  wrapper: {
    flex: 1,
    backgroundColor:'#f4f4f4'
  },

    rowBack:{
      backgroundColor:'#ff5b29',
      flex:1
    },

    click_fav:{
      justifyContent:'flex-end',
      flexDirection: 'row',
      alignItems: 'center'
    },

    swipe_like:{
      marginTop:50,
      marginRight:25
    },


    notification: {
      height: 50,
      flexDirection:'row',
      backgroundColor:'#ffffff',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: '#cccccc'
    },
      notification_saved: {
        opacity: 0.4
      },

      notification_icon: {
        height: 16,
        width: 16,
        marginLeft: 16
      },

      notification_text: {
        flex: 1,
        marginHorizontal: 8,
        fontSize: 13
      },

      notification_btn: {
        width: 88,
        marginRight: 10,
        paddingVertical: 6,
        backgroundColor: '#510c80',
        borderRadius: 3,
        justifyContent: 'center',
        alignItems: 'center'
      },
        notification_btn_text: {
          color: '#ffffff'
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

});
