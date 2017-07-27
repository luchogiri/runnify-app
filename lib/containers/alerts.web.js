// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';

import I18n from '../helpers/i18n';
import Account from '../actions/account';

import Onboarding from './onboarding';


const checkType = (distance) => {
  return distance == '42-200'   ? 'SUPERHERO' :
         distance == '21-41.99' ? 'ATHLETE' :
         distance == '10-20.99' ? 'SPORTY' :
                                  'ENJOYER';
};


class Alerts extends Component {

  constructor(props) {
    super(props);
    this.state = { alerts: [], refreshing: false };
  }

  componentDidMount() {
    this.retrieveAlerts();
  }

  retrieveAlerts = () => {
    this.setState({ refreshing: true });
    this.props
      .dispatch( Account.RetrieveAlerts( this.props.account.token ) )
      .then(
        data => { this.setState({ refreshing: false, alerts: data }); },
        err => { this.setState({ refreshing: false }); }
      );
  };

  check = (idx) => {
    return () => {
      let alert = this.state.alerts[idx];
      alert.checked = !alert.checked;
      this.setState({ alerts : this.state.alerts });
    };
  };

  checked = () => {
    return this.state.alerts.filter( a => a.checked ).length;
  };

  onDelete = () => {
    this.state.alerts
      .filter( a => a.checked )
      .forEach(a => this.props.dispatch( Account.DeleteAlert( a, this.props.account.token ) ));
    this.setState({ alerts: this.state.alerts.filter( a => !a.checked ) });
  };

  render() {
    return (

      <section style={styles.wrapper}>
        <div style={styles.alerts}>

          {!this.state.alerts.length &&
            <div style={styles.empty}>
              <img style={styles.empty_img} src='/img/placeholder-alerts@2x.png' />
              <p style={styles.empty_text}>{I18n('¡Todavía no creaste ningún alerta!')}</p>
            </div>}


          {this.state.alerts.map((data,i) => {

            let query = JSON.parse(data.query.replace(/'/g, '"'));
            let description = I18n('Carreras ');
            if (query.search) description += query.search;
            else description += '#' + checkType(query.query.distance);
            return (
              <div key={data._id} style={styles.row}>
                <div style={styles.row_check} onClick={this.check(i)}>
                  {data.checked ?
                    <img src='/img/icon-check-checked@2x.png' style={styles.check} /> :
                    <img src='/img/icon-check-unchecked@2x.png' style={styles.check}/>}
                </div>
                <div style={styles.row_text}>{description}</div>
              </div>)
          })}
        </div>

        {this.props.children || <Onboarding />}
      </section>
    );
  }
}


const Container = connect(store => ({ account:store.account }) )( Alerts );
export default Container;


const styles = {

  wrapper: {
    flex: 1,
    display: 'flex'
  },

  alerts: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f4f4f4'
  },

  empty: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 100
  },
  empty_img: {
    height: 120,
    width: 120
  },
  empty_text: {
    marginTop: 24,
    color: '#9b9b9b',
    textAlign: 'center',
    fontSize: 16,
  },


  row: {
    height: 52,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    textDecoration: 'none',
    color: '#767676'
  },

    row_check: {
      width: 52,
      alignItems: 'center',
      justifyContent: 'center'
    },

    row_text: {
      color: '#4a4a4a'
    },

    check: {
      height: 24,
      width: 24,
      marginLeft: 12
    }

};
