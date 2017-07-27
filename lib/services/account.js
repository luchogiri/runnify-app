// @flow
import ENV from '../env';
import Logger from '../helpers/logger';
import Fetch from '../helpers/fetch';



import { LoginManager, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import { Platform } from 'react-native';

export default class AccountService {

  static Getuserdb(){

    return new Promise( async (resolve,reject)=>{
      let res;
      try{
        let req = await fetch(ENV.API_PATH + '/accounts/57f4067ae82d1a4bae1635dc');
        res = await req.json();
      }
      catch(error){
        return reject(error);
      }
      resolve(res);
    })

  }

  static Update(data, token) {

    return new Promise(async (resolve,reject) => {
      let res;
      let method = 'PUT';

      //if (data.favorites) data.favorites = data.favorites.map( favorite => { favorite._id });
      let body = JSON.stringify(data);
      //let body = JSON.stringify(data);
      let headers = { ...ENV.HEADERS, authorization: token };

      console.log(body);

      try {
        let req = await Fetch( ENV.API_PATH + '/accounts/me', { method, body, headers } );
        res = await req.json();
      }

      catch(error){
        return reject(error);
      }

      if (res.success == false) return reject(res);
      resolve(res);
    })
  }

  static Saveuserdb( data ){

    return new Promise( async (resolve,reject)=>{
//      let { first_name, last_name, email, password, country, state } = data;
      let { first_name, last_name, email, country, state } = data;
      let favorites = data.favorites.map( favorite => favorite._id );
//      let registered = data.registered.map( registered => registered);

      let body = JSON.stringify({ first_name, last_name, email, country, state, favorites });
      let res;
      try{
          let req = await Fetch( ENV.API_PATH + '/accounts/585a8f8a77f90535b3e83b48',{ method: 'PUT', headers: ENV.HEADERS, body });
          res = await req.json();
      }
      catch(error){
          return reject(error);
      }
      resolve(res);


    })

  }

  static Login() {
    return new Promise(async(resolve, reject) => {

      Logger.log('[account] Login called');
      let res;
      try {
        LoginManager.setLoginBehavior(Platform.OS == 'android' ? 'native_with_fallback':'native');
        res = await LoginManager.logInWithReadPermissions(['public_profile', 'email'])
      }

      catch (err) {
        Logger.log('[account] Login error');
        return reject(err);
      }

      if (res.isCancelled) {
        Logger.log('[account] Login cancelled');
        return reject(res);
      }

      Logger.log('[account] Logged in');
      resolve(res);
    });
  }

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

  static GetInfo() {
    return new Promise(async(resolve, reject) => {

      Logger.log('[account] Getinfo called');
      const infoRequest = new GraphRequest('/me?fields=id,name,first_name,last_name,picture.type(large),email', null,

        (error: ?Object, result: Object) => {

          Logger.log('[account] Info received' + (error? ' with error': ''));
          if (error) return reject(error);
          const { name, first_name, last_name, email, picture = {} } = result;
          resolve({ logged_in: !!name, name, first_name, last_name, email, picture: (picture.data || {}).url });
        });

      new GraphRequestManager().addRequest(infoRequest).start();
    });
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
        let res;
        try {
          LoginManager.setLoginBehavior(Platform.OS == 'android' ? 'native_with_fallback':'native');
          res = await LoginManager.logInWithReadPermissions(['public_profile', 'email'])
        }

        catch (err) {
          Logger.log('[account] Login error');
          return reject(err);
        }

        if (res.isCancelled) {
          Logger.log('[account] Login cancelled');
          return reject(res);
        }

        Logger.log('[account] Logged in');
        resolve(res);
      });
    }

  static FBInfo() {
    return new Promise(async(resolve, reject) => {

      Logger.log('[account] Getinfo called');
      const infoRequest = new GraphRequest('/me?fields=id,first_name,last_name,email', null,

        (error: ?Object, result: ?Object) => {
          Logger.log('[account] Info received' + (error? ' with error': ''));
          if (error) return reject(error);
          const { id, first_name, last_name, email } = result;
          resolve({ id, first_name, last_name, email, picture: `http://graph.facebook.com/${id}/picture?type=large` });
        });

      new GraphRequestManager().addRequest(infoRequest).start();
    });
  }

  static FBLogout() {
    Logger.log('[account] Logout');
    return LoginManager.logOut();
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
    return LoginManager.logOut();
  }
}
