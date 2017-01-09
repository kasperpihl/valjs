// Validator essentials
import {
  createChainableTypeChecker,
  val,
} from './validator';

// Import types
import createPrimitive from './types/primitive';
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
export const string = createPrimitive('string', [minLength, maxLength, test]);
export const bool = createPrimitive('boolean');
export const func = createPrimitive('function', [test]);
export const number = createPrimitive('number', [min, max, test]);
export const array = createPrimitive('array', [minLength, maxLength, test]);
export const object = createPrimitive('object', [test]);


// Setup non-primitive types
export const any = createChainableTypeChecker(() => null, [test]);
export const arrayOf = createArrayOf([minLength, maxLength, test]);
export const oneOf = createOneOf([test]);
export const oneOfType = createOneOfType([test]);
export const shape = createShape([test]);
export const custom = createCustom();
