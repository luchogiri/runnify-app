// @flow

export const API_KEYS = {

  "5d67c2leb3b648a0884ae461": "ADMIN",
  "2f3116f9bc70f610655e3539": "MOBILE",
  "1d45d76cc135012453e3961e": "WEB"
}


export const ALLOWED_PATHS = {

  "WEB": [ 'config' ],
  "MOBILE": [ 'config' ]
}


const Security = (req, res, next) => {

  // @TODO activate security
  return next();

  let platform = API_KEYS[req.headers['x-apikey']];
  let path = req.path.replace('/', '').replace('/', '');

  if ( platform == 'ADMIN' ) return next();
  if ( ALLOWED_PATHS[platform] && ALLOWED_PATHS[platform].indexOf(path) > -1) return next();
  else return res.sendStatus(401);
}

export default Security;
