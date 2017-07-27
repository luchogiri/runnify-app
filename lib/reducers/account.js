// @flow

import Account from '../actions/account';


const AccountReducer = (

  state: Object = { ...Account.InitialState },
  action: Object

) => {

  switch (action.type) {

    case Account.SAVE:
      return { ...state, ...action.data };

    case Account.ADD_FAVORITE:
      return { ...state, favorites: [ ...state.favorites, action.data._id ] };

    case Account.REMOVE_FAVORITE:
      return { ...state, favorites: state.favorites.filter(f => f != action.data._id) };

    case Account.ADD_ALERT:
      return { ...state, alerts: [ ...state.alerts, action.data._id ] };

    case Account.REMOVE_ALERT:
      return { ...state, alerts: state.alerts.filter(a => a != action.data._id) };

    case Account.ADD_REGISTERED:
      return { ...state, registered: [ ...state.registered, action.data ] };

    case Account.REMOVE_REGISTERED:
      return { ...state, registered: state.registered.filter(f => f.event != action.data.event) };


    case Account.CLEAR:
      return { ...Account.InitialState };

    default:
      return state;
  }
}

export default AccountReducer;
