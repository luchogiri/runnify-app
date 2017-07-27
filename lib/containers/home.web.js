// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';

import I18n from '../helpers/i18n';

import Events from '../actions/events';
import EventRow from '../components/event-row';


class Home extends Component {


  constructor(props: Object) {
    super(props);
    this.state = { term: this.props.params.term || '' };
  }


  handleScroll = () => {
    if ( !this.props.events.items.length) return;
    if ( this.props.events.loading) return;
    if ((this.list.scrollTop+this.list.clientHeight) > (this.list.scrollHeight-300)) {
      if ( this.props.events.offset + 20 >= this.props.events.total ) return;
      this.props.dispatch( Events.Retrieve({ ...this.props.events, search: this.state.term, offset: this.props.events.offset + 20 }, true) );
    }
  };

  componentDidMount() {
    this.retrieveEvents();
    this.list.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    this.list.removeEventListener("scroll", this.handleScroll);
  }

  retrieveEvents = () => {
    this.props.dispatch( Events.Retrieve({ ...this.props.events, offset: 0 }) );
  };


  onSearch = (ev) => {
    let pre = this.state.term;
    this.setState({ term: ev.target.value });
    if (ev.target.value.length >= 3) {
      this.props.dispatch( Events.Retrieve({ ...this.props.events, search: ev.target.value, offset: 0 }) );
      browserHistory.push('/search/' + ev.target.value);
    }
    else {
      if (pre.length > ev.target.value.length && ev.target.value.length == 2) {
        this.retrieveEvents();
        browserHistory.push('/');
      }
    }
  };


  render() {
    return (
      <section className="home">

        <div className="container">
          <div className="search-bar">
            <div className="search-bar-field">
              <img src='/img/icon-header-search-a@2x.png' />
              <input
                type="text"
                placeholder={I18n('BUSCAR UNA CARRERA')}
                value={this.state.term}
                onChange={this.onSearch} />
            </div>
            <Link className="search-bar-filter" to='/events/filters'>
              <img src='/img/icon-header-filters-a@2x.png' />
              {I18n('FILTRAR')}
            </Link>
          </div>

          <div className="event-list" ref={list => this.list = list}>
            {this.props.events.loading && <div style={styles.info}>{I18n('cargando...')}</div>}
            {!!this.state.term.length && this.state.term.length < 3 && <div style={styles.info}>{I18n('Ingrese al menos 3 letras.')}</div>}
            {!this.props.events.items.length && !this.props.events.loading && <div style={styles.info}>{I18n('No encontramos resultados para')}</div>}
            {this.props.events.items.map((data, i) => <EventRow index={i} key={i} {...data} selected={this.props.params.id == data._id} />)}
          </div>
        </div>

        {this.props.location.pathname != '/login' && this.props.children}
      </section>
    );
  }
}

const Container = connect(store => ({ events:store.events , account:store.account }) )( Home );
export default Container;


const styles = {
  info: {
    margin: 10,
  }
};