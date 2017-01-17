import {
  TypeChecker,
} from '../validator';
import {
  isValidDate,
  getType,
} from '../util';

export default function Date(extensions) {
  const validate = (key, value) => {
    if (!isValidDate(value)) {
      const type = getType(value);
      return genError(key, `Expected date, got ${type}`);
    }
    return null;
  };
  return TypeChecker(validate, extensions);
}
