// @flow

import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import I18n from '../helpers/i18n';

import Login from './login';
import Register from './register';
import Forgot from './forgot';


class Modal extends Component {

  constructor(props) {
    super(props);
    this.state = { loaded: false, step: 'login' };
  }

  componentDidMount() {
    setTimeout(() => this.setState({ loaded: true }), 50);
  }

  onClose = () => {
    this.setState({ loaded: false });
    setTimeout(this.props.close, 400);
    if (this.props.path == '/login')
      browserHistory.replace('/');
  };

  onRegister = () => {
    this.setState({ step: 'register' });
  };

  onLogin = () => {
    this.setState({ step: 'login' });
  };

  onForgot = () => {
    this.setState({ step: 'forgot' });
  };


  render() {
    return (
      <section className={'modal '+ (this.state.loaded? 'modal_loaded':'')}>
        <section className="modal_close" onClick={this.onClose} />
        <section className="login">
          {this.state.step == 'login' && <Login closeModal={this.onClose} register={this.onRegister} forgot={this.onForgot} />}
          {this.state.step == 'register' && <Register closeModal={this.onClose} login={this.onLogin} />}
          {this.state.step == 'forgot' && <Forgot closeModal={this.onClose} login={this.onLogin} />}
        </section>
      </section>
    );
  }
}

// const Container = connect(store => ({ account: store.account }) )( Login );
export default Modal;
