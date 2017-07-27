// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';


import I18n from '../helpers/i18n';
import Events from '../actions/events';


class Filters extends Component {

  constructor(props: Object) {
    super(props);
    this.state = {};
  }

  reset = () => {
    this.props.dispatch( Events.ClearFilters() );
  };

  checkNearMe = () => {
    this.props.dispatch( Events.UpdateFilters({ show_nearme: !this.props.events.show_nearme }) );
  };

  onSelect = (type) => {
    return (item) => {
      if ( this.props.events.query[type] == item ) return;
      let data = { ...this.props.events.query, [type]: item };
      if (type == 'country') data.state = undefined;
      this.props.dispatch( Events.UpdateFilters({ query: data }) );
    };
  };

  navigate = (to, data) => {
    //return this.props.events.show_nearme? () => {} : this.props.navigator.screen(to, data);
  };

  onDone = () => {
    this.props.dispatch( Events.Retrieve( this.props.events ) );
    //this.props.navigator.pop();
  };


  render() {
    return (
      <section className="filters">

        <div className="filters-back">
          <Link to='/'>
            <img src='/img/icon-header-go@2x.png' />
          </Link>
        </div>

        <ul>
          <li className="row_nearme" onClick={this.checkNearMe}>
            <div style={styles.row_label}>
              <p style={styles.row_label_text}>{I18n('Cerca de mi ubicación')}</p>
            </div>
            <div className="row_nearme_check" style={!this.props.events.show_nearme? null:{backgroundImage: 'url(/img/icon-checked@2x.png)'}} />
          </li>

          <li className={this.props.events.show_nearme? 'row_disabled':''}>
            <div style={styles.row_label}>
              <p style={styles.row_label_text}>{I18n('PAÍS')}</p>
              <p style={styles.row_label_subtext}>{this.props.events.query.country || 'Todos'}</p>
            </div>
          </li>

          <li className={!this.props.events.query.country || this.props.events.show_nearme? 'row_disabled':''}>
            <div style={styles.row_label}>
              <p style={styles.row_label_text}>{I18n('PROVINCIA')}</p>
              <p style={styles.row_label_subtext}>{this.props.events.query.state || 'Todas'}</p>
            </div>
          </li>

          <li>
            <div style={styles.row_label}>
              <p style={styles.row_label_text}>{I18n('CATEGORÍA')}</p>
              <p style={styles.row_label_subtext}>{I18n(this.props.events.query.category) || 'Todas'}</p>
            </div>
          </li>
        </ul>

        <footer>
          <div onClick={this.reset}>{I18n('Restablecer')}</div>
          <div onClick={this.onDone}>{I18n('Aplicar')}</div>
        </footer>
      </section>
    );
  }
}


const Container = connect(store => ({ config: store.config, events: store.events }))( Filters );
export default Container;


const styles = {

    row_label: {
      flex: 1,
      justifyContent: 'center'
    },
      row_label_text: {
        color: '#ffffff',
        fontSize: 18
      },
      row_label_subtext: {
        color: '#d9d9d9',
        fontSize: 16,
        marginTop: 8
      }

};
