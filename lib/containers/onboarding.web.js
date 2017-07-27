// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';

import I18n from '../helpers/i18n';
import Config from '../actions/config';


class Onboarding extends Component {

  constructor(props: Object) {
    super(props);
    this.state = {};
  }
  
  dismiss = () => {
    this.props.dispatch( Config.Update({ show_onboarding: false }) );
    //this.props.navigator.popToTop();
  };
  
  
  render() {
    return (
      <section style={styles.wrapper}>
        <div style={styles.onboarding}>
          <div style={styles.slider}>

            <div style={styles.slide}>
              <div style={styles.top}>
                <img style={styles.img} src='/img/onboarding-1@2x.png' />
              </div>
              <div style={styles.bottom}>
                <h2 style={styles.title}>{I18n('BUSCAR')}</h2>
                <h3 style={styles.desc}>{I18n('Encontrá las carreras que buscás')}</h3>
              </div>
            </div>

            <div style={styles.slide}>
              <div style={styles.top}>
                <img style={styles.img} src='/img/onboarding-2@2x.png' />
              </div>

              <div style={styles.bottom}>
                <h2 style={styles.title}>{I18n('FAVORITOS')}</h2>
                <h3 style={styles.desc}>{I18n('Deslizá la carrera que te interesa, y se guardará en tus favoritos.')}</h3>
              </div>
            </div>

            <div style={styles.slide}>
              <div style={styles.top}>
                <img style={styles.img} src='/img/onboarding-3@2x.png' />
              </div>
              <div style={styles.bottom}>
                <h2 style={styles.title}>{I18n('ANOTATE')}</h2>
                <h3 style={styles.desc}>{I18n('Sumate a está carrera y conocé quienes asistirán.')}</h3>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const Container = connect(store => store)( Onboarding );
export default Container;


const styles = {
  
  wrapper: {
    flex: 1,
    display: 'flex',
    backgroundColor: '#532880',
    boxShadow: '#111 0 6px 15px'
  },

  onboarding: {
    flex: 1,
    paddingLeft: '12%',
    paddingRight: '12%',
    display: 'flex',
    position: 'relative',
    overflowX: 'scroll'
  },

  slider: {
    display: 'flex',
    width: '180%',
    height: '100%',
    position: 'absolute'
  },


  slide: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  },

    top: {
      flex: 1,
      display: 'flex',
      alignItems: 'flex-end',
      paddingTop: 36
    },
      img: {
        margin: '0 auto',
        width: 229,
        height: 220,
        display: 'block'
      },

    bottom: {
      flex: 1,
      paddingTop: 36
    },

    title: {
      fontSize: 28,
      textAlign: 'center',
      color: '#ffffff'
    },

    desc: {
      fontSize: 16,
      textAlign: 'center',
      color: '#ffffff',
      marginTop: 16,
      marginLeft: 48,
      marginRight: 48,
      lineHeight: '22px'
    },

    button: {
      position: 'absolute',
      bottom: 48,
      left: 60,
      right: 60,
      height: 32,
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: '#ffffff',
      borderRadius: 2,
      borderWidth: 1
    },
      button_text: {
        color: '#ffffff'
      }
};