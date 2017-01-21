import 'babel-polyfill';
// Validator essentials

import {
  run,
  val,
} from './validator';
import { isValHandler } from './util';

// Import types
import {
  Any,
  Primitive,
  DateChecker
} from './types';

// Import Extensions
// eq, neq, gt, gte, lt, lte
import * as comp from './extensions/comparisons';
// of, as
import * as iteratives from './extensions/iteratives';
// min, max
import * as bounds from './extensions/bounds';
import format from './extensions/format';

export const string = Primitive('string', [comp, format, bounds]);
export const number = Primitive('number', [comp, format]);
export const bool = Primitive('boolean', [{ eq: comp.eq, neq: comp.neq}]);
export const date = DateChecker();
export const func = Primitive('function');
export const array = Primitive('array', [iteratives, bounds]);
export const object = Primitive('object', [iteratives, bounds]);
export const any = Any([{ of: iteratives.of}]);

// Helpers for react folks.
export const objectOf = () => console.warn('objectOf() not supported. Use: object.of()');
export const shape = () => console.warn('shape() not supported. Use object.as() or array.as()');
export const oneOf = () => console.warn('oneOf() not supported. Use any.of()');
export const arrayOf = () => console.warn('arrayOf() not supported. Use arrayOf()');

export default val;
