import {
  TypeChecker,
} from './validator';
import {
  isValidDate,
  getType,
} from './util';

export function DateChecker(extensions) {
  const validate = (key, value) => {
    if (!isValidDate(value)) {
      const type = getType(value);
      return `expected date, got ${type}`;
    }
    return null;
  };
  return TypeChecker(validate, extensions);
}

export function Primitive(expectedType, extensions) {
  const validate = (key, value) => {
    const type = getType(value);
    if (type !== expectedType) {
      return `expected ${expectedType}. got ${type}`;
    }
    return null;
  };
  return TypeChecker(validate, extensions);
}

export function Any(extensions){
  const validate = (key, value) => {
    if(typeof value === 'undefined'){
      return `expected a value`;
    }
    return null;
  }
  return TypeChecker(validate, extensions);
}
