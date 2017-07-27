// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Text, View, ScrollView, Image, TouchableOpacity, Platform, Dimensions, StyleSheet } from 'react-native';

import I18n from '../helpers/i18n';
import Events from '../actions/events';


class Filters extends Component {

  state: Object;

  constructor(props: Object) {
    super(props);
    this.state = {};
  }

  reset = () => {
    this.props.dispatch( Events.ClearFilters() );
  };

  checkNearMe = () => {
    let query = { ...this.props.events.query };
    if (!this.props.events.show_nearme) query.country = undefined;
    this.props.dispatch( Events.UpdateFilters({ show_nearme: !this.props.events.show_nearme, query }) );
  };

  onSelect = (type) => {
    return (item) => {
      if ( this.props.events.query[type] == item ) return;
      let data = { ...this.props.events.query, [type]: item };
      let show_nearme = this.props.events.show_nearme;
      if (type == 'country') { data.state = undefined; show_nearme = false; }
      this.props.dispatch( Events.UpdateFilters({ query: data, show_nearme }) );
    };
  };

  navigate = (to, data) => {
    return this.props.events.show_nearme? () => {} : this.props.navigator.screen(to, data);
  };

  onDone = () => {
    this.props.dispatch( Events.Retrieve( this.props.events ) );
    this.props.navigator.pop();
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
          <ScrollView>

            <View style={styles.row}>
              <TouchableOpacity style={styles.row_nearme} onPress={this.checkNearMe}>
                <View style={styles.row_label}>
                  <Text style={styles.row_label_text}>{I18n('Cerca de mi ubicación')}</Text>
                </View>
                <View style={[styles.row_nearme_check]}>
                  {!this.props.events.show_nearme? null: <Image source={require('../../assets/img/icon-checked.png')} />}
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.row}>
              <TouchableOpacity onPress={this.props.navigator.screen('ListSelect', { data: this.props.config.countries, onSelect: this.onSelect('country') })}>
                <View style={styles.row_label}>
                  <Text style={styles.row_label_text}>{I18n('PAÍS')}</Text>
                  <Text style={styles.row_label_subtext}>{this.props.events.query.country || 'Todos'}</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={[styles.row, !this.props.events.query.country || this.props.events.show_nearme? styles.row_disabled: null]}>
              <TouchableOpacity onPress={this.navigate('ListSelect',{ data: this.props.config.states.filter(item => item.country == this.props.events.query.country), onSelect: this.onSelect('state') })}>
                <View style={styles.row_label}>
                  <Text style={styles.row_label_text}>{I18n('PROVINCIA')}</Text>
                  <Text style={styles.row_label_subtext}>{this.props.events.query.state || 'Todas'}</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.row}>
              <TouchableOpacity onPress={this.props.navigator.screen('ListSelect',{ data: this.props.config.categories, onSelect: this.onSelect('category')  })}>
                <View style={styles.row_label}>
                  <Text style={styles.row_label_text}>{I18n('CATEGORÍA')}</Text>
                  <Text style={styles.row_label_subtext}>{I18n(this.props.events.query.category) || 'Todas'}</Text>
                </View>
              </TouchableOpacity>
            </View>

          </ScrollView>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.footer_btn} onPress={this.reset}>
            <Text style={styles.footer_btn_text}>{I18n('Restablecer')}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.footer_btn}
            onPress={this.onDone}>
            <Text style={styles.footer_btn_text}>{I18n('Listo')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}


const Container = connect(store => ({ config: store.config, events: store.events }))( Filters );
export default Container;


const styles = StyleSheet.create({

  wrapper: {
    flex: 1,
    backgroundColor:'#510c80'
  },

    header: {
      height: Platform.OS == 'android' ? 74 : 70,
      paddingTop: Platform.OS == 'android' ? 24 : 20,
      alignItems: 'flex-start',
      justifyContent: 'center',
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


    footer: {
      height: 49,
      borderTopWidth: 1,
      borderTopColor: '#9b9b9b',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 18
    },
      footer_btn: {
        padding: 8
      },
        footer_btn_text: {
          fontSize: 16,
          color: '#ffffff'
        },


    row: {
      marginHorizontal: 16,
      paddingVertical: 24,
      borderBottomColor: '#9b9b9b',
      borderBottomWidth: 1
    },
      row_disabled: {
        opacity: 0.5
      },

      row_nearme: {
        flex: 1,
        flexDirection: 'row'
      },
        row_nearme_check: {
          height: 20,
          width: 20,
          borderColor: '#ffffff',
          borderWidth: 1,
          borderRadius: 3,
          overflow: 'hidden'
        },

    row_label: {
      flex: 1,
      justifyContent: 'center'
    },
      row_label_text: {
        color: '#ffffff',
        fontSize: 18
      },
      row_label_subtext: {
        color: '#d9d9d9',
        fontSize: 16,
        marginTop: 8
      },


});
