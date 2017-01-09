import {
  TypeChecker,
} from '../validator';
import {
  genError,
} from '../util';

export default function Custom(callback) {
  return callback => TypeChecker((key, value) => {
    if (typeof callback !== 'function') {
      return genError('Invalid notation in custom. Expected function');
    }
    return callback(value);
  });
}
