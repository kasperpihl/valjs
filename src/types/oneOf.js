import {
  TypeChecker,
} from '../validator';
import {
  is,
  genError,
} from '../util';

export default function OneOf(extensions) {
  return (expectedValues) => {
    const validate = (key, value) => {
      if (!Array.isArray(expectedValues)) {
        return genError(key, 'Invalid notation inside oneOf. Expected array');
      }
      const passed = expectedValues.find((ev) => {
        if (is(value, ev)) {
          return true;
        }
        return false;
      });

      if (!passed) {
        const values = JSON.stringify(expectedValues);
        return genError(key, `Expected one of ${values}, got ${value}`);
      }
      return null;
    };
    return TypeChecker(validate, extensions);
  };
}
