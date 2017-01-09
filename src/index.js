// Validator essentials
import {
  TypeChecker,
  val,
} from './validator';

// Import types
import Primitive from './types/primitive';
import OneOf from './types/oneOf';
import ArrayOf from './types/arrayOf';
import OneOfType from './types/oneOfType';
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
export const any = TypeChecker(() => null, [test]);
export const arrayOf = ArrayOf([minLength, maxLength, test]);
export const oneOf = OneOf([test]);
export const oneOfType = OneOfType([test]);
export const shape = Shape([test]);
export const custom = Custom();

// Default export to validate function.
export default val;
