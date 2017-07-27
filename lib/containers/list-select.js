// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Text, View, ScrollView, Image, TouchableOpacity, Platform, Dimensions, StyleSheet } from 'react-native';

import I18n from '../helpers/i18n';


class ListSelect extends Component {

  state: Object;

  constructor(props: Object) {
    super(props);
    this.state = { disable_all: false };
  }

  select = (item) => {
    return () => {
      this.props.onSelect(item);
      this.props.navigator.pop();
    };
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

            <View style={[styles.row, this.state.disable_all? styles.row_disabled: null]}>
              <TouchableOpacity onPress={this.select()}>
                <View style={styles.row_label}>
                  <Text style={styles.row_label_text}>{I18n('Todos')}</Text>
                </View>
              </TouchableOpacity>
            </View>

            {this.props.data.map((item, i) => (
              <View key={i} style={[styles.row, this.props.disabled? styles.row_disabled: null]}>
                <TouchableOpacity onPress={this.select(item.name)}>
                  <View style={styles.row_label}>
                    <Text style={styles.row_label_text}>{I18n(item.name)}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    );
  }
}


const Container = connect(store => store.config)( ListSelect );
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


  row: {
    marginHorizontal: 16,
    borderBottomColor: '#9b9b9b9b',
    borderBottomWidth: 1
  },
    row_disabled: {
      opacity: 0.5
    },
    row_label: {
      flex: 1,
      paddingVertical: 16,
      justifyContent: 'center'
    },
      row_label_text: {
        color: '#ffffff',
        fontSize: 16
      }

});
