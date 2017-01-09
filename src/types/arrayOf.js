import {
  TypeChecker,
  run,
} from '../validator';
import {
  getType,
  genError,
} from '../util';

export default function ArrayOf(extensions) {
  return (typeChecker) => {
    const validate = (key, value) => {
      if (typeof typeChecker !== 'function') {
        return genError(key, 'Invalid notation inside arrayOf. Expected function');
      }
      const type = getType(value);
      if (type !== 'array') {
        return genError(key, `Expected array, got ${type}`);
      }
      const error = value.map((v, i) => run(typeChecker, `${key}[${i}]`, v)).filter(v => !!v)[0];
      return error || null;
    };
    return TypeChecker(validate, extensions);
  };
}
