// @flow

import React, { Component } from 'react';

import { Text, View, Image, TouchableWithoutFeedback, Platform, Dimensions, StyleSheet } from 'react-native';

import moment from 'moment';
import I18n from '../helpers/i18n';


const getFlag = (country) => {
  const flags = {
    'Argentina': require('../../assets/img/icon-row-flag-ar.png'),
    'Brasil': require('../../assets/img/icon-row-flag-br.png'),
    'México': require('../../assets/img/icon-row-flag-mx.png'),
    'Uruguay': require('../../assets/img/icon-row-flag-uy.png'),
    'Paraguay': require('../../assets/img/icon-row-flag-py.png'),
    'Bolivia': require('../../assets/img/icon-row-flag-bo.png'),
    'Colombia': require('../../assets/img/icon-row-flag-co.png'),
    'Chile': require('../../assets/img/icon-row-flag-ch.png'),
    'Perú': require('../../assets/img/icon-row-flag-pe.png')
  };
  return flags[country];
};

const checkType = (activities = []) => {
  let distance = 0;
  activities.forEach(a => {
    a.disciplines.forEach(d => {
      if (d.distance > distance) distance = d.distance;
    });
  });

  return distance > 41.99 ? 'SUPERHERO' :
         distance > 20.99 ? 'ATHLETE' :
         distance > 9.99 ?  'SPORTY' :
                            'ENJOYER';
};

const getDistance = (activities = []) => {
  let distances = [];
  let distance = 0;
  activities.forEach(a => {
    a.disciplines.forEach(d => {
      if (d.distance > distance) {
        distance = d.distance;
        distances = a.disciplines.map(d => (d.distance < 1? (d.distance*100)+'m': d.distance+'K'));
      }
    });
  });
  return distances.join(' ');
};


const EventRow = (props) => (

  <TouchableWithoutFeedback onPress={props.navigator.screen('Event', { data:props })}>
    <View
      style={[styles.item,
              styles['B_'+checkType(props.activities)],
              props.index % 2? styles.item_dark: null]}>

      <View style={styles.item_content}>

        <View style={styles.item_title}>
          <Text style={[
            styles.item_title_text,
            styles['F_'+checkType(props.activities)]]}>{props.name}</Text>
        </View>

        <View style={styles.item_distance}>
          <Text style={[
            styles.item_distance_text,
            styles['F_'+checkType(props.activities)]]}>
            { getDistance(props.activities) }
          </Text>
        </View>
      </View>


      <View style={styles.item_labels}>

        <Image style={styles.item_flag} source={getFlag(props.country)} />

        <View style={styles.item_label_view}>
          <Text style={styles.item_label_text}>{props.state}</Text>
        </View>

        <View style={styles.item_label_view}>
          <Text style={styles.item_label_text}>{moment(props.start_date).utc().format('D')} {I18n(moment(props.start_date).utc().format('MMM'))}</Text>
        </View>

        <View style={styles.item_label_view}>
          <Text style={styles.item_label_text}>{I18n(props.category)}</Text>
        </View>

        <View style={styles.item_label_view}>
          <Text style={[styles.item_label_text, styles[checkType(props.activities)]]}>
            #{checkType(props.activities)}
          </Text>
        </View>
      </View>

    </View>
  </TouchableWithoutFeedback>
);

export default EventRow;

const styles = StyleSheet.create({

  item: {
    height: 134,
    borderLeftColor: '#666666',
    borderLeftWidth: 8,
    backgroundColor: '#4d4d4d'
  },
    item_dark: {
      backgroundColor: '#404040',
    },

  item_content: {
    flex: 1,
    flexDirection: 'row'
  },
    item_title: {
      flex: 1,
      paddingLeft: 16,
      paddingRight: 4,
    },
      item_title_text: {
        fontSize: 25,
        lineHeight: 22,
        color: '#ffffff',
        marginTop: 12
      },

    item_distance: {
      width: 62,
    },
      item_distance_text: {
        fontSize: 26,
        lineHeight: 22,
        color: '#ffffff',
        marginTop: 12
      },


  item_labels: {
    height: 30,
    flexDirection:'row'
  },

    item_flag: {
      height: 16,
      width: 24,
      marginLeft: 16
    },

    item_label_view: {
      marginLeft: 8,
      backgroundColor: '#333333',
      borderRadius: 2,
      justifyContent: 'center',
      alignItems: 'center',
      height: 16,
      paddingHorizontal: 4
    },

      item_label_text: {
        color: '#ffffff',
        fontSize: 10
      },

    B_ENJOYER: { borderLeftColor: '#0ee7dd' },
    B_SPORTY: { borderLeftColor: '#ff5b29' },
    B_ATHLETE: { borderLeftColor: '#d4ff2b' },
    B_SUPERHERO: { borderLeftColor: '#222529' },

    F_ENJOYER: { fontFamily: 'Devinyl-Incise' },
    F_SPORTY: { fontFamily: 'Devinyl-Inline' },
    F_ATHLETE: { fontFamily: 'Devinyl-Stencil' },
    F_SUPERHERO: { fontFamily: 'Devinyl-Regular' },

    ENJOYER: { color: '#21e4d5' },
    SPORTY: { color: '#fc4320' },
    ATHLETE: { color: '#ccff22' },
    SUPERHERO: { color: '#dddddd' },

});
