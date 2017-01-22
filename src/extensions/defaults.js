import {
  getType,
} from '../util';

export function __typeChecker(key, value, expectedType) {
  if(this.__required && (typeof value === 'undefined' || value === null)){
    return 'required';
  }
  const type = getType(value);
  if (expectedType && type !== expectedType) {
    return `expected ${expectedType}. got ${type}`;
  }
  return null;
}
export const custom = (key, value, handler) => {
  if(typeof handler !== 'function'){
    return 'expected function as parameter to custom';
  }
  return handler(value);
};
