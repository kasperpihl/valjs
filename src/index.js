// Validator essentials
import {
  TypeChecker,
  run,
} from './validator';
import { isValHandler } from './util';

// Import types
import Primitive from './types/primitive';
import OneOf from './types/oneOf';
import ArrayOf from './types/arrayOf';
import Shape from './types/shape';
import Custom from './types/custom';

// Import Extensions
import test from './extensions/test';
import minLength from './extensions/min_length';
import maxLength from './extensions/max_length';
import min from './extensions/min';
import max from './extensions/max';


// Export primitive types
export const string = Primitive('string', [minLength, maxLength, test]);
export const bool = Primitive('boolean');
export const func = Primitive('function', [test]);
export const number = Primitive('number', [min, max, test]);
export const array = Primitive('array', [minLength, maxLength, test]);
export const object = Primitive('object', [test]);


// Setup non-primitive types
export const any = TypeChecker(value => !!value, [test]);
export const arrayOf = ArrayOf([minLength, maxLength, test]);
export const oneOf = OneOf([test]);
export const shape = Shape([test]);
export const custom = Custom();

const globalOptions = {
  promise: false,
  resolveOnly: false,
  runCondition: () => true,
};

// ======================================================
// Main function - this is run by the user
// ======================================================
export default function val(obj, schema, options) {
  const mergedOptions = Object.assign({}, globalOptions, options);
  // Checking if run condition is set.
  if (!mergedOptions.runCondition()) {
    return null;
  }

  let error;
  if (isValHandler(schema)) {
    error = run(schema, null, obj);
  } else {
    console.warn('valjs: invalid scheme provided');
  }

  if (mergedOptions.promise) {
    return new Promise((resolve, reject) => {
      if (!mergedOptions.resolveOnly && error) {
        return reject(error);
      }
      return resolve(error);
    });
  }
  return error || null;
}

// Support for setting global options.
val.setGlobal = (key, value) => {
  globalOptions[key] = value;
};
