import {
  getType,
  genError,
} from '../util';
import {
  createChainableTypeChecker,
} from '../validator';
export const createPrimitive = (expectedType, extensions) => {
  const validate = (key, value) => {
    const type = getType(value);
    if (type !== expectedType) {
      return genError(key, `Expected ${expectedType}, got ${type}`);
    }
    return null;
  };
  return createChainableTypeChecker(validate, extensions);
};
