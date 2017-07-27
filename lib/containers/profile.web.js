
// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Link, browserHistory } from 'react-router';
import I18n from '../helpers/i18n';

import Onboarding from './onboarding';
import Account from '../actions/account';
import Config from '../actions/config';



class Profile extends Component {

  constructor(props) {
    super(props);
  }

  logout = () => {
    this.props.dispatch( Account.Logout() );
    this.props.dispatch( Config.Update({ show_login: false }));
    setTimeout(() => browserHistory.push('/'), 1000 );
  };

  navigate = (route) => {
    return () => {
      if (this.props.account.logged_in)
        browserHistory.push(route);
      else
        this.props.dispatch( Config.Update({ show_login: true }));
    }
  };

  render() {
    return (
      <section className="profile">

        <div style={styles.wrapper}>
          <div onClick={this.navigate('/profile/account')} style={styles.row_item}>
            <img src='/img/icon-row-user@2x.png' style={styles.row_img} />
            <h2 style={styles.row_text}>{I18n('Mi Cuenta')}</h2>
          </div>

          <div onClick={this.navigate('/profile/registered')} style={styles.row_item}>
            <img src='/img/icon-row-races@2x.png' style={styles.row_img} />
            <h2 style={styles.row_text}>{I18n('Mis Carreras')}</h2>
          </div>

          <div onClick={this.navigate('/profile/create')} style={styles.row_item}>
            <img src='/img/icon-row-create@2x.png' style={styles.row_img} />
            <h2 style={styles.row_text}>{I18n('Crear Carrera')}</h2>
          </div>

          <a href="mailto:hola@runnify.com?Subject=Contacto desde Runnify" style={styles.row_item}>
            <img src='/img/icon-row-email@2x.png' style={styles.row_img} />
            <h2 style={styles.row_text}>{I18n('Contactenos')}</h2>
          </a>

          {!!this.props.account && !!this.props.account.logged_in &&
          <div style={styles.row_item} onClick={this.logout}>
            <img src='/img/icon-row-logout@2x.png' style={styles.row_img} />
            <h2 style={styles.row_text}>{I18n('Salir')}</h2>
          </div>}
        </div>

        {this.props.children ? this.props.children : <Onboarding />}

      </section>
    );
  }
}


const Container = connect(store => store)( Profile );
export default Container;


const styles = {

  wrapper: {
    flex: 1,
    backgroundColor:'#ffffff'
  },

    row_item: {
      height: 56,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: 16,
      borderBottomStyle: 'solid',
      borderBottomWidth: 1,
      borderBottomColor: '#979797',
      textDecoration: 'none',
      cursor: 'pointer'
    },
      row_img: {
        height: 24,
        width: 24
      },

      row_text: {
        marginLeft: 16,
        fontSize: 20,
        color: '#311833'
      }

};
