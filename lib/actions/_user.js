// @flow
import Events from '../actions/events';
import EventsService from '../services/events';

export const UserActions = {

 SHOW_NAME: 'app/user/show_name',
 SHOW_USER: 'app/user/show_user',
 SHOW_ALERTS: 'app/user/show_alerts',
 SHOW_FAVORITES: 'app/user/show_favorites',
 UPDATE_NAME: 'app/user/update_name',
 UPDATE_TERM: 'app/user/update_term',
 UPDATE_EMAIL: 'app/user/update_email',
 UPDATE_PASSWORD: 'app/user/update_password',
 UPDATE_PROFILE: 'app/user/update_profile',
 UPDATE_DISCONECT: 'app/user/update_disconect',
};

import {
    Alert
} from 'react-native';

const User = {

    Saveuser: (data:Object) => {

        return async dispatch => {
            dispatch(Events.loading(true));
            let datas = await EventsService.Saveuser(data);
            //dispatch(Events.showevents(data));
            dispatch(Events.loading(false));
        };
    },

    Verusuarios: () => {

        return async dispatch => {
            dispatch(Events.loading(true));
            let datas = await EventsService.RetrieveSearch();
            //dispatch(Events.showevents(data));
            dispatch(Events.loading(false));
        };
    },

  ShowUser: () => {
    return { type: UserActions.SHOW_USER };
  },

  ShowName: () => {
    return { type: UserActions.SHOW_NAME };
  },

  ShowAlerts: () => {
    //let alerts = [{id:1,name:'Alerta 1'},{id:2,name:'Alerta 2'},{id:3,name:'Alerta 3'}];
    let alerts = [];
    return { type: UserActions.SHOW_ALERTS, alerts: alerts };
  },

  ShowFavorites: () => {
    //let favorites = [{id:1,name:'Mizuno half marathon 2016',loc:'Buenos Aires - 9 Oct.',dis:'42k'},{id:2,name:'Carrera Brasil',loc:'Buenos Aires - 20 Oct.',dis:'10k'},{id:3,name:'Puna Race',loc:'Buenos Aires - 3 Oct.',dis:'3k'}];
    return { type: UserActions.SHOW_FAVORITES };
  },

  UpdateFavorites: (favorites: Array) => (
    {
        type: UserActions.UPDATE_FAVORITES,
        favorites: favorites
    }
  ),

  UpdateName: (name: String) => (
    {
      type: UserActions.UPDATE_NAME,
      name: name
    }
  ),

  UpdateTerm: (term: String) => (
    {
      type: UserActions.UPDATE_TERM,
      term: term
    }
  ),

  UpdateEmail: (email: String) => (
    {
      type: UserActions.UPDATE_EMAIL,
      email: email
    }
  ),

  UpdatePassword: (pass: String) => (
    {
      type: UserActions.UPDATE_PASSWORD,
      password: pass
    }
  ),

  updateProfile:(name: String, email: String) => (
    {
      type: UserActions.UPDATE_PROFILE,
      name: name,
      email: email
    }
  ),
  updateDisconect:(disconect: Boolean) => (
    {
      type: UserActions.UPDATE_DISCONECT,
      disconect: disconect
    }
  )

};

export default User;
