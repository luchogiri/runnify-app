// @flow

import ENV from '../env';
import Fetch from '../helpers/fetch';
import Logger from '../helpers/logger';


export default class Config {
  
  static Retrieve() {
    return new Promise(async (resolve, reject) => {
      
      let res = {};
      try {
        
        let req = await Fetch(ENV.API_PATH + '/config', { headers: ENV.HEADERS });
        res = await req.json();
      }
      catch (err) {
        
        Logger.log(err);
        return reject(err);
      }
      
      resolve(res);
    });
  }
}

