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
import minLength from './extensions/min_length';
import maxLength from './extensions/max_length';
import min from './extensions/min';
import max from './extensions/max';


// Export primitive types

const comparisons = Object.values(comparisonsObj);
export const string = Primitive('string', [...comparisons, format]);
export const number = Primitive('number', [...comparisons, format]);
export const bool = Primitive('boolean');
export const func = Primitive('function', [test]);
export const array = Primitive('array', [minLength, maxLength, test]);
export const object = Primitive('object', [test]);
export const date = DateChecker([test]);

// Setup non-primitive types
export const any = TypeChecker(value => !!value, [test]);
export const arrayOf = ArrayOf([minLength, maxLength, test]);
export const objectOf = ObjectOf();
export const oneOf = OneOf([test]);
export const shape = Shape([test]);
export const custom = Custom();

export default val;
