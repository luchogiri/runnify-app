// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import I18n from '../helpers/i18n';
import Config from '../actions/config';
import Tabs from './tabs';
import Modal from './modal';


class Main extends Component {


  constructor(props:Object) {
    super(props);
    this.state = { complete: false, error: false, modal: false };
  }

  componentDidMount() {
    this.retrieveConfig();
    setTimeout( () => { !this.props.account.logged_in && this.props.config.show_login ? this.openModal(): null }, 2000);
  }

  retrieveConfig = () => {
    this.setState({ complete: false, error: false});
    this.props
      .dispatch( Config.Retrieve() )
      .then( this.onConfigReceived, this.onConfigError );
  };

  onConfigReceived = () => {
    this.setState({ complete: true, error: false });
  };

  onConfigError = () => {
    this.setState({ complete: false, error: true });
  };

  openModal = () => {
    this.props.dispatch( Config.Update({ show_login: true }));
  };
  closeModal = () => {
    this.props.dispatch( Config.Update({ show_login: false }));
  };


  render() {

    let content = null;

    if (this.state.error) {
      content = <div className="loading">
        <p>{I18n('Ha ocurrido un problema de conexión')}</p>
        <p onClick={this.retrieveConfig}>
          <span>{I18n('reintentar')}</span>
        </p>
      </div>;
    }

    else if (this.state.complete) {
      content = <div className="wrapper" style={{'flexDirection':'column'}}>
        <header className="header">
          <img src='/img/icon-runnify@2x.png' style={{height: 24, marginLeft: 24}} />
          <img src='/img/runnify-logo@2x.png' style={{height: 24, marginLeft: 40}} />

          <section style={{flex: 1, display: 'flex', justifyContent: 'flex-end'}}>
            {!this.props.account.logged_in ?
              <section onClick={this.openModal} style={{width: 120, textAlign: 'center', cursor: 'pointer'}}>ingresar</section>:
              <section style={{width: 200, textAlign: 'center'}}>Bienvenido, {this.props.account.first_name}</section>}
          </section>
        </header>

        <main className="wrapper">
          <Tabs path={this.props.location.pathname} />
          {this.props.children}
        </main>

        {(this.props.config.show_login || this.props.location.pathname == '/login') &&
          <Modal close={this.closeModal} path={this.props.location.pathname} />}
      </div>
    }

    else {
      content = <div className="loading">...</div>;
    }

    return (
      <div className="wrapper">{content}</div>
    );
  }
}



const Container = connect(store => store)( Main );
export default Container;
