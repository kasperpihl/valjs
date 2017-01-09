import {
  createChainableTypeChecker,
} from '../validator';
import {
  genError,
} from '../util';

export default function createCustom(callback) {
  return callback => createChainableTypeChecker((key, value) => {
    if (typeof callback !== 'function') {
      return genError('Invalid notation in custom. Expected function');
    }
    return callback(value);
  });
}
