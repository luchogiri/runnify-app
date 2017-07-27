
import Logger from './logger';


const Fetch = (...args) => {
  
  let { method = 'GET', body = '' } = args[1] || {};
  Logger.log(`[${method}] ${args[0]}   ${body.substr(0,75)}`);
  return fetch(...args);
}

export default Fetch;