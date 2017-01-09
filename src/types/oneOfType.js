import {
  createChainableTypeChecker,
  run,
} from '../validator';
import {
  genError,
} from '../util';

export default function createOneOfType(extensions) {
  return (arrayOfTypeCheckers) => {
    const validate = (key, value) => {
      if (!Array.isArray(arrayOfTypeCheckers)) {
        return genError(key, 'Invalid notation inside oneOfType. Expected array');
      }
      const passed = arrayOfTypeCheckers.find(cb => run(cb, key, value));
      if (!passed) {
        return genError(key, 'unknown type');
      }
      return null;
    };
    return createChainableTypeChecker(validate, extensions);
  };
}
