// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import moment from 'moment';

import I18n from '../helpers/i18n';
import Events from '../services/events';
import Account from '../actions/account';
import Config from '../actions/config';

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

  constructor(props) {
    super(props);
    this.state = { event: { social: {} } };
  }

  componentDidMount() {
    this.retrieveEvent();
  }

  componentDidUpdate() {
    if (this.state.event._id != this.props.params.id)
      this.retrieveEvent();
  }

  retrieveEvent = () => {
    Events.RetrieveById(this.props.params.id).then(
      event => this.setState({ event: { ...this.state.event, ...event }})
    );
  };

  addFavorite = () => {
    if (!this.props.account.logged_in) return this.props.dispatch( Config.Update({ show_login: true }));
    this.props.dispatch( Account.SaveFavorite({ _id: this.state.event._id }, this.props.account.token));
  };

  removeFavorite = () => {
    this.props.dispatch( Account.DeleteFavorite({ _id: this.state.event._id }, this.props.account.token));
  };

  onRegister = () => {
    if (!this.props.account.logged_in) return this.props.dispatch( Config.Update({ show_login: true }));
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
      <div className='event-detail'>
        <div className='event-detail-back'>
          <Link to={this.props.back || '/'}><img src='/img/icon-header-go@2x.png' /></Link>
        </div>

        <EventHeader {...this.state.event} />

        <div style={styles.actions}>
          {!!this.props.account.registered.filter(r => r && r.event == this.state.event._id).length ?
            <div style={{...styles.actions_btn, ...styles.actions_register}} onClick={this.onUnregister}>
              <h3 style={styles.actions_text}>{I18n('Yo Corro!')}</h3>
            </div>:
            <div style={{...styles.actions_btn, ...styles.actions_register}} onClick={this.onRegister}>
              <h3 style={styles.actions_text}>{I18n('Asistiré')}</h3>
            </div>}

          {this.props.account.favorites.indexOf(this.state.event._id) != -1 ?
            <div style={{...styles.actions_btn, ...styles.actions_like}} onClick={this.removeFavorite}>
              <img src='/img/icon-list-like-a@2x.png' style={{width:18,height:18}} />
            </div>:
            <div style={{...styles.actions_btn, ...styles.actions_like}} onClick={this.addFavorite}>
              <img src='/img/icon-list-like-i@2x.png' style={{width:20,height:20}} />
            </div>}

          <div style={styles.actions_social}>
            {!!this.state.event.social.facebook &&
            <Link
              style={{...styles.actions_btn, ...styles.actions_facebook}}
              to={this.state.event.social.facebook}
              target='_BLANK'>
              <img src='/img/icon-social-facebook@2x.png' style={{height: 22}} />
            </Link>}

            {!!this.state.event.social.twitter &&
            <Link
              style={{...styles.actions_btn, ...styles.actions_twitter}}
              to={this.state.event.social.twitter}
              target='_BLANK'>
              <img src='/img/icon-social-twitter@2x.png' style={{height: 22}} />
            </Link>}

            {!!this.state.event.social.web &&
            <Link
              style={{...styles.actions_btn, ...styles.actions_web}}
              to={this.state.event.social.web}
              target='_BLANK'>
              <img src='/img/icon-social-web@2x.png' style={{height: 22}} />
            </Link>}
          </div>
        </div>


        <div className='content'>

          {this.state.event.runners && !!this.state.event.runners.length &&
          <div className='runners'>
            <h3>
              <span style={{color: '#3f006d'}}>{this.state.event.runners.length}&nbsp;
                {this.state.event.runners.length === 1? I18n('corredor asistirá'): I18n('corredores asistirán')}
              </span>
            </h3>

            <div className='runners-list'>
              <ul style={{width: this.state.event.runners.length*152}}>
                {(this.state.event.runners || []).map((runn, i) =>
                  <li key={i}>
                    <Link to={`/runner/${runn._id}`}>
                      {!runn.picture ?
                        <div className='runner-picture' style={{backgroundImage: 'url(/img/placeholder-user-picture@2x.png)'}} />:
                        <div className='runner-picture' style={{backgroundImage: 'url('+runn.picture+')'}} />}
                      <h4>{runn.first_name} {runn.last_name}</h4>
                      <h5>{I18n('Carreras')}</h5>
                      <h5 style={{marginTop: 4, fontWeight: 600}}>{(runn.registered || []).length}</h5>
                    </Link>
                  </li>)}
              </ul>
            </div>
          </div>}


          {this.state.event.activities && !!this.state.event.activities.length &&
          <div className='activities'>
            <h3>{I18n('Carreras')}</h3>

            <ul>
              {this.state.event.activities.sort(this.sortActivities).map((data, i) =>
                <li key={i}>
                  <div className='description'>
                    <h4 style={styles.row_text}>{data.name}</h4>
                    <h5 style={styles.row_subtext}>
                      {moment(data.start_date).utc().format('D')}&nbsp;
                      {I18n(moment(data.start_date).utc().format('MMM'))} -&nbsp;
                      {moment(data.start_date).utc().format('HH:mm')} hs.
                    </h5>
                  </div>
                  <p className={checkType(data.disciplines)}>
                    {getDistance(data.disciplines)}
                  </p>
                </li>
              )}
            </ul>
          </div>}


          {this.state.event.link &&
            <Link className='row_button' to={this.state.event.link} target='_BLANK'>{I18n('Inscribirse')}</Link>}

          <a className='row_button'
                style={{fontSize:14}}
                href={'mailto:cambios@runnify.com?Subject=Solicitud cambio en evento '+this.state.event.name}>
            {I18n('Reportar error o cambio en carrera')}</a>
        </div>

      </div>
    );
  }
}


const Container = connect(store => store)( Event );
export default Container;

const styles = {

  actions: {
    height: 40,
    display: 'flex',
    flexDirection: 'row'
  },

  actions_btn: {
    width: 36,
    height: 36,
    marginLeft: 24,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#510c80',
    border: 'solid 1px #ffffff',
    borderRadius: 21,
    cursor:'pointer'
  },
  actions_register: {
    width: 120,
    height: 42,
    borderRadius: 4,
    position: 'relative',
    top: -21
  },
  actions_text: {
    color: '#ffffff',
    fontSize: 18
  },

  actions_like: {
    position: 'relative',
    height: 42,
    width: 42,
    top: -21,
  },

  actions_social: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
    marginRight: 24,
    position: 'relative',
    top: -16
  },

  actions_facebook: {
    backgroundColor: '#3b5998',
    marginLeft: 12,
  },
  actions_twitter: {
    backgroundColor: '#4099FF',
    marginLeft: 12,
  },
  actions_web: {
    backgroundColor: '#510c80',
    marginLeft: 12,
  },

};
