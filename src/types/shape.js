import {
  createChainableTypeChecker,
  run,
} from '../validator';
import {
  genError,
} from '../util';

export default function createShape(extensions) {
  return (shapeTypes) => {
    const validate = (key, value) => {
      if (typeof shapeTypes !== 'object') {
        return genError(key, 'Invalid notation inside shape. Expected object');
      }
      if (typeof value !== 'object') {
        return genError(key, `Expected object, got ${typeof value}`);
      }

      const error = Object.entries(shapeTypes).map(([oKey, checker]) => {
        const oVal = value[oKey];
        return run(checker, `${key}.${oKey}`, oVal);
      }).filter(v => !!v)[0];

      return error || null;
    };
    return createChainableTypeChecker(validate);
  };
}
