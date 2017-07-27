// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router'

import moment from 'moment';
import I18n from '../helpers/i18n';
import Account from '../actions/account';

import Onboarding from './onboarding';


const checkType = (distance) => {
  return distance > 41.99 ? 'SUPERHERO' :
         distance > 20.99 ? 'ATHLETE' :
         distance > 9.99 ?  'SPORTY' :
                            'ENJOYER';
};


class Favorites extends Component {


  constructor(props) {
    super(props);
    this.state = { favorites: [], refreshing: false };
  }

  componentDidMount() {
    this.retrieveFavorites();
  }


  retrieveFavorites = () => {
    this.setState({ refreshing: true });
    this.props
      .dispatch( Account.RetrieveFavorites( this.props.account.token ) )
      .then(
        data => { this.setState({ refreshing: false, favorites: data }); },
        err => { this.setState({ refreshing: false }); }
      );
  };

  check = (idx) => {
    return () => {
      let favorite = this.state.favorites[idx];
      favorite.checked = !favorite.checked;
      this.setState({ favorites : this.state.favorites });
    };
  };

  checked = () => {
    return this.state.favorites.filter( f => f.checked ).length;
  };

  onDelete = () => {
    this.state.favorites
      .filter( f => f.checked )
      .forEach(f => this.props.dispatch( Account.DeleteFavorite( f, this.props.account.token ) ));
    this.setState({ favorites: this.state.favorites.filter( f => !f.checked ) })
  };

  render() {
    return (

      <section style={styles.wrapper}>

        <div style={styles.favorites}>
          {!this.state.favorites.length &&
          <div style={styles.empty}>
            <img style={styles.empty_img} src='/img/placeholder-favorites@2x.png' />
            <p style={styles.empty_text}>{I18n('¡Todavía no tenés favoritos!')}</p>
          </div>}

          {this.state.favorites.map((data, i) =>
            <div style={styles.row} key={data._id}>
              <div style={styles.row_check} onClick={this.check(i)}>
                {data.checked ?
                  <img style={styles.check} src='/img/icon-check-checked@2x.png' />:
                  <img style={styles.check} src='/img/icon-check-unchecked@2x.png' />}
              </div>
              <Link style={styles.row_description} to={'/favorites/' + data._id}>
                <div style={styles.row_text}>{data.name}</div>
                <div style={styles.row_subtext}>
                  {data.state} -&nbsp;
                  {moment(data.start_date).format('D')} {I18n(moment(data.start_date).format('MMM'))}</div>
              </Link>
              <div style={[styles.row_number, styles[checkType(data.activities[0].disciplines[0].distance)]]}>
                {data.activities[0].disciplines[0].distance}
                {data.activities[0].disciplines[0].distance < 1? 'M':'K'}
              </div>
            </div>
          )}
        </div>

        {this.props.children || <Onboarding />}
      </section>
    );
  }
}


const Container = connect(store => ({ account:store.account }) )( Favorites );
export default Container;


const styles = {

  wrapper: {
    flex: 1,
    display: 'flex'
  },

  favorites: {
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
    height: 64,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    borderStyle: 'solid',
  },

  row_check: {
    width: 52,
    alignItems: 'center',
    justifyContent: 'center'
  },

  row_description: {
    flex: 1,
    height: 52,
    justifyContent: 'center',
    textDecoration: 'none',
    display: 'flex',
    flexDirection: 'column'
  },

  row_text: {
    color: '#4a4a4a',
    fontWeight: '500'
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

  check: {
    height: 24,
    width: 24,
    marginLeft: 12
  },

  ENJOYER: { color: '#21e4d5' },
  SPORTY: { color: '#fc4320' },
  ATHLETE: { color: '#bbee11' },
  SUPERHERO: { color: '#222529' }

};
