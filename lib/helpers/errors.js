
// @flow

export const Errors = {

  MISSING_FIELD: '40001000',
  MISSING_FIELD_MSG: 'missing mandatory field'
};


export const ProviderError = (code:string = '0', msg:string, reasons?: Array<ProviderError>) => {

  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;
  this.message = msg;
  this.code = code;
  if (reasons.length)
    this.reasons = reasons;
}
