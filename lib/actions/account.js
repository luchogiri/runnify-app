// @flow

import AccountService from '../services/account';
import moment from 'moment';


export default class Account {

  // store initial state
  static InitialState = {
    logged_in: false,
    fist_name: undefined,
    last_name: undefined,
    password: undefined,
    name: undefined,
    email: undefined,
    picture: undefined,
    registered: [],
    notifications: undefined,
    favorites: [],
    alerts: []
  };


  // action types
  static SAVE = 'app/account/save';
  static CLEAR = 'app/account/clear';
  static ADD_FAVORITE = 'app/account/add_favorite';
  static REMOVE_FAVORITE = 'app/account/remove_favorite';
  static ADD_ALERT = 'app/account/add_alert';
  static REMOVE_ALERT = 'app/account/remove_alert';
  static ADD_REGISTERED = 'app/account/add_registered';
  static REMOVE_REGISTERED = 'app/account/remove_registered';


  // action creators

  // account

  static Login() {
    return async(dispatch) => {
      await AccountService.Login();
      let data = await AccountService.GetInfo();
      //console.log("#############");
      //console.log(data);
      dispatch( Account.Save( data ) );
      //let response = await AccountService.SignUp( data );
    }
  }

  static Signin(data) {
    return async(dispatch) => {
      let response = await AccountService.Signin( data );
      dispatch( Account.Save( response ) );
      // esto no se porque viene siempre en false asi que se lo puse a mano
      dispatch( Account.Save( {logged_in:true} ) );
    }
  }

  static FBLogin() {
    return async(dispatch) => {
      let auth = await AccountService.FBLogin();
      let data = await AccountService.FBInfo();
      let res = await AccountService.FBSignIn(data);
      dispatch( Account.Save({ ...res, logged_in: true }) );
    }
  }

  static FBLogout() {
    AccountService.FBLogout();
    return { type: Account.CLEAR };
  }

  static Register(data) {
    return async(dispatch) => {
      let response = await AccountService.SignUp( data );
      // esto no se porque viene siempre en false asi que se lo puse a mano
      dispatch( Account.Save( {logged_in:true} ) );
      dispatch( Account.Save( response ) );
    }
  }

  static Save( data ) {
    return { type: Account.SAVE, data: data };
  }

  static Update(data, token) {
    return async(dispatch) => {
      let response = await AccountService.Update( data, token );
      dispatch( Account.Save( response ) );
    }
  }

  static Saveindb( data:Object ){
    return async(dispatch) => {
      let pepe = await AccountService.Saveuserdb(data);
    }
  }

  static Getuser(){
    return async(dispatch) => {
      //await AccountService.Getuserdb();
      let data = await AccountService.Getuserdb();
      //console.log(data);
      dispatch( Account.Save( data ) );
      //dispatch(Events.showfakeuser(data));
    }
  }

  static Showfakeuser( data ){
    //return { type: Account.SHOWFAKEUSER, data: data }
  }

  static Logout() {
    AccountService.Logout();
    return { type: Account.CLEAR };
  }



  // alerts

  static RetrieveAlerts( token ) {
    return async(dispatch) => {
      return await AccountService.GetAlerts(token);
    }
  }

  static SaveAlert( data, token ) {
    return async(dispatch) => {
      let response = await AccountService.SaveAlert(data, token);
      dispatch( Account.AddAlert( response ));
    }
  }

  static AddAlert( data:Object ){
    return {
      type: Account.ADD_ALERT, data
    }
  }

  static DeleteAlert( data, token ) {
    return async(dispatch) => {
      await AccountService.DeleteAlert( data, token );
      dispatch( Account.RemoveAlert( data ) );
    }
  }

  static RemoveAlert( data:Object ) {
    return {
      type: Account.REMOVE_ALERT, data
    }
  }


  // favoritos

  static RetrieveFavorites( token ) {
    return async(dispatch) => {
      let favs = await AccountService.GetFavorites(token);
      return favs.filter( f => moment().startOf('day').isBefore( moment(f.start_date)));
    }
  }


  static SaveFavorite( data, token ){
    return async(dispatch) => {
      let response = await AccountService.SaveFavorite(data, token);
      dispatch( this.AddFavorite( response ) );
    }
  }

  static AddFavorite( data:Object ){
    return {
      type: Account.ADD_FAVORITE, data
    }
  }


  static DeleteFavorite(data, token) {
    return async(dispatch) => {
      await AccountService.DeleteFavorite( data, token );
      dispatch( Account.RemoveFavorite( data ) );
    }
  }

  static RemoveFavorite( data:Object ) {
    return {
      type: Account.REMOVE_FAVORITE, data
    }
  }


  // register

  static RetrieveRegistered(token) {
    return async(dispatch) => {
      return await AccountService.GetRegistered(token);
    }
  }

  static SaveRegistered( data, token ){
    return async(dispatch) => {
      let response = await AccountService.SaveRegistered(data, token);
      dispatch( this.AddRegistered( response ) );
    }
  }

  static AddRegistered( data:Object ){
    return {
      type: Account.ADD_REGISTERED, data
    }
  }

  static DeleteRegistered(data, token) {
    return async(dispatch) => {
      await AccountService.DeleteRegistered( data, token );
      dispatch( Account.RemoveRegistered( data ) );
    }
  }

  static RemoveRegistered( data:Object ) {
    return {
      type: Account.REMOVE_REGISTERED, data
    }
  }
}
