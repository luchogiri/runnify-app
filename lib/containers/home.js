// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SwipeListView } from 'react-native-swipe-list-view';

import { Alert, Text, View, ListView, RefreshControl, Platform, Dimensions, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Image } from 'react-native';


import Events from '../actions/events';
import Account from '../actions/account';
import * as Components from '../components';


class Home extends Component {


  constructor(props: Object) {
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  }

  componentDidMount() {
    this.retrieveEvents();
  }

  retrieveEvents = () => {
    this.props.dispatch( Events.Retrieve({ ...this.props.events, offset: 0 }) );
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

  onEndReached = () => {
    if ( !this.props.events.items.length ) return;
    if ( this.props.events.offset + 20 >= this.props.events.total ) return;
    this.props.dispatch( Events.Retrieve({ ...this.props.events, offset: this.props.events.offset + 20 }, true) );
  };


  render() {
    return (

      <View style={styles.wrapper}>
        <Components.HeaderView navigator={this.props.navigator} right={['search','filters']} />

        <SwipeListView
          dataSource={this.ds.cloneWithRows(this.props.events.items)}
          disableRightSwipe={true}
          removeClippedSubviews={false}
          rightOpenValue={-75}
          onEndReached={this.onEndReached}
          refreshControl={<RefreshControl onRefresh={this.retrieveEvents} refreshing={this.props.events.loading} />}
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
        />
      </View>
    );
  }
}

const Container = connect(store => ({ events:store.events , account:store.account }) )( Home );
export default Container;


const styles = StyleSheet.create({


  wrapper: {
    flex: 1,
    backgroundColor:'#ffffff'
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
      }
});
