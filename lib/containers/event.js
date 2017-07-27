// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { Image, Text, View, ScrollView, ListView, TouchableOpacity, Platform, Dimensions, StyleSheet, Linking } from 'react-native';

import I18n from '../helpers/i18n';
import Events from '../services/events';
import Account from '../actions/account';

import EventHeader from '../components/event-header';


const checkType = (disciplines = []) => {
  let distance = 0;
  disciplines.forEach(d => {
    if (d.distance > distance) distance = d.distance;
  });

  return distance > 41.99 ? 'SUPERHERO' :
         distance > 20.99 ? 'ATHLETE' :
         distance > 9.99 ?  'SPORTY' :
                            'ENJOYER';
};

const getDistance = (disciplines = []) => {
  return disciplines.map(d => (d.distance < 1? (d.distance*100)+'m': d.distance+'K')).join(' ');
};

class Event extends Component {

  state: Object;

  constructor(props) {
    super(props);
    this.state = { event: { ...{social:{}, ...this.props.data }}};
  }

  componentDidMount() {
    Events.RetrieveById(this.state.event._id).then(
      event => this.setState({ event: { ...this.state.event, ...event }})
    );
  }

  addFavorite = () => {
    if (!this.props.account.logged_in) return this.props.navigator.push({ screen: 'Login' });
    this.props.dispatch( Account.SaveFavorite({ _id: this.state.event._id }, this.props.account.token));
  };

  removeFavorite = () => {
    this.props.dispatch( Account.DeleteFavorite({ _id: this.state.event._id }, this.props.account.token));
  };

  onRegister = () => {
    if (!this.props.account.logged_in) return this.props.navigator.push({ screen: 'Login' });
    this.props.dispatch( Account.SaveRegistered({ event: this.state.event._id }, this.props.account.token));
    this.setState({ event: { ...this.state.event, event: this.state.event.runners.push( this.props.account ) }});
  };

  onUnregister = () => {
    this.props.dispatch( Account.DeleteRegistered({ event: this.state.event._id }, this.props.account.token));
    this.setState({ event: { ...this.state.event, runners: this.state.event.runners.filter( r => r._id != this.props.account._id ) }});
  };

  sortActivities = (a,b) => {
    let distanceA = distanceB = 0;
    a.disciplines.forEach(d => { if (d.distance > distanceA) distanceA = d.distance; });
    b.disciplines.forEach(d => { if (d.distance > distanceB) distanceB = d.distance; });
    return distanceA < distanceB;
  };


  render() {
    return (
      <View style={styles.wrapper}>

        <ScrollView bounces={false}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.back} onPress={this.props.navigator.pop}>
              <Image source={require('../../assets/img/icon-header-back.png')} style={styles.back_img} />
            </TouchableOpacity>
          </View>

          <EventHeader {...this.state.event} />

          <View style={styles.actions}>
            {!!this.props.account.registered.filter(r => r && r.event == this.state.event._id).length ?
              <TouchableOpacity style={[styles.actions_btn, styles.actions_register]} onPress={this.onUnregister}>
                <Text style={styles.actions_text}>{I18n('No Asistiré')}</Text>
              </TouchableOpacity>:
              <TouchableOpacity style={[styles.actions_btn, styles.actions_register]} onPress={this.onRegister}>
                <Text style={styles.actions_text}>{I18n('Asistiré')}</Text>
              </TouchableOpacity>}

            {this.props.account.favorites.indexOf(this.state.event._id) != -1 ?
              <TouchableOpacity style={[styles.actions_btn, styles.actions_like]} onPress={this.removeFavorite}>
                <Image source={require('../../assets/img/icon-list-like-a.png')} style={{width:18,height:18}} />
              </TouchableOpacity>:
              <TouchableOpacity style={[styles.actions_btn, styles.actions_like]} onPress={this.addFavorite}>
                <Image source={require('../../assets/img/icon-list-like-i.png')} style={{width:18,height:18}} />
              </TouchableOpacity>}

            <View style={styles.actions_social}>
              {!!this.state.event.social.facebook &&
                <TouchableOpacity
                  style={[styles.actions_btn, styles.actions_facebook]}
                  onPress={() => { Linking.openURL(this.state.event.social.facebook)}}>
                  <Image source={require('../../assets/img/icon-social-facebook.png')} />
                </TouchableOpacity>}

              {!!this.state.event.social.twitter &&
                <TouchableOpacity
                  style={[styles.actions_btn, styles.actions_twitter]}
                  onPress={() => { Linking.openURL(this.state.event.social.twitter)}}>
                  <Image source={require('../../assets/img/icon-social-twitter.png')} />
                </TouchableOpacity>}

              {!!this.state.event.social.web &&
                <TouchableOpacity
                  style={[styles.actions_btn, styles.actions_web]}
                  onPress={this.props.navigator.screen('Webview', { data:{ name: this.state.event.name, link: this.state.event.social.web+'?utm_source=RUNNIFY_COM&utm_medium=MOBILE_APP' }})}>
                  <Image source={require('../../assets/img/icon-social-web.png')} />
                </TouchableOpacity>}
            </View>
          </View>


          <View style={styles.content}>
            {this.state.event.runners && !!this.state.event.runners.length &&
              <View style={styles.runners}>
                <Text style={styles.section_title}>
                  <Text style={{color: '#3f006d'}}>{this.state.event.runners.length}&nbsp;
                    {this.state.event.runners.length === 1? I18n('corredor asistirá'): I18n('corredores asistirán')}</Text>
                </Text>

                <ScrollView horizontal={true}>
                  {(this.state.event.runners || []).map((runn,i) =>

                    <View style={styles.runner} key={i}>
                      <TouchableOpacity
                        style={styles.runner_ctn}
                        onPress={this.props.navigator.screen('Runner', { data: runn })}>

                        {!runn.picture ?
                          <Image style={styles.runner_picture} source={require('../../assets/img/placeholder-user-picture.png')} />:
                          <Image style={styles.runner_picture} source={{ uri:runn.picture }} />}

                        <Text style={styles.runner_name}>{runn.first_name} {runn.last_name}</Text>
                        <Text style={styles.runner_races}>{I18n('Carreras')}</Text>
                        <Text style={styles.runner_races_number}>{(runn.registered || []).length}</Text>
                      </TouchableOpacity>
                    </View>)}
                </ScrollView>
              </View>}


            {this.state.event.activities && !!this.state.event.activities.length &&
              <View style={styles.activities}>
                <Text style={styles.section_title}>
                  <Text style={{color: '#3f006d'}}>{I18n('Carreras')}</Text>
                </Text>

                <View>
                  {this.state.event.activities.sort(this.sortActivities).map((data, i) =>
                    <View style={styles.row} key={i}>
                      <View style={styles.row_description} onPress={this.props.navigator.screen('Event', { data })}>
                        <Text style={styles.row_text}>{data.name}</Text>
                        <Text style={styles.row_subtext}>
                          {moment(data.start_date).utc().format('D')}&nbsp;
                          {I18n(moment(data.start_date).utc().format('MMM'))} -&nbsp;
                          {moment(data.start_date).utc().format('HH:mm')} hs.
                        </Text>
                      </View>
                      <Text style={[styles.row_number, styles[checkType(data.disciplines)]]}>
                        {getDistance(data.disciplines)}
                      </Text>
                    </View>
                  )}
                </View>
              </View>}


            {this.state.event.link &&
              <TouchableOpacity
                style={styles.row_button}
                onPress={this.props.navigator.screen('Webview', { data: this.state.event })}>
                <Text style={styles.row_button_text}>{I18n('Inscribirse')}</Text>
              </TouchableOpacity>}

              <TouchableOpacity
                style={styles.row_button}
                onPress={()=> Linking.openURL('mailto:cambios@runnify.com?Subject=Solicitud cambio en evento '+this.state.event.name)}>
                <Text style={[styles.row_button_text, {fontSize:14}]}>{I18n('Reportar error o cambio en carrera')}</Text>
              </TouchableOpacity>
          </View>
        </ScrollView>

      </View>
    );
  }
}


const Container = connect(store => ({ account:store.account }) )( Event );
export default Container;

const styles = StyleSheet.create({

  wrapper: {
    flex: 1,
    backgroundColor:'#f4f4f4'
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

  actions: {
    height: 40,
    flexDirection: 'row'
  },

    actions_btn: {
      width: 32,
      height: 32,
      marginLeft: 20,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#510c80',
      borderColor: '#ffffff',
      borderWidth: 1,
      borderRadius: 20
    },
      actions_register: {
        width: 110,
        height: 40,
        borderRadius: 4,
        position: 'relative',
        top: -20
      },
        actions_text: {
          color: '#ffffff',
          fontSize: 16
        },

      actions_like: {
        position: 'relative',
        height: 40,
        width: 40,
        top: -20,
      },

      actions_social: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginRight: 20,
        position: 'relative',
        top: -16
      },

        actions_facebook: {
          backgroundColor: '#3b5998',
          marginLeft: 8,
        },
        actions_twitter: {
          backgroundColor: '#4099FF',
          marginLeft: 8,
        },
        actions_web: {
          backgroundColor: '#510c80',
          marginLeft: 8,
        },




  content: {
    flex: 1,
    borderBottomColor: '#979797',
    borderBottomWidth: 1
  },

  section_title: {
    color: '#1e1126',
    fontSize: 16,
    marginLeft: 18,
    marginBottom: 16
  },

  runners: {
    marginTop: 16
  },

    runner: {
      marginLeft: 16,
      height: 184,
      width: 136,
      backgroundColor: '#ffffff',
      borderRadius: 2,
      borderColor: '#dddddd',
      borderWidth: 1
    },
    runner_ctn: {
      flex: 1,
      alignItems: 'center'
    },

      runner_picture: {
        height: 56,
        width: 56,
        borderRadius: 28,
        borderWidth: 2,
        borderColor: '#dddddd',
        marginTop: 24
      },

      runner_name: {
        color: '#4a4a4a',
        marginTop: 16
      },
      runner_races: {
        color: '#532880',
        marginTop: 8,
      },
      runner_races_number: {
        marginTop: 4,
        color: '#532880',
        fontWeight: '600'
      },

  activities: {
    marginTop: 24,
  },

  row: {
    height: 72,
    alignItems: 'center',
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#cccccc',
    backgroundColor: '#ffffff'
  },
    row_description: {
      flex: 1,
      height: 52,
      marginLeft: 24,
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
    SUPERHERO: { color: '#222529' },


    row_button: {
      height: 56,
      borderTopColor: '#979797',
      borderTopWidth: 1,
      paddingLeft: 16,
      flexDirection: 'row',
      alignItems: 'center'
    },
      row_button_text: {
        fontSize: 20,
        color: '#3f006d'
      }



});
