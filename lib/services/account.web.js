// @flow
import ENV from '../env';
import Logger from '../helpers/logger';
import Fetch from '../helpers/fetch';

//import { LoginManager, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
//import { Platform } from 'react-native';

export default class AccountService {


  static Signin(data) {

    return new Promise(async (resolve,reject) => {
      let res;
      let method = 'POST';
      let body = JSON.stringify(data);

      try {
        let req = await Fetch( ENV.API_PATH + '/auth/signin', { method, body, headers: ENV.HEADERS } );
        res = await req.json();
      }

      catch(error){
        return reject(error);
      }

      if (res.success == false && !res.token) return reject(res);
      resolve(res);
    })
  }

  static SignUp(data) {

    return new Promise(async (resolve,reject) => {
      let res;
      let method = 'POST';
      let body = JSON.stringify(data);

      try {
        let req = await Fetch( ENV.API_PATH + '/auth/signup', { method, body, headers: ENV.HEADERS } );
        res = await req.json();
      }

      catch(error){
        return reject(error);
      }

      if (res.success == false && !res.token) return reject(res);
      resolve(res);
    })
  }


  static GetFavorites(token) {

    return new Promise(async (resolve,reject) => {
      let res;
      let headers = { ...ENV.HEADERS, authorization: token };

      try {
        let req = await Fetch( ENV.API_PATH + '/accounts/me/favorites', { headers } );
        res = await req.json();
      }

      catch(error){
        return reject(error);
      }

      if (res.success == false) return reject(res);
      resolve(res);
    })
  }

  static GetAlerts(token) {

    return new Promise(async (resolve,reject) => {
      let res;
      let headers = { ...ENV.HEADERS, authorization: token };

      try {
        let req = await Fetch( ENV.API_PATH + '/accounts/me/alerts', { headers } );
        res = await req.json();

      }

      catch(error){
        return reject(error);
      }

      if (res.success == false) return reject(res);
      resolve(res);
    })
  }

  static GetRegistered(token) {

    return new Promise(async (resolve,reject) => {
      let res;
      let headers = { ...ENV.HEADERS, authorization: token };

      try {
        let req = await Fetch( ENV.API_PATH + '/accounts/me/registered', { headers } );
        res = await req.json();

      }

      catch(error){
        return reject(error);
      }

      if (res.success == false) return reject(res);
      resolve(res);
    })
  }


  static SaveFavorite( data, token ){

    return new Promise(async (resolve,reject) => {
      let res;
      let method = 'post';
      let body = JSON.stringify(data);
      let headers = { ...ENV.HEADERS, authorization: token };
      try {
        let req = await Fetch( ENV.API_PATH + '/accounts/me/favorites', { method, body, headers } );
        res = await req.json();
      }
      catch(error){
        return reject(error);
      }

      if (res.success == false) return reject(res);
      resolve(res);
    })
  }

  static SaveAlert( data, token ){

    return new Promise(async (resolve,reject) => {

      let res;
      let method = 'post';
      let body = JSON.stringify({ query: data });
      let headers = { ...ENV.HEADERS, authorization: token };
      try {
        let req = await Fetch( ENV.API_PATH + '/accounts/me/alerts', { method, body, headers } );
        res = await req.json();
      }
      catch(error){
        return reject(error);
      }

      if (res.success == false) return reject(res);
      resolve(res);
    });
  }

  static SaveRegistered( data, token ){
    return new Promise(async (resolve,reject) => {
      let res;
      let method = 'post';
      let body = JSON.stringify(data);
      let headers = { ...ENV.HEADERS, authorization: token };
      try {
        let req = await Fetch( ENV.API_PATH + '/accounts/me/registered', { method, body, headers } );
        res = await req.json();
      }
      catch(error){
        return reject(error);
      }

      if (res.success == false) return reject(res);
      resolve(res);
    })
  }


  static DeleteFavorite(data, token) {

    return new Promise(async (resolve,reject) => {
      let res;
      let method = 'DELETE';
      let body = JSON.stringify({ _id: data._id });
      let headers = { ...ENV.HEADERS, authorization: token };

      try {
        let req = await Fetch( ENV.API_PATH + '/accounts/me/favorites', { method, body, headers } );
        res = await req.json();
      }

      catch(error){
        return reject(error);
      }

      if (res.success == false) return reject(res);
      resolve(res);
    })
  }

  static DeleteAlert( data, token ) {

    return new Promise(async (resolve,reject) => {

      let res;
      let method = 'DELETE';
      let body = JSON.stringify({ _id: data._id });
      let headers = { ...ENV.HEADERS, authorization: token };

      try {
        let req = await Fetch( ENV.API_PATH + '/accounts/me/alerts', { method, body, headers } );
        res = await req.json();
      }

      catch(error){
        return reject(error);
      }

      if (res.success == false) return reject(res);
      resolve(res);
    })
  }

  static DeleteRegistered(data, token) {

    return new Promise(async (resolve,reject) => {
      let res;
      let method = 'DELETE';
      let body = JSON.stringify({ event: data.event });
      let headers = { ...ENV.HEADERS, authorization: token };

      try {
        let req = await Fetch( ENV.API_PATH + '/accounts/me/registered', { method, body, headers } );
        res = await req.json();
      }

      catch(error){
        return reject(error);
      }

      if (res.success == false) return reject(res);
      resolve(res);
    })
  }



  static FBLogin() {
      return new Promise(async(resolve, reject) => {

        Logger.log('[account] Login called');
        FB.login(res => {
          if (res.status != 'connected') return reject(res);
          Logger.log('[account] Logged in');
          resolve(res.authResponse);
        },{ scope: 'public_profile,email'});

      });
    }

  static FBInfo() {
    return new Promise(async(resolve, reject) => {

      Logger.log('[account] Getinfo called');
      FB.api('/me', { fields: 'id,first_name,last_name,email'},
        (result: ?Object) => {
          const { id, first_name, last_name, email } = result;
          resolve({ id, first_name, last_name, email, picture: `http://graph.facebook.com/${id}/picture?type=large` });
        });
    });
  }

  static FBLogout() {
    Logger.log('[account] Logout');
    return FB.logout();
  }

  static FBSignIn(data) {

    return new Promise(async (resolve,reject) => {
      let res;
      let method = 'POST';
      let body = JSON.stringify(data);
      // console.log(body);

      try {
        let req = await Fetch( ENV.API_PATH + '/auth/fb', { method, body, headers: ENV.HEADERS } );
        res = await req.json();
      }

      catch(error){
        return reject(error);
      }

      if (res.success == false && !res.token) return reject(res);
      resolve(res);
    })
  }

  static Logout() {
    Logger.log('[account] Logout');
    //return LoginManager.logOut();
  }
}
