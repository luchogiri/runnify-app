// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router'


class Tabs extends Component {

  constructor(props: Object) {
    super(props);
    this.state = {};
  }

  render() {

    return (
      <section className="tabs">
        <Link to="/"
              className={"home " + (
                this.props.path == '/' ||
                this.props.path.match(/\/events|\/search/)? 'active': '')}><span /></Link>

        <Link to="/alerts"
              className={"alerts " +(
                this.props.path == '/alerts'? 'active':'')}><span /></Link>

        <Link to="/favorites"
              className={"favorites " +(
                this.props.path == '/favorites'? 'active':'')}><span /></Link>

        <Link to="/profile"
              className={"profile " + (
                this.props.path == '/profile' ||
                this.props.path == '/profile/account' ||
                this.props.path == '/profile/registered' ||
                this.props.path == '/profile/create'? 'active':'')}><span /></Link>
      </section>
    );
  }
}

const Container = connect(store => store)( Tabs );
export default Container;
