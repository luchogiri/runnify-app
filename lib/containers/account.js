// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import I18n from '../helpers/i18n';

import { View, Image, Touchable, ScrollView, Text, StyleSheet, Platform, History } from '../components';
import Header from "./common/header";


class Account extends Component {

  constructor(props) {
    super(props);
  }

  back = () => {
    Platform.OS == 'web' ? History.push('/profile') : this.props.navigator.pop();
  };

  render() {

    return (
      <View style={styles.wrapper}>

        <Header back={this.back}>Mi Cuenta</Header>


        <View style={styles.content}>
          <ScrollView style={styles.scroll} bounces={false}>
            <View style={styles.card}>

              <View style={styles.name}>
                <Text style={styles.name_text}>{this.props.account.first_name} {this.props.account.last_name}</Text>
              </View>

              <View style={styles.pic}>
                <Image style={styles.pic_img}
                       source={this.props.account.picture ?
                        {uri:this.props.account.picture}:
                        '/img/placeholder-user-picture@2x.png'} />
              </View>

              <View style={styles.stats}>
                <View style={styles.stat}>
                  <Text style={styles.stat_title}>{I18n('Seguidores')}</Text>
                  <Text style={styles.stat_num}>{this.props.account.followers || 0}</Text>
                </View>

                <View style={styles.stat}>
                  <Text style={styles.stat_title}>{I18n('Carreras')}</Text>
                  <Text style={styles.stat_num}>{this.props.account.registered.length || 0}</Text>
                </View>

                <View style={styles.stat}>
                  <Text style={styles.stat_title}>{I18n('Siguiendo')}</Text>
                  <Text style={styles.stat_num}>{this.props.account.following || 0}</Text>
                </View>
              </View>

            </View>

            <View style={styles.form}>

              <View style={styles.field}>
                <View style={styles.label}>
                  <Text style={styles.label_text}>{I18n('Nombre y Apellido')}</Text>
                </View>
                <View style={styles.input}>
                  <Text style={styles.value}>{this.props.account.first_name} {this.props.account.last_name}</Text>
                </View>
              </View>

              <View style={styles.field}>
                <View style={styles.label}>
                  <Text style={styles.label_text}>{I18n('Email')}</Text>
                </View>
                <View style={styles.input}>
                  <Text style={styles.value}>{this.props.account.email}</Text>
                </View>
              </View>

              <View style={[styles.field, {borderTopWidth:1, borderTopColor: '#ccc', marginRight: 16, marginTop:8, paddingTop: 8}]}>
                <Touchable onPress={this.props.navigator.screen('Terminos')} style={styles.input}>
                  <Text style={[styles.value, {fontSize: 15}]}>{I18n('Términos y condiciones')}</Text>
                </Touchable>
              </View>

            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}


const Container = connect(store => store)( Account );
export default Container;


const styles = StyleSheet.create({

  wrapper: {
    backgroundColor: '#510c80',
    flex: 1,
    [Platform.OS == 'web' ? 'boxShadow':'flex']: Platform.OS == 'web' ? '#111 0 6px 15px': 1
  },

  content: {
    flex: 1,
    backgroundColor: '#fff',
    overflow: 'scroll'
  },

  scroll: {
    backgroundColor: '#fff'
  },

  card: {
    paddingTop: 24,
    backgroundColor: '#510c80'
  },
    name: {
      alignItems: 'center',
      paddingBottom: 4
    },
      name_text: {
        fontSize: 18,
        textAlign: 'center'
      },

    pic: {
      alignItems: 'center'
    },
      pic_img: {
        marginTop: 16,
        height: 100,
        width: 100,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: '#bbb',
        [Platform.OS == 'web' ? 'borderStyle':'borderColor']: Platform.OS == 'web' ? 'solid': '#bbb'
      },

    stats: {
      marginTop: 24,
      marginBottom: 16,
      flexDirection: 'row'
    },
      stat: {
        flex: 1,
        alignItems: 'center',
      },

      stat_title: {
        fontSize: 16,
        marginBottom: 4
      },

      stat_num: {
        fontWeight: '500'
      },


  form: {
    paddingTop: 24
  },

  field: {
    marginBottom: 20,
    marginLeft: 16
  },

    label: {

    },

    label_text: {
      fontSize: 12,
      lineHeight: 12,
      color: '#9b9b9b'
    },

    input: {
      marginTop: 4
    },

    value: {
      fontSize: 20,
      lineHeight: 20,
      color: '#1e1126'
    },

});