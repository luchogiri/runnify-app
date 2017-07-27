
// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import I18n from '../helpers/i18n';

import Account from '../actions/account';


class Register extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      repeat: '',
      accept: false,
      error: false,
      serverError: false,
      submitted: false
    };
  }

  handleInput = (field) => {
    return (ev) => {
      this.setState({ [field] : ev.target.value });
    };
  };

  validateEmpty = (field) => {
    if (!this.state[field]) return '*El campo es obligatorio';
    return false;
  };

  validateEmail = () => {
    if (this.validateEmpty('email')) return this.validateEmpty('email');
    let regexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regexp.test(this.state.email)) return I18n('*El formato de email es incorrecto.');
    else return false;
  };

  validatePassword = () => {
    if (this.validateEmpty('password')) return this.validateEmpty('password');
    if (this.state.password.length < 8) return I18n('*La contraseña es demasiado corta.');
    return false;
  };

  validateRepeat = () => {
    if (this.validateEmpty('repeat')) return this.validateEmpty('repeat');
    if (this.state.password != this.state.repeat) return I18n('*Las contraseñas deben coincidir.');
    return false;
  };

  submit = () => {
    this.setState({ submitted: true, error: false });
    if (this.state.loading) return false;

    let error = this.state.error;
    error = this.validateEmpty('first_name') || error;
    error = this.validateEmpty('last_name') || error;
    error = this.validateEmail() || error;
    error = this.validatePassword() || error;
    error = this.validateRepeat() || error;
    if (error) return this.setState({ error });

    if (!error) {
      this.setState({loading: true, error: false, submitted: false});
      this.props.dispatch(Account.Register(this.state)).then(this.onCreated, this.onError);
    }
  };


  onCreated = () => {
    this.setState({ loading: false });
    this.props.closeModal();
  };

  onError = (err) => {
    // console.log(err);
    this.setState({ loading: false, serverError: err });
  };


  onFacebookLogin = () => {
    this.props.dispatch( Account.FBLogin() ).then((ok) => {
      this.onCreated();
    }, (error) => {
      console.log("error de cancelacion de cuenta facebook");
    });
  };


  render() {
    return (
      <section style={styles.wrapper}>
        <img style={styles.title} src='/img/runnify-logo@2x.png' alt='Runnify' height='56' />

        <div style={styles.form}>

          <div style={styles.login}>

            {!!this.state.error && <p className="error_msg">{this.state.error}</p>}

            <div style={styles.input}>
              <input type="text"
                     name='first_name'
                     style={styles.input_field}
                     placeholder='Nombre *'
                     value={this.state.first_name}
                     onChange={this.handleInput('first_name')} />
            </div>

            <div style={styles.input}>
              <input type="text"
                     name='last_name'
                     style={styles.input_field}
                     placeholder='Apellido *'
                     value={this.state.last_name}
                     onChange={this.handleInput('last_name')} />
            </div>

            <div style={styles.input}>
              <input type="text"
                     name='email'
                     style={styles.input_field}
                     placeholder='E-mail *'
                     value={this.state.email}
                     onChange={this.handleInput('email')} />
            </div>

            <div style={styles.input}>
              <input type="password"
                     name='password'
                     style={styles.input_field}
                     placeholder={I18n('Contraseña *')}
                     value={this.state.password}
                     onChange={this.handleInput('password')} />
            </div>

            <div style={styles.input}>
              <input type="password"
                     name='repeat'
                     style={styles.input_field}
                     placeholder={I18n('Repetir contraseña *')}
                     value={this.state.repeat}
                     onChange={this.handleInput('repeat')} />
            </div>

            <div style={styles.submit} onClick={this.submit}>{I18n('Crear')}</div>
          </div>


          <div style={styles.alternative}>
            <div style={styles.create} onClick={this.props.login}>{I18n('Cancelar')}</div>
            <div style={styles.facebook} onClick={this.onFacebookLogin}>{I18n('Ingresar con Facebook')}</div>
          </div>

        </div>
      </section>
    );
  }
}

const Container = connect(store => ({ account: store.account }) )( Register );
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
      borderBottom: '1px solid #eee',
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
