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

export default function ArrayOf(extensions) {
  return (typeChecker) => {
    const validate = (key, value) => {
      const type = getType(value);
      if (type !== 'array') {
        return genError(key, `Expected array, got ${type}`);
      }
      let error;
      if (isValHandler(typeChecker) && value.length) {
        error = value.map((v, i) => run(typeChecker, `${key}[${i}]`, v)).filter(v => !!v)[0];
      } else if (value.length) {
        const passed = value.find((av) => {
          if (is(value, av)) {
            return true;
          }
          return false;
        });
        if (!passed) {
          error = genError(key, 'did not match arrayOf value');
        }
      }
      return error || null;
    };
    return TypeChecker(validate, extensions);
  };
}
