// Validator essentials
import {
  createPrimitiveTypeChecker,
  createChainableTypeChecker,
  val,
} from './validator';

// Import non-primitive types
import createOneOf from './types/oneOf';
import createArrayOf from './types/arrayOf';
import createOneOfType from './types/oneOfType';
import createShape from './types/shape';
import createCustom from './types/custom';

// Import Extensions
import test from './extensions/test';
import minLength from './extensions/min_length';
import maxLength from './extensions/max_length';
import min from './extensions/min';
import max from './extensions/max';


// Default export to validate function.
export default val;
// Export primitive types
export const string = createPrimitiveTypeChecker('string', [minLength, maxLength, test]);
export const bool = createPrimitiveTypeChecker('boolean');
export const func = createPrimitiveTypeChecker('function', [test]);
export const number = createPrimitiveTypeChecker('number', [min, max, test]);
export const array = createPrimitiveTypeChecker('array', [minLength, maxLength, test]);
export const object = createPrimitiveTypeChecker('object', [test]);


// Setup non-primitive types
export const any = createChainableTypeChecker(() => null, [test]);
export const arrayOf = createArrayOf([minLength, maxLength, test]);
export const oneOf = createOneOf([test]);
export const oneOfType = createOneOfType([test]);
export const shape = createShape([test]);
export const custom = createCustom();
