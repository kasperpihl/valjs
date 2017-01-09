import {
  getType,
  genError,
} from '../util';
import {
  TypeChecker,
} from '../validator';

export default function Primitive(expectedType, extensions) {
  const validate = (key, value) => {
    const type = getType(value);
    if (type !== expectedType) {
      return genError(key, `Expected ${expectedType}, got ${type}`);
    }
    return null;
  };
  return TypeChecker(validate, extensions);
}
