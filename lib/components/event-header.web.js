// @flow

import React, { Component } from 'react';

import moment from 'moment';
import I18n from '../helpers/i18n';


const getFlag = (country) => {
  const flags = {
    'Argentina': '/img/icon-row-flag-ar@2x.png',
    'Brasil': '/img/icon-row-flag-br@2x.png',
    'México': '/img/icon-row-flag-mx@2x.png',
    'Uruguay': '/img/icon-row-flag-uy@2x.png',
    'Paraguay': '/img/icon-row-flag-py@2x.png',
    'Bolivia': '/img/icon-row-flag-bo@2x.png',
    'Colombia': '/img/icon-row-flag-co@2x.png',
    'Chile': '/img/icon-row-flag-ch@2x.png',
    'Perú': '/img/icon-row-flag-pe@2x.png'
  };
  return flags[country];
};


const checkType = (activities = []) => {
  let distance = 0;
  activities.forEach(a => {
    a.disciplines.forEach(d => {
      if (d.distance > distance) distance = d.distance;
    });
  });

  return distance > 41.99 ? 'SUPERHERO' :
         distance > 20.99 ? 'ATHLETE' :
         distance > 9.99 ?  'SPORTY' :
                            'ENJOYER';
};

const getDistance = (activities = []) => {
  let distances = [];
  let distance = 0;
  activities.forEach(a => {
    a.disciplines.forEach(d => {
      if (d.distance > distance) {
        distance = d.distance;
        distances = a.disciplines.map(d => (d.distance < 1? (d.distance*100)+'m': d.distance+'K'));
      }
    });
  });
  return distances.join(' ');
};


const EventHeader = (props) => (
  <header>
    <div className='item-content'>
      <h2 className={'F_'+checkType(props.activities)}>{props.name}</h2>
      <p className={'F_'+checkType(props.activities)}>{getDistance(props.activities)}</p>
    </div>

    <ul className='item-labels'>
      <li><img src={getFlag(props.country)} /></li>
      <li>{props.state}</li>
      <li>{moment(props.start_date).format('D')}&nbsp;{I18n(moment(props.start_date).format('MMM'))}</li>
      <li>{I18n(props.category)}</li>
      <li className={checkType(props.activities)}>#{checkType(props.activities)}</li>
    </ul>
  </header>
);

export default EventHeader;