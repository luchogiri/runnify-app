
import { UserActions } from '../actions/_user';

const User = (

  state = { name: "", email: "", password: "", disconect: false, term: null, alerts:[],favorites:[] },
  action

) => {

  switch (action.type) {

    case UserActions.SHOW_FAVORITES:
        return { ...state};

    case UserActions.UPDATE_FAVORITES:
        return { ...state, favorites: action.favorites };

    case UserActions.SHOW_USER:
        return { ...state};

    case UserActions.SHOW_NAME:
      return { ...state, name: state.name || action.name };

    case UserActions.SHOW_ALERTS:
      return { ...state, alerts: action.alerts };

    case UserActions.SHOW_FAVORITES:
      return { ...state, favorites: action.favorites };

    case UserActions.UPDATE_NAME:
      return { ...state, name: action.name };

    case UserActions.UPDATE_TERM:
      return { ...state, term: action.term };

    case UserActions.UPDATE_EMAIL:
      return { ...state, email: action.email };

    case UserActions.UPDATE_PASSWORD:
      return { ...state, password: action.password };

    case UserActions.UPDATE_DISCONECT:
      return { ...state, disconect: action.disconect };


    default:
      return state;
  }

}

export default User;
