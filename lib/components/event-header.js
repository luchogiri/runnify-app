// @flow

import React, { Component } from 'react';

import { Text, View, Image, TouchableWithoutFeedback, Platform, Dimensions, StyleSheet } from 'react-native';

import moment from 'moment';
import I18n from '../helpers/i18n';


const getFlag = (country) => {
  const flags = {
    'Argentina': require('../../assets/img/icon-row-flag-ar.png'),
    'Brasil': require('../../assets/img/icon-row-flag-br.png'),
    'Uruguay': require('../../assets/img/icon-row-flag-uy.png'),
    'México': require('../../assets/img/icon-row-flag-mx.png'),
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


const EventHeader = (props) => (

  <View style={styles.item}>
    <View style={styles.item_content}>
      <View style={styles.item_title}>
        <Text style={[styles.item_title_text, styles['F_'+checkType(props.activities)]]}>
          {props.name}
        </Text>
      </View>

      <View style={styles.item_distance}>
        <Text style={[
          styles.item_distance_text,
          styles['F_'+checkType( props.activities )]]}>
          {getDistance( props.activities )}
        </Text>
      </View>
    </View>

    <View style={styles.item_labels}>
      <Image style={styles.item_flag} source={getFlag(props.country)} />

      <View style={styles.item_label_view}>
        <Text style={styles.item_label_text}>{props.state}</Text>
      </View>

      <View style={styles.item_label_view}>
        <Text style={styles.item_label_text}>{props.city}</Text>
      </View>

      <View style={styles.item_label_view}>
        <Text style={[styles.item_label_text, styles[checkType( props.activities )]]}>
          #{checkType( props.activities )}
        </Text>
      </View>
    </View>
  </View>
);

export default EventHeader;


const styles = StyleSheet.create({


  F_ENJOYER: { fontFamily: 'Devinyl-Incise' },
  F_SPORTY: { fontFamily: 'Devinyl-Inline' },
  F_ATHLETE: { fontFamily: 'Devinyl-Stencil' },
  F_SUPERHERO: { fontFamily: 'Devinyl-Regular' },

  ENJOYER: { color: '#21e4d5' },
  SPORTY: { color: '#fc4320' },
  ATHLETE: { color: '#ccff22' },
  SUPERHERO: { color: '#dddddd' },


  item: {
    paddingBottom: 28,
    paddingLeft: 24,
    backgroundColor: '#510c80'
  },

  item_content: {
    flex: 1,
    flexDirection: 'row'
  },
    item_title: {
      flex: 1,
      paddingRight: 16,
      marginBottom: 24
    },
      item_title_text: {
        fontSize: 29,
        lineHeight: 24,
        marginTop: 4,
        color: '#ffffff'
      },

    item_distance: {
      width: 66,
    },
      item_distance_text: {
        fontSize: 29,
        lineHeight: 24,
        color: '#ffffff',
        marginTop: 4
      },


    item_labels: {
      height: 30,
      marginTop: 8,
      flexDirection:'row'
    },

    item_flag: {
      height: 16,
      width: 24
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
      }
});
