// @flow

const DEV = process.env.NODE_ENV === 'development';
  
export default class Logger {

  id: string;

  constructor(id: string) {

    this.id = id;
  }

  log(...args: any[]) {
    console.log( ...args );
  }
  
  static log(...args: any[]) {
    console.log( ...args );
  }

  static storeLogger() {
    return require('redux-logger')({
      predicate: (getState, action) => DEV,
      collapsed: true,
      duration: true,
    });
  }
}
