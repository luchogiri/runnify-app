// @flow

import ENV from '../env';
import Fetch from '../helpers/fetch';

export default class EventsService{

  static Retrieve(params = {}){

    let { query = {}} = params;
    let qs = [];
    if (query.state) qs.push('state='+query.state);
    if (query.country) qs.push('country='+query.country);
    if (query.city) qs.push('city='+query.city);

    // show_nearme resets prev query
    if (params.show_nearme) qs = [];

    if (query.category) qs.push('category='+query.category);
    if (query.distance) qs.push('distance='+query.distance);
    if (query.lat_lng) qs.push('lat_lng='+query.lat_lng);
    if (params.search) qs.push('query='+params.search);
    if (params.limit) qs.push('limit='+params.limit);
    if (params.offset) qs.push('offset='+params.offset);

    let queryString = qs.length ? '?' + qs.join('&') : '';

    return new Promise( async (resolve,reject)=>{
      let res;
      try{
        let req = await Fetch(ENV.API_PATH + '/events' + queryString);
        res = await req.json();
      }
      catch(error){
        return reject(error);
      }
      resolve(res);
    })
  }


  static RetrieveById( id ){

    return new Promise( async (resolve,reject)=>{
      let res;
      try{
        let req = await Fetch(ENV.API_PATH + '/events/'+ id);
        res = await req.json();
      }
      catch(error){
        return reject(error);
      }
      resolve(res);
    })
  }


  static Create( data, token ) {

    return new Promise(async (resolve,reject) => {
      let res;
      let method = 'POST';

      let body = JSON.stringify(data);
      let headers = { ...ENV.HEADERS, authorization: token };

      try {
        let req = await Fetch( ENV.API_PATH + '/events', { method, body, headers } );
        res = await req.json();
      }

      catch(error){
        return reject(error);
      }

      if (res.success == false) return reject(res);
      resolve(res);
    })
  }
}
