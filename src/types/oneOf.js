import {
  TypeChecker,
  run,
} from '../validator';
import {
  isValHandler,
  genError,
  is,
} from '../util';

export default function OneOf(extensions) {
  return (expectedValues) => {
    const validate = (key, value) => {
      if (!Array.isArray(expectedValues)) {
        return genError(key, 'Invalid notation inside oneOf. Expected array');
      }
      const passed = expectedValues.find((ev) => {
        if (isValHandler(ev)) {
          if (!run(ev, key, value)) {
            return true;
          }
        } else if (is(ev, value)) {
          return true;
        }
        return false;
      });
      if (!passed) {
        return genError(key, 'did not match oneOf values');
      }
      return null;
    };
    return TypeChecker(validate, extensions);
  };
}
