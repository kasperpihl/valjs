import {
  getType,
} from '../util';

export function __typeChecker(key, value, expectedType) {
  let hasValue = (typeof value !== 'undefined' && value !== null);
  if(this.__required && !hasValue){
    if(!(this.__acceptedNull && value === null)){
      return 'required';
    }
  }
  const type = getType(value);
  if (hasValue && expectedType && type !== expectedType) {
    return `expected ${expectedType}. got ${type}`;
  }
  if(!hasValue){
    this.__stop = true;
  }
  return null;
}
export const custom = (key, value, handler) => {
  if(typeof handler !== 'function'){
    return 'expected function as parameter to custom';
  }
  return handler(value);
};
