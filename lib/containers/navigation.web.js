
import React, { Component } from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import Main from './main';
import Home from './home';
import Event from './event';
import Filters from './filters';
import Profile from './profile';
import Favorites from './favorites';
import Alerts from './alerts';
import Login from './login';
import Account from './account';
import Create from './create';

class Navigator extends Component {

  constructor(props: Object) {
    super(props);
  }

  checkAuth = (router, replace) => {
    let state = this.props.store.getState();
    let account = state.account || {};
    console.log(state);
    if (!account.logged_in)
      replace({
        pathname: '/login',
        state: { nextPathname: router.location.pathname }
      });
  };


  routes = (
    <Route component={Main}>

      <Route path="/" component={Home}>
        <IndexRoute />
        <Route path="events" />
        <Route path="events/filters" component={Filters} />
        <Route path="events/:id" component={Event} />
        <Route path="search/:term" />

        <Router path="login" component={Login} />
      </Route>

      <Route path="/alerts" component={Alerts}>
        <IndexRoute />
        <Route path=":id" />
      </Route>

      <Route path="/favorites" component={Favorites}>
        <IndexRoute />
        <Route path=":id" component={Event} />
      </Route>

      <Route path="/profile" component={Profile}>
        <IndexRoute />
        <Route path="account" component={Account} onEnter={this.checkAuth} />
        <Route path="registered" onEnter={this.checkAuth} />
        <Route path="create" component={Create} onEnter={this.checkAuth} />
      </Route>
    </Route>
  )

  render() {
    return(
      <Router history={browserHistory} routes={this.routes} />
    );
  }
}

export default Navigator;