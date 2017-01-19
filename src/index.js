// Validator essentials
import {
  TypeChecker,
  run,
  val,
} from './validator';
import { isValHandler } from './util';

// Import types
import Primitive from './types/primitive';
import OneOf from './types/oneOf';
import ArrayOf from './types/arrayOf';
import ObjectOf from './types/objectOf';
import Shape from './types/shape';
import Custom from './types/custom';
import DateChecker from './types/date';

// Import Extensions
import * as comparisonsObj from './extensions/comparisons';
import format from './extensions/format';
import test from './extensions/test';
import min from './extensions/min_length';
import max from './extensions/max_length';

// Export primitive types

// eq, neq, gt, gte, lt, lte
const comparisons = Object.values(comparisonsObj);
const { eq, neq } = comparisons;
export const string = Primitive('string', [...comparisons, format, min, max]);
export const number = Primitive('number', [...comparisons, format]);
export const bool = Primitive('boolean', [eq, neq]);
export const date = DateChecker([test]);
export const func = Primitive('function', [test]);
export const array = Primitive('array', [min, max, test]);
export const object = Primitive('object', [test]);


// Setup non-primitive types
export const any = TypeChecker(value => !!value, [test]);
export const arrayOf = ArrayOf([minLength, maxLength, test]);
export const objectOf = ObjectOf();
export const oneOf = OneOf([test]);
export const shape = Shape([test]);
export const custom = Custom();

export default val;
