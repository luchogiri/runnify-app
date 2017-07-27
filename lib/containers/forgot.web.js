
// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import I18n from '../helpers/i18n';

import Account from '../actions/account';


class Forgot extends Component {

  constructor(props) {
    super(props);
    this.state = { email: '', error: false };
  }

  handleInput = (field) => {
    return (ev) => {
      this.setState({ [field] : ev.target.value });
    };
  };

  handleLogin = () => {
    const { email } = this.state;
    this.setState({ error: false, loading: true });

    // this.props
    //   .dispatch( Account.Signin({ email, password }) )
    //   .then(this.handleLoggedIn, this.handleLoginError);
  };


  render() {
    return (
      <section style={styles.wrapper}>
        <img style={styles.title} src='/img/runnify-logo@2x.png' alt='Runnify' height='56' />

        <div style={styles.form}>

          <div style={styles.login}>

            <div style={styles.forgot}>
              <div style={styles.forgot_link}>{I18n('Para recuperarla, ingrese su email:')}</div>
            </div>

            {!!this.state.error && <p className="error_msg">{I18n('Revise los campos e intente nuevamente')}</p>}

            <div style={styles.input}>
              <input type="text"
                     name='email'
                     style={styles.input_field}
                     placeholder='E-mail'
                     value={this.state.email}
                     onChange={this.handleInput('email')} />
            </div>

            <div style={styles.submit} onClick={this.handleLogin}>{I18n('Enviar')}</div>
          </div>

          <div style={styles.forgot} onClick={this.props.login}>
            <div style={{...styles.forgot_link, ...{fontSize:13, cursor: 'pointer'}}}>{I18n('cancelar')}</div>
          </div>

        </div>
      </section>
    );
  }
}

const Container = connect(store => ({ account: store.account }) )( Forgot );
export default Container;


const styles = {

  wrapper: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundImage: 'url(/img/main-bg@2x.jpg)',
    backgroundSize: 'cover'
  },

    title: {
      margin: '48px auto',
      display: 'block'
    },

    form: {
      flex: 1,
      paddingLeft: 32,
      paddingRight: 32,
    },


    login: {
      paddingLeft: 20,
      paddingRight: 20,
      paddingBottom: 24
    },



    input: {
      borderBottom: 'solid 1px #fff',
      marginBottom: 18,
      opacity: 0.8,
    },
      input_field: {
        display: 'block',
        width: '100%',
        border: 'none',
        backgroundColor: 'transparent',
        color: '#fff',
        padding: '8px 0',
        fontSize: 18
      },
      input_focused: {
        opacity: 1
      },


    forgot: {
      textAlign: 'center',
      paddingTop: 20,
    },

    forgot_link: {
      color: '#fff',
      padding: 4,
      marginBottom: 20,
      textDecoration: 'none'
    },


    submit: {
      borderRadius: 3,
      padding: 13,
      textAlign: 'center',
      color: '#532880',
      marginTop: 20,
      backgroundColor: '#fff',
      cursor: 'pointer'
    },



    alternative: {
      display: 'flex',
      flexDirection: 'row',
      padding: 20,
      paddingTop: 24
    },

      create: {
        flex: 1,
        display: 'flex',
        border: '1px solid #fff',
        borderRadius: 3,
        padding: 8,
        marginRight: 12,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        cursor: 'pointer'
      },
      facebook: {
        border: '1px solid #cdcdcd',
        backgroundColor: '#3b5998',
        flex: 1,
        display: 'flex',
        borderRadius: 3,
        padding: 8,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        marginLeft: 12,
        cursor: 'pointer',
        fontSize: 13
      }
};
