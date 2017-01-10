import {
  TypeChecker,
  run,
} from '../validator';
import {
  getType,
  isValHandler,
  genError,
  is,
} from '../util';

export default function ObjectOf(extensions) {
  return (typeChecker) => {
    const validate = (key, value) => {
      const type = getType(value);
      if (type !== 'object') {
        return genError(key, `Expected object, got ${type}`);
      }
      let error;
      const arr = Object.entries(value);
      if (isValHandler(typeChecker) && value.length) {
        error = arr.map(([v, k]) => run(typeChecker, `${key}.${k}`, v)).filter(v => !!v)[0];
      } else if (arr.length) {
        const passed = arr.find(([v]) => {
          if (is(value, v)) {
            return true;
          }
          return false;
        });
        if (!passed) {
          error = genError(key, `Expected value ${typeChecker}, got ${value}`);
        }
      }
      return error || null;
    };
    return TypeChecker(validate, extensions);
  };
}
